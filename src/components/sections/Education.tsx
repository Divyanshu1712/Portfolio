'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin, Building2, Award } from 'lucide-react';

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
      'Participated in various technical workshops and hackathons',
      'Received Best Project Award from the Central Project & Research Committee for the Blockchain Lottery System project'
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
      className="bg-card p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/30 group"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
        <div className="flex gap-4">
          <div className="mt-1 bg-primary/10 p-3 rounded-full h-fit group-hover:bg-primary/20 transition-colors">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{education.degree}</h3>
            <p className="text-lg font-medium text-primary/80 mt-1">{education.major}</p>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full h-fit whitespace-nowrap">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{education.period}</span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 ml-0 md:ml-16">
        <div className="flex items-center text-muted-foreground">
          <Building2 className="w-4 h-4 mr-2 text-primary/60" />
          <span className="font-medium text-foreground/80">{education.institution}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2 text-primary/60" />
          <span>{education.location}</span>
        </div>
      </div>

      <div className="ml-0 md:ml-16">
        <h4 className="text-sm font-semibold text-foreground/90 mb-3 flex items-center">
          <Award className="w-4 h-4 mr-2 text-primary" />
          Key Achievements & Coursework
        </h4>
        <ul className="space-y-2.5">
          {education.achievements.map((achievement: string, i: number) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
              className="flex items-start text-muted-foreground group/item"
            >
              <span className="text-primary/50 mr-3 mt-1 group-hover/item:text-primary transition-colors">•</span>
              <span className="leading-relaxed group-hover/item:text-foreground/90 transition-colors">{achievement}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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