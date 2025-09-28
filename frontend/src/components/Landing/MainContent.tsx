'use client';
import Image from 'next/image';
import Link from 'next/link';

import { usePosts } from '@/services/posts';

const MainContent = () => {
  const { data, isLoading, isError } = usePosts();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts.</div>;

  return (
    <section className="container mx-auto px-4 w-full max-w-7xl py-12 space-y-16">
      <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-600">
        پر بازدید های 24 ساعت گذشته
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.posts && data.posts.length > 0 ? (
          data.posts.map((post) => (
            <div
              className="bg-white border w-full p-3 h-[350px] rounded-md cursor-pointer"
              key={post._id}
            >
              <Image
                height={100}
                width={100}
                alt={post.title}
                className="w-full h-56 object-content rounded-md mb-3 shadow-lg"
                src="/images/ide-coding.jpg"
              />
              {post.title}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            هیچ پستی برای نمایش وجود ندارد.
          </div>
        )}
      </div>

      <div className="relative p-8 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row items-center gap-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <Image
            height={120}
            width={120}
            alt="نویسنده"
            className="rounded-full shadow-xl ring-4 ring-purple-200"
            src="/images/cat.jpg"
          />

          <div className="text-center md:text-right space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              اینجا خونه‌ی کُد و خلاقیته 🚀
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              من <span className="font-semibold text-purple-600">سینا</span>{' '}
              هستم، یه برنامه‌نویس که همیشه دنبال یادگیری چیزای جدید و اشتراک
              گذاشتنشه. این وبلاگ جاییه که قراره با هم یاد بگیریم، تجربه کنیم و
              رشد کنیم. اگه عاشق تکنولوژی، برنامه‌نویسی و آینده‌اش هستی، جای
              درستی اومدی ✨
            </p>
            <Link
              className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-xl font-medium"
              href="/about"
            >
              بیشتر بخوانید
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
