'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { projects } from '@/data/projects';
import { socialLinks } from '@/data/social';

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col h-full overflow-hidden rounded-2xl bg-card border border-border/60
                 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          onError={(e) =>
          (e.currentTarget.src =
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzBkMTExYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzYzYjNlZCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==')
          }
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/15"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-sm text-foreground/70 leading-relaxed flex-grow mb-5">
          {project.description}
        </p>

        {/* Action buttons */}
        <div className="flex gap-3 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub — ${project.title}`}
            className="flex-1"
          >
            <Button variant="outline" size="sm" className="w-full gap-1.5">
              <Github className="w-3.5 h-3.5" />
              Code
            </Button>
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo — ${project.title}`}
              className="flex-1"
            >
              <Button size="sm" className="w-full gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
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
  return (
    <SectionWrapper
      id="projects"
      title="Featured Projects"
      subtitle="A selection of my recent work showcasing my skills and expertise"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const isLastOdd = projects.length % 3 === 1 && index === projects.length - 1;
          return (
            <div
              key={project.title}
              className={`flex ${isLastOdd ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className={`w-full ${isLastOdd ? 'md:max-w-sm md:mx-auto lg:max-w-none' : ''}`}>
                <ProjectCard project={project} index={index} />
              </div>
            </div>
          );
        })}
      </div>

      {/* View all on GitHub */}
      <div className="mt-10 text-center">
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="gap-2">
            <Github className="w-4 h-4" />
            View All Projects on GitHub
          </Button>
        </a>
      </div>
    </SectionWrapper>
  );
}
