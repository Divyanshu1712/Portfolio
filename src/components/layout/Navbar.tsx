import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, ChevronLeft } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Twitter', href: '#twitter' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Wait for mount to avoid hydration mismatch (next-themes reads from DOM)
  useEffect(() => { setMounted(true); }, []);

  // Handle scroll to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔒 Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* ── Navbar bar ── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-primary/10 h-16 transition-all duration-300 ${
          isScrolled ? 'shadow-md backdrop-blur-md' : ''
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-foreground z-10 flex-shrink-0">
              Divyanshu&apos;s
            </Link>

            {/* Theme toggle pill — right next to logo */}
            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all duration-300 text-foreground text-xs font-medium"
                aria-label="Toggle theme"
                whileTap={{ scale: 0.92 }}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <Sun className="w-4 h-4 text-amber-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <Moon className="w-4 h-4 text-indigo-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="hidden sm:inline select-none">
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </span>
              </motion.button>
            )}
          </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 relative z-10">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    className="nav-link text-sm lg:text-base whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * navItems.length }}
              >
                <Link href="#contact" className="flex-shrink-0">
                  <Button variant="primary" size="sm" aria-label="Get in Touch">
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Hamburger button */}
            <button
              className="md:hidden p-2 text-foreground hover:text-foreground/80 z-[60] relative"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile full-screen menu overlay (outside header, z-index above it) ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 z-[55] bg-background overflow-hidden flex flex-col"
          >
            {/* Top padding to clear the navbar */}
            <div className="pt-20 pb-8 px-6 flex flex-col h-full overflow-y-auto">

              {/* Back button */}
              <button
                onClick={closeMobileMenu}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 mb-6 w-fit group"
                aria-label="Close menu"
              >
                <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Back</span>
              </button>

              <nav className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 * index }}
                  >
                    <Link
                      href={item.href}
                      className="block text-2xl font-medium text-foreground/80 hover:text-foreground py-3 border-b border-primary/10 transition-colors duration-200"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8">
                <Link href="#contact" onClick={closeMobileMenu}>
                  <Button variant="primary" className="w-full" size="lg">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}