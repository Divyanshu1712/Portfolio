'use client';

import Layout from '@/components/layout/Layout';
import Projects from '@/components/sections/Projects';
import GitHubActivity from '@/components/sections/GitHubActivity';

export default function SkillsPage() {
  return (
    <Layout>
      <div className="pt-16 sm:pt-20 pb-12">
        <Projects />
        <GitHubActivity />
      </div>
    </Layout>
  );
}
