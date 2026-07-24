'use client';

import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function AboutPage() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Contact />
    </Layout>
  );
}
