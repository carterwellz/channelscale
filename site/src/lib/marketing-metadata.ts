import type { Metadata } from "next";
export const siteOrigin = "https://channelscale.yt";
export const publicPages: Record<string, { title: string; description: string }> = {
  "": { title: "ChannelScale | Short-form content & distribution", description: "Grow your channels and reach beyond them with managed short-form content and separately scoped clipping campaigns." },
  work: { title: "Selected work & channel results", description: "Explore ChannelScale’s editing, production and channel operations work for Bible Alive, Counterpoint and Bowmar Bowhunting. Dated results and source links." },
  offer: { title: "Managed content & clipping campaigns", description: "Explore managed short-form content for your accounts and separately scoped creator-led clipping campaigns." },
  services: { title: "Managed content & clipping campaigns", description: "Explore ChannelScale’s managed content and creator campaign options." },
  about: { title: "Meet Carter & ChannelScale", description: "Production experience, editorial judgment and one accountable lead for turning useful recordings into a consistent publishing operation." },
  faq: { title: "Questions about clipping, campaigns & publishing", description: "Learn about managed content, clipping campaigns, approvals and paid pilots." },
  apply: { title: "Discuss your goals", description: "Share your content and goals. Discuss managed content, a clipping campaign or both with ChannelScale." },
  clippers: { title: "For clippers | ChannelScale community", description: "Join the free ChannelScale Whop community and find clipping opportunities as they become available." },
  privacy: { title: "Privacy policy", description: "How ChannelScale handles website inquiries and website usage information." },
  terms: { title: "Terms of use", description: "Website terms and how ChannelScale service engagements are scoped." },
  disclaimer: { title: "Project & results disclaimer", description: "Context for selected work, dated results, owner-reported figures and estimates." },
  "work/bible-alive": { title: "Bible Alive | Clipping & channel operations", description: "From launch to 585K YouTube subscribers. Explore Bible Alive’s channel results, platform breakdowns and dated sources." },
  "work/counterpoint": { title: "Counterpoint | Production & repurposing", description: "Production, editing and short-form repurposing for Counterpoint, with YouTube results and source attribution." },
  "work/bowmar-bowhunting": { title: "Bowmar Bowhunting | Editing results", description: "Short-form and long-form editing for Bowmar Bowhunting. Public video counts, owner estimates and comparisons with clear context." },
};
export function marketingMetadata(path: string): Metadata {
  const page = publicPages[path];
  if (!page) return { robots: { index: false, follow: false } };
  const canonical = `${siteOrigin}/${path === "services" ? "offer" : path}`;
  const live = process.env.NEXT_PUBLIC_SITE_MODE === "production";
  return {
    title: path ? page.title : { absolute: page.title }, description: page.description,
    alternates: { canonical }, robots: { index: live, follow: live },
    openGraph: { title: page.title, description: page.description, url: canonical, siteName: "ChannelScale", type: "website", images: [{ url: `${siteOrigin}/og.png?v=2`, width: 1200, height: 630, alt: "ChannelScale — Grow your channels. Reach beyond them." }] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [`${siteOrigin}/og.png?v=2`] },
  };
}
