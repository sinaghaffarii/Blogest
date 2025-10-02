'use client';
import type { Variants } from 'framer-motion';

import { motion } from 'framer-motion';

const backgroundVariants: Variants = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'easeInOut',
      repeatType: 'loop',
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Header() {
  return (
    <section className="relative flex h-screen min-h-[600px] w-full flex-col items-center justify-center overflow-hidden px-6 text-center bg-white dark:bg-gray-900 transition-colors">
      {/* Animated gradient background */}
      <motion.div
        animate="animate"
        className="absolute inset-0 opacity-60"
        variants={backgroundVariants}
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(147, 51, 234, 0.4) 100%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Dark mode gradient overlay */}
      <div className="absolute inset-0 bg-white/5 dark:bg-black/20 transition-colors" />

      <motion.div
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-3xl w-full gap-8 mt-16"
        initial="hidden"
        variants={containerVariants}
      >
        {/* Badge */}
        <motion.a
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition-colors"
          href="/work/featured"
          variants={itemVariants}
          whileTap={{ scale: 0.95 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          }}
        >
          <strong className="font-semibold">مقاله ویژه</strong>
          <span className="text-gray-600 dark:text-gray-300">
            پروژه‌های منتخب
          </span>
        </motion.a>

        {/* Main heading */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
          variants={itemVariants}
        >
          <motion.span
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            خوش آمدید به دنیای
          </motion.span>
          <br />
          <motion.span
            animate={{ opacity: 1, x: 0 }}
            className="text-blue-600 dark:text-blue-400"
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            کدنویسی خلاقانه
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="max-w-xl text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
          variants={itemVariants}
        >
          اینجا فضای شخصی من برای به اشتراک‌گذاری تجربیات،
          <span className="text-blue-500 dark:text-blue-400 font-medium">
            {' '}
            آموزش‌های برنامه‌نویسی
          </span>
          و پروژه‌های خلاقانه است. با هم یاد می‌گیریم و رشد می‌کنیم.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
          variants={itemVariants}
        >
          <motion.a
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-md"
            href="#get-started"
            whileTap={{ scale: 0.95 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 25px -5px rgba(59,130,246,0.5)',
            }}
          >
            شروع کنید
          </motion.a>
          <motion.a
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            href="#blog"
            whileTap={{ scale: 0.95 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(243,244,246,1)',
            }}
          >
            خواندن مقالات
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
