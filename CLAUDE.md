# CLAUDE.md

## Current public deployment (October 2026)

The approved white-and-blue marketing site lives in `site/`, with a Next.js static export served by Cloudflare Worker `channelscale-yt`. Read `DEPLOYMENT.md` for the build, inquiry contract, verification and rollback. `site/` is the current public source of truth. `redesign/` is the private local workspace and is deliberately excluded from the public repository; its marketing snapshot may be older. The allowlisted `scripts/sync-marketing.mjs` overwrites public files from that snapshot, so use it only for deliberate reconciliation after inspecting both versions. Never publish its database, environment files, client uploads or private routes.

The current site presents managed content on client-owned accounts (60 unique clips per month across 4+ agreed platforms, custom pricing, and an optional scoped paid pilot) alongside separately scoped creator clipping campaigns. Its clipper path leads to the free Whop community, with opportunities listed there as available. Do not claim that campaign capacity, participation, results, or active listings are verified without evidence. The historical root `index.html` and documentation below describe the previous site and are retained for reference; they are not the deployment source.


This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChannelScale is a **single-page React application** serving as a marketing website for a done-for-you podcast production service ("Record once. Show up everywhere."). The entire application is a single `index.html` file — no build process, no package.json, no Node.js dependencies.

**Tech Stack:**
- React 18 (via CDN, unpkg)
- Tailwind CSS (via CDN with inline custom theme)
- GSAP 3.12.5 + ScrollTrigger for animations
- Babel Standalone for in-browser JSX compilation
- Lucide Icons (`lucide.createIcons()` on each page mount)
- n8n webhook for form submissions

## Running the Application

Open `index.html` directly in a browser. No server required, but a local server avoids CORS issues:

```bash
python -m http.server 8000
# visit http://localhost:8000
```

There is no build step, lint command, or test suite.

## Architecture

All app code lives in one `<script type="text/babel">` block at the bottom of `index.html`. Babel standalone compiles it in the browser at runtime, so React mounts only after compilation finishes.

> **Performance note:** `@babel/standalone` (~2.5MB) compiles the JSX on every page load and is the main cause of a slow first paint. Precompiling the JSX would fix it but adds a build step.

All React components are defined as plain functions in the Babel block — no imports, no modules.

### Routing

Client-side routing via React state (`currentPage`). The `App` component renders the active page based on this string:

| `currentPage` value | Renders |
|---|---|
| `'home'` | `HeroSection` + `StatsSection` + `OfferSection` + `ResultsSection` + `ProcessSection` + `HomeFAQSection` + `StrategicIntakeSection` + `MobileApplyBar` |
| `'work'` | `WorkPage` |
| `'about'` | `AboutPage` |
| `'faq'` | `FAQPage` |
| `'services'` | `SystemConfigurationsPage` |
| `'privacy'` | `PrivacyPolicyPage` |
| `'terms'` | `TermsOfServicePage` |
| `'disclaimer'` | `DisclaimerPage` |

`'services'` → `SystemConfigurationsPage` is the **`else` fallback** in the render chain, not an explicit `currentPage === 'services'` check — any unrecognized value lands there. Nav label for this page is `Offer`.

All navigation calls `setCurrentPage()` + `window.scrollTo(0, 0)`.

### `navigateToForm` helper

Defined in `App`, passed as a prop to `NavBar` and all page components. Navigates home then smooth-scrolls to `#intake-form`. Use this for any "Apply" / CTA button — do not call `setCurrentPage('home')` alone.

### Icon initialization

Lucide icons use the `data-lucide` attribute pattern. They must be initialized by calling `lucide.createIcons()` after each page render. This runs in `App`'s `useEffect(() => { lucide.createIcons(); }, [currentPage])`.

## Design System

**Custom Tailwind colors** (defined inline in `tailwind.config`):
- `obsidian` — `#0A0A0B` (backgrounds)
- `signal` — `#FD0033` (accent red: highlights, CTAs, active nav states)
- `steel` — `#E2E8F0` (body text, secondary content)

**Font families:**
- `font-emphasis` — Bebas Neue (display headlines)
- `font-heading` — Inter Tight 800
- `font-data` — JetBrains Mono (nav labels, metrics, tags)
- `font-body` — Inter

**Custom CSS utilities** (in `<style type="text/tailwindcss">`):
- `.analog-grain` — fixed noise overlay (z-index 1, pointer-events none)
- `.glass-panel` — backdrop blur + transparent border
- `.btn-magnetic` — scale-on-hover transition
- `.no-scrollbar` — hides scrollbar cross-browser

