'use client';
import { Moon, Search, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '../ui/button';

const Navbar = () => {
  const [theme, setTheme] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md rounded-md border-gray-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <Link
            aria-label="برگشت به صفحه اصلی"
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
            href="/"
          >
            <div className="relative">
              <Image
                height={44}
                width={44}
                alt="لوگوی وبلاگ"
                className="rounded-md transition-transform duration-300 group-hover:rotate-6"
                src="/images/cat.jpg"
              />
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-400/20 to-pink-400/20 group-hover:from-purple-400/30 group-hover:to-pink-400/30 transition-opacity duration-300"></div>
            </div>
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:block transition-all duration-300">
              وبلاگ من
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 mr-8">
            <Link
              className="relative font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300 px-2 py-1 rounded-md-lg hover:bg-purple-50 group"
              href="/"
            >
              جدیدترین ها
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              className="relative font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300 px-2 py-1 rounded-md-lg hover:bg-purple-50 group"
              href="/"
            >
              جاوااسکریپت
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              className="relative font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300 px-2 py-1 rounded-md-lg hover:bg-purple-50 group"
              href="/"
            >
              مقالات عمومی
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              className="hidden sm:flex px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium"
              href="/login"
            >
              ورود | ثبت نام
            </Link>

            <Button
              size="icon"
              aria-label="جستجو"
              className="w-10 h-10 rounded-md hover:bg-purple-50 hover:text-purple-600 transition-all duration-300"
              variant="ghost"
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button
              size="icon"
              aria-label="تغییر تم"
              className="w-10 h-10 rounded-md hover:bg-purple-50 hover:text-purple-600 transition-all duration-300"
              variant="ghost"
              onClick={() => setTheme(!theme)}
            >
              {theme ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            <Button
              size="icon"
              aria-label="منوی موبایل"
              className="w-10 h-10 rounded-md hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 md:hidden"
              variant="ghost"
              onClick={() => setOpen(!open)}
            >
              <div className="flex flex-col gap-1 w-5">
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`}
                ></span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 py-4 px-6 space-y-4">
          <Link
            className="block text-center py-3 text-gray-700 font-medium rounded-md bg-white hover:text-purple-600 transition-all duration-300"
            href="/"
            onClick={() => setOpen(false)}
          >
            جدیدترین ها
          </Link>
          <Link
            className="block text-center py-3 text-gray-700 font-medium rounded-md bg-white hover:text-purple-600 transition-all duration-300"
            href="/"
            onClick={() => setOpen(false)}
          >
            جاوااسکریپت
          </Link>
          <Link
            className="block text-center py-3 text-gray-700 font-medium rounded-md bg-white hover:text-purple-600 transition-all duration-300"
            href="/"
            onClick={() => setOpen(false)}
          >
            مقالات عمومی
          </Link>
          <div className="pt-2">
            <Button
              size="sm"
              className="w-fit py-4 px-8 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium"
              onClick={() => setOpen(false)}
            >
              ورود | ثبت نام
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
