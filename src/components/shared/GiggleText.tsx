'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GiggleTextProps {
  text: string;
  className?: string;
  accentColor?: string;
}

export default function GiggleText({
  text,
  className = '',
  accentColor = '#3b82f6', // Vivid blue matching reference image
}: GiggleTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      aria-label={text}
      className={`relative inline-flex flex-wrap justify-center items-center font-display font-extrabold select-none tracking-tight ${className}`}
    >
      {text.split('').map((char, index) => {
        const isHovered = hoveredIndex === index;
        const isSpace = char === ' ';

        if (isSpace) {
          return <span key={index} className="w-4 sm:w-8 md:w-12 lg:w-16" />;
        }

        return (
          <div
            key={index}
            className="relative inline-block cursor-pointer px-0.5 sm:px-1 py-0.5"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* ── Pixel Mascot Sitting on Top of Hovered Letter ── */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.6 }}
                  animate={{ opacity: 1, y: -16, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.6 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-xs"
                >
                  <span className="inline-block animate-bounce text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
                    🐱
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Display Character (Turns Blue on Hover) ── */}
            <motion.span
              animate={
                isHovered
                  ? {
                      scale: 1.12,
                      y: -6,
                      rotate: index % 2 === 0 ? -3 : 3,
                      color: accentColor,
                    }
                  : {
                      scale: 1,
                      y: 0,
                      rotate: 0,
                      color: '#ffffff',
                    }
              }
              transition={{
                type: 'spring',
                stiffness: 450,
                damping: 18,
              }}
              style={{
                filter: isHovered
                  ? `drop-shadow(0 0 25px ${accentColor}) drop-shadow(0 0 40px ${accentColor}aa)`
                  : 'none',
              }}
              className="relative z-10 inline-block transition-colors duration-200"
            >
              {char}

              {/* ── Small White Dot at Bottom Left of Hovered Blue Letter ── */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}
