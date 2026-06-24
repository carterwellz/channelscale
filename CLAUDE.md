# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChannelScale is a **single-page React application** serving as a marketing website for a full-stack content marketing retainer service. The entire application is a single `index.html` file — no build process, no package.json, no Node.js dependencies.

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

The page has **two separate script blocks** at the bottom of `index.html`:

1. **`<script type="text/babel">`** (lines ~143–2590) — All React components and app logic. Babel standalone compiles this JSX in the browser at runtime. This is the last thing to execute; React mounts only after Babel finishes compilation.

2. **`<script>` plain JS** (lines ~2592–end) — Particle canvas animation and custom cursor. Runs immediately without Babel. This is why the animated background and cursor appear before React content.

> **Performance note:** `@babel/standalone` (~2.5MB uncompressed) compiles ~220KB of JSX on every page load. This is the sole cause of the slow initial load. Content from `#root` only appears after compilation finishes. The custom cursor hides the native cursor immediately (via `document.body.style.cursor = 'none'`) so users see the particle animation + cursor with no React content during the Babel compilation window.

All React components are defined as plain functions in the Babel block — no imports, no modules.

### Routing

Client-side routing via React state (`currentPage`). The `App` component renders the active page based on this string:

| `currentPage` value | Renders |
|---|---|
| `'home'` | `HeroSection` + `StatsSection` + `StrategicIntakeSection` + `WhySocialSection` + `ProcessSection` + `HomeFAQSection` |
| `'work'` | `WorkPage` |
| `'about'` | `AboutPage` |
| `'faq'` | `FAQPage` |
| `'services'` | `SystemConfigurationsPage` |
| `'privacy'` | `PrivacyPolicyPage` |
| `'terms'` | `TermsOfServicePage` |
| `'disclaimer'` | `DisclaimerPage` |

All navigation calls `setCurrentPage()` + `window.scrollTo(0, 0)`.

### `navigateToForm` helper

Defined in `App`, passed as a prop to `NavBar` and all page components. Navigates home then smooth-scrolls to `#intake-form`. Use this for any "Initialize" / CTA button — do not call `setCurrentPage('home')` alone.

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

Fields: `first_name`, `last_name`, `business_email`, `country_code`, `phone_number`, `preferred_communication`, `business_narrative`, plus radio groups `revenue_scale`, `marketing_spend`, `posting_history`, `deployment_timeline`.

On success, `isSuccess` state switches to a "TRANSMISSION_RECEIVED" confirmation screen.

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
├── *.jpeg                  — images used in the app (root level)
├── images/                 — additional reference images
└── .claude/launch.json
```

## Notes

- **SEO meta tags** reference `/Website%20Preview.jpg` — update if the preview image path changes.
- **CDN dependencies** — the app does not function offline. React, ReactDOM, Babel, and Lucide load from `cdn.jsdelivr.net` (pinned versions); GSAP and ScrollTrigger from `cdnjs.cloudflare.com`.
- **n8n webhook** — form submits JSON to the production URL above; test any field changes after editing.
- Nav labels use bracket notation matching the page identity: `[HOME]`, `[OUR_WORK]`, `[SERVICES]`, `[DIRECTOR]`, `[FAQ]`.
- **Custom cursor** — desktop-only; sets `document.body.style.cursor = 'none'` and injects two `<div>` elements (a dot + ring). Lives in the plain JS block, not React, so it activates before React mounts.
