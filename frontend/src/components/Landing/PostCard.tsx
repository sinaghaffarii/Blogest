'use client';

import { Bookmark, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { Post as PostType } from '@/utils/types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type PostWithReadTime = PostType & { readTime?: string };

function PostCardFooter({
  slug,
  commentsCount,
  likesCount,
  readTime,
}: {
  slug: string;
  commentsCount?: number;
  likesCount?: number;
  readTime?: string;
}) {
  return (
    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
      <div className="flex items-center gap-3">
        {/* Comments */}
        <Link
          className="flex items-center gap-1 hover:text-gray-800"
          href={`/posts/${slug}#comments`}
        >
          <MessageCircle className="w-4 h-4" />
          {commentsCount || 0}
        </Link>

        {/* Likes */}
        <button
          className="flex items-center gap-1 hover:text-red-500 transition"
          type="button"
        >
          <Heart className="w-4 h-4" />
          {likesCount || 0}
        </button>

        {/* Bookmark */}
        <button className="hover:text-blue-600 transition" type="button">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Read Time */}
      {readTime && <span>{readTime}</span>}
    </div>
  );
}

export default function PostCard({
  _id,
  slug,
  title,
  coverImage,
  author,
  categories,
  commentsCount,
  likesCount,
  readTime,
}: PostWithReadTime) {
  return (
    <Card
      className="flex flex-col h-full rounded-2xl shadow-sm hover:shadow-lg transition duration-200"
      key={_id}
    >
      {/* Cover */}
      <Link
        className="relative w-full h-44 sm:h-60 md:h-40 overflow-hidden rounded-t-2xl"
        href={`/posts/${slug}`}
      >
        <Image
          fill
          alt={title}
          className="object-cover w-full h-full transition-transform duration-200 hover:scale-110"
          src="/images/ide-coding.jpg"
        />
      </Link>

      {/* Content */}
      <CardContent className="flex flex-col flex-1 p-4">
        {/* Title */}
        <h4 className="font-bold text-xl text-gray-800 dark:text-white line-clamp-2 mb-3">
          <Link
            className="hover:text-blue-700 dark:hover:text-blue-450 transition"
            href={`/posts/${slug}`}
          >
            {title}
          </Link>
        </h4>

        {/* Author + Category */}
        <div className="flex items-center justify-between mb-4">
          {/* Author */}
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage alt={author?.name} src={author?.avatar} />
              <AvatarFallback>{author?.name?.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
            <Link
              className="text-xs font-semibold text-gray-400 hover:text-gray-800 dark:text-white dark:hover:text-blue-450 transition"
              href={`/@${author?.username || ''}`}
            >
              {author?.name}
            </Link>
          </div>

          {/* Category */}
          {categories && categories.length > 0 && (
            <Badge className="text-xs px-2 py-1" variant="secondary">
              {categories[0]}
            </Badge>
          )}
        </div>

        {/* Footer: comments, likes, bookmark, readtime */}
        <PostCardFooter
          readTime={readTime}
          slug={slug}
          commentsCount={commentsCount}
          likesCount={likesCount}
        />
      </CardContent>
    </Card>
  );
}
