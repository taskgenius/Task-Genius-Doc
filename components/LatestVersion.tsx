import Link from "next/link";

const TARGET_URL =
  "https://api.github.com/repos/Quorafind/Obsidian-Task-Genius/releases/latest";

async function getLatestVersion() {
  const response = await fetch(TARGET_URL, { cache: "no-store" });
  const data = await response.json();
  return data.tag_name;
}

export default async function LatestVersion() {
  const version = await getLatestVersion();

  return (
    <>
      <Link
        href={`https://github.com/Quorafind/Obsidian-Task-Genius/releases/tag/${version}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={"text-sm text-fd-muted-foreground"}>
          Latest version:{" "}
        </span>
        <span className={"text-sm font-medium"}>{version || "1.0.0"}</span>
      </Link>
    </>
  );
}
