'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset loading whenever pathname updates (navigation complete)
  useEffect(() => {
    setProgress(100);
    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 200);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Global link click interceptor
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Find closest anchor element
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href && !anchor.target && !e.ctrlKey && !e.metaKey) {
        try {
          const targetUrl = new URL(anchor.href, window.location.href);
          const isSameOrigin = targetUrl.origin === window.location.origin;
          const isDifferentPath = targetUrl.pathname !== window.location.pathname;

          if (isSameOrigin && isDifferentPath) {
            setLoading(true);
            setProgress(25);
          }
        } catch {
          // Ignore invalid URLs
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Increment progress smoothly while loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading && progress < 90) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 12;
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [loading, progress]);

  return (
    <AnimatePresence>
      {loading && (
        <div className="pointer-events-none">
          {/* Top Progress Bar */}
          <motion.div
            initial={{ opacity: 1, width: '0%' }}
            animate={{ width: `${progress}%`, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-0 left-0 h-1 z-[9999] bg-gradient-to-r from-primary via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          />

          {/* Fullscreen Overlay with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background/70 backdrop-blur-xl pointer-events-auto"
          >
            <div className="relative flex items-center justify-center">
              {/* Outer Glowing Ring */}
              <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
              {/* Brand Tag */}
              <div className="absolute font-mono text-xs font-black text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-md shadow-sm">
                DS.
              </div>
            </div>
            <p className="mt-4 text-xs font-mono tracking-widest text-muted-foreground uppercase animate-pulse">
              Loading...
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
