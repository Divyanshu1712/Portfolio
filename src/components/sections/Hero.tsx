'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Sparkles, Briefcase } from 'lucide-react';
import GiggleText from '@/components/shared/GiggleText';
import { getGreetingData, type GreetingData } from '@/lib/greeting';

export default function Hero() {
  const [isAsleep, setIsAsleep] = useState(false);
  const sleepCountRef = useRef(0);
  const [messageIndex, setMessageIndex] = useState(0);

  // Greeting state — initialised on client to avoid SSR mismatch.
  // Refreshed every minute so it stays accurate if the tab is left open.
  const [greeting, setGreeting] = useState<GreetingData>({
    greeting: 'Hello!',
    message: 'Welcome to my portfolio.',
    emoji: '👋',
  });

  useEffect(() => {
    setGreeting(getGreetingData());
    const refreshInterval = setInterval(() => {
      setGreeting(getGreetingData());
    }, 60_000); // re-evaluate every minute
    return () => clearInterval(refreshInterval);
  }, []);

  const messages = [
    {
      id: 'currently',
      text: 'Software Engineer @ BOT Mantra',
      subtext: 'Building enterprise systems, microservices & automation',
      icon: 'briefcase',
    },
    {
      id: 'stack',
      text: 'Python • FastAPI • React • Azure • Docker',
      subtext: 'End-to-End Product Ownership & System Architecture',
      icon: 'sparkles',
    },
    {
      id: 'available',
      text: 'Available for Full-Time & Freelance',
      subtext: 'Open to high-impact projects & remote roles',
      icon: 'pulse',
    },
    {
      id: 'hobbies',
      text: 'Clutching 1v3s in Valorant & Scoring in FIFA ⚽🎮',
      subtext: 'Football, Dancing & Esports outside of engineering',
      icon: 'sparkles',
    },
    {
      id: 'greeting',
      text: `${greeting.emoji} ${greeting.greeting}`,
      subtext: greeting.message,
      icon: 'greeting',
    },
    { id: 'role', text: 'Full Stack & Backend Specialist', icon: 'sparkles' },
    { id: 'sleep', text: 'Double-click me to sleep!', icon: 'pulse' },
  ];

  // Auto-rotate single pop-up pill messages every 3.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [messages.length]);

  const handlePillClick = () => {
    sleepCountRef.current += 1;
    if (sleepCountRef.current >= 2) {
      setIsAsleep(!isAsleep);
      sleepCountRef.current = 0;
    }
    // Manually advance to next message on click
    setMessageIndex((prev) => (prev + 1) % messages.length);
  };


  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-8 lg:px-12 pt-28 pb-12 overflow-hidden bg-background text-foreground">

      {/* ── Sleep Mode Overlay ── */}
      <AnimatePresence>
        {isAsleep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto"
            onClick={() => setIsAsleep(false)}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-center p-8 rounded-3xl bg-card/90 border border-border shadow-2xl max-w-sm"
            >
              <div className="text-5xl mb-4">😴 🌙</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Divyanshu is asleep... zzz</h3>
              <p className="text-sm text-muted-foreground mb-6">Click anywhere on the screen to wake up!</p>
              <button
                onClick={() => setIsAsleep(false)}
                className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all shadow-lg shadow-primary/20"
              >
                Wake Up ☀️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ambient Radial Glow Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, oklch(var(--primary) / 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(oklch(var(--foreground) / 0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--foreground) / 0.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── SINGLE POP-UP LOOPING PILL CONTAINER (CENTERED) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handlePillClick}
          className="group relative flex items-center justify-center px-6 py-2.5 rounded-full bg-card/95 border border-border/80 hover:border-primary/50 text-xs sm:text-sm font-semibold text-foreground transition-all duration-300 shadow-lg backdrop-blur-md cursor-pointer overflow-hidden min-h-[44px] min-w-[300px] sm:min-w-[420px] select-none"
          title="Click to next, double click to sleep"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={messages[messageIndex].id}
              initial={{ y: 16, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -16, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col items-center gap-0.5 text-foreground"
            >
              <div className="flex items-center gap-2 whitespace-nowrap">
                {messages[messageIndex].icon === 'briefcase' && (
                  <Briefcase className="w-3.5 h-3.5 text-primary" />
                )}
                {messages[messageIndex].icon === 'star' && (
                  <Star className="w-3.5 h-3.5 text-primary fill-primary/30 animate-spin-slow" />
                )}
                {messages[messageIndex].icon === 'pulse' && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                )}
                {messages[messageIndex].icon === 'sparkles' && (
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                )}
                <span className="text-foreground group-hover:text-primary transition-colors font-semibold">
                  {messages[messageIndex].text}
                </span>
              </div>
              {'subtext' in messages[messageIndex] && messages[messageIndex].subtext && (
                <span className="text-[10px] text-muted-foreground leading-tight max-w-[300px] sm:max-w-[420px] text-center truncate px-1">
                  {messages[messageIndex].subtext}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Main Full-Width Hero Interactive Display Title ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center my-auto py-2">
        {/* Line 1: Divyanshu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center text-foreground"
        >
          <GiggleText
            text="Divyanshu"
            className="text-7xl sm:text-9xl md:text-[125px] lg:text-[160px] xl:text-[190px] font-black leading-none tracking-[-0.06em] text-center text-foreground"
            accentColor="oklch(var(--primary))"
          />
        </motion.div>

        {/* Line 2: Srivastava */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center mt-1 sm:mt-2 text-foreground"
        >
          <GiggleText
            text="Srivastava"
            className="text-6xl sm:text-8xl md:text-[110px] lg:text-[145px] xl:text-[170px] font-black leading-none tracking-[-0.06em] text-center text-foreground"
            accentColor="oklch(var(--primary))"
          />
        </motion.div>
      </div>

      {/* ── Bottom Action Pill Buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
      >
        {/* View Work Pill Button */}
        <Link href="#projects">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 cursor-pointer"
          >
            <span>View Work</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>

        {/* My Experience Pill Button */}
        <Link href="#experience">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-card border border-border text-foreground font-bold text-sm sm:text-base hover:bg-muted transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>My Experience</span>
          </motion.div>
        </Link>
      </motion.div>

    </section>
  );
}
