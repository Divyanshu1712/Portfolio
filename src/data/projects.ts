export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: 'BlockWin: Transparent Lottery on Ethereum',
    description: 'A decentralized lottery system built on Ethereum blockchain ensuring transparency and fairness.',
    image: '/projects/blockwin.jpg',
    technologies: ['Solidity', 'React', 'Web3.js', 'Ethereum'],
    github: 'https://github.com/Divyanshu1712/Lottery-system-using-Blockchain',
    featured: true,
  },
  {
    title: 'QR Code Generator',
    description: 'A web application to generate QR codes for URLs, text, and contact information.',
    image: '/projects/qr-generator.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/Divyanshu1712/qr',
    live: 'https://qr-pied.vercel.app/',
    featured: true,
  },
  {
    title: 'Quirkboard – Real-Time Collaborative Whiteboard',
    description: 'A collaborative whiteboard application with real-time updates and drawing tools.',
    image: '/projects/quirkboard.jpg',
    technologies: ['React', 'Socket.io', 'Canvas API', 'Node.js'],
    github: 'https://github.com/Divyanshu1712/Quirkboard',
    live: 'https://quirkboard.onrender.com',
    featured: true,
  },
];
