import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Mermaid } from "@/components/mdx/mermaid";
import { DeepLinkButton, DeepLinkFallback } from "@/components/DeepLinkButton";

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Mermaid,
    DeepLinkButton,
    DeepLinkFallback,
    ...components,
  };
}
