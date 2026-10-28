"use client";
import Link from "./marketing-link";
import { InquiryForm } from "./inquiry-form";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  X,
  Scissors,
  Send,
  SlidersHorizontal,
  Play,
  Layers,
  MessageSquare,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";
import { Brand, LinkButton, Button, Badge } from "./ui";
import { CaseCards } from "./case-studies";
import { PublicShell } from "./public-shell";
import { DigitalType } from "./digital-type";
const faq = [
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
    "We quote around your footage, editing requirements, platforms and operating needs. The scope, fee, approval windows and delivery calendar are agreed before payment.",
  ],
  [
    "Do you guarantee views or sales?",
    "We commit to the agreed deliverables and operating process. We do not promise a specific view count, leads or sales. We review the available performance signals to improve the next batch.",
  ],
  [
    "Can we start smaller?",
    "Yes. A scoped paid pilot can test the editorial approach, working relationship and publishing process before an ongoing engagement. We agree its output and dates after reviewing your material.",
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
          <Label>The process</Label>
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
      <h2>Let’s put your footage to work.</h2>
      <p>
        Tell us what you’re making and where you want it to go.
        <br />
        We’ll see whether there’s a good fit.
      </p>
      <LinkButton href="/apply">Discuss your content</LinkButton>
      <small>A conversation first. A clear scope before you commit.</small>
    </section>
  );
}
function Pilot() {
  return (
    <section className="public-section pilot-section" id="pilot">
      <div>
        <Label>Start with a paid pilot</Label>
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
      <Label>A clear handoff</Label>
      <h2>What you bring. What we take on.</h2>
      <div className="handoff-table" role="table" aria-label="Client and ChannelScale responsibilities">
        <div className="handoff-row handoff-header" role="row"><span role="columnheader">Stage</span><span role="columnheader">You bring</span><span role="columnheader">We manage</span></div>
        {rows.map(([stage, you, us]) => <div className="handoff-row" role="row" key={stage}><strong role="rowheader">{stage}</strong><p role="cell"><b className="mobile-cell-label">You bring</b>{you}</p><p role="cell"><b className="mobile-cell-label">We manage</b>{us}</p></div>)}
      </div>
      <p className="scope-note">60 clips means 60 unique edits. The same clip on four platforms is four placements, not four clips. Your proposal defines the source allowance, accounts, review windows and calendar.</p>
      <p className="scope-note">Filming, full episodes, original scripts, heavy motion design, thumbnails and independent creator campaigns require a separate scope.</p>
    </section>
  );
}
export function Home() {
  return (
    <PublicShell>
      <section className="hero">
        <Label>For founders, experts & brands</Label>
        <h1>
          Turn your footage
          <br />
          <span>
            into <DigitalType>daily content</DigitalType>.
          </span>
        </h1>
        <p>
          Your interviews, lessons and podcasts become 60 original clips a month.
          We manage selection, editing, approvals and publishing across 4+ agreed platforms.
        </p>
        <div className="hero-actions">
          <LinkButton href="/apply">Discuss your content</LinkButton>
          <LinkButton href="/work" secondary>
            See the work
          </LinkButton>
        </div>
        <small className="hero-reassurance">Your accounts. Your voice. One accountable team.</small>
        <div className="offer-strip">
          <div>
            <strong>60</strong>
            <span>original clips / month</span>
          </div>
          <div>
            <strong>4+</strong>
            <span>agreed platforms</span>
          </div>
          <div>
            <ClipboardCheck size={25} />
            <span>Selection to publishing</span>
          </div>
          <div>
            <MessageSquare size={25} />
            <span>One accountable lead</span>
          </div>
        </div>
      </section>
      <div className="platform-line">
        <span>Your accounts. A consistent presence.</span>
        <strong>YouTube</strong>
        <strong>Instagram</strong>
        <strong>TikTok</strong>
        <strong>Facebook</strong>
      </div>
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
      <section className="offer-feature public-section">
        <div>
          <Label>The monthly operation</Label>
          <h2>
            60 clips a month.
            <br />
            Managed from
            <br />
            start to finish.
          </h2>
          <p>
            Original edits for the audience you want to reach.
            <br />A managed workflow around every one.
          </p>
          <LinkButton href="/offer">Explore the offer</LinkButton>
        </div>
        <div className="scope-card">
          <div className="scope-card-top">
            <Layers size={22} />
            <span>Built around your content</span>
            <Badge tone="blue">Custom quote</Badge>
          </div>
          <h3>
            60 original clips.
            <br />
            <span>4+ agreed platforms.</span>
          </h3>
          <ul>
            {[
              "Audience, offer and voice brief",
              "Source review and clip selection",
              "Editing, captions and internal quality review",
              "Batch approvals and agreed revisions",
              "Publishing on your accounts",
              "Performance review and next-batch direction",
            ].map((t) => (
              <li key={t}>
                <Check size={17} />
                {t}
              </li>
            ))}
          </ul>
          <div className="scope-foot">
            Scope, source allowance and delivery dates agreed before payment.
          </div>
        </div>
      </section>
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
        <Label>The offer</Label>
        <h1>
          Daily content.
          <br />
          <span>Without a daily handoff.</span>
        </h1>
        <p>
          60 unique clips each month. Publishing across 4+ agreed
          platforms.
          <br />
          One team accountable for keeping the operation moving.
        </p>
        <LinkButton href="/apply">Discuss your content</LinkButton>
      </div>
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
            recordings into a consistent publishing operation.
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
          <p>Share what you’re making and what’s getting in the way. We’ll review it before recommending a monthly scope or paid pilot.</p>
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
