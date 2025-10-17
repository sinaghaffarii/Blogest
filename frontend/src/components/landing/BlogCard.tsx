'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { Blog } from '@/utils/types';

import { toEnglishDate } from '@/utils/toPersianDate';

import { Badge } from '../ui/Badge';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Card>
      <CardHeader className="relative">
        {blog.coverImage ? (
          <Image
            height={350}
            width={800}
            alt={blog.title}
            className="rounded-xl w-full object-cover max-h-[400px]"
            // src={`${process.env.NEXT_PUBLIC_API_URL}/${blog.coverImage}`}
            src="/images/mr-robot.jpg"
          />
        ) : null}
        {blog.categories?.[0] && (
          <div className="absolute top-4 start-12">
            <Badge className="bg-blue-500" variant="destructive">
              {blog.categories[0]}
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Link className="block" href={`/blog/${blog.slug}`}>
            <h3 className="text-lg font-semibold">{blog.title}</h3>
          </Link>
          <p className="text-xs text-gray-500">
            {toEnglishDate(new Date(blog.createdAt))}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {blog.excerpt ?? blog.plainText?.slice(0, 160)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        {blog.categories?.map((c) => (
          <Badge key={c} variant="outline">
            {c}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
