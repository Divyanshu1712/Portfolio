'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Divyanshu1712',
    icon: <Github className="w-5 h-5" />
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/divyanshu-srivastava-558403215',
    icon: <Linkedin className="w-5 h-5" />
  },
  {
    name: 'Twitter',
    url: 'https://x.com/Divyans19896602',
    icon: <Twitter className="w-5 h-5" />
  }
];

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col pt-16">
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex-grow"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
} 