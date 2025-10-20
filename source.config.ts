import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      label: z.string().optional(),
    }),
  },
});

// Define a new source for releases using the schema
export const releases = defineDocs({
  dir: "content/releases",
  docs: {
    // Apply schema within the 'docs' property
    schema: frontmatterSchema.extend({
      title: z.string(),
      // date: z.string().date(), // Temporarily comment out date validation
      date: z.string(), // Use plain string for now
      version: z.string(),
      platform: z.string(), // Platform might be optional
      access: z.string().default("public"), // Example of adding other fields
    }),
  },
});

export const roadmap = defineDocs({
  dir: "content/roadmap",
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string(),
      date: z.string().optional(),
      description: z.string().optional(),
      status: z
        .enum(["working-on", "shipped", "backlog"])
        .default("backlog")
        .optional(),
      docsUrl: z.string().optional(),
    }),
  },
});

export const privacy = defineDocs({
  dir: "content/privacy",
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string(),
      description: z.string(),
      lastUpdated: z.string(),
      platform: z.enum(["plugin", "desktop"]),
    }),
  },
});

export const terms = defineDocs({
  dir: "content/terms",
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string(),
      description: z.string(),
      lastUpdated: z.string(),
      platform: z.enum(["plugin", "desktop"]),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
