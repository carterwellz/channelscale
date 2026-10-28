// Public post counts checked October 22, 2026. Selected posts only.
export type SocialProof = {
  id: string;
  url: string;
  views: number;
  rounded: boolean;
};
export const socialProof: Record<
  "counterpointInstagram" | "bibleInstagram" | "counterpointTikTok",
  SocialProof[]
> = {
  counterpointInstagram: [
    {
      id: "DP63f4Zjh_r",
      url: "https://www.instagram.com/reel/DP63f4Zjh_r/",
      views: 8270752,
      rounded: false,
    },
    {
      id: "DZBgxRpE-lf",
      url: "https://www.instagram.com/reel/DZBgxRpE-lf/",
      views: 379256,
      rounded: false,
    },
    {
      id: "DZbXxyotFkl",
      url: "https://www.instagram.com/reel/DZbXxyotFkl/",
      views: 194591,
      rounded: false,
    },
    {
      id: "DbdfSGPSIfD",
      url: "https://www.instagram.com/reel/DbdfSGPSIfD/",
      views: 82911,
      rounded: false,
    },
  ],
  bibleInstagram: [
    {
      id: "DFv_PrjxCVS",
      url: "https://www.instagram.com/reel/DFv_PrjxCVS/",
      views: 3156123,
      rounded: false,
    },
    {
      id: "DBei3KxRNcf",
      url: "https://www.instagram.com/reel/DBei3KxRNcf/",
      views: 1392520,
      rounded: false,
    },
    {
      id: "DHUOGPMB3uX",
      url: "https://www.instagram.com/reel/DHUOGPMB3uX/",
      views: 1450014,
      rounded: false,
    },
    {
      id: "C_Bny2sx5X3",
      url: "https://www.instagram.com/reel/C_Bny2sx5X3/",
      views: 2366554,
      rounded: false,
    },
  ],
  counterpointTikTok: [
    {
      id: "7538859976220003597",
      url: "https://www.tiktok.com/@counterpointstudios/video/7538859976220003597",
      views: 2100000,
      rounded: true,
    },
    {
      id: "7606848090284379406",
      url: "https://www.tiktok.com/@counterpointstudios/video/7606848090284379406",
      views: 1400000,
      rounded: true,
    },
    {
      id: "7687264511430102286",
      url: "https://www.tiktok.com/@counterpointstudios/video/7687264511430102286",
      views: 497300,
      rounded: true,
    },
  ],
};
export const totalViews = (posts: SocialProof[]) =>
  posts.reduce((total, post) => total + post.views, 0);
