"use client";
// This page demonstrates fetching GitHub projects using the fetchGitHubProjects API.
// Replace `your-username` with the GitHub username you want to display projects for.

import React, { useEffect, useState } from "react";
import { fetchGitHubProjects, GitHubRepo } from "@/lib/github";

export default function GitHubTestPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with the GitHub username you want to test.
  const username = "Divyanshu1712";

  useEffect(() => {
    async function loadRepos() {
      try {
        const data = await fetchGitHubProjects(username);
        setRepos(data);
      } catch (e: unknown) {
        setError((e as Error).message ?? "Unexpected error");
      } finally {
        setLoading(false);
      }
    }
    loadRepos();
  }, [username]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-2xl">Loading …</div>;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <main className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        GitHub Projects for {username}
      </h1>
      {repos.length === 0 ? (
        <p className="text-center text-gray-600">No public repositories found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <li
              key={repo.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-semibold text-blue-600 hover:underline"
              >
                {repo.name}
              </a>
              {repo.description && (
                <p className="mt-2 text-gray-700">{repo.description}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-500">
                <span>⭐ {repo.stargazers_count}</span>
                <span>{repo.language}</span>
                <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
