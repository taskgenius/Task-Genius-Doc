import { releasesSource } from "@/lib/source";
import { ChangeLogDetail } from "@/components/ChangeLogDetail";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { Metadata } from "next";

export function generateStaticParams() {
  return releasesSource.generateParams();
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const slug = (await params).slug;
  console.log(slug);

  let pageTitle: ReactNode;
  let content: ReactNode;
  let contentClasses =
    "flex-1 px-8 flex flex-row space-x-6 border border-t-0 border-fd-border border-b p-6 bg-fd-background backdrop-blur-sm bg-opacity-50";

  if (slug) {
    const page = releasesSource.getPage(slug);
    if (!page) {
      notFound();
    }

    pageTitle = (
      <Link href="/changelog">
        <h1 className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl hover:text-fd-primary cursor-pointer">
          Changelog
        </h1>
      </Link>
    );
    content = <ChangeLogDetail page={page} />;
    contentClasses =
      "flex-1 px-8 flex flex-row space-x-6 border border-t-0 border-fd-border border-b p-6 bg-fd-background backdrop-blur-sm bg-opacity-50 md:pt-10";
  } else {
    const pages = releasesSource.getPages();
    const sortedPages = pages.sort((a, b) => {
      const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
      const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;

      // If dates are the same, compare versions
      if (dateA === dateB) {
        const versionA = a.data.version ? a.data.version : "0.0.0";
        const versionB = b.data.version ? b.data.version : "0.0.0";

        // Split version strings and compare each part numerically
        const partsA = versionA.split(".").map(Number);
        const partsB = versionB.split(".").map(Number);

        // Compare major, minor, patch versions
        for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
          const partA = i < partsA.length ? partsA[i] : 0;
          const partB = i < partsB.length ? partsB[i] : 0;
          if (partA !== partB) {
            return partB - partA; // Higher version first
          }
        }
        return 0;
      }

      return dateB - dateA; // Newer date first
    });

    pageTitle = (
      <h1 className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
        Changelog
      </h1>
    );
    content = (
      <>
        {sortedPages.map((page, index) => (
          <div
            className="flex flex-col md:flex-row md:space-x-6 flex-1 pb-6 [&:not(:last-child)]:border-b border-fd-border px-8 py-8 pt-4"
            key={index}
          >
            <ChangeLogDetail page={page} />
          </div>
        ))}
      </>
    );
    contentClasses =
      "flex-1 flex flex-col space-y-6 border-t-0 border border-fd-border md:border-b border-b-0 py-6 bg-fd-background backdrop-blur-sm bg-opacity-50";
  }

  return (
    <main className="container h-screen flex flex-col md:mx-auto max-w-5xl md:px-4 py-12 md:py-20 ">
      <section className="-mt-20 border border-fd-border border-b-0 grid-background-small p-12 px-12 relative"></section>
      <section className="text-left border border-fd-border md:border-b border-b-0 p-6 bg-fd-background backdrop-blur-sm bg-opacity-50">
        {pageTitle}
      </section>
      <section className="border border-fd-border border-t-0 p-0 md:p-6 px-12 zimbra-background"></section>

      <section className={contentClasses}>{content}</section>

      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background"></section>
      <section className="border border-fd-border -mb-20 pt-12 px-6 md:px-12 pb-6 relative text-right">
        <div className="prose prose-fd max-w-none">
          © {new Date().getFullYear()} Boninall(Quorafind)
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;

  // For the main changelog page without a specific release
  if (!slug || slug.length === 0) {
    return {
      title: "Changelog - Task Genius",
      description: "Task Genius changelog and release notes",
      openGraph: {
        images: "/changelog-og/banner.png",
      },
      twitter: {
        card: "summary_large_image",
        images: "/changelog-og/banner.png",
      },
    } satisfies Metadata;
  }

  // For specific release page
  const page = releasesSource.getPage(slug);
  if (!page) return notFound();

  const image = ["/changelog-og", ...slug, "banner.png"].join("/");
  return {
    title: page.data.title + " - Task Genius",
    description: page.data.description,
    openGraph: {
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      images: image,
    },
  } satisfies Metadata;
}
