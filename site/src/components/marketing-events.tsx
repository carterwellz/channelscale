"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function track(event: string, path = window.location.pathname) {
  if (process.env.NEXT_PUBLIC_SITE_MODE !== "production" || navigator.doNotTrack === "1") return;
  // Fixed event names and route paths only; no fields, query strings or identifiers.
  navigator.sendBeacon?.("/api/events", new Blob([JSON.stringify({ event, path })], { type: "application/json" }));
}
export function MarketingEvents() {
  const pathname = usePathname();
  useEffect(() => { track("page_view", pathname); }, [pathname]);
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      if (url.hostname === "cal.com") track("booking_opened");
      else if (url.origin === window.location.origin && url.pathname === "/apply") track("inquiry_cta");
      else if (url.origin === window.location.origin && url.pathname.startsWith("/work/")) track("case_opened");
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
