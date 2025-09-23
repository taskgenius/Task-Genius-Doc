import Link from "next/link";
import { fetchGitHubStats } from "@/lib/github";

export default async function LatestVersion() {
  const stats = await fetchGitHubStats("Quorafind", "Obsidian-Task-Genius");
  const version = stats.latestVersion || "1.0.0";

  return (
    <>
      <Link
        href={`https://github.com/Quorafind/Obsidian-Task-Genius/releases/tag/${
          stats.latestVersion || "latest"
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={"text-sm text-fd-muted-foreground"}>
          Latest version:{" "}
        </span>
        <span className={"text-sm font-medium"}>{version}</span>
      </Link>
    </>
  );
}
