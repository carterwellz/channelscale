import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: {
    default: "ChannelScale | Your footage. A full content operation.",
    template: "%s | ChannelScale",
  },
  description:
    "Clip selection, editing, approvals and publishing. 60 original clips a month for brands and personalities.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
