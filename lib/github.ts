interface GitHubRepoData {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  totalDownloads: number;
}

interface GitHubRelease {
  tag_name: string;
  assets: Array<{
    download_count: number;
  }>;
}

export interface GitHubStats {
  stars: number;
  forks: number;
  issues: number;
  downloads: number;
  latestVersion: string | null;
  lastUpdated: string;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  Accept: "application/vnd.github.v3+json",
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
};

export async function fetchGitHubStats(
  owner: string,
  repo: string
): Promise<GitHubStats> {
  try {
    // Fetch repository data
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers,
        next: { revalidate: 86400 }, // Revalidate every 24 hours
      }
    );

    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status}`);
    }

    const repoData: GitHubRepoData = await repoResponse.json();

    // Fetch releases data for download counts
    const releasesResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases`,
      {
        headers,
        next: { revalidate: 86400 }, // Revalidate every 24 hours
      }
    );

    let totalDownloads = 0;
    let latestVersion: string | null = null;

    if (releasesResponse.ok) {
      const releases: GitHubRelease[] = await releasesResponse.json();

      if (Array.isArray(releases) && releases.length > 0) {
        // Get latest version from first release
        latestVersion = releases[0].tag_name;

        // Calculate total downloads from all releases
        releases.forEach((release) => {
          if (release.assets && Array.isArray(release.assets)) {
            release.assets.forEach((asset) => {
              totalDownloads += asset.download_count || 0;
            });
          }
        });
      }
    }

    return {
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      issues: repoData.open_issues_count || 0,
      downloads: totalDownloads,
      latestVersion,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);

    // Return default values if fetch fails
    return {
      stars: 0,
      forks: 0,
      issues: 0,
      downloads: 0,
      latestVersion: null,
      lastUpdated: new Date().toISOString(),
    };
  }
}