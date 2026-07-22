'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

const navItems = [
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  // Scroll shadow on navbar pill
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy — highlight active nav link on the homepage
  useEffect(() => {
    if (pathname !== '/') return;

    const sectionIds = navItems
      .filter(item => item.href.startsWith('/#'))
      .map(item => item.href.replace('/#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [mounted, pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* ── Fixed top bar — just for positioning ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 px-4 pointer-events-none">
        {/* Floating pill nav */}
        <motion.nav
          className={`pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-300 ${
            isScrolled
              ? 'bg-card/80 backdrop-blur-xl border-border/80 shadow-lg shadow-black/20'
              : 'bg-card/60 backdrop-blur-md border-border/50'
          }`}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Logo / Brand */}
          <Link
            href="/"
            className="text-sm font-bold text-foreground px-3 py-1 rounded-full hover:bg-primary/10 transition-colors duration-200 mr-1 flex items-center gap-1.5"
          >
            <span className="gradient-text">DS</span>
          </Link>

          {/* Divider */}
          <div className="w-px h-4 bg-border/60 hidden md:block" />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              // Highlight based on current pathname OR active section anchor on home page
              const isLinkActive = 
                pathname === item.href || 
                (pathname === '/' && item.href.startsWith('/#') && activeSection === item.href.replace('/#', ''));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isLinkActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-foreground/60 hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-px h-4 bg-border/60 hidden md:block" />

          {/* Right controls */}
          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-8 h-8 flex items-center justify-center rounded-full text-foreground/70 hover:text-foreground hover:bg-muted/60 transition-all duration-200"
                aria-label="Toggle theme"
                whileTap={{ scale: 0.88 }}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4 text-amber-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4 text-indigo-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Resume download — desktop only */}
            <a
              href={siteConfig.resume}
              download
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/80 transition-all duration-200"
            >
              <Download className="w-3 h-3" />
              Resume
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full text-foreground/70 hover:text-foreground hover:bg-muted/60 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.04 * index }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center py-3 px-4 text-xl font-medium text-foreground/70 hover:text-foreground border-b border-border/40 transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-8 flex flex-col gap-3">
              <Link href="/#contact" onClick={closeMobileMenu}>
                <Button className="w-full" size="lg">
                  Get in Touch
                </Button>
              </Link>
              <a
                href={siteConfig.resume}
                download
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-border text-sm font-medium text-foreground/70 hover:text-foreground hover:border-primary/50 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
