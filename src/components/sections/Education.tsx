'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface EducationItem {
  degree: string;
  major: string;
  institution: string;
  period: string;
  location: string;
  achievements: string[];
}

const education: EducationItem[] = [
  {
    degree: 'Bachelor of Technology',
    major: 'Computer Science and Engineering (Internet Of Things)',
    institution: 'Greater Noida Institute of Technology',
    period: '2020 - 2024',
    location: 'Greater Noida',
    achievements: [
      'Specialized in Internet of Things (IoT)',
      'Completed coursework in advanced programming, data structures, and algorithms',
      'Participated in various technical workshops and hackathons'
    ]
  },
];

const EducationCard = ({ education, index }: { education: EducationItem, index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-primary">{education.degree}</h3>
          <p className="text-lg font-medium">{education.major}</p>
        </div>
        <span className="text-sm text-muted-foreground">{education.period}</span>
      </div>
      
      <div className="mb-4">
        <h4 className="text-lg font-medium">{education.institution}</h4>
        <p className="text-muted-foreground">{education.location}</p>
      </div>

      <ul className="space-y-2">
        {education.achievements.map((achievement: string, i: number) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
            className="flex items-start"
          >
            <span className="text-primary mr-2">•</span>
            {achievement}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="section-title">Education</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          My academic journey and achievements
        </p>
      </motion.div>

      <div className="w-full space-y-8">
        {education.map((edu, index) => (
          <EducationCard key={edu.institution} education={edu} index={index} />
        ))}
      </div>
    </section>
  );
} 