export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
}

export async function fetchGitHubProjects(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch GitHub repos');
    
    const repos: GitHubRepo[] = await response.json();
    return repos
      .filter(repo => !repo.fork) // Filter out forked repositories
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
} 