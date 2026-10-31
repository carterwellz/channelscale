"use client";
import Link from "./marketing-link";
import type { ReactNode } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { PublicShell } from "./public-shell";
import { LinkButton } from "./ui";
import {
  bibleResults,
  ownerReportedViews,
  bowmarResults,
  bowmarVideos,
  compact,
  caseAccounts,
  type CaseAccount,
  type CounterpointProof,
} from "@/lib/case-studies";
import { socialProof, type SocialProof } from "@/lib/social-proof";
const cases = [
  {
    slug: "bible-alive",
    title: "Bible Alive",
    category: "Clipping & channel operations",
    context: "Built from launch: editorial selection, short-form editing and ongoing channel operations.",
    headline: compact(bibleResults.youtubeViews),
    metric: "Recorded YouTube views",
    secondary: "585K YouTube subscribers",
    accounts: caseAccounts.bible,
  },
  {
    slug: "counterpoint",
    title: "Counterpoint",
    category: "Full production & clipping",
    context: "Long-form debates supported by production, editing and short-form repurposing.",
    headline: "1.88M",
    metric: "Recorded YouTube watch hours",
    secondary: "8.82M lifetime YouTube views",
    accounts: caseAccounts.counterpoint,
  },
  {
    slug: "bowmar-bowhunting",
    title: "Bowmar Bowhunting",
    category: "YouTube editing",
    context: "Short-form and long-form editing that keeps the story clear and the action moving.",
    headline: "~270M",
    metric: "Estimated views across our edits",
    secondary: "Short-form & long-form editing",
    accounts: caseAccounts.bowmar,
  },
];
function PlatformIcon({ platform }: { platform: CaseAccount["platform"] }) {
  return (
    <img
      className={`platform-icon platform-${platform}`}
      src={`/work/${platform}.svg`}
      alt=""
      aria-hidden="true"
    />
  );
}
function AccountLinks({ accounts }: { accounts: CaseAccount[] }) {
  return (
    <div className="case-account-links">
      {accounts.map((account) => (
        <a
          key={account.url}
          href={account.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${account.handle} on ${{ youtube: "YouTube", instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook" }[account.platform]}`}
        >
          <PlatformIcon platform={account.platform} />
          {account.handle}
          <ArrowUpRight size={12} />
        </a>
      ))}
    </div>
  );
}
function CaseArtwork({ slug }: { slug: string }) {
  if (slug === "counterpoint") {
    return (
      <div className="case-card-image case-photo-artwork">
        <img
          src="/work/counterpoint.jpg"
          alt="A Counterpoint debate being recorded in the multi-camera studio"
        />
        <div className="case-photo-brand">
          <span className="case-counterpoint-mark">
            <img src="/work/counterpoint-logo.png" alt="Counterpoint logo" />
          </span>
          <span>
            <strong>COUNTERPOINT</strong>
          </span>
        </div>
        <span className="case-open">
          <ArrowUpRight size={18} />
        </span>
      </div>
    );
  }
  const bible = slug === "bible-alive";
  return (
    <div
      className={`case-card-image case-proof-artwork ${bible ? "bible-artwork" : "bowmar-artwork"}`}
    >
      <div className="proof-artwork-content">
        <div className="proof-brand">
          {bible ? (
            <>
              <img
                src="/work/bible-alive-logo.jpg"
                alt="Bible Alive channel logo"
              />
              <strong>Bible Alive</strong>
            </>
          ) : (
            <img src="/work/bowmar-logo.png" alt="Bowmar Bowhunting logo" />
          )}
        </div>
        <div className="proof-audience">
          <div>
            <strong>
              {bible
                ? caseAccounts.bible[0].audience
                : caseAccounts.bowmar[0].audience}
            </strong>
            <span>
              <PlatformIcon platform="youtube" />
              YouTube subscribers
            </span>
          </div>
          <div>
            <strong>
              {bible
                ? caseAccounts.bible[1].audience
                : caseAccounts.bowmar[1].audience}
            </strong>
            <span>
              <PlatformIcon platform="instagram" />
              Instagram followers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export function CaseCards({ full = false }: { full?: boolean }) {
  return (
    <section className="public-section case-cards-section" id="work">
      {!full && (
        <div className="section-heading">
          <div>
            <h2>Our work</h2>
          </div>
        </div>
      )}
      <div className="case-cards-grid">
        {cases.slice(0, full ? 3 : 2).map((c) => (
          <article className={`case-card case-${c.slug}`} key={c.slug}>
            <Link className="case-card-link" href={`/work/${c.slug}`}>
              <CaseArtwork slug={c.slug} />
              <div className="case-card-body">
                <span className="case-category">{c.category}</span>
                <h3>{c.title}</h3>
                <div className="case-number">
                  {c.headline}
                  <span>{c.metric}</span>
                </div>
                <p className="case-context">{c.context}</p>
                <div className="case-card-bottom">
                  <span>{c.secondary}</span>
                  <span>
                    View case study <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
            <div className="case-card-sources">
              <AccountLinks accounts={c.accounts} />
            </div>
          </article>
        ))}
      </div>
      {!full && (
        <div className="section-end">
          <Link href="/work">
            All case studies <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </section>
  );
}
export function CaseStudiesIndex() {
  return (
    <PublicShell>
      <div className="subpage-intro">
        <h1>Case studies</h1>
      </div>
      <CaseCards full />
      <CaseCTA />
    </PublicShell>
  );
}
function CaseCTA() {
  return (
    <section className="public-cta">
      <h2>Put your content to work.</h2>
      <LinkButton href="/apply">Discuss your content</LinkButton>
    </section>
  );
}
function CaseHead({
  name,
  category,
  accounts,
}: {
  name: string;
  category: string;
  accounts: CaseAccount[];
}) {
  return (
    <header className="case-results-head">
      <Link href="/work" className="text-link">
        <ArrowLeft size={14} />
        All case studies
      </Link>
      <div className="case-results-heading">
        <div>
          <span className="case-category">{category}</span>
          <h1>{name}</h1>
        </div>
      </div>
      <AccountLinks accounts={accounts} />
    </header>
  );
}
function ResultMetric({
  value,
  label,
  detail,
  primary = false,
}: {
  value: string;
  label: string;
  detail?: string;
  primary?: boolean;
}) {
  return (
    <div className={`result-metric ${primary ? "result-metric-primary" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </div>
  );
}
function PlatformBars({
  rows,
}: {
  rows: {
    account: CaseAccount;
    value: number;
    label: string;
    display?: string;
  }[];
}) {
  const maximum = Math.max(...rows.map((row) => row.value));
  return (
    <div className="result-platform-bars">
      {rows.map(({ account, value, label, display }) => (
        <div className="result-platform-row" key={account.platform}>
          <div className="result-platform-label">
            <a href={account.url} target="_blank" rel="noreferrer">
              <PlatformIcon platform={account.platform} />
              <span>{account.handle}</span>
              <ArrowUpRight size={13} />
            </a>
            <strong>
              {display || compact(value)}
              <span>{label}</span>
            </strong>
          </div>
          <div className="result-bar-track" aria-hidden="true">
            <span style={{ width: `${(value / maximum) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
function SourceDetails({ children }: { children: ReactNode }) {
  return (
    <details className="result-sources">
      <summary>View sources</summary>
      <div className="result-sources-content">{children}</div>
    </details>
  );
}
function PostSources({
  posts,
  platform,
}: {
  posts: SocialProof[];
  platform: string;
}) {
  return (
    <ul className="result-source-links">
      {posts.map((post, i) => (
        <li key={post.id}>
          <a href={post.url} target="_blank" rel="noreferrer">
            {platform} {i + 1}
            <ArrowUpRight size={12} />
          </a>
          <span>
            {post.rounded ? "~" : ""}
            {post.views.toLocaleString("en-US")} views
          </span>
        </li>
      ))}
    </ul>
  );
}
export function BibleCase() {
  return (
    <PublicShell>
      <div className="case-results">
        <CaseHead
          name="Bible Alive"
          category="Clipping & channel operations"
          accounts={caseAccounts.bible}
        />
        <section
          className="result-bible-overview"
          aria-label="Bible Alive YouTube results"
        >
          <ResultMetric
            primary
            value={compact(bibleResults.youtubeViews)}
            label="Recorded YouTube views"
            detail="Built and operated from launch"
          />
          <div className="result-from-zero">
            <h2>From zero to 585K subscribers.</h2>
            <div className="result-growth-chart">
              <div>
                <strong>0</strong>
                <span className="result-zero-bar" aria-hidden="true" />
                <small>At launch</small>
              </div>
              <ArrowRight size={22} aria-hidden="true" />
              <div>
                <strong>585K</strong>
                <span className="result-current-bar" aria-hidden="true" />
                <small>Recorded total</small>
              </div>
            </div>
          </div>
        </section>
        <section className="result-section">
          <h2>Views across platforms</h2>
          <p className="result-evidence-note">Instagram, TikTok and Facebook view totals are owner-reported. Platform totals are separate.</p>
          <PlatformBars
            rows={[
              {
                account: caseAccounts.bible[0],
                value: bibleResults.youtubeViews,
                label: "views",
              },
              {
                account: caseAccounts.bible[1],
                value: ownerReportedViews.bible.instagram,
                label: "views",
              },
              {
                account: caseAccounts.bible[2],
                value: ownerReportedViews.bible.tiktok,
                label: "views",
              },
              {
                account: caseAccounts.bible[3],
                value: ownerReportedViews.bible.facebook,
                label: "views",
              },
            ]}
          />
        </section>
        <section className="result-section">
          <h2>Audience</h2>
          <PlatformBars
            rows={[
              {
                account: caseAccounts.bible[0],
                value: bibleResults.youtubeSubscribers,
                label: "subscribers",
              },
              {
                account: caseAccounts.bible[1],
                value: bibleResults.instagramFollowers,
                label: "followers",
              },
              {
                account: caseAccounts.bible[2],
                value: bibleResults.tiktokFollowers,
                label: "followers",
              },
              {
                account: caseAccounts.bible[3],
                value: bibleResults.facebookFollowers,
                label: "followers",
              },
            ]}
          />
        </section>
        <SourceDetails>
          <p>
            <a
              href="https://www.youtube.com/@Bible_Alive/about"
              target="_blank"
              rel="noreferrer"
            >
              YouTube @Bible_Alive
            </a>
            : 342,546,591 lifetime views and 585K subscribers.{" "}
            <a
              href={caseAccounts.bible[1].url}
              target="_blank"
              rel="noreferrer"
            >
              Instagram @biblecomesalive
            </a>
            : 234K followers.
          </p>
          <p>
            Instagram views (128.7M), TikTok views (21.4M) and Facebook views
            (65.8M) are account totals provided by the owner.
          </p>
          <p>
            TikTok @BibleAlive displays 49.1K followers. Facebook
            @BibleComesAlive displays 169K. ChannelScale built the YouTube
            channel from zero and operates the Instagram page, as confirmed by
            the owner. Platform audiences are separate counts.
          </p>
        </SourceDetails>
      </div>
      <CaseCTA />
    </PublicShell>
  );
}
export function CounterpointCase({ proof }: { proof: CounterpointProof }) {
  return (
    <PublicShell>
      <div className="case-results">
        <CaseHead
          name="Counterpoint"
          category="Full production & clipping"
          accounts={caseAccounts.counterpoint}
        />
        <p className="result-evidence-note">These recorded YouTube totals reflect the full show, not a forecast for an individual client.</p>
        <section
          className="result-metric-grid"
          aria-label="Counterpoint YouTube results"
        >
          <ResultMetric
            primary
            value={compact(proof.watchHours)}
            label="YouTube watch hours"
          />
          <ResultMetric
            primary
            value={compact(proof.mainEpisodeAverage)}
            label="Average episode views"
            detail={`${proof.mainEpisodes} public main episodes`}
          />
          <ResultMetric
            value={compact(proof.views)}
            label="Lifetime YouTube views"
          />
          <ResultMetric
            value={proof.averageDuration}
            label="Average view duration"
            detail="Minutes : seconds"
          />
        </section>
        <section className="result-section">
          <h2>Views across platforms</h2>
          <p className="result-evidence-note">Instagram and TikTok view totals are owner-reported.</p>
          <PlatformBars
            rows={[
              {
                account: caseAccounts.counterpoint[0],
                value: proof.views,
                label: "lifetime views",
              },
              {
                account: caseAccounts.counterpoint[1],
                value: ownerReportedViews.counterpoint.instagram,
                label: "views",
              },
              {
                account: caseAccounts.counterpoint[2],
                value: ownerReportedViews.counterpoint.tiktok,
                label: "views",
              },
            ]}
          />
        </section>
        <SourceDetails>
          <p>
            <a
              href="https://counterpoint.show/sponsor"
              target="_blank"
              rel="noreferrer"
            >
              Counterpoint's live audience data
            </a>
            . Recorded YouTube figures are based on the linked audience data.
            Average episode views includes public main episodes at least 20
            minutes long, excluding Part 2 and members-only uploads.
          </p>
          <p>
            Instagram views (16.1M) and TikTok views (5.6M) are account totals
            provided by the owner. The links below are selected examples with
            public counts. Instagram includes a Counterpoint clip published by
            @thelastguerilla.
          </p>
          <PostSources
            posts={socialProof.counterpointInstagram}
            platform="Instagram Reel"
          />
          <PostSources
            posts={socialProof.counterpointTikTok}
            platform="TikTok post"
          />
        </SourceDetails>
      </div>
      <CaseCTA />
    </PublicShell>
  );
}
export function BowmarCase() {
  const total = bowmarResults.youtubeViews + bowmarResults.otherViewsEstimate;
  return (
    <PublicShell>
      <div className="case-results">
        <CaseHead
          name="Bowmar Bowhunting"
          category="YouTube editing"
          accounts={caseAccounts.bowmar}
        />
        <section
          className="result-bowmar-overview"
          aria-label="Views across Bowmar edits"
        >
          <ResultMetric
            primary
            value="~270M"
            label="Estimated views across our edits"
          />
          <div className="result-view-breakdown">
            <div className="result-stacked-bar" aria-hidden="true">
              <span
                style={{
                  width: `${(bowmarResults.youtubeViews / total) * 100}%`,
                }}
              />
              <span
                style={{
                  width: `${(bowmarResults.otherViewsEstimate / total) * 100}%`,
                }}
              />
            </div>
            <div className="result-breakdown-legend">
              <div>
                <span className="result-legend-dot" />
                <strong>{compact(bowmarResults.youtubeViews)}</strong>
                <span>YouTube · 3 Shorts</span>
              </div>
              <div>
                <span className="result-legend-dot result-legend-estimate" />
                <strong>20M</strong>
                <span>Other edits · owner estimate</span>
              </div>
            </div>
          </div>
        </section>
        <section className="result-section">
          <div className="result-section-heading">
            <h2>Earlier & later uploads</h2>
            <span>Long-form video views</span>
          </div>
          <p className="result-evidence-note">Each pair compares different videos. Topic, audience and publishing conditions also affect results.</p>
          <div className="result-comparisons">
            {[
              { before: 30000, after: 573000 },
              { before: 42000, after: 569000 },
              { before: 16000, after: 178000 },
            ].map((pair, i) => (
              <div className="result-comparison" key={i}>
                <div>
                  <span>Earlier upload</span>
                  <strong>{compact(pair.before)}</strong>
                  <div className="result-bar-track" aria-hidden="true">
                    <span
                      style={{ width: `${(pair.before / 573000) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <span>Later upload</span>
                  <strong>{compact(pair.after)}</strong>
                  <div className="result-bar-track" aria-hidden="true">
                    <span
                      style={{ width: `${(pair.after / 573000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <SourceDetails>
          <p>
            The three linked YouTube Shorts total{" "}
            {bowmarResults.youtubeViews.toLocaleString("en-US")} views. Editing
            credit confirmed by ChannelScale’s owner. The additional 20M views across other
            edits is the owner’s estimate, bringing the combined estimate to
            roughly 270M.
          </p>
          <ul className="result-source-links">
            {bowmarVideos.map((video) => (
              <li key={video.id}>
                <a
                  href={`https://www.youtube.com/shorts/${video.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {video.title}
                  <ArrowUpRight size={12} />
                </a>
                <span>{video.views.toLocaleString("en-US")} views</span>
              </li>
            ))}
          </ul>
          <p>
            The long-form comparisons use earlier and later uploads from the
            saved channel portfolio: 30K / 573K, 42K / 569K and 16K / 178K. Each
            pair compares different uploads.
          </p>
        </SourceDetails>
      </div>
      <CaseCTA />
    </PublicShell>
  );
}
