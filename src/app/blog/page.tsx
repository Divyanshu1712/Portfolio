'use client';

import Layout from '@/components/layout/Layout';
import Blog from '@/components/sections/Blog';
import TwitterFeed from '@/components/sections/TwitterFeed';

export default function BlogPage() {
  return (
    <Layout>
      <div className="pt-16 sm:pt-20 pb-12">
        <Blog />
        <TwitterFeed />
      </div>
    </Layout>
  );
}
