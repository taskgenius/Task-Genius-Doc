import { roadmapSource } from "@/lib/source";
import type { RoadmapPageType } from "@/lib/source";
import { RoadmapItemCard } from "@/components/roadmap/roadmap-item-card";
import Link from "next/link";
// Updated interface to match fumadocs structure (simplified)
// interface RoadmapPageData {
//   title: string;
//   description?: string;
//   status: "working-on" | "designed" | "backlog";
//   docsUrl?: string;
// }

// Type for a page from roadmap source
// interface RoadmapDoc extends Page {
//   data: RoadmapPageData;
// }

export default function RoadmapPage() {
  const allItems: RoadmapPageType[] = roadmapSource.getPages();

  const workingOnItems = allItems.filter(
    (item) => item.data.status === "working-on"
  );
  const shippedItems = allItems
    .filter((item) => item.data.status === "shipped")
    .sort((a, b) => {
      if (!a.data.date || !b.data.date) {
        return 0;
      }
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    });
  const backlogItems = allItems.filter(
    (item) => item.data.status === "backlog"
  );

  return (
    <main className="container h-screen flex flex-col md:mx-auto max-w-6xl md:px-4 py-12 md:py-20 ">
      <section className="-mt-20 border border-fd-border border-b-0 grid-background-small p-12 px-12 relative"></section>
      <section className="text-left border border-fd-border md:border-b border-b-0 px-4 py-6 md:p-6 bg-fd-background backdrop-blur-sm bg-opacity-50">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
          Roadmap
        </h1>
        <p className="text-fd-muted-foreground">
          Here is a list of features we are currently working on, have designed,
          or are in the backlog.
        </p>
      </section>
      <section className="border border-fd-border border-t-0 p-0 md:p-6 px-12 zimbra-background"></section>
      <section
        id="working-on"
        className="relative flex flex-col md:flex-row md:space-x-6 md:justify-end space-y-2 w-full md:space-y-0 flex-1 [&:not(:last-child)]:border-b border-fd-border bg-fd-background border-x px-4 md:px-8 py-6 pt-12 md:pt-4 md:pl-24"
      >
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">01</span>{" "}
          Working On
        </div>
        {workingOnItems.length > 0 ? (
          <div className="flex flex-col gap-6 w-full max-w-3xl">
            {workingOnItems.map((item) => (
              <RoadmapItemCard key={item.url} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Nothing currently in progress.
          </p>
        )}
      </section>
      <section className="border border-fd-border border-t-0 border-b-0 md:border-b p-0 md:p-6 px-12 zimbra-background bg-fd-background"></section>
      <section
        id="backlog"
        className="relative flex flex-col md:flex-row md:space-x-6 md:justify-end space-y-2 w-full md:space-y-0 flex-1 [&:not(:last-child)]:border-b border-fd-border  bg-fd-background border-x px-4 md:px-8 py-6 pt-12 md:pt-4 md:pl-24"
      >
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">02</span>{" "}
          Backlog
        </div>
        {backlogItems.length > 0 ? (
          <div className="flex flex-col gap-6 w-full max-w-3xl">
            {backlogItems.map((item) => (
              <RoadmapItemCard key={item.url} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">The backlog is empty for now.</p>
        )}
      </section>
      <section className="border border-fd-border border-t-0 border-b-0 md:border-b p-0 md:p-6 px-12 zimbra-background bg-fd-background"></section>
      <section
        id="shipped"
        className="relative flex flex-col md:flex-row md:space-x-6 md:justify-end space-y-2 w-full md:space-y-0 flex-1 md:[&:not(:last-child)]:border-b border-fd-border  bg-fd-background border-x px-4 md:px-8 py-6 pt-12 md:pt-4 md:pl-24"
      >
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">03</span>{" "}
          Shipped
        </div>
        {shippedItems.length > 0 ? (
          <div className="flex flex-col gap-6 w-full max-w-3xl">
            {shippedItems.map((item) => (
              <RoadmapItemCard key={item.url} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No features are in the shipped phase.
          </p>
        )}
      </section>

      <section className="absolute inset-0 -z-10 border border-fd-border grid-background max-h-1/2 top-2/5 border-b md:block hidden"></section>
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background bg-fd-background"></section>
      <section className="border border-fd-border -mb-20 pt-12 px-6 md:px-12 pb-6 relative text-right">
        <div className="prose prose-fd max-w-none">
          <Link
            href="https://boninall.com"
            className="text-fd-muted-foreground hover:text-fd-primary no-underline"
          >
            © {new Date().getFullYear()} Boninall(Quorafind)
          </Link>{" "}
        </div>
      </section>
    </main>
  );
}