**Redesign classes** (plain CSS in the same `<style>` block): `.cs-eyebrow` + `.cs-dot` (pill label), `.cs-title` (Bebas section title), `.cs-card` (rounded gradient card), `.cs-btn-primary` / `.cs-btn-ghost` with `.cs-btn-lg` / `.cs-btn-sm` (pill buttons). Shared JSX helpers: `ArrowIcon`, `ShieldIcon`, `CheckIcon`, `ApplyButton`, `SectionIntro`, `ChoiceGroup`. Use inline SVG icons inside components that re-render (the form), since Lucide replaces `<i>` nodes outside React's control.

Signal glow pattern: `drop-shadow-[0_0_Xpx_#FD0033]` and `shadow-[0_0_Xpx_rgba(253,0,51,Y)]`

## Animation Patterns

All GSAP animations use `gsap.context()` inside `useLayoutEffect` for scoped cleanup:

```javascript
useLayoutEffect(() => {
  let ctx = gsap.context(() => {
    gsap.from(".my-selector", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
    });
  }, sectionRef);
  return () => ctx.revert();
}, []);
```

Never use `useState` for animation state — always GSAP.

## Form

The `StrategicIntakeSection` submits as JSON to the n8n webhook: `https://n8n-production-a00d.up.railway.app/webhook/d9fbe289-a8eb-4236-b47d-99ac3f7d1794`

Fields: `first_name`, `last_name`, `business_email`, `phone_number`, `preferred_communication`, `business_narrative`, plus radio groups `revenue_scale`, `marketing_spend`, `posting_history`, `deployment_timeline` (rendered as pill chips via `ChoiceGroup`; inputs are `sr-only`, not `hidden`, so `required` validation works). Errors render inline, not via `alert()`. Option values are what n8n receives, so keep them unchanged.

On success, `isSuccess` state switches to an "Application received." confirmation.

`StrategicIntakeSection` also hosts the **inline Cal.com booking** flow. A `showCal` state gates a `#my-cal-inline` container; when revealed, a `useEffect` calls `window.Cal("inline", { calLink: "carterw/30min", … })` once (guarded by `calInitedRef`) and applies the dark theme via `window.Cal("ui", …)`. The Cal loader stub is initialized in `<head>` (`Cal("init", …)`). Change the booking link by editing `calLink`.

## Third-Party Embeds

- **Hero video** — removed in Oct 2026 (the old Wistia VSL pitched the previous offer). A new VSL can go back into `HeroSection` under the CTAs.
- **Cal.com** — see the Form section above.
- **Instagram / Twitter (X)** — `instagram.com/embed.js` and `platform.twitter.com/widgets.js` load in `<head>` for embedded social proof.

## Adding a New Page

1. Define a new component (e.g., `const NewPage = ({ setCurrentPage, navigateToForm }) => { ... }`)
2. Add a branch in `App`'s render: `currentPage === 'newpage' ? <NewPage ... /> :`
3. Add a nav button in `NavBar` calling `handleNavClick('newpage')`

## File Structure

```
.
├── index.html              — complete application
├── llms.txt                — AI scraper summary
├── robots.txt
├── .well-known/llms.txt
├── *.jpeg                  — hero/portrait images used in the app (root level)
├── client-logos/           — client logo marquee assets
├── images/                 — additional reference images (incl. Website Preview.jpg for SEO)
├── Production images/       — production stills
├── Short form/             — short-form before/after result screenshots
├── Internal tools/         — internal tooling screenshots
├── Bowmar before and after/, GiveMeAnAnwer Cliffe BEfore and after/  — case-study before/after sets
└── .claude/launch.json
```

## Notes

- **SEO meta tags** reference `/images/Website%20Preview.jpg` — update if the preview image path changes.
- **CDN dependencies** — the app does not function offline. React, ReactDOM, Babel, and Lucide load from `cdn.jsdelivr.net` (pinned versions); GSAP and ScrollTrigger from `cdnjs.cloudflare.com`; Tailwind from `cdn.tailwindcss.com`. Third-party embeds (Cal.com, Instagram, Twitter/X) load from their own hosts — see Third-Party Embeds above.
- **n8n webhook** — form submits JSON to the production URL above; test any field changes after editing.
- Nav is a floating pill with plain labels (Work, Offer, About, FAQ) and a red Apply button. The particle canvas and custom cursor were removed in the Oct 2026 redesign.
