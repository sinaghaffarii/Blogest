'use client';
import Lottie from 'lottie-react';

import Navbar from '@/components/Landing/Navbar';
import { Button } from '@/components/ui/button';

import Developer from '../../public/images/Developer.json';

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      <header className="flex-1 flex items-center justify-center py-8">
        <div className="container mx-auto px-4 w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16 xl:gap-24">
            {/* Text Content */}
            <div className="text-center lg:text-right space-y-6 lg:space-y-8 order-2 lg:order-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight lg:leading-tight">
                من <span className="text-purple-600">سینا</span> هستم
                <br />
                <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-relaxed text-gray-700 mt-4 block">
                  توسعه‌دهنده‌ای که عاشق <br />
                  یادگیری و به اشتراک‌گذاریه
                </span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
                این وبلاگ جاییه که تجربه‌های شخصی، مسیر رشد حرفه‌ای و دیدگاه‌هام
                در دنیای برنامه‌نویسی رو باهات به اشتراک میذارم. می‌خوام اینجا
                نه فقط مقاله بخونی، بلکه با من همراه بشی و با هم رشد کنیم.
              </p>

              <div className="pt-4 lg:pt-6">
                <Button
                  aria-label="شروع مسیر رشد برنامه نویسی با سینا"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg font-semibold text-base md:text-lg"
                >
                  شروع مسیر با من 🚀
                </Button>
              </div>
            </div>

            {/* Animation Section - Larger */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
              <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <Lottie
                  aria-label="انیمیشن خلاقانه برنامه نویسی"
                  className="w-full h-auto"
                  animationData={Developer}
                  loop
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
