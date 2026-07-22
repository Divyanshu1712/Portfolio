'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '@/data/skills';

// Helper to map category names to clean short uppercase display names
const categoryDisplayNames: Record<string, string> = {
  'Languages': 'LANGUAGES',
  'Frontend': 'FRONTEND',
  'Backend': 'BACKEND',
  'Cloud & DevOps': 'DEVOPS',
  'Tools': 'DESIGN',
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skills[1].category); // Default to Frontend or Backend
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const activeSkills = skills.find((s) => s.category === activeTab)?.items ?? [];
  const displayName = categoryDisplayNames[activeTab] || activeTab.toUpperCase();

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div ref={ref} className="w-full">
        
        {/* ── HEADER ROW ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-border/20 pb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter uppercase text-foreground leading-none"
            >
              TECHNICAL
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter uppercase text-muted-foreground/35 italic leading-none mt-1"
            >
              Expertise
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.6 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm font-mono tracking-widest text-muted-foreground max-w-xs md:text-right"
          >
            // SYSTEMS, LANGUAGES, AND TOOLS I USE TO BRING IDEAS TO REALITY.
          </motion.div>
        </div>

        {/* ── MAIN LAYOUT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Vertical capsule tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 xl:col-span-4 flex flex-row lg:flex-row gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none"
          >
            <div className="flex lg:flex-row gap-3 w-full justify-between min-w-[320px] lg:min-w-0 h-[380px] lg:h-[480px]">
              {skills.map((s) => {
                const label = categoryDisplayNames[s.category] || s.category.toUpperCase();
                const isActive = activeTab === s.category;

                return (
                  <button
                    key={s.category}
                    onClick={() => setActiveTab(s.category)}
                    className={`flex-1 flex flex-col items-center justify-center rounded-[32px] border transition-all duration-300 relative group overflow-hidden ${
                      isActive
                        ? 'border-primary/50 bg-primary/8 shadow-[0_0_24px_-8px_oklch(0.72 0.16 210 / 0.25)]'
                        : 'border-border/60 bg-card hover:border-primary/30 hover:bg-card/85'
                    }`}
                  >
                    {/* Vertical label text */}
                    <span
                      className={`text-sm tracking-[0.25em] font-extrabold uppercase whitespace-nowrap transition-colors duration-350 select-none ${
                        isActive ? 'text-primary' : 'text-muted-foreground/70 group-hover:text-foreground'
                      }`}
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {label}
                    </span>

                    {/* Active glowing indicator light */}
                    {isActive && (
                      <span className="absolute bottom-6 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Display Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-7 xl:col-span-8"
          >
            <div className="relative h-full flex flex-col justify-between bg-card border border-border/60 rounded-[32px] p-8 sm:p-12 xl:p-14 overflow-hidden min-h-[380px] lg:min-h-[480px]">
              
              {/* Background ambient glow inside card */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl translate-x-20 -translate-y-20 bg-primary" />
              
              {/* Card top subheader */}
              <div>
                <div className="text-[10px] font-bold text-muted-foreground/50 tracking-[0.3em] uppercase mb-8 border-b border-border/20 pb-4">
                  SKILL SET INCLUDES
                </div>

                {/* Skill List items */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8"
                >
                  {activeSkills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-200" />
                      <span className="text-base font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-200">
                        {skill}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Card bottom footer */}
              <div className="flex items-end justify-between mt-8">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground uppercase leading-none select-none">
                    {displayName}
                  </h3>
                </motion.div>

                {/* Decorative dot from screenshot */}
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/90 glow-primary" />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}