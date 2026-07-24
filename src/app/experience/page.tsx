'use client';

import Layout from '@/components/layout/Layout';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Achievements from '@/components/sections/Achievements';

export default function ExperiencePage() {
  return (
    <Layout>
      <div className="pt-16 sm:pt-20 pb-12">
        <Experience />
        <Education />
        <Achievements />
      </div>
    </Layout>
  );
}
