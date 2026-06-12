# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChannelScale is a **single-page React application** serving as a marketing website for a YouTube growth strategy service. The entire application is deployed as a single `index.html` file with no build process, package.json, or Node.js dependencies required.

**Tech Stack:**
- React 18 (via CDN)
- Tailwind CSS (via CDN with custom theme)
- GSAP 3.12.5 with ScrollTrigger for animations
- Babel Standalone for JSX compilation
- Lucide Icons for UI icons
- Formspree.io for form submissions

## Development

### Running the Application

**Local Development:**
Simply open `index.html` directly in a web browser. The application runs entirely client-side with no server required.

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Alternatively, serve with a simple HTTP server to avoid CORS issues:
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

**No build process, lint commands, or tests exist** — this is a vanilla React application compiled in the browser.

### Code Organization

The application uses **custom client-side routing** managed via React state. All code lives within a single `<script type="text/babel">` block in `index.html`. The structure is:

- **App** (root component) — manages `currentPage` state and renders the active page
- **NavBar** — fixed header navigation with mobile menu support
- **Page Components** (all defined as separate React components):
  - HeroSection
  - PortfolioSection
  - StrategicIntakeSection (intake form using Formspree)
  - FeaturesSection
  - WhoThisIsForSection
  - ManifestoSection
  - ProtocolSection
  - AboutPage ([DIRECTOR] page)
  - FAQPage
  - SystemConfigurationsPage ([SYSTEM_CONFIGURATIONS] page)
  - Legal pages: PrivacyPolicyPage, TermsOfServicePage, DisclaimerPage
- **SiteFooter** — fixed footer with legal navigation

### Routing

Navigation is handled by `setCurrentPage()` state setter. Valid page values:
- `'home'` — Main landing page (default)
- `'about'` — [DIRECTOR] page
- `'faq'` — FAQ accordion page
- `'services'` — [SYSTEM_CONFIGURATIONS] page
- `'privacy'`, `'terms'`, `'disclaimer'` — Legal pages

When navigating, the app scrolls to top: `window.scrollTo(0, 0)`.

### Form Submission

The strategic intake form submits to Formspree endpoint:
```
https://formspree.io/f/mvzbwwgw
```

Form fields collected:
- Identification: first_name, last_name
- Communication: business_email, country_code, phone_number, preferred_communication
- Business narrative
- Revenue metrics (revenue_scale radio group)
- Marketing spend (marketing_spend radio group)
- Content maturity (posting_history radio group)
- Timeline (deployment_timeline radio group)

On success, the form displays a success screen with "TRANSMISSION_RECEIVED" message. The `isSuccess` state variable controls visibility.

### Design System

**Tailwind Config (inline in `<script>`):**
- Custom colors: `obsidian` (#0A0A0B), `signal` (#FD0033), `steel` (#E2E8F0)
- Font families: heading, emphasis (Bebas Neue), data (JetBrains Mono), body (Inter)
- Custom utilities: `.analog-grain`, `.glass-panel`, `.btn-magnetic`, `.no-scrollbar`

**Color Usage:**
- **obsidian** — Dark backgrounds
- **signal** — Accent red for highlights, active states, CTAs
- **steel** — Light text/secondary content

**Key CSS Patterns:**
- Backdrop blur glass morphism via `.glass-panel`
- Signal glow effects using `drop-shadow-[0_0_Xpx_#FD0033]`
- Animations via GSAP in useLayoutEffect (never useState for animations)

### Animation Patterns

All animations use GSAP with ScrollTrigger for scroll-based effects:

```javascript
useLayoutEffect(() => {
  let ctx = gsap.context(() => {
    gsap.from(".selector", { 
      y: 30, 
      opacity: 0, 
      duration: 0.8,
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
    });
  }, sectionRef);
  return () => ctx.revert();
}, []);
```

**Key animations:**
- Hero section: flicker effect on headline, video entrance
- Sections: staggered fade-in on scroll
- Cards: floating icons, pulse signals, scanning lines
- Protocol section: card pinning with scroll-based scale/blur

Use `data-lucide` attributes on icons — they're initialized by `lucide.createIcons()` on component mount.

### Portfolio Section

Hardcoded portfolio items with links to YouTube channels:
- @bible_alive (550K+ subscribers)
- @bowmarbowhunting (2.6M+ subscribers)
- @counterpointstudios (20K+ subscribers)

Each card has retention/conversion/growth metrics displayed as SVG visualizations.

### Mobile Responsiveness

Responsive breakpoints are standard Tailwind (`md:`, `lg:`, `sm:`). Key mobile considerations:
- NavBar has desktop flex layout and mobile hamburger menu (toggles `isMobileMenuOpen` state)
- Font sizes use `clamp()` for smooth scaling
- Grid layouts collapse from 3 columns to 1 on mobile
- Padding adjusted with `md:px-12` / `px-4` pattern

### Common Editing Tasks

**Adding a new page:**
1. Create a new component function (e.g., `const NewPage = ({ setCurrentPage }) => { ... }`)
2. Add it to the conditional render in App's JSX
3. Add a button in NavBar to set currentPage to the new route

**Updating portfolio items:**
Edit the PortfolioSection's hardcoded YouTube links and subscriber counts in the component.

**Modifying form fields:**
Edit the StrategicIntakeSection component. Form field names must match Formspree field mappings.

**Adding animations:**
Use gsap.context() with useLayoutEffect. Always include cleanup return: `() => ctx.revert()`.

**Updating colors:**
Modify tailwind.config theme.colors in the `<script>` tag. Signal color (#FD0033) is the primary accent used throughout.

## File Structure

```
.
├── index.html (complete application)
├── .git/ (version control)
├── images/ (reference images)
└── ChannelScale.code-workspace (VS Code workspace config)
```

## Cross-Page Navigation

There is a special `navigateToForm` helper in `App` that navigates to the home page and then smooth-scrolls to `#intake-form`. Any CTA button that should land on the intake form should call this instead of `setCurrentPage('home')` alone. `navigateToForm` is passed down as a prop to `NavBar` and page components.

## Notes

- **Form endpoint** — Formspree ID is `mvzbwwgw`. Test submission after any form field changes.
- **CDN dependencies** — all external libs loaded via CDN; the app does not function offline.
- **SEO** — OG/Twitter meta tags reference `/Website%20Preview.jpg`; update if the preview image path changes.
