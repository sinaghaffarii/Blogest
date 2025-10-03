import type { Post } from '@/utils/types';

import CallToAction from '@/components/Landing/CallToAction';
import CollectionPosts from '@/components/Landing/CollectionPosts';
import Header from '@/components/Landing/Header';
import LatestPosts from '@/components/Landing/LatestPosts';

async function fetchPosts(): Promise<{
  posts: Post[];
  pagination: {
    current: number;
    hasNext: boolean;
    hasPrev: boolean;
    items: number;
    total: number;
  };
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/getList`);
  if (!res.ok) {
    throw new Error('دریافت مقالات با خطا مواجه شد');
  }
  return res.json();
}

export default async function Home() {
  const { posts } = await fetchPosts();

  const headersPosts = posts.slice(0, 4);
  const collectionPosts = posts.slice(0, 3);
  const latestPosts = posts.slice(3, 9);

  return (
    <div className="w-6xl max-w-[90vw] mx-auto space-y-12 container">
      <Header posts={headersPosts} />
      <CollectionPosts posts={collectionPosts} />
      <LatestPosts posts={latestPosts} />
      <CallToAction />
    </div>
  );
}
