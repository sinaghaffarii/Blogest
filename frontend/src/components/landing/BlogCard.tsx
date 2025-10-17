'use client';
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
              className="bg-primary/40 text-gray-600 dark:text-gray-50"
              type="button"
              variant="destructive"
            >
              {blog.categories[0]}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Link className="block" href={`/blog/${blog.slug}`}>
            <p className="text-lg font-semibold">{blog.title}</p>
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
