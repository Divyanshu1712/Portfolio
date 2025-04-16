'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  {
    category: 'Programming',
    items: ['Python (Flask, FastAPI, Scripting, Automation)', 'JavaScript (ES6)', 'TypeScript', 'Solidity']
  },
  {
    category: 'Frontend',
    items: ['HTML5', 'CSS3', 'Tailwind CSS', 'React.js', 'jQuery', 'Figma (Wireframing, Prototyping, UX Research)']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'EJS', 'REST APIs', 'FastAPIs', 'MySQL', 'PostgreSQL', 'MongoDB']
  },
  {
    category: 'DevOps & Deployment',
    items: ['AWS (EC2, S3)', 'Docker', 'SSL Configuration']
  },
  {
    category: 'Tools & Technologies',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Power BI', 'Docker', 'Figma', 'Adobe XD']
  }
];

const SkillCard = ({ title, skills }: { title: string; skills: string[] }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <h3 className="text-xl font-semibold mb-4 text-primary">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A comprehensive overview of my technical skills and areas of expertise
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(({ category, items }, index) => (
          <SkillCard
            key={category}
            title={category.charAt(0).toUpperCase() + category.slice(1)}
            skills={items}
          />
        ))}
      </div>
    </section>
  );
} 