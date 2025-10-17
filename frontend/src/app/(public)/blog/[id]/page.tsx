/* eslint-disable max-lines-per-function */
'use client';

import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import { ArrowUp, Calendar, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { useBlogById } from '@/services/blogs';

const BlogPage = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useBlogById(id as string);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Loading, please wait...
        </p>
      </div>
    );

  if (!blog)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm font-medium text-destructive">
          Blog post not found.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row bg-background min-h-screen ">
      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto p-4 md:p-8">
        {/* Cover */}
        {blog.coverImage && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-xl overflow-hidden shadow mb-8"
            initial={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              height={300}
              width={500}
              alt={blog.title}
              className="w-full h-60 md:h-96 object-cover brightness-90"
              src="/images/mr-robot.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground">
                {blog.title}
              </h1>
            </div>
          </motion.div>
        )}

        {/* Author & Meta */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/images/cat.jpg" />
              <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{blog.author.name}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(
                    blog.publishedAt ?? blog.createdAt,
                  ).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-rose-500" />
              <span>{blog.likesCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4 text-sky-500" />
              <span>{blog.commentsCount}</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Blog Content */}
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none leading-7">
              {parse(blog.contentHtml)}
            </CardContent>
          </Card>
        </motion.div>

        {/* Categories */}
        {blog.categories?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-medium mb-2 uppercase tracking-wide text-muted-foreground">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {blog.categories.map((cat) => (
                <Badge
                  className="text-xs px-3 py-1"
                  key={cat}
                  variant="secondary"
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Scroll to Top */}
        <button
          className="fixed bottom-8 right-8 bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-md transition-transform hover:-translate-y-1"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </main>
    </div>
  );
};

export default BlogPage;
