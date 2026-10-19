import "server-only";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const QUERY = `
  query($username: String!, $from: DateTime, $to: DateTime) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export type Contribution = {
  date: string;
  count: number;
};

type GitHubGraphQLResponse = {
  errors?: unknown;
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: {
            contributionDays: {
              date: string;
              contributionCount: number;
            }[];
          }[];
        };
      };
    };
  };
};

/** Read the public contribution calendar. Tooltips carry the real count. */
export function parseContributionCalendar(html: string): Contribution[] {
  const contributions: Contribution[] = [];
  const contributionDay =
    /data-date="(\d{4}-\d{2}-\d{2})"[\s\S]*?<\/td>\s*<tool-tip\b[^>]*>([^<]*)<\/tool-tip>/g;

  for (const match of html.matchAll(contributionDay)) {
    const date = match[1];
    const label = match[2]?.trim() ?? "";
    const countMatch = /^(\d+)\s+contribution/.exec(label);
    const count = countMatch ? Number(countMatch[1]) : 0;
    if (!date) continue;
    contributions.push({ date, count });
  }

  return contributions;
}

async function fetchPublicContributions(
  username: string,
): Promise<Contribution[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      `https://github.com/users/${encodeURIComponent(username)}/contributions`,
      {
        headers: {
          Accept: "text/html",
          "User-Agent":
            "Mozilla/5.0 (compatible; byrehan.dev/1.0; +https://byrehan.dev)",
        },
        next: { revalidate: 3600 },
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      console.error("GitHub contributions page failed:", response.status);
      return [];
    }

    return parseContributionCalendar(await response.text());
  } catch {
    console.error("GitHub contributions page failed.");
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchGithubData(
  username: string,
): Promise<Contribution[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return fetchPublicContributions(username);
  }

  const now = new Date();
  const from = new Date(now);
  from.setFullYear(now.getFullYear() - 1);

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          username,
          from: from.toISOString(),
          to: now.toISOString(),
        },
      }),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error("GitHub API request failed:", response.status);
      return fetchPublicContributions(username);
    }

    const json: GitHubGraphQLResponse = await response.json();

    if (json.errors) {
      console.error("GitHub API Errors:", json.errors);
      return fetchPublicContributions(username);
    }

    const weeks =
      json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ??
      [];

    const contributions = weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      })),
    );

    return contributions.length > 0
      ? contributions
      : fetchPublicContributions(username);
  } catch {
    console.error("GitHub API request failed.");
    return fetchPublicContributions(username);
  }
}
