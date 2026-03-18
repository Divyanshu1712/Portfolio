'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Rocket,
  Check,
  X
} from 'lucide-react';

// Layout components
import Layout from '@/components/layout/Layout';

// Section components
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import TwitterFeed from '@/components/sections/TwitterFeed';
import Contact from '@/components/sections/Contact';

// UI components
import { Button } from "@/components/ui/Button";

// Config
import { socialLinks } from '@/config/social';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch by only rendering client-specific content after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only run this effect on the client
    if (!mounted) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    if (fadeElements.length > 0) {
      fadeElements.forEach((element) => {
        observer.observe(element);
      });
    }

    return () => observer.disconnect();
  }, [mounted]);

  // If not mounted yet, render a simple placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <Layout>
        <main className="min-h-screen bg-background pt-16">
          <div className="flex items-center justify-center h-screen">
            {/* Simple loading state with no animations */}
            <div className="text-foreground">Loading...</div>
          </div>
        </main>
      </Layout>
    );
  }

  // Main component render (only on client)
  return (
    <Layout>
      <main className="min-h-screen bg-background pt-16">
        {/* Hero Section */}
        <section className="flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-background py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            {/* Avatar Container */}
            <motion.div
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/Profile-avtar.jpg"
                alt="Divyanshu Srivastava Avatar"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>

            {/* Intro Text */}
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hi, I&apos;m Divyanshu 👋
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 tracking-tight text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I build scalable backend systems and automate complex workflows.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-base sm:text-lg mb-8 text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
             I help businesses develop FastAPI backends, secure authentication systems, and automate PDF & Excel data processing.
            </motion.p>

            {/* CTA Button */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="#contact">
                <Button
                  variant="primary"
                  size="lg"
                >
                  Connect With Me
                </Button>
              </Link>
            </motion.div> */}
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-background">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Profile Image */}
            <motion.div
              className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full border-2 border-primary/20 p-1 overflow-hidden w-full h-full shadow-lg">
                <Image
                  src="/your-profile-image.jpg" // Updated path
                  alt="Divyanshu Srivastava Profile Picture"
                  width={320}
                  height={320}
                  className="rounded-full object-cover w-full h-full"
                  onError={(e) => {
                    // Use a consistent fallback image to prevent hydration mismatch
                    const target = e.currentTarget;
                    if (mounted) {
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyMjIyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2VlZSI+RGl2eWFuc2h1PC90ZXh0Pjwvc3ZnPg==';
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* About Text */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
                Hi, I&apos;m Divyanshu Srivastava, a passionate Full Stack Developer with a
                solid foundation in web development, blockchain, and IoT. With a
                Bachelor of Technology degree in the Internet of Things, I&apos;ve developed
                a keen eye for crafting solutions that combine creativity and technical
                efficiency. My expertise lies in modern frontend and backend
                technologies like React, Python, and Node.js, and I&apos;m always excited to
                tackle new challenges that push the boundaries of what&apos;s possible in
                the tech world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Skills Section — id is set inside the Skills component */}
        <div className="py-24 sm:py-32">
          <Skills />
        </div>

        {/* Experience Section — id is set inside the Experience component */}
        <div className="py-24 sm:py-32">
          <Experience />
        </div>

        {/* Education Section — id is set inside the Education component */}
        <div className="py-24 sm:py-32">
          <Education />
        </div>

        {/* Projects Section — id is set inside the Projects component */}
        <div className="py-24 sm:py-32">
          <Projects />
        </div>

        {/* Twitter Feed Section — id is set inside the TwitterFeed component */}
        <div className="py-24 sm:py-32">
          <TwitterFeed />
        </div>

        {/* Contact Section */}
        <Contact />
      </main>
    </Layout>
  );
}
