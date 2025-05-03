import { generateOGImage } from "fumadocs-ui/og";
import { docsSource } from "@/lib/source";
import { notFound } from "next/navigation";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = docsSource.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: "Task Genius ",
  });
}

export function generateStaticParams() {
  return docsSource.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, "banner.png"],
  }));
}
