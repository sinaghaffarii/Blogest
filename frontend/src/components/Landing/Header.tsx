'use client';

import type { Blog } from '@/utils/types';

import BlogCard from '../BlogCard';
import { Separator } from '../ui/separator';

export default function Header({ posts }: { posts: Blog[] }) {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-center transition-colors mt-6">
      <div className="flex items-center justify-start w-full flex-col mb-auto">
        <p className="font-semibold text-base md:text-lg lg:texg-xl me-auto underline underline-offset-[26px] z-10">
          پربازدیدهای 24 ساعت گذشته
        </p>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 w-full space-y-4 md:space-y-0">
          {posts && posts.length > 0 ? (
            posts.map((post) => <BlogCard key={post._id} post={post} />)
          ) : (
            <p className="w-full text-center">هیچ پستی یافت نشد.</p>
          )}
        </div>
      </div>
    </section>
  );
}
