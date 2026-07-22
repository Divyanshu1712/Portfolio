'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import GiggleText from '@/components/shared/GiggleText';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning ☀️';
  if (hour < 17) return 'Good Afternoon 🌤️';
  return 'Good Evening 🌙';
};

export default function Hero() {
  const [isAsleep, setIsAsleep] = useState(false);
  const [sleepCount, setSleepCount] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    { id: 'greeting', text: getGreeting(), icon: 'sun' },
    { id: 'available', text: 'Available for new opportunities', icon: 'star' },
    { id: 'sleep', text: 'Double-click me to sleep!', icon: 'pulse' },
    { id: 'role', text: 'Full Stack & Backend Specialist', icon: 'sparkles' },
  ];

  // Auto-rotate single pop-up pill messages every 3.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [messages.length]);

  const handlePillClick = () => {
    setSleepCount((prev) => {
      const next = prev + 1;
      if (next >= 2) {
        setIsAsleep(!isAsleep);
        return 0;
      }
      return next;
    });
    // Manually advance to next message on click
    setMessageIndex((prev) => (prev + 1) % messages.length);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-8 lg:px-12 pt-28 pb-12 overflow-hidden bg-[#050505] text-white">

      {/* ── Sleep Mode Overlay ── */}
      <AnimatePresence>
        {isAsleep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto"
            onClick={() => setIsAsleep(false)}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-center p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-2xl max-w-sm"
            >
              <div className="text-5xl mb-4">😴 🌙</div>
              <h3 className="text-2xl font-bold text-white mb-2">Divyanshu is asleep... zzz</h3>
              <p className="text-sm text-neutral-400 mb-6">Click anywhere on the screen to wake up!</p>
              <button
                onClick={() => setIsAsleep(false)}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/30"
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
            background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
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
          className="group relative flex items-center justify-center px-6 py-2 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-blue-500/50 text-xs sm:text-sm font-medium text-neutral-200 transition-all duration-300 shadow-xl cursor-pointer overflow-hidden h-10 min-w-[280px] sm:min-w-[340px] select-none"
          title="Click to next, double click to sleep"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={messages[messageIndex].id}
              initial={{ y: 16, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -16, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {messages[messageIndex].icon === 'star' && (
                <Star className="w-3.5 h-3.5 text-blue-400 fill-blue-400/30 animate-spin-slow" />
              )}
              {messages[messageIndex].icon === 'pulse' && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
              )}
              {messages[messageIndex].icon === 'sparkles' && (
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              )}
              <span className="group-hover:text-blue-300 transition-colors">
                {messages[messageIndex].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Main Full-Width Hero Interactive Display Title ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center my-auto py-6">
        {/* Line 1: Divyanshu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <GiggleText
            text="Divyanshu"
            className="text-6xl sm:text-8xl md:text-[110px] lg:text-[145px] xl:text-[175px] font-black leading-none tracking-tight text-center"
            accentColor="#3b82f6"
          />
        </motion.div>

        {/* Line 2: Srivastava */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center mt-2 sm:mt-4"
        >
          <GiggleText
            text="Srivastava"
            className="text-5xl sm:text-7xl md:text-[95px] lg:text-[130px] xl:text-[140px] font-black leading-none tracking-tight text-center"
            accentColor="#3b82f6"
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
        {/* View Work (White Pill Button) */}
        <Link href="#projects">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] cursor-pointer"
          >
            <span>View Work</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>

        {/* My Experience (Dark Pill Button) */}
        <Link href="#experience">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-neutral-900 border border-neutral-700 text-white font-semibold text-sm sm:text-base hover:bg-neutral-800 transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>My Experience</span>
          </motion.div>
        </Link>
      </motion.div>

    </section>
  );
}
