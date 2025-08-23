"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const TARGET_URL =
  "https://api.github.com/repos/Quorafind/Obsidian-Task-Genius/releases/latest";

export default function LatestVersion() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLatestVersion() {
      try {
        const response = await fetch(TARGET_URL, { cache: "no-store" });
        const data = await response.json();
        setVersion(data.tag_name);
      } catch (error) {
        console.error("Failed to fetch latest version:", error);
      }
    }

    fetchLatestVersion();
  }, []);

  return (
    <>
      <Link
        href={`https://github.com/Quorafind/Obsidian-Task-Genius/releases/tag/${
          version || "latest"
        }`}
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
