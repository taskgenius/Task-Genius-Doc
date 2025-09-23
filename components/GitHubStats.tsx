import { Star, Download } from "lucide-react";
import Link from "next/link";

interface GitHubStatsProps {
  owner: string;
  repo: string;
}

interface GitHubRelease {
  assets: Array<{
    download_count: number;
  }>;
}

async function getGitHubStats(
  owner: string,
  repo: string
): Promise<{
  stars: number;
  downloads: number;
}> {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    Accept: "application/vnd.github.v3+json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    // Fetch repository data
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers,
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!repoResponse.ok) {
      throw new Error(`Repository fetch failed: ${repoResponse.status}`);
    }

    const repoData = await repoResponse.json();

    // Fetch releases for download counts
    const releasesResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases`,
      {
        headers,
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    let totalDownloads = 0;

    if (releasesResponse.ok) {
      const releases: GitHubRelease[] = await releasesResponse.json();

      if (Array.isArray(releases)) {
        releases.forEach((release) => {
          if (release.assets && Array.isArray(release.assets)) {
            release.assets.forEach((asset) => {
              totalDownloads += asset.download_count || 0;
            });
          }
        });
      }
    }

    // 补偿因错误操作删除的 9.7.x 之前版本的历史下载量
    // Due to accidental deletion of releases before v9.7.x, add compensation for historical download counts
    const HISTORICAL_DOWNLOADS_COMPENSATION = 56200;
    totalDownloads += HISTORICAL_DOWNLOADS_COMPENSATION;

    return {
      stars: repoData.stargazers_count || 0,
      downloads: totalDownloads,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return {
      stars: 0,
      downloads: 0,
    };
  }
}

function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 100000) {
    const value = (num / 1000).toFixed(1);
    const formattedValue = value.endsWith(".0") ? value.slice(0, -2) : value;
    return `${formattedValue}K`;
  }

  if (num < 1000000) {
    return `${Math.floor(num / 1000)}K`;
  }

  return `${(num / 1000000).toFixed(1)}M`;
}

export default async function GitHubStats({ owner, repo }: GitHubStatsProps) {
  const { stars, downloads } = await getGitHubStats(owner, repo);

  return (
    <Link
      href={`https://github.com/${owner}/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-0 -mb-0.5 rounded-full text-xs text-fd-foreground/70 transition-colors hover:text-fd-foreground"
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
        <span className="font-medium lg:block hidden">
          {owner}/{repo}
        </span>
      </span>
      <span className="flex items-center gap-1">
        <Star className="size-3" aria-hidden="true" />
        {formatNumber(stars)}
      </span>
      {downloads > 0 && (
        <span className="flex items-center gap-1">
          <Download className="size-3" aria-hidden="true" />
          {formatNumber(downloads)}
        </span>
      )}
    </Link>
  );
}
