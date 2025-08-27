import { generateOGImage } from "fumadocs-ui/og";
import { releasesSource } from "@/lib/source";
import { notFound } from "next/navigation";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = releasesSource.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: "Task Genius",
    icon: "https://taskgenius.md/favicon.ico",
    primaryColor: "#0ea5e9",
    primaryTextColor: "#ffffff",
    width: 1200,
    height: 630,
    emoji: "twemoji",
  });
}

export function generateStaticParams() {
  return releasesSource.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, "banner.png"],
  }));
}
