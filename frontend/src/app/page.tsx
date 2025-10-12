import type { Blog } from '@/utils/types';

import CallToAction from '@/components/Landing/CallToAction';
import CollectionPosts from '@/components/Landing/CollectionPosts';
import Header from '@/components/Landing/Header';
import LatestPosts from '@/components/Landing/LatestPosts';
import PublicLayoutProvider from '@/providers/PublicLayoutProvider';

async function fetchBlogs(): Promise<{
  blogs: Blog[];
  pagination: {
    current: number;
    hasNext: boolean;
    hasPrev: boolean;
    items: number;
    total: number;
  };
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/getList`);
  if (!res.ok) {
    throw new Error('Received Articles encountered by error');
  }
  return res.json();
}

export default async function Home() {
  const { blogs } = await fetchBlogs();

  const headersPosts = blogs.slice(0, 4);
  const collectionPosts = blogs.slice(0, 3);
  const latestPosts = blogs.slice(3, 9);

  return (
    <PublicLayoutProvider>
      <Header posts={headersPosts} />
      <CollectionPosts posts={collectionPosts} />
      <LatestPosts posts={latestPosts} />
      <CallToAction />
    </PublicLayoutProvider>
  );
}
