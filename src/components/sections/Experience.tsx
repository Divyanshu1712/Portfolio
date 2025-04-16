'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences: ExperienceItem[] = [
  {
    role: 'UI/UX DESIGNING Intern',
    company: 'GloriaVita CraftTech Solutions',
    period: 'July 2024 - October 2024',
    location: 'Remote',
    achievements: [
      'Redesigned the ViDesh Tour website, improving user flow efficiency by 30-35% through better navigation and information architecture',
      'Utilized Figma for wireframing, prototyping, and UI enhancements, ensuring a seamless user experience',
      'Conducted UX research to align design decisions with user needs and preferences',
      'Developed visually engaging assets to maintain brand consistency and enhance user interaction',
      'Leveraged analytics to refine designs, optimizing user engagement and usability'
    ],
    skills: ['Figma', 'Adobe XD', 'UX Research', 'Information Architecture', 'Wireframing', 'Prototyping', 'Visual Communication']
  },
  {
    role: 'Design Engineer Intern',
    company: 'Schneider Electric',
    period: 'July 2023 - August 2023',
    location: 'Remote',
    achievements: [
      'Conducted R&D in IoT automation to enhance VRV AC system efficiency and performance',
      'Developed robust Python scripts for real-time IoT data ingestion, transformation, and automation workflows',
      'Used Python to interface with device communication protocols and streamline data exchange pipelines',
      'Engineered a system integration device that improved two-way communication and reduced energy consumption by 15%',
      'Applied data analysis and protocol optimization techniques to boost automation efficiency',
      'Collaborated with cross-functional teams to innovate and deploy high-impact automation solutions'
    ],
    skills: ['Python', 'IoT', 'Automation', 'Research', 'Scripting', 'Data Analysis']
  }
];

const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0], index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative pl-8 pb-8 ${index !== experiences.length - 1 ? 'border-l-2 border-primary/20' : ''}`}
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
      <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-primary">{experience.role}</h3>
          <span className="text-sm text-muted-foreground">{experience.period}</span>
        </div>
        <h4 className="text-lg font-medium mb-2">{experience.company}</h4>
        <p className="text-muted-foreground mb-4">{experience.description}</p>
        <ul className="space-y-2">
          {experience.achievements.map((achievement, i) => (
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
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="section-title">Professional Experience</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A journey through my professional growth and achievements
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.company} experience={experience} index={index} />
        ))}
      </div>
    </section>
  );
} 