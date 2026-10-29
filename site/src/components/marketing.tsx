"use client";
import Link from "./marketing-link";
import { InquiryForm } from "./inquiry-form";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Scissors,
  Send,
  ClipboardCheck,
  TrendingUp,
  UsersRound,
  BookOpen,
  MessagesSquare,
} from "lucide-react";
import { LinkButton } from "./ui";
import { CaseCards } from "./case-studies";
import { PublicShell } from "./public-shell";
import { DigitalType } from "./digital-type";
const WHOP_JOIN_URL = "https://whop.com/channelscale/products/noia-media-3/";
const faq = [
  [
    "What’s the difference between managed content and a clipping campaign?",
    "Managed content is selected, edited and published on your agreed accounts. A clipping campaign is a separate scope in which participating creators make and post clips on their own or campaign-specific pages. The campaign brief, funding and review process are agreed before launch.",
  ],
  [
    "What does 60 clips actually mean?",
    "Sixty unique finished edits each month. Posting the same edit on four platforms creates four placements; it still counts as one clip. Platform adaptations and any additional scope are agreed before work starts.",
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
    "Can we start smaller?",
    "Yes. A scoped paid pilot can test the editorial approach, working relationship and publishing process before an ongoing engagement. We agree its output and dates after reviewing your material.",
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
    [
      "01",
      "We find the moments",
      "We review your footage and select ideas that make sense beyond the original recording.",
    ],
    [
      "02",
      "We make the clips",
      "Thoughtful cuts, faithful hooks, clear captions and a consistent style. You approve in batches.",
    ],
    [
      "03",
      "We get them out",
      "We publish the approved versions across your agreed accounts and verify the posts.",
    ],
    [
      "04",
      "We make the next batch better",
      "We review what held attention and turn the learning into better selections and recording prompts.",
    ],
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
        <p>
          A clear handoff. One accountable lead.
          <br />A repeatable rhythm every month.
        </p>
      </div>
      <div className="process-grid">
        {steps.map(([num, title, text]) => (
          <article key={num}>
            <span className="step-number">{num}</span>
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
function Pilot() {
  return (
    <section className="public-section pilot-section" id="pilot">
      <div>
        <Label>Managed content · start with a paid pilot</Label>
        <h2>Find the rhythm.<br />Then build on it.</h2>
        <p>Test the editorial approach, approvals and publishing process with a smaller, defined scope before an ongoing engagement.</p>
        <LinkButton href="/apply?interest=pilot">Discuss a pilot</LinkButton>
      </div>
      <ol className="pilot-steps">
        <li><span>01</span><div><h3>Review your footage</h3><p>We check source quality, usable moments and the audience you want to reach.</p></div></li>
        <li><span>02</span><div><h3>Agree the pilot</h3><p>Clip count, platforms, revisions, fee and delivery dates are set before payment.</p></div></li>
        <li><span>03</span><div><h3>Review the work together</h3><p>Use the delivered clips and working experience to decide the next step.</p></div></li>
      </ol>
    </section>
  );
}
function Handoff() {
  const rows = [
    ["Source & direction", "Authorized recordings, audience context and accurate business claims.", "Source review, clip selection and a shared voice and style brief."],
    ["Editing & approvals", "One approval owner and consolidated feedback within agreed review windows.", "60 original edits per month, captions, quality checks and scoped revisions."],
    ["Publishing & learning", "Access to your agreed accounts and approval to publish.", "Publishing across 4+ platforms, live-post checks and next-batch recommendations."],
  ];
  return (
    <section className="public-section handoff-section">
      <Label>Managed content · a clear handoff</Label>
      <h2>What you bring. What we take on.</h2>
      <div className="handoff-table" role="table" aria-label="Client and ChannelScale responsibilities">
        <div className="handoff-row handoff-header" role="row"><span role="columnheader">Stage</span><span role="columnheader">You bring</span><span role="columnheader">We manage</span></div>
        {rows.map(([stage, you, us]) => <div className="handoff-row" role="row" key={stage}><strong role="rowheader">{stage}</strong><p role="cell"><b className="mobile-cell-label">You bring</b>{you}</p><p role="cell"><b className="mobile-cell-label">We manage</b>{us}</p></div>)}
      </div>
      <p className="scope-note">60 clips means 60 unique edits. The same clip on four platforms is four placements, not four clips. Your proposal defines the source allowance, accounts, review windows and calendar.</p>
      <p className="scope-note">Filming, full episodes, original scripts, heavy motion design and thumbnails require a separate scope. Clipping campaigns are scoped separately from managed content on your accounts.</p>
    </section>
  );
}
function ServiceOptions() {
  return (
    <section className="public-section service-options" id="services">
      <div className="section-heading">
        <div>
          <Label>For brands & creators</Label>
          <h2>Two ways to put your<br />content to work.</h2>
        </div>
        <p>Build your own channels, explore a wider campaign, or talk to us about both.</p>
      </div>
      <div className="service-option-grid">
        <article className="service-option">
          <div className="service-option-icon"><Scissors size={21} /></div>
          <span className="service-option-kicker">Your accounts</span>
          <h3>Managed content</h3>
          <p>We find the moments, make the clips and publish approved content on the accounts you control.</p>
          <ul>
            <li><Check size={16} /> 60 original clips each month</li>
            <li><Check size={16} /> Publishing across 4+ agreed platforms</li>
            <li><Check size={16} /> Editing, approvals and ongoing review</li>
          </ul>
          <Link href="/apply?interest=managed" className="service-option-link">Discuss managed content <ArrowRight size={16} /></Link>
        </article>
        <article className="service-option campaign-option">
          <div className="service-option-icon"><UsersRound size={21} /></div>
          <span className="service-option-kicker">Creator distribution</span>
          <h3>Clipping campaigns</h3>
          <p>Plan a campaign where independent clippers create and share your content on their own or campaign-specific pages.</p>
          <ul>
            <li><Check size={16} /> A brief built around your content and goals</li>
            <li><Check size={16} /> Creator budget and management scoped separately</li>
            <li><Check size={16} /> Review and reporting agreed before launch</li>
          </ul>
          <Link href="/apply?interest=campaign" className="service-option-link">Discuss a campaign <ArrowRight size={16} /></Link>
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
        <strong>I need clipping services</strong>
        <small>Explore content and campaigns <ArrowRight size={15} /></small>
      </a>
      <Link className="audience-choice" href="/clippers">
        <span>For clippers</span>
        <strong>I want to clip</strong>
        <small>Join the community <ArrowRight size={15} /></small>
      </Link>
    </div>
  );
}
export function Home() {
  return (
    <PublicShell>
      <section className="hero">
        <Label>Short-form content & distribution</Label>
        <h1>
          Grow your channels.
          <br />
          <span>
            <DigitalType>Reach beyond them.</DigitalType>
          </span>
        </h1>
        <p>
          We turn your content into short-form videos for your own accounts and help plan clipping campaigns where independent creators share it on their pages.
        </p>
        <AudienceChoices />
      </section>
      <div className="platform-line">
        <span>Made for the places people watch.</span>
        <strong>YouTube</strong>
        <strong>Instagram</strong>
        <strong>TikTok</strong>
        <strong>Facebook</strong>
      </div>
      <ServiceOptions />
      <CaseCards />
      <section className="public-section fit-section">
        <div>
          <Label>A good fit</Label>
          <h2>You have the substance.<br />We build the publishing rhythm.</h2>
        </div>
        <div>
          <p>For businesses and personalities with useful recordings and too little time to turn them into consistent content.</p>
          <ul className="fit-list">
            <li><Check size={18} /> Interviews, podcasts, lessons or demonstrations</li>
            <li><Check size={18} /> A clear audience and a message worth sharing</li>
            <li><Check size={18} /> One person to review and approve each batch</li>
          </ul>
          <p className="scope-note">Need filming or full-episode production too? We’ll scope that separately.</p>
        </div>
      </section>
      <Process />
      <Pilot />
      <section className="public-section faq-section">
        <div>
          <Label>FAQs</Label>
          <h2>Common questions.</h2>
          <p>
            Good working relationships start
            <br />
            with clear expectations.
          </p>
        </div>
        <FAQ />
      </section>
      <CTA />
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
      <Pilot />
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
          <h2>Find the latest<br />briefs in Whop.</h2>
        </div>
        <div>
          <p>Open ChannelScale’s Opportunities section in the community to check for active campaigns and assignments. If there isn’t a listing right now, check back as new opportunities are posted.</p>
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
export function AboutPage() {
  return (
    <PublicShell>
      <section className="about-layout public-section">
        <div>
          <Label>About ChannelScale</Label>
          <h1>
            Built by someone
            <br />
            <span>who does the work.</span>
          </h1>
          <p>
            ChannelScale brings production experience and editorial judgment to
            the part of content that often gets left behind: turning useful
            recordings into a consistent publishing and distribution plan.
          </p>
          <p>
            I’m Carter. My work spans production, editing, technical operations
            and repurposing. The goal here is straightforward: give your content
            a reliable home, a clear owner and a reason to keep getting better.
          </p>
          <p>
            We start with your footage and your business. Then we build the
            rhythm around it.
          </p>
          <LinkButton href="/apply">Talk with Carter</LinkButton>
        </div>
        <img src="/work/carter.jpeg" alt="Carter, founder of ChannelScale" />
      </section>
      <CaseCards />
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
            <li><span>01</span>Share your content and goals</li>
            <li><span>02</span>Talk through the fit with Carter</li>
            <li><span>03</span>Agree the scope, fee and calendar</li>
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
