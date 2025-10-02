'use client';

import type { Post } from '@/utils/types';

import BlogCard from '../BlogCard';
import { Separator } from '../ui/separator';

export default function Header({ posts }: { posts: Post[] }) {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center bg-white dark:bg-gray-900 transition-colors mt-6">
      <div className="flex items-center justify-start w-full flex-col mb-auto">
        <p className="font-semibold text-base md:text-lg lg:texg-xl me-auto">
          پربازدیدهای 24 ساعت گذشته
        </p>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 w-full my-10">
          {posts && posts.length > 0 ? (
            posts.map((post) => <BlogCard key={post._id} post={post} />)
          ) : (
            <p className="text-gray-500 w-full text-center">
              هیچ پستی یافت نشد.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
