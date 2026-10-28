import { marketingMetadata } from "@/lib/marketing-metadata";
export function generateStaticParams() { return ["bible-alive", "counterpoint", "bowmar-bowhunting"].map(slug => ({slug})); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}) { return marketingMetadata(`work/${(await params).slug}`); }
import { notFound } from "next/navigation";
import {
  BibleCase,
  CounterpointCase,
  BowmarCase,
} from "@/components/case-studies";
import { counterpointProof } from "@/lib/case-studies";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "bible-alive") return <BibleCase />;
  if (slug === "counterpoint")
    return <CounterpointCase proof={await counterpointProof()} />;
  if (slug === "bowmar-bowhunting") return <BowmarCase />;
  notFound();
}
