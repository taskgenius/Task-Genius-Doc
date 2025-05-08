import Link from "next/link";
import { File, FilesIcon, FileSymlink } from "lucide-react";
import type { RoadmapPageType } from "@/lib/source"; // Assuming this type is correctly defined and exported

export function RoadmapItemCard({ item }: { item: RoadmapPageType }) {
  return (
    <div className="block rounded-md border bg-fd-background p-6 py-4 md:py-6 text-fd-card-foreground transition-colors relative">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{item.data.title}</h3>
      </div>
      {item.data.description && (
        <p className="mt-2 text-sm text-fd-muted-foreground">
          {item.data.description}
        </p>
      )}
      {item.data.docsUrl && (
        <Link
          href={item.data.docsUrl}
          title="View Documentation"
          className="text-fd-muted-foreground hover:text-fd-primary absolute bottom-3 right-4"
        >
          <FileSymlink className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}
