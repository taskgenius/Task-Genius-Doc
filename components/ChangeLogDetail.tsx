import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import type { ReleasePage } from "@/lib/source";
import { CalendarIcon, GithubIcon } from "lucide-react";

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
  };

  // Check if frontmatter exists before accessing properties
  if (!frontmatter) {
    return <div>Error: Missing frontmatter data.</div>;
  }

  const date = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not specified";
  const version = frontmatter.version ?? "Version not specified";
  const platform = frontmatter.platform ?? "Platform not specified"; // Get platform
  const title = frontmatter.title ?? page.data.title;

  return (
    <article className="flex flex-col md:flex-row md:w-full gap-8">
      <div className="md:w-1/4">
        <div className="md:sticky md:top-[var(--header-height,64px)] md:h-[calc(100vh-var(--header-height,64px))] overflow-y-auto p-4 border-l">
          <h1 className="font-semibold text-2xl sm:text-xl mb-2">{title}</h1>

          <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <span>{version}</span>
            {frontmatter.platform && (
              <Badge variant={"outline"}> {platform}</Badge>
            )}
          </div>

          {version !== "Version not specified" && (
            <Link
              href={`https://github.com/quorafind/outliner.md/releases/tag/${version}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs"
            >
              <Badge variant={"secondary"} className="py-0.5 px-2">
                <GithubIcon className="w-3 h-3 mr-1" />
                View on Github
              </Badge>
            </Link>
          )}
        </div>
      </div>
      <div className="md:basis-3/4 prose dark:prose-invert max-w-none break-words">
        <RenderContent page={page} />
      </div>
    </article>
  );
}
