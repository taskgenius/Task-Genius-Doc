import { Callout } from "fumadocs-ui/components/callout";
import Link from "next/link";

export const VersionCallout = ({ version }: { version: string }) => {
  return (
    <Callout
      // @ts-ignore
      type="note"
      className="shadow-none bg-transparent zimbra-background p-2 border border-fd-border rounded-md"
    >
      Available since{" "}
      <Link
        href={`https://github.com/quorafind/Obsidian-Task-Genius/releases/tag/${version}`}
        target="_blank"
      >
        <strong className="text-primary">{version}</strong>
      </Link>
    </Callout>
  );
};
