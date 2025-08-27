import type { InferMetaType, InferPageType } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { docs, releases, roadmap } from "@/.source";

// Loader for docs
export const docsSource = loader({
  baseUrl: "/docs",
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
  source: docs.toFumadocsSource(),
});

// Loader for releases
export const releasesSource = loader({
  baseUrl: "/changelog",
  source: releases.toFumadocsSource(),
  // You might want to add processing for frontmatter fields like 'date', 'version' here
  // Example:
  // transform(data) {
  //   return {
  //     ...data,
  //     // Potentially parse date string into Date object
  //     date: new Date(data.frontmatter.date)
  //   };
  // }
});

// Loader for roadmap
export const roadmapSource = loader({
  baseUrl: "/roadmap", // Base URL for roadmap item pages
  source: roadmap.toFumadocsSource(),
});

export type DocsPage = InferPageType<typeof docsSource>;
export type DocsMeta = InferMetaType<typeof docsSource>;

export type ReleasePage = InferPageType<typeof releasesSource>;
export type ReleaseMeta = InferMetaType<typeof releasesSource>;

export type RoadmapPageType = InferPageType<typeof roadmapSource>; // Using a more distinct name
export type RoadmapMeta = InferMetaType<typeof roadmapSource>;
