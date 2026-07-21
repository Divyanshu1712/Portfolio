'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className = '',
}: SectionWrapperProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id={id}
      className={`py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-14 sm:mb-20"
      >
        <h2 className="section-title gradient-text inline-block mb-3">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            {subtitle}
          </p>
        )}
      </motion.div>

      {children}
    </section>
  );
}
