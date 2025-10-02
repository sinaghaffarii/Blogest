'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    <section className="px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        آخرین مقالات
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div
            key={post._id}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <Link href={`/articles/${post.slug}`}>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white hover:underline">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {post.excerpt}
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
