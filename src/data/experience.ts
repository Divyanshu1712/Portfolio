export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description?: string;
  achievements: string[];
  skills: string[];
}

export const experiences: ExperienceItem[] = [
  {
    role: 'Associate Software Engineer (Full Stack)',
    company: 'BOT Mantra',
    period: 'Apr 2025 - Present',
    location: 'Bengaluru, India',
    achievements: [
      'Built and deployed Azure Functions powering backend workflows and enterprise automation systems.',
      'Developed Python-based PDF extraction pipelines converting complex documents into structured JSON while preserving layout fidelity.',
      'Designed and implemented an automated PDF-to-Excel conversion engine, reducing manual processing effort significantly.',
      'Implemented JWT authentication, refresh-token flows, RBAC, and secure session management.',
      'Built real-time dashboards and scalable backend services using FastAPI, PostgreSQL, React.js, and WebSockets.',
      'Developed full-stack enterprise applications using React.js, Tailwind CSS, FastAPI, and PostgreSQL.',
      'Managed CI/CD pipelines and Azure deployments for reliable production releases.',
      'Collaborated with cross-functional teams in Agile environments to improve system scalability and performance.',
    ],
    skills: ['Azure Functions', 'Python', 'FastAPI', 'React.js', 'PostgreSQL', 'CI/CD', 'WebSockets'],
  },
  {
    role: 'UI/UX DESIGNING Intern',
    company: 'GloriaVita CraftTech Solutions',
    period: 'July 2024 - October 2024',
    location: 'Remote',
    achievements: [
      'Redesigned the ViDesh Tour website, improving user flow efficiency by 30-35% through better navigation and information architecture.',
      'Utilized Figma for wireframing, prototyping, and UI enhancements, ensuring a seamless user experience.',
      'Conducted UX research to align design decisions with user needs and preferences.',
      'Developed visually engaging assets to maintain brand consistency and enhance user interaction.',
      'Leveraged analytics to refine designs, optimizing user engagement and usability.',
    ],
    skills: ['Figma', 'Adobe XD', 'UX Research', 'Information Architecture', 'Wireframing', 'Prototyping', 'Visual Communication'],
  },
  {
    role: 'Design Engineer Intern',
    company: 'Schneider Electric',
    period: 'July 2023 - August 2023',
    location: 'Remote',
    achievements: [
      'Conducted R&D in IoT automation to enhance VRV AC system efficiency and performance.',
      'Developed robust Python scripts for real-time IoT data ingestion, transformation, and automation workflows.',
      'Used Python to interface with device communication protocols and streamline data exchange pipelines.',
      'Engineered a system integration device that improved two-way communication and reduced energy consumption by 15%.',
      'Applied data analysis and protocol optimization techniques to boost automation efficiency.',
      'Collaborated with cross-functional teams to innovate and deploy high-impact automation solutions.',
    ],
    skills: ['Python', 'IoT', 'Automation', 'Research', 'Scripting', 'Data Analysis'],
  },
];
