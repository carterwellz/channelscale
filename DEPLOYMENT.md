# ChannelScale public website

The white-and-blue marketing site is in `site/`. Cloudflare Worker `channelscale-yt` serves its static Next.js export and handles public inquiry delivery. The old root `index.html` is retained as the previous version, but is not part of the new deploy artifact.

## Local authoring

`site/` is the current public source of truth; edit it directly for public changes. The separate private workspace remains in untracked `redesign/`, and its marketing snapshot may be older. `npm run sync:marketing` overwrites the allowlisted `site/` files from that snapshot; use it only to deliberately reconcile versions after inspecting both, not as a routine deploy step. Do not commit private routes, `.env` files, databases, uploaded client files or draft agreements. The private workspace is not required to build.

## Build and deploy

`npm ci`, `npm test`, then `npm run deploy`. Wrangler runs `npm run build` itself. The existing Cloudflare Workers GitHub build should deploy `main` with `npx wrangler deploy` from repository root, with no `--assets` override. Static assets come only from `site/out`.

The configuration adds one SQLite-backed Durable Object class, `InquiryDelivery`, for durable duplicate prevention. It stores a request digest and delivery state, never inquiry form contents. The existing public n8n webhook URL is preserved as `INTAKE_WEBHOOK_URL`. It can be overridden with a Worker secret if the endpoint is rotated. Missing configuration fails closed.

## Inquiry contract

The form collects name, email, service interest, content URL, bottleneck, footage availability and desired start window, with optional phone and pilot interest. The adapter preserves the original n8n field names. Removed revenue, marketing spend and publishing-history questions are explicitly `Not provided`; service interest, source URL and footage status are appended to `business_narrative` as well as supplied separately. Older submissions without service interest remain valid and retain their original mapped narrative. Preferred communication remains email. No existing question is silently relabeled as a different business measure.

Only a successful HTTP acknowledgment from the receiver produces the receipt screen. This verifies acceptance by the intake endpoint, not subsequent email or CRM execution. Timeouts, receiver errors or interrupted requests are marked uncertain and are not automatically resent. Browser retries reuse the same request identifier and frozen payload. The confirmation offers the existing Cal.com link. A new request identifier is a new inquiry.

The private Next workspace's `/api/intake` always validates locally without sending. To exercise production delivery safely, run `node tests/intake-receiver.mjs` and `npx wrangler dev --port 3213 --var INTAKE_WEBHOOK_URL:http://127.0.0.1:3214/inquiry`. The test receiver is localhost-only. Never run a real sales submission as a health check.

## Measurement

Allowlisted events are written to Cloudflare Worker logs: page_view, inquiry_cta, case_opened, inquiry_started, inquiry_received, inquiry_error and booking_opened. They contain only the event and known page path; no form contents, query strings or visitor IDs. Browser Do Not Track is honored. Use Cloudflare Observability to compare event totals; these are operational counts, not unique visitors or confirmed bookings. Qualification and closed business must still be measured in the sales process.

## Verification and rollback

Check `/`, `/offer`, `/clippers`, `/work`, case pages and `/apply` on desktop and mobile. Confirm metadata, canonical URLs, `/robots.txt`, `/sitemap.xml`, `/og.png`, 404s for unknown and private routes, and the local test receiver. The deployment has no private workspace routes or data.

The previous production commit is `27f70d1`. Cloudflare version rollback can restore the prior deployment. Preserve the local redesign and its baseline under `audit-2026-10-27/implementation-baseline`; do not reset the whole checkout.

The clipper page's website campaign list is maintained in `site/src/lib/clipper-campaigns.ts` and currently has no entries. It is not automatically synchronized with Whop or Content Rewards. Add only real, open opportunities with approved links, and remove them when closed. Whop's Opportunities section remains the source for current community briefs.
