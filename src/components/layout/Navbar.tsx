import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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

  // Handle scroll to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 h-16 transition-all duration-300 ${
        isScrolled ? 'shadow-md backdrop-blur-md' : ''
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="text-xl font-bold text-white z-10 flex-shrink-0">
            Divyanshu&apos;s
          </Link>

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
                <Button 
                  variant="primary" 
                  size="sm"
                  aria-label="Get in Touch"
                >
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </div>

          <button 
            className="md:hidden p-2 text-white hover:text-white/80 z-20"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div className={`md:hidden fixed inset-0 bg-black z-40 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="pt-20 pb-6 px-6 flex flex-col h-full">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl text-white/80 hover:text-white py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-6">
            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                variant="primary" 
                className="w-full"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
} 