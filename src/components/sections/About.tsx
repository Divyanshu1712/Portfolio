'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative">
            {/* Glow behind image */}
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-2xl scale-90 translate-y-4" />
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden ring-2 ring-primary/20">
              <Image
                src="/Profile-avtar.jpg"
                alt="Divyanshu Srivastava"
                fill
                sizes="(max-width: 640px) 256px, 320px"
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzExMWEyYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzYzYjNlZCI+RGl2eWFuc2h1PC90ZXh0Pjwvc3ZnPg==';
                }}
              />
            </div>
            {/* Floating stats */}
            <div className="absolute -bottom-5 -right-5 bg-card border border-border/60 rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Currently at</p>
              <p className="text-sm font-semibold text-primary">BOT Mantra</p>
            </div>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <div className="space-y-4 text-foreground/80 leading-relaxed">
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
          </div>

          {/* Stats */}
          <div className="flex gap-6 py-4 border-y border-border/40">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold gradient-text">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Tech I work with
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/15"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}