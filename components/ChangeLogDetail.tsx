import { Badge } from "@/components/ui/Badge";
import type { ReleasePage } from "@/lib/source";
import { FormattedDate } from "@/components/FormattedDate";
import Link from "next/link";
import { GithubIcon } from "lucide-react";

interface ChangeLogDetailProps {
  page: ReleasePage;
}

// Render the MDX content from page.data.body
function RenderContent({ page }: { page: ReleasePage }) {
  const MDXContent = page.data.body;
  return <MDXContent />;
}

export function ChangeLogDetail({ page }: ChangeLogDetailProps) {
  // Access frontmatter via structuredData, types should be inferred from the schema
  const frontmatter = {
    title: page.data.title,
    date: page.data.date,
    version: page.data.version,
    platform: page.data.platform,
    access: page.data.access,
  };

  const getLink = (version: string) => {
    console.log(frontmatter);
    if (!frontmatter.date || !frontmatter.platform || !frontmatter.version)
      return `/changelog`;
    return `/changelog/${frontmatter.date}-${frontmatter.platform}-v${frontmatter.version}`;
  };

  // Check if frontmatter exists before accessing properties
  if (!frontmatter) {
    return <div>Error: Missing frontmatter data.</div>;
  }

  const version = frontmatter.version ?? "";
  const platform = frontmatter.platform == "desktop" ? "Desktop" : "Mobile";
  const access = frontmatter.access == "public" ? "Public" : "Private";

  return (
    <>
      <div className="grow">
        <div className="md:sticky md:top-[var(--header-height)] pb-2">
          <div className="font-semibold text-2xl sm:text-xl">
            <FormattedDate dateString={frontmatter.date} />
          </div>
          <div className="font-mono mt-1 text-muted">
            <div className="flex items-center">
              <Link href={getLink(version)}>
                <span className="text-sm text-fd-muted-foreground px-1 hover:text-fd-primary cursor-pointer hover:underline">
                  {version}
                </span>
              </Link>
              <span className="text-sm text-fd-muted-foreground px-1">
                {platform}
              </span>
            </div>
            <div className="mb-8 mt-2 text-xs text-fd-muted-foreground font-mono flex flex-row gap-2 items-center">
              <Badge variant={"default"}>{access}</Badge>
              <Link
                href={`https://github.com/Quorafind/Obsidian-Task-Genius/releases/tag/${version}`}
              >
                <GithubIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="md:basis-3/4 prose dark:prose-invert max-w-none break-words">
        <RenderContent page={page} />
      </div>
    </>
  );
}
