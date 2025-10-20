import { privacySource } from "@/lib/source";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, Package, Rocket } from "lucide-react";

export function generateStaticParams() {
  return privacySource.generateParams();
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const slug = (await params).slug;

  // If no slug, show privacy selection page
  if (!slug || slug.length === 0) {
    return (
      <main className="container md:mx-auto max-w-6xl md:px-4 py-12 md:py-20">
        {/* Header Section */}
        <section className="-mt-20 border border-fd-border border-b-0 p-6 px-12 relative zimbra-background"></section>

        {/* Hero Section */}
        <section className="text-center border border-fd-border border-b-0 md:border-b-1 p-12 bg-fd-background backdrop-blur-sm bg-opacity-50">
          <ShieldCheck className="size-8 sm:size-12 md:size-16 text-fd-primary mx-auto mb-4" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mb-2 max-w-2xl mx-auto text-lg text-fd-muted-foreground">
            Last Updated: October 2025
          </p>
          <p className="max-w-2xl mx-auto text-sm text-fd-muted-foreground">
            Your privacy is our priority. Select your version to view the
            privacy policy.
          </p>
        </section>

        {/* Divider */}
        <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background"></section>

        {/* Selection Cards */}
        <section className="border border-fd-border border-b-0 p-12 bg-fd-background backdrop-blur-sm bg-opacity-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plugin Card */}
            <Link
              href="/privacy/plugin"
              className="flex flex-col p-8 border border-fd-border hover:border-fd-primary/50 transition-all bg-fd-background/50 group no-underline"
            >
              <div className="flex items-center justify-center mb-6">
                <Package className="size-8 sm:size-12 md:size-16 text-fd-primary group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="text-2xl font-semibold text-fd-foreground mb-2 text-center">
                Plugin Privacy Policy
              </h2>
              <p className="text-fd-muted-foreground text-center text-sm">
                For Obsidian Users
              </p>
            </Link>

            {/* Desktop Card */}
            <Link
              href="/privacy/desktop"
              className="flex flex-col p-8 border border-fd-border hover:border-fd-primary/50 transition-all bg-fd-background/50 group no-underline"
            >
              <div className="flex items-center justify-center mb-6">
                <Rocket className="size-8 sm:size-12 md:size-16 text-fd-primary group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="text-2xl font-semibold text-fd-foreground mb-2 text-center">
                Desktop Privacy Policy
              </h2>
              <p className="text-fd-muted-foreground text-center text-sm">
                For Desktop Users
              </p>
            </Link>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="border border-fd-border -mb-20 pt-12 px-6 md:px-12 pb-6 relative text-center">
          <p className="text-fd-muted-foreground text-sm mb-4">
            Have questions about privacy?{" "}
            <a
              href="mailto:boninall@taskgenius.md"
              className="text-fd-primary hover:underline"
            >
              Contact us
            </a>{" "}
            or review our{" "}
            <Link href="/terms" className="text-fd-primary hover:underline">
              Terms of Service
            </Link>
            .
          </p>
          <p className="text-fd-muted-foreground text-xs">
            © 2025 Task Genius by Boninall. All rights reserved.
          </p>
        </section>
      </main>
    );
  }

  // Show specific privacy policy page
  const page = privacySource.getPage(slug);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <main className="container md:mx-auto max-w-6xl md:px-4 py-12 md:py-20">
      {/* Header Section */}
      <section className="-mt-20 border border-fd-border border-b-0 p-6 px-12 relative grid-background-small"></section>

      {/* Title Section */}
      <section className="text-left border border-fd-border border-b-0 p-6 bg-fd-background backdrop-blur-sm bg-opacity-50">
        <Link href="/privacy">
          <h1 className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl hover:text-fd-primary cursor-pointer">
            Privacy Policy
          </h1>
        </Link>
      </section>

      <section className="text-left border border-fd-border border-b-1 px-6 pb-2 bg-fd-background backdrop-blur-sm bg-opacity-50">
        <p className="text-fd-muted-foreground text-sm mt-2">
          Last Updated: {page.data.lastUpdated}
        </p>
      </section>

      {/* Content Section */}
      <section className="border border-fd-border border-t-0 border-b-0 md:border-b-1 p-12 bg-fd-background backdrop-blur-sm bg-opacity-50">
        <article className="prose prose-fd max-w-none">
          <MDX />
        </article>
      </section>

      {/* Divider */}
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background"></section>

      {/* Bottom Section */}
      <section className="border border-fd-border -mb-20 pt-12 px-6 md:px-12 pb-6 relative text-center">
        <p className="text-fd-muted-foreground text-sm mb-4">
          Have questions about privacy?{" "}
          <a
            href="mailto:boninall@taskgenius.md"
            className="text-fd-primary hover:underline"
          >
            Contact us
          </a>{" "}
          or review our{" "}
          <Link
            href={`/terms/${page.data.platform === "plugin" ? "plugin" : "desktop"}`}
            className="text-fd-primary hover:underline"
          >
            Terms of Service
          </Link>
          .
        </p>
        <p className="text-fd-muted-foreground text-xs">
          © 2025 Task Genius by Boninall. All rights reserved.
        </p>
      </section>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;

  if (!slug || slug.length === 0) {
    return {
      title: "Privacy Policy - Task Genius",
      description:
        "Privacy Policy for Task Genius Plugin and Desktop Application",
      openGraph: {
        images: "/banner.png",
      },
      twitter: {
        card: "summary_large_image",
        images: "/banner.png",
      },
    };
  }

  const page = privacySource.getPage(slug);
  if (!page) return notFound();

  return {
    title: page.data.title + " - Task Genius",
    description: page.data.description,
    openGraph: {
      images: "/banner.png",
    },
    twitter: {
      card: "summary_large_image",
      images: "/banner.png",
    },
  };
}
