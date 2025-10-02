import type { Post } from '@/utils/types';

import CallToAction from '@/components/Landing/CallToAction';
import Categories from '@/components/Landing/Categories';
import FeaturedPosts from '@/components/Landing/FeaturedPosts';
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

  const featuredPosts = posts.slice(0, 4);
  const latestPosts = posts.slice(3, 9);

  const categories = Array.from(new Set(posts.flatMap((p) => p.categories)));
  return (
    <div className="max-w-6xl mx-auto container">
      <Header posts={featuredPosts} />
      <FeaturedPosts posts={featuredPosts} />
      <Categories categories={categories} />
      <LatestPosts posts={latestPosts} />
      <CallToAction />
    </div>
  );
}
