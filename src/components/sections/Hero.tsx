'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { socialLinks } from '@/data/social';
import { siteConfig } from '@/config/site';

const roles = [
  'Full Stack Developer',
  'Backend Engineer',
  'FastAPI Specialist',
  'Automation Builder',
];

const stats = [
  { value: '1+', label: 'Years Exp.' },
  { value: '10+', label: 'Projects' },
  { value: '3', label: 'Internships' },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;
    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 70);
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* ── Layered background glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main centre glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, oklch(0.72 0.16 210 / 0.12) 0%, transparent 70%)' }}
        />
        {/* Bottom-left accent */}
        <div
          className="absolute bottom-1/4 left-[10%] w-80 h-80 rounded-full animate-float"
          style={{ background: 'radial-gradient(circle, oklch(0.75 0.18 195 / 0.08) 0%, transparent 70%)', animationDelay: '1s' }}
        />
        {/* Top-right accent */}
        <div
          className="absolute top-1/4 right-[10%] w-56 h-56 rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.68 0.15 270 / 0.07) 0%, transparent 70%)' }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(oklch(0.72 0.16 210) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.16 210) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Radial fade mask on top of grid */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, var(--background) 100%)' }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto text-center w-full pt-20">

        {/* Avatar */}
        <motion.div
          className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Animated ring */}
          <div
            className="absolute -inset-1 rounded-full animate-spin"
            style={{
              background: 'conic-gradient(from 0deg, oklch(0.72 0.16 210), oklch(0.75 0.18 195), transparent, oklch(0.72 0.16 210))',
              animationDuration: '4s',
            }}
          />
          <div className="relative rounded-full overflow-hidden w-full h-full ring-2 ring-background">
            <Image
              src="/Profile-avtar.jpg"
              alt="Divyanshu Srivastava"
              fill
              sizes="(max-width: 768px) 96px, 112px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-7"
          style={{
            background: 'oklch(0.72 0.16 210 / 0.1)',
            border: '1px solid oklch(0.72 0.16 210 / 0.3)',
            color: 'oklch(0.72 0.16 210)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'oklch(0.72 0.16 210)' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'oklch(0.72 0.16 210)' }} />
          </span>
          Open to opportunities
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <span className="text-foreground">Hi, I&apos;m </span>
          <span
            style={{
              background: 'linear-gradient(135deg, oklch(0.72 0.16 210), oklch(0.82 0.14 195), oklch(0.72 0.16 210))',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}
          >
            Divyanshu
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          className="h-10 sm:h-12 flex items-center justify-center mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <span
            className="text-xl sm:text-2xl md:text-3xl font-semibold"
            style={{ color: 'oklch(0.72 0.16 210)' }}
          >
            {displayed}
            <span className="animate-pulse opacity-70">|</span>
          </span>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          I build scalable <span className="text-foreground font-medium">FastAPI backends</span>, automate complex
          workflows, and craft clean full-stack applications that solve real business problems.
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="flex items-center justify-center gap-8 sm:gap-12 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {stats.map(({ value, label }, i) => (
            <div key={label} className="text-center">
              <p
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: 'oklch(0.72 0.16 210)' }}
              >
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <Link href="#projects">
            <Button
              size="lg"
              className="gap-2 min-w-[172px] text-base font-semibold shadow-lg"
              style={{ boxShadow: '0 4px 24px oklch(0.72 0.16 210 / 0.35)' }}
            >
              View My Work
              <ArrowDown className="w-4 h-4" />
            </Button>
          </Link>
          <a href={siteConfig.resume} download>
            <Button variant="outline" size="lg" className="gap-2 min-w-[172px] text-base font-semibold">
              <Download className="w-4 h-4" />
              Resume
            </Button>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          {[
            { href: socialLinks.github,   icon: Github,   label: 'GitHub' },
            { href: socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn' },
            { href: socialLinks.twitter,  icon: Twitter,  label: 'Twitter' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5"
              style={{ '--hover-color': 'oklch(0.72 0.16 210)' } as React.CSSProperties}
              onMouseEnter={e => (e.currentTarget.style.color = 'oklch(0.72 0.16 210)')}
              onMouseLeave={e => (e.currentTarget.style.color = '')}
            >
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-xs text-muted-foreground/50 tracking-widest uppercase">Scroll</span>
            <div
              className="w-5 h-8 rounded-full flex items-start justify-center p-1.5"
              style={{ border: '1.5px solid oklch(0.72 0.16 210 / 0.3)' }}
            >
              <div className="w-1 h-2 rounded-full" style={{ background: 'oklch(0.72 0.16 210 / 0.7)' }} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
