'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, ArrowRight, Rss } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { blogPosts } from '@/data/content';

export default function Blog() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Show a "coming soon" state if no posts are available
  if (blogPosts.length === 0) {
    return (
      <SectionWrapper
        id="blog"
        title="Blog & Writing"
        subtitle="Thoughts on development, automation, and technology"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center py-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
            <Rss className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Writing coming soon</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            I&apos;m working on articles about FastAPI, Python automation, and full-stack development.
            Stay tuned — or follow me on Twitter for updates.
          </p>
          <a href="https://x.com/Divyans19896602" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              Follow on Twitter / X
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="blog"
      title="Blog & Writing"
      subtitle="Thoughts on development, automation, and technology"
    >
      <div
        ref={ref}
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {blogPosts.map((post, index) => (
          <motion.a
            key={index}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group flex flex-col bg-card border border-border/60 rounded-2xl p-5
                       hover:border-primary/40 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300"
          >
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary border border-primary/15 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-2 flex-grow leading-snug">
              {post.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              <span>{post.date}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
