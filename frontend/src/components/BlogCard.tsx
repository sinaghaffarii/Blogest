import { EarthIcon, HeartIcon, MessageSquareIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import type { Blog } from '@/utils/types';

import { toEnglishDate } from '@/utils/toPersianDate';

interface Props {
  post: Blog;
}

const BlogCard = ({ post }: Props) => {
  return (
    <div className="relative rounded-2xl min-h-fit flex items-center justify-start flex-col md:flex-row p-2 border overflow-hidden">
      {post.coverImage && (
        <Image
          height={240}
          width={400}
          alt={post.title}
          className="w-full md:w-44 h-44 object-cover rounded-xl shadow-2xl"
          src="/images/ide-coding.jpg"
        />
      )}

      <div className="h-32 md:h-full relative flex items-start justify-start flex-col mb-auto space-y-4 md:ml-4">
        {/* Added dark mode text color for title */}
        <p className="text-lg md:text-xl font-medium text-start text-slate-900 dark:text-gray-100 tracking-normal">
          {post.title}
        </p>
        {/* Added dark mode text color for excerpt */}
        <p className="text-sm md:text-base font-light text-start text-slate-500 dark:text-slate-400 w-72 truncate tracking-normal">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between w-full mt-auto">
          <div className="flex items-center justify-start space-x-2">
            {/* Icon will inherit the color from the parent text color */}
            <EarthIcon className="size-5 mb-1 text-slate-700 dark:text-slate-300" />
            {/* Added dark mode text color for date */}
            <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300">
              {toEnglishDate(post.createdAt)}
            </p>
          </div>
          <div className="flex items-center justify-start gap-4">
            <div className="flex items-center justify-start font-medium gap-2">
              <HeartIcon className="size-4 mb-1 text-slate-700 dark:text-slate-300" />
              {/* Added dark mode text color for counts */}
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {post.likesCount}
              </p>
            </div>
            <div className="flex items-center justify-start font-medium gap-2">
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
