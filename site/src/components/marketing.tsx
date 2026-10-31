"use client";
import Link from "./marketing-link";
import { InquiryForm } from "./inquiry-form";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Search,
  Scissors,
  Send,
  ClipboardCheck,
  TrendingUp,
  BookOpen,
  MessagesSquare,
} from "lucide-react";
import { LinkButton } from "./ui";
import { CaseCards } from "./case-studies";
import { PublicShell } from "./public-shell";
import { DigitalType } from "./digital-type";
import { clipperCampaigns } from "@/lib/clipper-campaigns";
const WHOP_JOIN_URL = "https://whop.com/channelscale/products/noia-media-3/";
const faq = [
  [
    "What’s the difference between managed content and a clipping campaign?",
    "Managed content is selected, edited and published on your agreed accounts. A clipping campaign is a separate scope in which participating creators make and post clips on their own or campaign-specific pages. The campaign brief, funding and review process are agreed before launch.",
  ],
  [
    "What does 60 clips actually mean?",
    "Sixty unique finished edits each month. Posting the same edit in multiple places still counts as one clip. Any adaptations and additional scope are agreed before work starts.",
  ],
  [
    "Do you handle publishing?",
    "Yes. We publish approved clips on the agreed client-owned accounts and check the placements. You retain control of your accounts. The calendar, access and approval process are agreed during onboarding.",
  ],
  [
    "What footage do you need?",
    "Interviews, podcasts, lessons, demonstrations and other recordings with something useful to say. We review source quality and usable moments before agreeing the scope. Filming and original-script production require a separate proposal.",
  ],
  [
    "What does it cost?",
    "We quote around your footage, goals and operating needs. For a clipping campaign, the creator budget and management scope are discussed separately. Scope, fees and timing are agreed before payment.",
  ],
  [
    "Do you guarantee views or sales?",
    "We commit to the agreed deliverables and operating process. We do not promise a specific view count, leads or sales. We review the available performance signals to improve the next batch.",
  ],
  [
    "How do I join as a clipper?",
    "Visit For clippers to join our free Whop community. The Opportunities section is where we share available briefs; joining does not guarantee work or earnings.",
  ],
];
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span />
      {children}
    </div>
  );
}
function Process() {
  const steps = [
    { icon: Search, title: "Find the moments", text: "We select moments that stand on their own." },
    { icon: Scissors, title: "Make the clips", text: "We edit, caption and share clips for your approval." },
    { icon: Send, title: "Publish", text: "Approved clips go out on your agreed accounts." },
    { icon: TrendingUp, title: "Keep improving", text: "We use performance signals to guide the next batch." },
  ];
  return (
    <section className="public-section" id="process">
      <div className="section-heading">
        <div>
          <Label>Managed content · the process</Label>
          <h2>
            You bring the footage.
            <br />
            We keep it moving.
          </h2>
        </div>
      </div>
      <div className="process-grid">
        {steps.map(({ icon: Icon, title, text }) => (
          <article key={title}>
            <span className="process-icon"><Icon size={24} aria-hidden="true" /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
function FAQ() {
  return (
    <div className="faq-list">
      {faq.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <ChevronDown size={18} />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
function CTA() {
  return (
    <section className="public-cta">
      <Label>Your next step</Label>
      <h2>Let’s put your content to work.</h2>
      <p>
        Tell us what you’re making and how you want it to reach people.
        <br />
        We’ll see whether there’s a good fit.
      </p>
      <LinkButton href="/apply">Discuss your goals</LinkButton>
      <small>A conversation first. A clear scope before you commit.</small>
    </section>
  );
}
function Handoff() {
  const rows = [
    ["Source & direction", "Authorized recordings, audience context and accurate business claims.", "Source review, clip selection and a shared voice and style brief."],
    ["Editing & approvals", "One approval owner and consolidated feedback within agreed review windows.", "60 original edits per month, captions, quality checks and scoped revisions."],
    ["Publishing & learning", "Access to your agreed accounts and approval to publish.", "Publishing on your accounts, live-post checks and next-batch recommendations."],
  ];
  return (
    <section className="public-section handoff-section">
      <Label>Managed content · a clear handoff</Label>
      <h2>What you bring. What we take on.</h2>
      <div className="handoff-table" role="table" aria-label="Client and ChannelScale responsibilities">
        <div className="handoff-row handoff-header" role="row"><span role="columnheader">Stage</span><span role="columnheader">You bring</span><span role="columnheader">We manage</span></div>
        {rows.map(([stage, you, us]) => <div className="handoff-row" role="row" key={stage}><strong role="rowheader">{stage}</strong><p role="cell"><b className="mobile-cell-label">You bring</b>{you}</p><p role="cell"><b className="mobile-cell-label">We manage</b>{us}</p></div>)}
      </div>
      <p className="scope-note">60 clips means 60 unique edits. Posting the same edit in multiple places still counts as one clip. Your proposal defines the source allowance, accounts, review windows and calendar.</p>
      <p className="scope-note">Filming, full episodes, original scripts, heavy motion design and thumbnails require a separate scope. Clipping campaigns are scoped separately from managed content on your accounts.</p>
    </section>
  );
}
function ServiceOptions() {
  return (
    <section className="public-section service-options" id="services">
      <div className="section-heading">
        <div>
          <h2>Where should your clips go?</h2>
        </div>
      </div>
      <div className="service-option-grid">
        <article className="service-option">
          <div className="service-option-main">
            <span className="service-option-kicker">Your accounts</span>
            <h3>Managed content</h3>
            <p className="service-option-description">We clip your footage and publish approved content to your accounts.</p>
            <img className="service-option-art" src="/service-visuals/managed-content.webp" width="1254" height="1254" alt="" aria-hidden="true" decoding="async" />
          </div>
          <Link href="/apply?interest=managed" className="service-option-link">Discuss managed content <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </article>
        <article className="service-option campaign-option">
          <div className="service-option-main">
            <span className="service-option-kicker">Creator distribution</span>
            <h3>Clipping campaigns</h3>
            <p className="service-option-description">Independent clippers create and share your content on their own or campaign pages.</p>
            <img className="service-option-art" src="/service-visuals/clipping-campaigns.webp" width="1254" height="1254" alt="" aria-hidden="true" decoding="async" />
          </div>
          <p className="service-option-note">Creator budget & management scoped separately.</p>
          <Link href="/apply?interest=campaign" className="service-option-link">Discuss a campaign <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </article>
      </div>
    </section>
  );
}
function AudienceChoices() {
  return (
    <div className="audience-choices" aria-label="Choose your path">
      <a className="audience-choice" href="#services">
        <span>For brands & creators</span>
        <strong>Get clipping services</strong>
        <img className="audience-choice-art" src="/service-visuals/audience-brands.webp" width="512" height="512" alt="" aria-hidden="true" decoding="async" />
        <span className="choice-arrow" aria-hidden="true"><ArrowRight size={22} /></span>
      </a>
      <Link className="audience-choice" href="/clippers">
        <span>For clippers</span>
        <strong>Join the community</strong>
        <img className="audience-choice-art" src="/service-visuals/audience-clippers.webp" width="512" height="512" alt="" aria-hidden="true" decoding="async" />
        <span className="choice-arrow" aria-hidden="true"><ArrowRight size={22} /></span>
      </Link>
    </div>
  );
}
export function Home() {
  return (
    <PublicShell>
      <div className="homepage">
      <section className="hero">
        <h1>
          Grow your channels.
          <br />
          <span>
            <DigitalType>Reach beyond them.</DigitalType>
          </span>
        </h1>
        <p>
          Short-form content for your channels. Clipping campaigns powered by creators.
        </p>
        <AudienceChoices />
      </section>
      <ServiceOptions />
      <CaseCards />
      <section className="home-cta">
        <h2>Let’s talk about your content.</h2>
        <div className="home-cta-actions">
          <LinkButton href="/apply">Discuss your goals</LinkButton>
        </div>
      </section>
      </div>
    </PublicShell>
  );
}
export function OfferPage() {
  const services = [
    {
      icon: Scissors,
      title: "Editorial selection & editing",
      text: "We find self-contained moments, preserve the point and package them with clear openings, captions and your agreed style.",
    },
    {
      icon: ClipboardCheck,
      title: "An approval process that moves",
      text: "Batch delivery, one approval owner and consolidated feedback. Review windows and revision scope are agreed up front.",
    },
    {
      icon: Send,
      title: "Distribution on your accounts",
      text: "Approved clips published to the platforms we agree, with the right account access and live-posting checks.",
    },
    {
      icon: TrendingUp,
      title: "A useful feedback loop",
      text: "Review the available signals, identify themes worth repeating and give you direction for the next recording.",
    },
  ];
  return (
    <PublicShell>
      <div className="subpage-intro">
        <Label>For brands & creators</Label>
        <h1>
          Your content.
          <br />
          <span>More ways to reach people.</span>
        </h1>
        <p>
          Managed content for the accounts you own, or a separately scoped clipping campaign with independent creators. We’ll find the right fit for your goals.
        </p>
        <LinkButton href="/apply">Discuss your goals</LinkButton>
      </div>
      <ServiceOptions />
      <section className="public-section managed-intro">
        <Label>Managed content</Label>
        <h2>Everything that keeps<br />your content moving.</h2>
        <p>For your own accounts, we manage the work from source selection to publishing and learning.</p>
      </section>
      <section className="public-section service-grid">
        {services.map(({ icon: Icon, title, text }) => (
          <article className="panel" key={title}>
            <Icon className="blue" size={25} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <Handoff />
      <section className="public-section campaign-explainer" id="campaigns">
        <div>
          <Label>Clipping campaigns</Label>
          <h2>A wider path for<br />your content.</h2>
        </div>
        <div>
          <p>For a suitable project, we can scope a separate campaign around approved footage, with independent creators making and posting clips to their own or campaign-specific pages.</p>
          <p>We’ll talk through the brief, creator eligibility, review, budget and reporting before anything launches. A campaign can stand alone or complement the content on your own accounts.</p>
          <LinkButton href="/apply?interest=campaign">Discuss a campaign</LinkButton>
        </div>
      </section>
      <Process />
      <section className="public-section faq-section">
        <div>
          <Label>Clear expectations</Label>
          <h2>The details matter.</h2>
        </div>
        <FAQ />
      </section>
      <CTA />
    </PublicShell>
  );
}
export function ClippersPage() {
  return (
    <PublicShell>
      <div className="subpage-intro clipper-intro">
        <Label>For clippers</Label>
        <h1>Make clips.<br /><span>Find your people.</span></h1>
        <p>Join the ChannelScale community on Whop for short-form editors and creator-page operators. Find guidance, ask questions, and explore opportunities as they become available.</p>
        <div className="clipper-actions">
          <a className="button" href={WHOP_JOIN_URL}>Join free on Whop <ArrowUpRight size={16} /></a>
          <a className="button secondary" href="#opportunities">See opportunities <ArrowRight size={16} /></a>
        </div>
        <small>Free to join. Opportunities are shared as they open.</small>
      </div>
      <section className="public-section clipper-community">
        <div className="section-heading">
          <div><Label>Inside the community</Label><h2>Start here. Make good work.<br />Keep getting better.</h2></div>
          <p>A home for editors and creators who care about making thoughtful short-form content.</p>
        </div>
        <div className="clipper-community-grid">
          <article><BookOpen size={22} /><h3>Start Here</h3><p>Learn how the community works and what to look for in a brief.</p></article>
          <article><ClipboardCheck size={22} /><h3>Opportunities</h3><p>Find campaign and editing opportunities when they’re available, with the details for each one.</p></article>
          <article><MessagesSquare size={22} /><h3>General chat</h3><p>Ask questions and connect with the community.</p></article>
        </div>
      </section>
      <section className="public-section clipper-opportunities" id="opportunities">
        <div>
          <Label>Campaigns & opportunities</Label>
          <h2>Find your next<br />opportunity.</h2>
        </div>
        <div>
          <div className="campaign-listing">
            <span>Active campaigns</span>
            {clipperCampaigns.length ? clipperCampaigns.map((campaign) => (
              <article key={campaign.url}>
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                <a className="service-option-link" href={campaign.url}>View campaign <ArrowUpRight size={15} /></a>
              </article>
            )) : <p>No campaigns are listed on this page yet.</p>}
          </div>
          <p>Check the Opportunities section in our Whop community for the latest campaign briefs and assignments.</p>
          <p>Read each brief for its eligibility, content rules and payment terms before you participate. Joining the community does not guarantee work or earnings.</p>
          <a className="button" href={WHOP_JOIN_URL}>Go to the Whop community <ArrowUpRight size={16} /></a>
        </div>
      </section>
      <section className="clipper-brand-link">
        <p>Looking for someone to clip your content?</p>
        <Link href="/offer">Explore services for brands and creators <ArrowRight size={16} /></Link>
      </section>
    </PublicShell>
  );
}
export function FAQPage() {
  return (
    <PublicShell>
      <div className="subpage-intro">
        <Label>FAQs</Label>
        <h1>
          Good questions.
          <br />
          <span>Clear answers.</span>
        </h1>
      </div>
      <section className="public-section faq-standalone">
        <FAQ />
      </section>
      <CTA />
    </PublicShell>
  );
}
export function ApplyPage() {
  return (
    <PublicShell>
      <section className="application-layout public-section">
        <div className="apply-intro">
          <Label>Let’s find the fit</Label>
          <h1>Your footage.<br /><span>A clear next step.</span></h1>
          <p>Tell us what you’re making and where you want it to go. We’ll discuss a managed content scope, a clipping campaign, or both.</p>
          <ol className="apply-steps">
            <li>Share your content and goals</li>
            <li>Talk through the fit</li>
            <li>Agree the scope, fee and calendar</li>
          </ol>
          <p className="scope-note">No commitment from an inquiry. Custom pricing after source review.</p>
        </div>
        <InquiryForm />
      </section>
    </PublicShell>
  );
}
export function LegalPage({
  kind,
  children,
}: {
  kind: string;
  children: React.ReactNode;
}) {
  return (
    <PublicShell>
      <section className="legal public-section">
        <Label>ChannelScale</Label>
        <h1>{kind}</h1>
        {children}
      </section>
    </PublicShell>
  );
}
