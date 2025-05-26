"use client";

import type { PageTree } from "fumadocs-core/server";
import { SidebarItem as InternalSidebarItem } from "fumadocs-ui/components/layout/sidebar";

const Tags: Record<string, string> = {
  "/docs/task-gutter": "New",
  "/docs/task-view/filter/popover-filter": "New",
  "/docs/task-view/status-view": "Updated",
  "/docs/task-mover": "Updated",
};

export const SidebarItem = ({ item }: { item: PageTree.Item }) => {
  const name = `${item.name}`;
  const tag = Tags[item.url];
  return (
    <InternalSidebarItem
      key={item.url}
      href={item.url}
      external={item.external}
      icon={item.icon}
    >
      <div className="w-full flex flex-row justify-between">
        <p className="flex-grow">{name}</p>
        <p>
          {tag && (
            <span className="ml-0 mb-[-1px] text-xs px-1.5 py-0.5 bg-fd-background border border-fd-border rounded-md">
              {tag}
            </span>
          )}
        </p>
      </div>
    </InternalSidebarItem>
  );
};
