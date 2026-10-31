import { test } from "node:test";
import assert from "node:assert/strict";
import { intakeSchema, legacyIntakePayload } from "../site/src/lib/intake";
import { deliverOnce, type DeliveryRecord } from "../worker/intake-delivery";
const sample = {
  request_id: "702a97bb-fc93-4777-92ab-f8d361bddcc9",
  name: "Example Founder",
  business_email: "founder@example.com",
  source_url: "https://example.com/channel",
  business_narrative: "Editing and publishing our lessons",
  footage_availability: "Regular recordings",
  deployment_timeline: "Within 30 days",
  phone_number: "",
  website_confirmation: "",
};
test("intake validates optional phone and preserves meaningful legacy receiver keys", () => {
  const mapped = legacyIntakePayload(intakeSchema.parse(sample));
  assert.equal(mapped.first_name, "Example");
  assert.equal(mapped.last_name, "Founder");
  assert.equal(mapped.preferred_communication, "Email");
  assert.equal(mapped.revenue_scale, "Not provided");
  assert.equal(mapped.marketing_spend, "Not provided");
  assert.match(mapped.business_narrative, /https:\/\/example.com\/channel/);
  assert.equal(mapped.phone_number, "");
  assert.equal(mapped.business_narrative, "Editing and publishing our lessons\n\nContent: https://example.com/channel\nFootage: Regular recordings");
});
test("service interests reach the existing receiver narrative while older submissions remain valid", () => {
  const campaign = legacyIntakePayload(intakeSchema.parse({ ...sample, service_interest: "Clipping campaign" }));
  assert.equal(campaign.service_interest, "Clipping campaign");
  assert.match(campaign.business_narrative, /Service interest: Clipping campaign/);
  assert.equal(intakeSchema.safeParse({ ...sample, service_interest: "Unrecognized service" }).success, false);
  assert.equal(intakeSchema.safeParse(sample).success, true);
  const legacy = legacyIntakePayload(intakeSchema.parse({ ...sample, pilot_interest: "yes" }));
  assert.equal(legacy.pilot_interest, true);
  assert.doesNotMatch(legacy.business_narrative, /paid pilot/i);
});
test("intake rejects invalid email, unsafe URL, missing selections and bots", () => {
  for (const changes of [
    { business_email: "bad" },
    { source_url: "javascript:alert(1)" },
    { source_url: "file:///secret" },
    { footage_availability: "" },
    { deployment_timeline: "" },
    { website_confirmation: "spam" },
    { request_id: "bad" },
  ])
    assert.equal(
      intakeSchema.safeParse({ ...sample, ...changes }).success,
      false,
    );
});
test("successful delivery is acknowledged only once; retries return the stored result", async () => {
  let record: DeliveryRecord | undefined;
  let calls = 0;
  const deps = {
    digest: "same",
    read: async () => record,
    write: async (r: DeliveryRecord) => {
      record = r;
    },
    send: async () => {
      calls++;
      return new Response(null, { status: 200 });
    },
  };
  assert.equal((await deliverOnce(deps)).status, 200);
  assert.equal((await deliverOnce(deps)).status, 200);
  assert.equal(calls, 1);
  assert.equal((await deliverOnce({ ...deps, digest: "changed" })).status, 409);
  assert.equal(calls, 1);
});
test("timeouts and receiver errors never become success or trigger blind duplicate delivery", async () => {
  for (const failure of [
    async () => {
      throw new Error("timeout");
    },
    async () => new Response(null, { status: 500 }),
  ]) {
    let record: DeliveryRecord | undefined;
    let calls = 0;
    const deps = {
      digest: "same",
      read: async () => record,
      write: async (r: DeliveryRecord) => {
        record = r;
      },
      send: async () => {
        calls++;
        return failure();
      },
    };
    assert.equal((await deliverOnce(deps)).status, 503);
    assert.equal((await deliverOnce(deps)).status, 503);
    assert.equal(calls, 1);
  }
});
test("an interrupted in-flight delivery is treated as uncertain after restart", async () => {
  let called = false;
  const result = await deliverOnce({
    digest: "same",
    read: async () => ({ digest: "same", status: "pending" }),
    write: async () => {},
    send: async () => {
      called = true;
      return new Response();
    },
  });
  assert.equal(result.status, 503);
  assert.equal(called, false);
});
