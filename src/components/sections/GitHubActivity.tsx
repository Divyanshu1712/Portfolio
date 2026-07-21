'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, GitFork, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { fetchGitHubProjects, type GitHubRepo } from '@/lib/github';
import { githubUsername, socialLinks } from '@/data/social';

const langColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Solidity: '#AA6746',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
};

const RepoCard = ({ repo, index }: { repo: GitHubRepo; index: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const color = langColors[repo.language] ?? '#6b7280';

  return (
    <motion.a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="flex flex-col p-5 bg-card border border-border/60 rounded-xl
                 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/8
                 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
          {repo.name}
        </h3>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors duration-200" />
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed flex-grow mb-4 line-clamp-2">
        {repo.description || 'No description provided.'}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3" />
          {repo.stargazers_count}
        </span>
      </div>
    </motion.a>
  );
};

export default function GitHubActivity() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchGitHubProjects(githubUsername).then((data) => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  const displayed = showAll ? repos : repos.slice(0, 6);

  return (
    <SectionWrapper
      id="github"
      title="Open Source"
      subtitle="My public repositories and open source contributions on GitHub"
    >
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-card border border-border/40 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : repos.length === 0 ? (
        <p className="text-center text-muted-foreground">Could not load repositories.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayed.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>

          {repos.length > 6 && (
            <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Show Less' : `Show All ${repos.length} Repos`}
              </Button>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="gap-2">
                  <Github className="w-4 h-4" />
                  Visit GitHub Profile
                </Button>
              </a>
            </div>
          )}
        </>
      )}
    </SectionWrapper>
  );
}
