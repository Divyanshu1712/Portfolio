export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description: string;
  type: 'award' | 'certification' | 'recognition';
  link?: string;
}

export const achievements: Achievement[] = [
  {
    title: 'Best Project Award',
    issuer: 'Greater Noida Institute of Technology — Central Project & Research Committee',
    date: '2024',
    description: 'Received Best Project Award for the Blockchain Lottery System (BlockWin) — a decentralized transparent lottery built on Ethereum.',
    type: 'award',
    link: 'https://github.com/Divyanshu1712/Lottery-system-using-Blockchain',
  },
  // Add more achievements / certifications here
];

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  // Add real testimonials when available
  // {
  //   name: 'Jane Doe',
  //   role: 'Senior Engineer',
  //   company: 'BOT Mantra',
  //   content: 'Divyanshu is an exceptional developer...',
  // },
];

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  url: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: 'Scaling Python Automation Pipelines: A Case Study on PDF Data Extraction',
    excerpt: 'An in-depth look at how we built a highly reliable PDF processing pipeline, extracting tables and key fields from unstructured documents using Python libraries.',
    date: 'July 2026',
    tags: ['Python', 'Automation', 'PDFs'],
    url: 'https://github.com/Divyanshu1712',
    readTime: '6 min read',
  },
  {
    title: 'Why FastAPI is My Go-To Framework for Backend Engineering',
    excerpt: 'Comparing performance, developer experience, and typing validations between FastAPI, Flask, and Express.js in production environments.',
    date: 'June 2026',
    tags: ['FastAPI', 'Python', 'Backend'],
    url: 'https://github.com/Divyanshu1712',
    readTime: '4 min read',
  },
];
