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
  // Add blog posts here or auto-fetch from dev.to / hashnode API
  // {
  //   title: 'Building PDF pipelines with Python',
  //   excerpt: 'How I extracted structured data from complex PDFs at BOT Mantra...',
  //   date: '2025-06-01',
  //   tags: ['Python', 'PDF', 'Automation'],
  //   url: '#',
  //   readTime: '5 min read',
  // },
];
