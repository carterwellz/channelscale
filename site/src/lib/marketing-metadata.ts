import type { Metadata } from "next";
export const siteOrigin = "https://channelscale.yt";
export const publicPages: Record<string, { title: string; description: string }> = {
  "": { title: "ChannelScale | 60 clips. A full content operation.", description: "Turn interviews, lessons and podcasts into 60 original clips a month. Selection, editing, approvals and publishing across 4+ agreed platforms." },
  work: { title: "Selected work & channel results", description: "Explore ChannelScale’s editing, production and channel operations work for Bible Alive, Counterpoint and Bowmar Bowhunting. Dated results and source links." },
  offer: { title: "60 clips a month, managed from start to finish", description: "A managed content operation on your accounts: selection, editing, approvals, publishing and review. Custom pricing and a scoped paid pilot." },
  services: { title: "60 clips a month, managed from start to finish", description: "Explore ChannelScale’s monthly content operation and scoped paid pilots." },
  about: { title: "Meet Carter & ChannelScale", description: "Production experience, editorial judgment and one accountable lead for turning useful recordings into a consistent publishing operation." },
  faq: { title: "Questions about clips, publishing & paid pilots", description: "What counts as a clip, what footage we need, how approvals work and how to start with a paid pilot." },
  apply: { title: "Discuss your content", description: "Share your footage, goals and timing. Talk through a monthly content scope or paid pilot with Carter." },
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
    openGraph: { title: page.title, description: page.description, url: canonical, siteName: "ChannelScale", type: "website", images: [{ url: `${siteOrigin}/og.png`, width: 1200, height: 630, alt: "ChannelScale — Turn your footage into daily content." }] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [`${siteOrigin}/og.png`] },
  };
}
