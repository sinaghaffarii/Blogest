'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '../ui/card';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LatestPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="min-h-[300px]">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        آخرین مقالات
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div
            className="cursor-pointer"
            initial="hidden"
            key={post._id}
            variants={itemVariants}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link href={`/articles/${post.slug}`}>
              <Card className="relative overflow-hidden rounded-xl group h-64 md:h-72 shadow-lg hover:shadow-2xl animate-accordion-up">
                {/* Background Image */}
                <Image
                  fill
                  alt={post.title}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  src="/images/javascript.png"
                  priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-sm text-gray-200 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
