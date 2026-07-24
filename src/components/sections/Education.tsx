'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin, Building2, Award } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { education } from '@/data/education';

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper
      id="education"
      title="Education"
      subtitle="My academic journey and achievements"
    >
      <div ref={ref} className="max-w-5xl mx-auto space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/10 p-3 rounded-xl h-fit group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-base font-medium text-primary/80 mt-0.5">{edu.major}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-full whitespace-nowrap h-fit">
                <Calendar className="w-3.5 h-3.5" />
                {edu.period}
              </span>
            </div>

            {/* Institution + Location */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 ml-0 md:ml-16">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4 text-primary/60 flex-shrink-0" />
                <span className="font-medium text-foreground/80 text-sm">{edu.institution}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary/60 flex-shrink-0" />
                <span className="text-sm">{edu.location}</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="ml-0 md:ml-16">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-primary" />
                Key Achievements & Coursework
              </h4>
              <ul className="space-y-2.5">
                {edu.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.15 + i * 0.08 }}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                  >
                    <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}