'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  likesCount: number;
  commentsCount: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeaturedPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="px-6 md:px-20 min-h-[600px] mt-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        مقالات برتر
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {posts.map((post) => (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer p-2 border"
            initial="hidden"
            key={post._id}
            variants={itemVariants}
            whileInView="visible"
            viewport={{ once: true }}
          >
            {post.coverImage && (
              <Image
                height={220}
                width={400}
                alt={post.title}
                className="w-full h-56 object-cover rounded-xl shadow-xl"
                src="/images/ide-coding.jpg"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {post.excerpt}
              </p>
              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <span>❤️ {post.likesCount}</span>
                <span>💬 {post.commentsCount}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
