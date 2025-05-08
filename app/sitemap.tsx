import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/metadata";
import { docsSource, roadmapSource, releasesSource } from "@/lib/source";

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, baseUrl).toString();

  return [
    {
      url: url("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: url("/docs"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/changelog"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: url("/roadmap"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...(await Promise.all(
      docsSource.getPages().map(async (page) => {
        const { lastModified } = page.data;
        return {
          url: url(page.url),
          lastModified: lastModified ? new Date(lastModified) : undefined,
          changeFrequency: "weekly",
          priority: 0.5,
        } as MetadataRoute.Sitemap[number];
      })
    )),
    ...(await Promise.all(
      releasesSource.getPages().map(async (page) => {
        const { lastModified } = page.data;
        return {
          url: url(page.url),
          lastModified: lastModified ? new Date(lastModified) : undefined,
          changeFrequency: "weekly",
          priority: 0.5,
        } as MetadataRoute.Sitemap[number];
      })
    )),
    ...(await Promise.all(
      roadmapSource.getPages().map(async (page) => {
        const { lastModified } = page.data;
        return {
          url: url(page.url),
          lastModified: lastModified ? new Date(lastModified) : undefined,
          changeFrequency: "monthly",
          priority: 0.5,
        } as MetadataRoute.Sitemap[number];
      })
    )),
  ];
}
