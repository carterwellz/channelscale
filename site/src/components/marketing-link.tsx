import type { AnchorHTMLAttributes } from "react";
// Public pages are exported HTML. Native navigation avoids relying on a Next server
// or host-specific handling of encoded RSC segment filenames.
export default function MarketingLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} />;
}
