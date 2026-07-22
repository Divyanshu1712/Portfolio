'use client';

import Layout from '@/components/layout/Layout';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';

export default function AboutPage() {
  return (
    <Layout>
      <div className="pt-20">
        <About />
        <Experience />
        <Education />
      </div>
    </Layout>
  );
}
