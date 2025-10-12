'use client';
import { motion } from 'framer-motion';
import { EarthIcon, HeartIcon, MessageSquareIcon } from 'lucide-react';
import Image from 'next/image';

import type { Blog } from '@/utils/types';

import { toEnglishDate } from '@/utils/toPersianDate';

import { Separator } from '../ui/Separator';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CollectionPosts({ posts }: { posts: Blog[] }) {
  return (
    <section>
      <h2 className="font-semibold text-base md:text-lg lg:text-xl text-gray-900 dark:text-gray-100 underline underline-offset-[24px]">
        Collections
      </h2>
      <Separator className="my-4" />
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div
            className="rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer p-2 border relative "
            initial="hidden"
            key={post._id}
            variants={itemVariants}
            whileInView="visible"
            viewport={{ once: true }}
          >
            {post.coverImage && (
              <Image
                height={220}
                width={400}
                alt={post.title}
                className="w-full h-56 object-cover rounded-xl shadow-xl"
                src="/images/ide-coding.jpg"
              />
            )}
            <div className="relative flex items-start justify-start flex-col mb-auto space-y-4 my-4 ms-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 truncate w-60">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between w-full mt-auto">
                <div className="flex items-center justify-start space-x-2">
                  <EarthIcon className="size-5 mb-1" />
                  <p className="text-xs md:text-sm font-medium">
                    {toEnglishDate(post.createdAt)}
                  </p>
                </div>
                <div className="flex items-center justify-start space-x-2">
                  <div className="flex items-center justify-start space-x-2 font-medium">
                    <HeartIcon className="size-4 mb-1" />
                    <p className="text-sm">{post.likesCount}</p>
                  </div>
                  <div className="flex items-center justify-start space-x-2 font-medium">
                    <MessageSquareIcon className="size-4 mb-1" />
                    <p className="text-sm">{post.commentsCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
