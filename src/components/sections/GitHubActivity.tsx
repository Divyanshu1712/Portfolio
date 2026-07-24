'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ExternalLink, Github, Code2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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
  const cleanTitle = repo.name.replace(/[-_]/g, ' ');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex flex-col justify-between p-6 bg-card border border-border/60 rounded-2xl
                 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8
                 transition-all duration-300 group"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Code2 className="w-3 h-3" />
            Mini Project
          </span>
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {repo.stargazers_count}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 capitalize mb-2 leading-snug">
          {cleanTitle}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
          {repo.description || 'Experimental mini project and technical prototype created during hands-on learning.'}
        </p>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs text-muted-foreground">
        {repo.language ? (
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            {repo.language}
          </span>
        ) : (
          <span className="text-muted-foreground">Source Code</span>
        )}

        <div className="flex items-center gap-2">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
            >
              Live Demo
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-muted/40 hover:bg-muted text-foreground/80 hover:text-primary transition-colors"
            title="View Code on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
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
      title="Mini Projects & Experiments 🚀"
      subtitle="Public mini projects, technical prototypes, and learning repositories built while exploring new tools and frameworks"
    >
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-44 bg-card border border-border/40 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : repos.length === 0 ? (
          <p className="text-center text-muted-foreground">Could not load repositories.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>

            {repos.length > 6 && (
              <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(!showAll)}
                  className="rounded-full px-6 border-primary/30 hover:border-primary"
                >
                  {showAll ? 'Show Fewer Mini Projects' : `Explore All ${repos.length} Mini Projects`}
                </Button>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" className="gap-2 rounded-full">
                    <Github className="w-4 h-4" />
                    Visit GitHub Profile
                  </Button>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </SectionWrapper>
  );
}
