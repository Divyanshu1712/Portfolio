'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Award, ExternalLink } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { achievements } from '@/data/content';

const typeColors = {
  award: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  certification: 'text-primary bg-primary/10 border-primary/20',
  recognition: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
};

const typeIcons = {
  award: Trophy,
  certification: Award,
  recognition: Award,
};

export default function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (achievements.length === 0) return null;

  return (
    <SectionWrapper
      id="achievements"
      title="Achievements"
      subtitle="Recognition, awards, and certifications along the way"
    >
      <div ref={ref} className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
        {achievements.map((item, index) => {
          const Icon = typeIcons[item.type];
          const colorClasses = typeColors[item.type];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border/60 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${colorClasses}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
                      {item.title}
                    </h3>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View achievement"
                        className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-primary/80 font-medium mb-2">{item.issuer}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  <span className="inline-block mt-3 text-xs text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
                    {item.date}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
