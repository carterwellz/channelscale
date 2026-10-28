"use client";
import Link from "./marketing-link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { MarketingEvents } from "./marketing-events";
import { Brand } from "./ui";
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="public-nav">
      <Brand />
      <nav className={open ? "open" : ""} aria-label="Main navigation">
        <Link href="/work" onClick={() => setOpen(false)}>
          The work
        </Link>
        <Link href="/#process" onClick={() => setOpen(false)}>
          How it works
        </Link>
        <Link href="/offer" onClick={() => setOpen(false)}>
          The offer
        </Link>
        <Link href="/about" onClick={() => setOpen(false)}>
          About
        </Link>
        <Link href="/apply" className="button" onClick={() => setOpen(false)}>
          Discuss your content <ArrowUpRight size={15} />
        </Link>
      </nav>
      <button
        className="icon-button mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
function Footer() {
  return (
    <footer className="public-footer">
      <div>
        <Brand />
        <p>Clip selection, editing and publishing.</p>
      </div>
      <div className="footer-links">
        <Link href="/work">Work</Link>
        <Link href="/offer">Offer</Link>
        <Link href="/faq">FAQs</Link>
        <a href="mailto:hello@channelscale.yt">Contact</a>
        {process.env.NEXT_PUBLIC_SITE_MODE !== "production" && <><Link href="/login">Team sign in</Link><Link href="/portal">Client portal</Link></>}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ChannelScale · Noia Media LLC</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <MarketingEvents />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
