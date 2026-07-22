'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '@/components/shared/SectionWrapper';

const techStack = [
  'FastAPI', 'React.js', 'Next.js', 'Python', 'TypeScript',
  'PostgreSQL', 'Azure', 'Docker', 'Node.js', 'Solidity',
];

const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Built' },
  { value: '3', label: 'Internships' },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle="A little bit about who I am and what I do"
    >
      <div ref={ref} className="max-w-3xl mx-auto flex flex-col gap-10">

        {/* Bio text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-foreground/80 leading-relaxed text-base sm:text-lg"
        >
          <p>
            Hi, I&apos;m <span className="text-foreground font-semibold">Divyanshu Srivastava</span> —
            a Full Stack Developer with a B.Tech in Computer Science (IoT) from Greater Noida Institute of Technology.
          </p>
          <p>
            I specialize in building <span className="text-primary font-medium">FastAPI backends</span>,{' '}
            <span className="text-primary font-medium">Python automation pipelines</span>, and scalable full-stack
            applications. At BOT Mantra, I ship enterprise-grade systems involving PDF extraction,
            Azure Functions, JWT auth, and real-time dashboards.
          </p>
          <p>
            When I&apos;m not coding, I&apos;m exploring blockchain technology, designing with Figma,
            or writing about my learnings.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-10 py-6 border-y border-border/40"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold gradient-text">{value}</p>
              <p className="text-xs text-muted-foreground mt-1 tracking-wide">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Tech I work with
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/15 hover:bg-primary/20 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
