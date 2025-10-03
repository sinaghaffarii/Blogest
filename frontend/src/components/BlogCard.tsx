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
    <div className="relative rounded-3xl min-h-fit flex items-center justify-start flex-col md:flex-row p-4 border overflow-hidden bg-gradient-to-t from-gray-100 to-white">
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
        <p className="text-lg md:text-xl font-medium text-start tracking-wide">
          {post.title}
        </p>
        <p className="text-sm md:text-base font-light text-start text-gray-500">
          {post.excerpt}
        </p>
        <div className="absolute bottom-0 md:bottom-4 flex items-center justify-between w-full">
          <div className="flex items-center justify-start space-x-2">
            <EarthIcon className="size-5 mb-1" />
            <p className="text-xs md:text-sm font-medium">
              {toPersianDate(post.createdAt)}
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
    </div>
  );
};

export default BlogCard;
