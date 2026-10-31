"use client";
import Link from "./marketing-link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ClipboardCheck } from "lucide-react";
import { Button, Badge } from "./ui";
import { track } from "./marketing-events";

export function InquiryForm() {
  const production = process.env.NEXT_PUBLIC_SITE_MODE === "production";
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [preview, setPreview] = useState(false);
  const [uncertain, setUncertain] = useState(false);
  const [error, setError] = useState("");
  const started = useRef(false);
  const requestId = useRef("");
  const payload = useRef<Record<string, FormDataEntryValue> | null>(null);
  const submitting = useRef(false);
  const [serviceInterest, setServiceInterest] = useState("");
  useEffect(() => {
    const interest = new URLSearchParams(window.location.search).get("interest");
    if (interest === "managed") setServiceInterest("Managed content for my accounts");
    if (interest === "campaign") setServiceInterest("Clipping campaign");
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setState("busy");
    setError("");
    requestId.current ||= crypto.randomUUID();
    // A retry reuses the same payload and key, even if the response was lost.
    payload.current ||= Object.fromEntries(new FormData(e.currentTarget));
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": requestId.current },
        body: JSON.stringify({ ...payload.current, request_id: requestId.current }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        if (result.uncertain) setUncertain(true);
        if (response.status === 400) { payload.current = null; requestId.current = ""; }
        throw new Error(result.error || "We couldn’t confirm receipt. Please try again or book a conversation below.");
      }
      setPreview(result.preview === true);
      setState("done");
      if (!result.preview) track("inquiry_received");
    } catch (e) {
      setError(e instanceof Error && e.name !== "TimeoutError" && e.name !== "TypeError"
        ? e.message : "We couldn’t confirm receipt. Retry to check this same inquiry, or use the booking link below.");
      track("inquiry_error");
      setState("idle");
    } finally { submitting.current = false; }
  }
  return (
    <div className="panel application-form">
      {state === "done" ? (
        <div className="success-state" role="status" aria-live="polite">
          <ClipboardCheck size={36} className="blue" />
          <h2>{preview ? "Local test complete." : "Your inquiry is in."}</h2>
          <p>{preview ? "Your details were validated locally. Nothing was sent to the production inbox." : "Thanks for sharing your content. We’ll review the details and follow up by email to discuss the fit and scope."}</p>
          {!preview && <p>Want to choose a time now? Book a conversation.</p>}
          <a className="button secondary" href="https://cal.com/carterw/30min" target="_blank" rel="noreferrer">View booking availability <ArrowUpRight size={16} /></a>
        </div>
      ) : (
        <form onSubmit={submit} onFocus={() => { if (!started.current) { started.current = true; track("inquiry_started"); } }}>
          <h2>Start the conversation</h2>
          <p className="muted">A few details about your content. Phone is optional.</p>
          {!production && <Badge>Local preview · Nothing is sent</Badge>}
          <fieldset disabled={state === "busy" || !!payload.current} className="inquiry-fields">
            <label>Your name<input name="name" required maxLength={200} autoComplete="name" /></label>
            <label>Email<input name="business_email" type="email" required maxLength={254} autoComplete="email" /></label>
            <label>What are you interested in?<select name="service_interest" required value={serviceInterest} onChange={e => setServiceInterest(e.target.value)}><option value="" disabled>Select an option</option><option>Managed content for my accounts</option><option>Clipping campaign</option><option>Both</option><option>Not sure yet</option></select></label>
            <label>Where can we see your content?<input name="source_url" type="url" required maxLength={2000} placeholder="https://your-channel-or-website.com" aria-describedby="source-help" /><small id="source-help">A channel, website or sample recording link. No upload needed.</small></label>
            <label>What would you like us to take off your plate?<textarea name="business_narrative" required maxLength={5000} rows={3} placeholder="What you make, who it’s for, and what’s slowing you down." /></label>
            <div className="form-grid">
              <label>What footage do you have?<select name="footage_availability" defaultValue="" required><option value="" disabled>Select</option><option>Regular recordings</option><option>A library of existing footage</option><option>Preparing to record</option></select></label>
              <label>When would you like to start?<select name="deployment_timeline" defaultValue="" required><option value="" disabled>Select</option><option value="Now">As soon as there’s a fit</option><option value="Within 30 days">Within 30 days</option><option value="30 days or more">Later / exploring</option></select></label>
            </div>
            <label>Phone (optional)<input name="phone_number" type="tel" maxLength={100} autoComplete="tel" /></label>
            <div className="inquiry-trap" aria-hidden="true"><label>Company website confirmation<input name="website_confirmation" tabIndex={-1} autoComplete="off" /></label></div>
          </fieldset>
          {error && <p className="error" role="alert">{error}</p>}
          <Button type="submit" busy={state === "busy"} disabled={uncertain}>{payload.current && error ? "Check this inquiry again" : production ? "Send inquiry" : "Test inquiry locally"}<ArrowRight size={16} /></Button>
          <small>By submitting, you agree we may email you about this inquiry. See our <Link href="/privacy">privacy policy</Link>.</small>
          <p className="booking-alternative">Prefer to talk? <a href="https://cal.com/carterw/30min" target="_blank" rel="noreferrer">Book a conversation <ArrowUpRight size={13} /></a></p>
        </form>
      )}
    </div>
  );
}
