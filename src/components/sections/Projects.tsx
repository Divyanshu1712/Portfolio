'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: 'BlockWin: Transparent Lottery on Ethereum',
    description: 'A decentralized lottery system built on Ethereum blockchain ensuring transparency and fairness.',
    image: '/projects/blockwin.jpg',
    technologies: ['Solidity', 'React', 'Web3.js', 'Ethereum'],
    github: 'https://github.com/Divyanshu1712/blockwin',
    live: 'https://blockwin.vercel.app',
  },
  {
    title: 'QR Code Generator',
    description: 'A web application to generate QR codes for URLs, text, and contact information.',
    image: '/projects/qr-generator.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/Divyanshu1712/qr-generator',
    live: 'https://qr-generator-divyanshu.vercel.app',
  },
  {
    title: 'Quirkboard – Real-Time Collaborative Whiteboard',
    description: 'A collaborative whiteboard application with real-time updates and drawing tools.',
    image: '/projects/quirkboard.jpg',
    technologies: ['React', 'Socket.io', 'Canvas API', 'Node.js'],
    github: 'https://github.com/Divyanshu1712/quirkboard',
    live: 'https://quirkboard.vercel.app',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-md hover:shadow-lg hover:border-white/30 transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 group-hover:scale-110"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          onError={(e) => (e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM4ODgiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="text-sm sm:text-base text-white/80 mb-6 flex-grow">{project.description}</p>
        
        <div className="flex gap-4 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View code for ${project.title} on Github`}
          >
            <Button variant="secondary" size="sm" className="w-full sm:w-auto"> 
              <Github className="w-4 h-4 mr-2" />
              View Code
            </Button>
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${project.title}`}
            >
              <Button variant="secondary" size="sm" className="w-full sm:w-auto"> 
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Featured Projects</h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and expertise.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
} 