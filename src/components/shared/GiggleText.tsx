'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface GiggleTextProps {
  text: string;
  className?: string;
  accentColor?: string;
}

export default function GiggleText({
  text,
  className = '',
  accentColor = 'oklch(var(--primary))',
}: GiggleTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine whether active theme is dark (defaults to dark on initial render)
  const isDark = !mounted || resolvedTheme === 'dark';

  return (
    <div
      aria-label={text}
      className={`relative inline-flex flex-wrap justify-center items-center font-display font-black select-none tracking-[-0.06em] leading-none ${className}`}
    >
      {text.split('').map((char, index) => {
        const isHovered = hoveredIndex === index;
        const isSpace = char === ' ';

        // Distance from hovered letter for light bleed effect
        const dist = hoveredIndex !== null ? Math.abs(hoveredIndex - index) : 999;
        const isAdjacent = dist === 1;

        if (isSpace) {
          return <span key={index} className="w-4 sm:w-8 md:w-12 lg:w-16" />;
        }

        // Theme-aware drop-shadow filter (prevents dark smudges in Light Mode)
        let shadowFilter = 'none';
        if (isHovered) {
          shadowFilter = isDark
            ? `drop-shadow(0 0 10px ${accentColor}) drop-shadow(0 0 20px oklch(var(--primary) / 0.5))`
            : `drop-shadow(0 2px 8px oklch(var(--primary) / 0.35))`;
        } else if (isAdjacent) {
          shadowFilter = isDark
            ? `drop-shadow(0 0 6px oklch(var(--primary) / 0.25))`
            : `drop-shadow(0 1px 4px oklch(var(--primary) / 0.15))`;
        }

        return (
          <div
            key={index}
            className="relative inline-block cursor-pointer px-[1px] sm:px-0.5 py-1"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* ── Theme-aware Background Blur Disk ── */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`absolute inset-0 -z-10 rounded-full pointer-events-none ${
                    isDark
                      ? 'bg-primary/25 blur-md'
                      : 'bg-primary/12 blur-sm'
                  }`}
                />
              )}
            </AnimatePresence>

            {/* ── Display Character (Fills with Refined Electric Blue on Hover) ── */}
            <motion.span
              animate={
                isHovered
                  ? {
                      scale: 1.1,
                      y: -5,
                      rotate: index % 2 === 0 ? -2.5 : 2.5,
                      color: accentColor,
                    }
                  : isAdjacent
                  ? {
                      scale: 1.02,
                      y: -1,
                      rotate: 0,
                      color: 'currentColor',
                    }
                  : {
                      scale: 1,
                      y: 0,
                      rotate: 0,
                      color: 'currentColor',
                    }
              }
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 20,
              }}
              style={{
                filter: shadowFilter,
              }}
              className="relative z-10 inline-block transition-colors duration-200"
            >
              {char}

              {/* ── Theme-aware Dot Accent at Bottom Center ── */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full pointer-events-none z-20 ${
                      isDark
                        ? 'w-1.5 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]'
                        : 'w-1.5 h-1.5 bg-white border border-primary/50 shadow-sm'
                    }`}
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
