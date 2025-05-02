import { releasesSource } from "@/lib/source";
import { ChangeLogDetail } from "@/components/ChangeLogDetail";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CalendarIcon } from "lucide-react";

export function generateStaticParams() {
  // Generate routes like /changelog/xxx, /changelog/yyy
  return releasesSource.generateParams();
}

export default function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug;

  console.log(slug);

  // If slug exists, show the specific release detail
  if (slug) {
    const page = releasesSource.getPage(slug);

    console.log(page);

    if (!page) {
      notFound(); // Show 404 if page not found
    }

    // Render the detail component
    return <ChangeLogDetail page={page} />;
  }

  // If no slug, show the list of all releases
  const pages = releasesSource.getPages();

  // Sort pages by date (newest first) - assumes 'date' field in frontmatter
  const sortedPages = pages.sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA; // Descending order
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">Changelog</h1>
      <ul className="space-y-6">
        {sortedPages.map((page) => {
          const frontmatter = page.data; // Access frontmatter directly
          const date = frontmatter.date
            ? new Date(frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date not specified";

          return (
            <li
              key={page.url}
              className="border p-4 rounded-lg hover:bg-muted/50"
            >
              <Link href={page.url} className="block group">
                <h2 className="text-xl font-semibold mb-1 group-hover:text-primary">
                  {frontmatter.title}
                </h2>
                <div className="text-sm text-muted-foreground flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    {date}
                  </span>
                  {frontmatter.version && (
                    <span>Version: {frontmatter.version}</span>
                  )}
                  {frontmatter.platform && (
                    <Badge variant="outline">{frontmatter.platform}</Badge>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
