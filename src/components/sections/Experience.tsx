'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { experiences } from '@/data/experience';

const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0]; index: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const isLast = index === experiences.length - 1;

  return (
    <div ref={ref} className="relative flex gap-6">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.15 }}
          className="w-10 h-10 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center flex-shrink-0 z-10"
        >
          <Briefcase className="w-4 h-4 text-primary" />
        </motion.div>
        {!isLast && <div className="w-px flex-1 bg-border/60 mt-3" />}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className={`flex-1 ${isLast ? 'pb-0' : 'pb-10'}`}
      >
          <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border/40">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {experience.role}
              </h3>
              <p className="text-base font-semibold text-primary mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                {experience.company}
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-col gap-2 sm:items-end flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                {experience.period}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5" />
                {experience.location}
              </span>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Key Contributions & Accomplishments
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {experience.achievements.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.15 + i * 0.04 }}
                  className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed bg-muted/20 border border-border/30 p-3 rounded-xl"
                >
                  <span className="text-primary mt-0.5 font-bold flex-shrink-0">▸</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
              Technologies & Tools Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Experience() {
  return (
    <SectionWrapper
      id="experience"
      title="Professional Experience"
      subtitle="A journey through my professional growth, engineering roles, and achievements"
    >
      <div className="max-w-5xl mx-auto">
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.company} experience={experience} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}