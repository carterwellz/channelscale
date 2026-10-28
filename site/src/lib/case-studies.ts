export const evidenceDate = "October 22, 2026";
export type CaseAccount = {
  platform: "youtube" | "instagram" | "tiktok" | "facebook";
  handle: string;
  url: string;
  audience?: string;
};
export const caseAccounts = {
  bible: [
    {
      platform: "youtube",
      handle: "@Bible_Alive",
      url: "https://www.youtube.com/@Bible_Alive",
      audience: "585K",
    },
    {
      platform: "instagram",
      handle: "@biblecomesalive",
      url: "https://www.instagram.com/biblecomesalive/",
      audience: "234K",
    },
    {
      platform: "tiktok",
      handle: "@BibleAlive",
      url: "https://www.tiktok.com/@biblealive",
      audience: "49.1K",
    },
    {
      platform: "facebook",
      handle: "@BibleComesAlive",
      url: "https://www.facebook.com/BibleComesAlive/",
      audience: "169K",
    },
  ],
  counterpoint: [
    {
      platform: "youtube",
      handle: "@counterpointstudios",
      url: "https://www.youtube.com/@counterpointstudios",
    },
    {
      platform: "instagram",
      handle: "@counterpoint2025",
      url: "https://www.instagram.com/counterpoint2025/",
    },
    {
      platform: "tiktok",
      handle: "@counterpointstudios",
      url: "https://www.tiktok.com/@counterpointstudios",
    },
  ],
  bowmar: [
    {
      platform: "youtube",
      handle: "@BowmarBowhunting",
      url: "https://www.youtube.com/@BowmarBowhunting",
      audience: "2.63M",
    },
    {
      platform: "instagram",
      handle: "@bowmarbowhunting",
      url: "https://www.instagram.com/bowmarbowhunting/",
      audience: "444K",
    },
  ],
} satisfies Record<string, CaseAccount[]>;
export const bibleVideos = [
  {
    id: "_iC69LnnBxA",
    title: "Quran Is The Word of God? Muslim Debates Christian",
    views: 24601865,
  },
  {
    id: "1M-2k3UdTyA",
    title: "Why Cliffe Knechtle Is NOT Catholic",
    views: 10620416,
  },
  {
    id: "0f7lUpliBFU",
    title: "How Can Jesus be God? Muslim Debates Christian",
    views: 10618929,
  },
  {
    id: "1xXKhZCfaD8",
    title: "Why Does God Let Innocent Children Suffer?",
    views: 10013864,
  },
  {
    id: "NmHSN-b2mKs",
    title: "Jesus Died for Every Sin… Except One?",
    views: 4362692,
  },
];
export const bibleFeaturedViews = bibleVideos.reduce((n, v) => n + v.views, 0);
export const bowmarVideos = [
  { id: "Q7tpUTyt378", title: "Pulling a 200lb bow", views: 8517032 },
  { id: "p_6McYWHW9k", title: "Two misses in slow motion", views: 25374659 },
  {
    id: "MgRIV8LtF74",
    title: "A $200,000 slow-motion camera in Uganda",
    views: 216371531,
  },
];
export const bibleResults = {
  youtubeViews: 342546591,
  youtubeSubscribers: 585000,
  instagramFollowers: 234000,
  tiktokFollowers: 49100,
  facebookFollowers: 169000,
};
// Account totals supplied by Carter on October 22, 2026.
// Keep these separate from the independently checked selected-post counts.
export const ownerReportedViews = {
  bible: { instagram: 128700000, tiktok: 21400000, facebook: 65800000 },
  counterpoint: { instagram: 16100000, tiktok: 5600000 },
  reportedAt: "October 22, 2026",
};
export const bowmarResults = {
  youtubeViews: bowmarVideos.reduce((total, video) => total + video.views, 0),
  otherViewsEstimate: 20000000,
};
export const counterpointShorts = [
  { id: "0k0wi5BG394", title: "Do Immigrants Need to Blend In?", views: 36000 },
  {
    id: "Lo2iszzTzls",
    title: "Can Citizens Ever Resist a Government?",
    views: 34000,
  },
  {
    id: "a3xvArUCu6w",
    title: "Christians Stole Every Pagan Holiday?",
    views: 33000,
  },
];
export const counterpointInstagram = [
  { id: "DP63f4Zjh_r", account: "counterpoint2025" },
  { id: "DZBgxRpE-lf", account: "counterpoint2025" },
  { id: "DZbXxyotFkl", account: "thelastguerilla" },
  { id: "DbdfSGPSIfD", account: "counterpoint2025" },
];
export const counterpointTikTok = [
  { id: "7538859976220003597", views: 2100000 },
  { id: "7606848090284379406", views: 1400000 },
  { id: "7687264511430102286", views: 497300 },
];
export const compact = (n: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
export type CounterpointProof = {
  views: number;
  subscribers: number;
  watchHours: number;
  averageDuration: string;
  mainEpisodeAverage: number;
  mainEpisodes: number;
  top: { id: string; title: string; views: number }[];
  checkedAt: string;
  refreshed: boolean;
};
const fallback: CounterpointProof = {
  views: 8817525,
  subscribers: 38700,
  watchHours: 1878962,
  averageDuration: "16:09",
  mainEpisodeAverage: 220152,
  mainEpisodes: 36,
  top: [],
  checkedAt: "2026-10-22T18:32:00Z",
  refreshed: false,
};
export async function counterpointProof(): Promise<CounterpointProof> {
  try {
    const r = await fetch("https://counterpoint.show/sponsor", {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) return fallback;
    const html = await r.text();
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ");
    const number = (re: RegExp) => {
      const value = text.match(re)?.[1];
      return value ? Number(value.replaceAll(",", "")) : null;
    };
    const views = number(/([\d,]+) Lifetime views/),
      subscribers = number(/([\d,]+) YouTube subscribers/),
      watchHours = number(/([\d,]+) Watch time in hours/),
      mainEpisodeAverage = number(/Live ([\d,]+) views Public main episodes/),
      mainEpisodes = number(/Based on ([\d,]+) public main episodes/);
    const averageDuration = text.match(
      /(\d+:\d+) Lifetime average view duration/,
    )?.[1];
    if (
      !views ||
      !subscribers ||
      !watchHours ||
      !averageDuration ||
      !mainEpisodeAverage ||
      !mainEpisodes
    )
      return fallback;
    const ids = [
      ...new Set(
        [
          ...html.matchAll(
            /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/g,
          ),
        ].map((m) => m[1]),
      ),
    ];
    const top = ids
      .map((id) => {
        const start = html.indexOf(`watch?v=${id}`);
        const anchor = html
          .slice(start, html.indexOf("</a>", start))
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ");
        const match = anchor.match(/([\d,]+) views (.+?)\s*$/);
        return {
          id,
          title: (match?.[2] || "Counterpoint full episode")
            .replaceAll("&#x27;", "'")
            .replaceAll("&amp;", "&"),
          views: Number((match?.[1] || "0").replaceAll(",", "")),
        };
      })
      .filter((v) => v.views > 0)
      .sort((a, b) => b.views - a.views)
      .slice(0, 6);
    return {
      views,
      subscribers,
      watchHours,
      averageDuration,
      mainEpisodeAverage,
      mainEpisodes,
      top,
      checkedAt: new Date().toISOString(),
      refreshed: true,
    };
  } catch {
    return fallback;
  }
}
