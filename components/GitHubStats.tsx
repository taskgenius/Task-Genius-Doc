"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Download } from "lucide-react";

interface GitHubStatsProps {
  owner: string;
  repo: string;
}

interface RepoData {
  stargazers_count: number;
  totalDownloads: number;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
}

export default function GitHubStats({ owner, repo }: GitHubStatsProps) {
  const [stats, setStats] = useState<RepoData>({
    stargazers_count: 0,
    totalDownloads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch repository data
        const repoResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );
        const repoData = await repoResponse.json();

        // Fetch releases data for download counts
        const releasesResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/releases`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );
        const releases = await releasesResponse.json();

        // Calculate total downloads
        let totalDownloads = 0;
        if (Array.isArray(releases)) {
          releases.forEach((release: any) => {
            if (release.assets && Array.isArray(release.assets)) {
              release.assets.forEach((asset: any) => {
                totalDownloads += asset.download_count || 0;
              });
            }
          });
        }

        setStats({
          stargazers_count: repoData.stargazers_count || 0,
          totalDownloads: totalDownloads,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [owner, repo]);

  return (
    <Link
      href={`https://github.com/${owner}/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-0 rounded-full text-xs text-fd-foreground/70 transition-colors hover:text-fd-foreground hover:bg-fd-muted/50 border border-fd-border/50"
    >
      <span className="hidden sm:inline-flex items-center gap-2">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-3.5"
        >
          <path
            d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">
          {owner}/{repo}
        </span>
      </span>
      {loading ? (
        <span className="text-fd-muted-foreground">Loading...</span>
      ) : (
        <>
          <span className="flex items-center gap-1">
            <Star className="size-3" aria-hidden="true" />
            {formatNumber(stats.stargazers_count)}
          </span>
          {stats.totalDownloads > 0 && (
            <span className="flex items-center gap-1">
              <Download className="size-3" aria-hidden="true" />
              {formatNumber(stats.totalDownloads)}
            </span>
          )}
        </>
      )}
    </Link>
  );
}
