'use client';

import Layout from '@/components/layout/Layout';
import Projects from '@/components/sections/Projects';

export default function ProjectsPage() {
  return (
    <Layout>
      <div className="pt-20">
        <Projects />
      </div>
    </Layout>
  );
}
