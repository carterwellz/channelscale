import { z } from "zod";
export const intakeSchema = z.object({
  request_id: z.uuid(),
  name: z.string().trim().min(1).max(200),
  business_email: z.email().max(254),
  source_url: z.url({ protocol: /^https?$/ }).max(2000),
  business_narrative: z.string().trim().min(1).max(5000),
  footage_availability: z.enum(["Regular recordings", "A library of existing footage", "Preparing to record"]),
  deployment_timeline: z.enum(["Now", "Within 30 days", "30 days or more"]),
  phone_number: z.string().trim().max(100).default(""),
  pilot_interest: z.enum(["yes", ""]).optional(),
  website_confirmation: z.literal("").optional(),
});
export type Intake = z.infer<typeof intakeSchema>;
export function legacyIntakePayload(data: Intake) {
  const [first_name, ...last] = data.name.split(/\s+/);
  return {
    schema_version: 2, request_id: data.request_id, first_name, last_name: last.join(" "),
    business_email: data.business_email, phone_number: data.phone_number, preferred_communication: "Email",
    business_narrative: `${data.business_narrative}\n\nContent: ${data.source_url}\nFootage: ${data.footage_availability}\nPaid pilot interest: ${data.pilot_interest === "yes" ? "Yes" : "Not specified"}`,
    // Preserve receiver keys without inventing financial or publishing history.
    revenue_scale: "Not provided", marketing_spend: "Not provided", posting_history: "Not provided",
    deployment_timeline: data.deployment_timeline, source_url: data.source_url,
    footage_availability: data.footage_availability, pilot_interest: data.pilot_interest === "yes",
  };
}
