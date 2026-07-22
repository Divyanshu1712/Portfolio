'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import Layout from '@/components/layout/Layout';
import { blogPosts } from '@/data/content';
import { twitterUsername } from '@/data/social';
import { Clock, Rss } from 'lucide-react';

export default function BlogPage() {
  const { theme } = useTheme();

  useEffect(() => {
    // Load Twitter script dynamically
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    script.setAttribute('async', 'true');
    script.setAttribute('charset', 'utf-8');
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <Layout>
      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="border-b border-border/20 pb-8 mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase mb-2">
            Blog & Updates
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            My articles on API architecture, workflow automation, and real-time backend updates from Twitter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Blog posts list */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2 text-foreground/90">
              <Rss className="w-5 h-5 text-primary" />
              Latest Articles
            </h2>
            
            {blogPosts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No articles published yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <a
                    key={post.title}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col bg-card border border-border/60 rounded-3xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300"
                  >
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-semibold rounded-md bg-primary/10 text-primary border border-primary/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto border-t border-border/20 pt-4">
                      <span className="flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                      <span className="flex-shrink-0">{post.date}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Twitter embed Feed */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <div className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col h-[520px]">
              <h2 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-2 border-b border-border/20 pb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Latest Tweets
              </h2>
              
              <div className="flex-grow overflow-y-auto pr-1 w-full relative">
                {/* Loader showing before timeline resolves */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40 gap-3">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono">Fetching X.com feed...</span>
                </div>
                
                <a
                  className="twitter-timeline relative z-10 w-full"
                  data-theme={theme === 'dark' ? 'dark' : 'light'}
                  data-height="420"
                  data-chrome="noheader nofooter noborder transparent scrollbar"
                  href={`https://twitter.com/${twitterUsername}?ref_src=twsrc%5Etfw`}
                >
                  Tweets by @{twitterUsername}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
