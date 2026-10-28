import { DurableObject } from "cloudflare:workers";
import { intakeSchema, legacyIntakePayload } from "../site/src/lib/intake";
import { deliverOnce, type DeliveryRecord } from "./intake-delivery";

type Env = {
  ASSETS: Fetcher;
  INQUIRIES: DurableObjectNamespace;
  INTAKE_WEBHOOK_URL?: string;
};
const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
const events = new Set([
  "page_view",
  "inquiry_cta",
  "case_opened",
  "inquiry_started",
  "inquiry_received",
  "inquiry_error",
  "booking_opened",
]);
const paths = new Set([
  "/",
  "/work",
  "/offer",
  "/about",
  "/faq",
  "/apply",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/work/bible-alive",
  "/work/counterpoint",
  "/work/bowmar-bowhunting",
]);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (/^\/(app|portal|login)(\/|$)/.test(url.pathname))
      return new Response("Not found", {
        status: 404,
        headers: { "X-Robots-Tag": "noindex" },
      });
    if (url.pathname === "/services")
      return Response.redirect(`${url.origin}/offer`, 301);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
    if (!["/api/intake", "/api/events"].includes(url.pathname))
      return json({ error: "Not found" }, 404);
    if (request.method !== "POST")
      return json({ error: "Method not allowed" }, 405);
    if (request.headers.get("origin") !== url.origin)
      return json({ error: "Invalid origin" }, 403);
    if (!request.headers.get("content-type")?.startsWith("application/json"))
      return json({ error: "Expected JSON" }, 415);
    const limit = url.pathname === "/api/events" ? 512 : 16000;
    if (Number(request.headers.get("content-length") || 0) > limit)
      return json({ error: "Request too large" }, 413);
    try {
      const raw = await request.text();
      if (raw.length > limit) return json({ error: "Request too large" }, 413);
      let body;
      try {
        body = JSON.parse(raw);
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }
      if (!body || typeof body !== "object" || Array.isArray(body))
        return json({ error: "Invalid request" }, 400);
      if (url.pathname === "/api/events") {
        if (!events.has(body.event) || !paths.has(body.path))
          return json({ error: "Invalid event" }, 400);
        console.log(JSON.stringify({ event: body.event, path: body.path }));
        return new Response(null, { status: 204 });
      }
      const parsed = intakeSchema.safeParse(body);
      if (!parsed.success)
        return json(
          {
            error:
              "Check your name, email, content link and required selections.",
          },
          400,
        );
      if (!env.INTAKE_WEBHOOK_URL)
        return json(
          {
            error:
              "The inquiry form is temporarily unavailable. Please use the booking link below.",
          },
          503,
        );
      const stub = env.INQUIRIES.get(
        env.INQUIRIES.idFromName(parsed.data.request_id),
      );
      return stub.fetch(
        new Request("https://inquiry.internal/", {
          method: "POST",
          body: JSON.stringify(parsed.data),
        }),
      );
    } catch {
      return json(
        {
          error:
            "We couldn’t confirm receipt. Retry this inquiry or use the booking link below.",
        },
        503,
      );
    }
  },
};

export class InquiryDelivery extends DurableObject<Env> {
  async fetch(request: Request) {
    const data = intakeSchema.parse(await request.json());
    const payload = JSON.stringify(legacyIntakePayload(data));
    const digest = Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(payload),
        ),
      ),
      (x) => x.toString(16).padStart(2, "0"),
    ).join("");
    return this.ctx.blockConcurrencyWhile(async () => {
      const result = await deliverOnce({
        digest,
        read: () => this.ctx.storage.get<DeliveryRecord>("delivery"),
        write: (record) => this.ctx.storage.put("delivery", record),
        send: () =>
          fetch(this.env.INTAKE_WEBHOOK_URL!, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Idempotency-Key": data.request_id,
            },
            body: payload,
            signal: AbortSignal.timeout(15000),
          }),
      });
      return json(result.body, result.status);
    });
  }
}
