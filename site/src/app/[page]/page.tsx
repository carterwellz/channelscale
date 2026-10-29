import { marketingMetadata } from "@/lib/marketing-metadata";
export function generateStaticParams() { return ["work", "offer", "services", "about", "faq", "apply", "clippers", "privacy", "terms", "disclaimer"].map(page => ({page})); }
export async function generateMetadata({params}: {params: Promise<{page: string}>}) { return marketingMetadata((await params).page); }
import { CaseStudiesIndex } from "@/components/case-studies";
import { notFound } from "next/navigation";
import {
  OfferPage,
  AboutPage,
  FAQPage,
  ApplyPage,
  ClippersPage,
  LegalPage,
} from "@/components/marketing";
export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  switch (page) {
    case "work":
      return <CaseStudiesIndex />;
    case "offer":
    case "services":
      return <OfferPage />;
    case "about":
      return <AboutPage />;
    case "faq":
      return <FAQPage />;
    case "apply":
      return <ApplyPage />;
    case "clippers":
      return <ClippersPage />;
    case "privacy":
      return (
        <LegalPage kind="Privacy policy">
          <p>
            This website is operated by Noia Media LLC, doing business as
            ChannelScale. Contact:{" "}
            <a href="mailto:hello@channelscale.yt">hello@channelscale.yt</a>.
          </p>
          <h2>Information you provide</h2>
          <p>
            Our inquiry form collects your name, email, content link, service interests, goals, footage availability, preferred timing and an optional phone number. We use these details to review your inquiry and contact you about our services. Inquiries are processed through our hosted intake system.
          </p>
          <h2>Website usage</h2>
          <p>Our website is hosted by Cloudflare. Hosting and security systems may process technical request information, including IP addresses. We record basic website events, such as page views, inquiry starts and booking-link clicks, to understand how the site is used. These event records do not include form contents or visitor identifiers. We do not use advertising trackers, and our website event tracking respects the browser’s Do Not Track setting.</p>
          <h2>External services</h2>
          <p>
            Fonts load from Google Fonts. Booking links open Cal.com. The clipper community link opens Whop. Social and source links open their respective platforms. Those services apply their own privacy policies. Our service providers process information needed to host this site, handle inquiries and arrange conversations.
          </p>
          <h2>Access and deletion</h2>
          <p>
            Contact us to ask about, correct or request deletion of information you have provided. We retain information needed to respond to inquiries, maintain business records and meet applicable obligations. Do not submit passwords or sensitive personal information through this form.
          </p>
        </LegalPage>
      );
    case "terms":
      return (
        <LegalPage kind="Terms of use">
          <p>
            This website presents the services and selected work of ChannelScale, operated by Noia Media LLC.
          </p>
          <h2>Service engagements</h2>
          <p>
            A website inquiry does not establish a service agreement. Fees,
            deliverables, source rights, approvals, payment, cancellation and
            any remedies must be agreed in a separate written engagement.
          </p>
          <h2>Content and outcomes</h2>
          <p>
            You must have the necessary rights to footage and accounts supplied
            for work. No specific views, leads or revenue are promised on this
            website.
          </p>
          <h2>Questions</h2>
          <p>
            Contact hello@channelscale.yt with questions about this website or a proposed engagement.
          </p>
        </LegalPage>
      );
    case "disclaimer":
      return (
        <LegalPage kind="Project & results disclaimer">
          <p>
            Selected work includes projects Carter operates or produces and is
            labeled accordingly. An operated project is not presented as a
            paying agency client.
          </p>
          <p>
            Examples illustrate editorial and production work. They do not
            guarantee future performance or establish that editing alone caused
            a channel’s results.
          </p>
          <p>
            Proposed services are subject to a written scope, source suitability
            and capacity.
          </p>
        </LegalPage>
      );
    default:
      notFound();
  }
}
