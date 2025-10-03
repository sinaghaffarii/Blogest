import { EarthIcon, HeartIcon, MessageSquareIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import type { Post } from '@/utils/types';

import { toPersianDate } from '@/utils/toPersianDate';

interface Props {
  post: Post;
}

const BlogCard = ({ post }: Props) => {
  return (
    <div className="relative rounded-3xl min-h-fit flex items-center justify-start flex-col md:flex-row p-4 border overflow-hidden">
      {post.coverImage && (
        <Image
          height={220}
          width={400}
          alt={post.title}
          className="w-full md:w-56 h-64 object-cover rounded-xl shadow-2xl"
          src="/images/ide-coding.jpg"
        />
      )}

      <div className="h-32 md:h-full relative flex items-start justify-start flex-col mb-auto space-y-4 my-4 md:mr-4">
        {/* Added dark mode text color for title */}
        <p className="text-lg md:text-xl font-medium text-start tracking-wide text-slate-900 dark:text-gray-100">
          {post.title}
        </p>
        {/* Added dark mode text color for excerpt */}
        <p className="text-sm md:text-base font-light text-start text-slate-500 dark:text-slate-400">
          {post.excerpt}
        </p>

        <div className="absolute bottom-0 md:bottom-4 flex items-center justify-between w-full">
          <div className="flex items-center justify-start space-x-2">
            {/* Icon will inherit the color from the parent text color */}
            <EarthIcon className="size-5 mb-1 text-slate-700 dark:text-slate-300" />
            {/* Added dark mode text color for date */}
            <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300">
              {toPersianDate(post.createdAt)}
            </p>
          </div>
          <div className="flex items-center justify-start space-x-2">
            <div className="flex items-center justify-start space-x-2 font-medium">
              <HeartIcon className="size-4 mb-1 text-slate-700 dark:text-slate-300" />
              {/* Added dark mode text color for counts */}
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {post.likesCount}
              </p>
            </div>
            <div className="flex items-center justify-start space-x-2 font-medium">
              <MessageSquareIcon className="size-4 mb-1 text-slate-700 dark:text-slate-300" />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {post.commentsCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
