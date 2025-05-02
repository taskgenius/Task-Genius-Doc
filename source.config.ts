import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";
// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: "content/docs",
});

// Define a schema for release frontmatter
const releaseSchema = frontmatterSchema.extend({
  title: z.string(),
  // date: z.string().date(), // Temporarily comment out date validation
  date: z.string(), // Use plain string for now
  version: z.string(),
  platform: z.string().optional(), // Platform might be optional
  access: z.enum(["public", "private"]).default("public"), // Example of adding other fields
});

// Define a new source for releases using the schema
export const releases = defineDocs({
  dir: "content/releases",
  docs: {
    // Apply schema within the 'docs' property
    schema: releaseSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
