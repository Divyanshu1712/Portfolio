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
        <div className="bg-card border border-border/60 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
            <div>
              <h3 className="text-lg font-bold text-primary leading-tight">{experience.role}</h3>
              <p className="text-base font-semibold text-foreground/90 mt-0.5">{experience.company}</p>
            </div>
            <div className="flex flex-col gap-1 sm:items-end flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-2.5 py-1 rounded-full">
                <Calendar className="w-3 h-3" />
                {experience.period}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {experience.location}
              </span>
            </div>
          </div>

          {/* Achievements */}
          <ul className="space-y-2 mb-5">
            {experience.achievements.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.15 + i * 0.06 }}
                className="flex items-start gap-2.5 text-sm text-foreground/75 leading-relaxed"
              >
                <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                {item}
              </motion.li>
            ))}
          </ul>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/15"
              >
                {skill}
              </span>
            ))}
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
      subtitle="A journey through my professional growth and achievements"
    >
      <div className="max-w-3xl mx-auto">
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.company} experience={experience} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}