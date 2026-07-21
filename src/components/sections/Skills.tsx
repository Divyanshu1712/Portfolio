'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { skills } from '@/data/skills';

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skills[0].category);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const activeSkills = skills.find((s) => s.category === activeTab)?.items ?? [];

  return (
    <SectionWrapper
      id="skills"
      title="Skills & Expertise"
      subtitle="A comprehensive overview of my technical skills and areas of expertise"
    >
      <div ref={ref} className="max-w-4xl mx-auto">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {skills.map((s) => (
            <button
              key={s.category}
              onClick={() => setActiveTab(s.category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === s.category
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40'
              }`}
            >
              {s.category}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {activeSkills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="group px-4 py-2 rounded-xl bg-card border border-border/60 text-sm font-medium text-foreground/80
                         hover:border-primary/50 hover:bg-primary/8 hover:text-primary
                         transition-all duration-200 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* All skills summary cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(({ category, items }, idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setActiveTab(category)}
              className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                activeTab === category
                  ? 'border-primary/50 bg-primary/8'
                  : 'border-border/60 bg-card hover:border-primary/30 hover:bg-card/80'
              }`}
            >
              <h3 className={`text-sm font-semibold mb-3 ${activeTab === category ? 'text-primary' : 'text-foreground/90'}`}>
                {category}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {items.slice(0, 4).join(' · ')}{items.length > 4 ? ` +${items.length - 4} more` : ''}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}