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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="skills"
      className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
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
            {/* SYSTEMS, LANGUAGES, AND TOOLS I USE TO BRING IDEAS TO REALITY. */}
          </motion.div>
        </div>

        {/* ── DESKTOP INTERACTIVE ACCORDION GRID (lg and up) ── */}
        <div className="hidden lg:flex flex-row gap-4 h-[520px] items-stretch w-full">
          {skills.map((categoryData, index) => {
            const label = categoryDisplayNames[categoryData.category] || categoryData.category.toUpperCase();
            
            const isAnyHovered = hoveredIndex !== null;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={categoryData.category}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative h-full flex flex-col justify-between bg-card border rounded-[32px] overflow-hidden cursor-pointer transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isHovered 
                    ? 'flex-[5] border-primary/50 bg-primary/8 shadow-[0_0_30px_-8px_oklch(0.72 0.16 210 / 0.25)]' 
                    : isAnyHovered 
                      ? 'flex-[0.4] min-w-[72px] border-border/60 hover:bg-card/85'
                      : 'flex-[1] border-border/60 hover:border-primary/30 hover:bg-card/85'
                }`}
              >
                {/* Background ambient glow inside active card */}
                <div 
                  className={`absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none blur-3xl translate-x-20 -translate-y-20 bg-primary transition-opacity duration-300 ${
                    isHovered ? 'opacity-20' : 'opacity-0'
                  }`} 
                />

                {/* ── CARD CONTENTS ── */}
                <div className="p-8 xl:p-10 flex-grow flex flex-col relative overflow-hidden">
                  
                  {/* Skill List items */}
                  <div 
                    className={`w-full flex-grow flex flex-col transition-all duration-300 ease-out ${
                      isHovered 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4 pointer-events-none absolute inset-0 p-8 xl:p-10'
                    }`}
                  >
                    {isHovered && (
                      <>
                        {/* Section subheader */}
                        <div className="text-[10px] font-bold text-muted-foreground/50 tracking-[0.3em] uppercase mb-8 border-b border-border/20 pb-4">
                          SKILL SET INCLUDES
                        </div>

                        {/* List grid */}
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                          {categoryData.items.map((skill) => (
                            <div key={skill} className="flex items-center gap-3 group">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-200" />
                              <span className="text-base font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-200">
                                {skill}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                </div>

                {/* ── CARD FOOTER ── */}
                <div className="p-8 xl:p-10 pt-0 flex items-end justify-between w-full h-20 relative">
                  
                  {/* Horizontal Label (for expanded or default layout) */}
                  <div 
                    className={`absolute bottom-8 left-8 xl:left-10 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      !isAnyHovered || isHovered 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
                    }`}
                  >
                    <h3 className={`font-black tracking-tight uppercase leading-none select-none transition-all duration-300 ${
                      isHovered ? 'text-4xl xl:text-5xl text-foreground' : 'text-xl xl:text-2xl text-foreground/95'
                    }`}>
                      {label}
                    </h3>
                  </div>

                  {/* Vertical Rotated Label (for shrunken state) */}
                  <div 
                    className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isAnyHovered && !isHovered 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
                    }`}
                  >
                    <span
                      className="text-xs sm:text-sm tracking-[0.25em] font-extrabold uppercase whitespace-nowrap text-muted-foreground/60 select-none hover:text-foreground"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {label}
                    </span>
                  </div>

                  {/* Decorative glowing dot when card is active */}
                  <div 
                    className={`w-2.5 h-2.5 rounded-full bg-foreground/90 glow-primary flex-shrink-0 ml-auto mb-1 transition-all duration-300 ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`} 
                  />
                </div>

              </div>
            );
          })}
        </div>

        {/* ── MOBILE ACCORDION LAYOUT (lg hidden) ── */}
        <div className="lg:hidden flex flex-col gap-4">
          {skills.map((categoryData, index) => {
            const label = categoryDisplayNames[categoryData.category] || categoryData.category.toUpperCase();
            const isActive = hoveredIndex === index;

            return (
              <div
                key={categoryData.category}
                onClick={() => setHoveredIndex(isActive ? null : index)}
                className={`bg-card border rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive ? 'border-primary/50 bg-primary/5' : 'border-border/60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-foreground tracking-tight uppercase">{label}</h3>
                  <span className={`text-xl transition-transform duration-300 ${isActive ? 'rotate-180 text-primary' : 'text-muted-foreground'}`}>
                    ▾
                  </span>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-border/20"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {categoryData.items.map((skill) => (
                          <div key={skill} className="flex items-center gap-2">
                            <span className="w-1.2 h-1.2 rounded-full bg-primary" />
                            <span className="text-sm font-medium text-foreground/80">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}