'use client';
import { LaptopIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import type { Blog } from '@/utils/types';

import { toEnglishDate } from '@/utils/toPersianDate';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Card className="border-none">
      <CardHeader>
        {blog.categories?.[0] && (
          <div className="">
            <Button
              size="sm"
              className="bg-purple-500/40 dark:bg-green-500 text-gray-600 dark:text-gray-50"
              type="button"
              variant="secondary"
            >
              <LaptopIcon className="text-white size-5" />
              {blog.categories[0]}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Link className="block" href={`/blog/${blog._id}`}>
            <p className="text-lg font-medium">{blog.title}</p>
          </Link>
          <p className="text-xs md:text-sm text-gray-500">
            {toEnglishDate(new Date(blog.createdAt))}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
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
