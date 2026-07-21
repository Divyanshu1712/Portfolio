export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Solidity'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'jQuery', 'Figma'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'REST APIs', 'WebSockets', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Azure Functions', 'AWS (EC2, S3)', 'Docker', 'CI/CD Pipelines', 'SSL Configuration'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'Figma', 'Power BI', 'VS Code', 'Postman', 'Adobe XD'],
  },
];
