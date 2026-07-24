'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'ABOUT', href: '/' },
  { name: 'PROJECTS', href: '/projects' },
  { name: 'EXPERIENCE', href: '/experience' },
  { name: 'BLOG & WRITING', href: '/blog' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkIsActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/about';
    }
    if (href === '/projects') {
      return pathname === '/projects' || pathname === '/skills';
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-auto ${isScrolled
        ? 'bg-card/85 backdrop-blur-2xl border-b border-border/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-3.5'
        : 'bg-transparent border-b border-transparent py-5'
        }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Side: Brand Logo */}
        <Link
          href="/"
          className="text-base sm:text-lg font-black tracking-wider text-foreground hover:text-primary transition-all duration-200 flex items-center gap-2"
        >
          <span className="bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-xl text-primary font-mono text-xs sm:text-sm font-bold">
            DS.
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = checkIsActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-xs font-bold tracking-widest px-3.5 py-1.5 rounded-full transition-all duration-200 ${isActive
                  ? 'text-primary bg-primary/12 font-extrabold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Theme Switcher & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-full bg-card/80 border border-border/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200 shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-primary" />
              ) : (
                <Moon className="w-4 h-4 text-primary" />
              )}
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-card/80 border border-border/80 flex items-center justify-center text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-4 right-4 md:hidden pointer-events-auto bg-card/95 backdrop-blur-2xl border border-border/80 rounded-3xl px-6 py-6 flex flex-col gap-3 shadow-2xl"
          >
            {navItems.map((item) => {
              const isActive = checkIsActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-bold tracking-widest px-4 py-2.5 rounded-xl transition-all duration-200 ${isActive
                    ? 'text-primary bg-primary/10 font-extrabold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

