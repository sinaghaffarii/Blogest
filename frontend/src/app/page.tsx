'use client';
import { Moon, Search, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export default function Home() {
  const [theme, setTheme] = useState(false);
  return (
    <div className="container mx-auto p-4 w-full">
      <nav className="flex items-center justify-between">
        <div className="flex items-center justify-between w-8/12 mx-auto">
          <div className="flex items-center justify-between space-x-7">
            <Link href="/">
              <Image
                height={50}
                width={50}
                alt="cat_logo"
                src="/images/cat.jpg"
              />
            </Link>
            <Link href="/">جدیدترین ها</Link>
            <Link href="/">جاوااسکریپت</Link>
            <Link href="/">مقالات عمومی</Link>
          </div>
          <div className="flex items-center justify-items-center">
            <Button variant="link">ورود | ثبت نام</Button>
            <Button variant="link">
              <Search />
            </Button>
          </div>
        </div>
        <Button variant="link" onClick={() => setTheme(!theme)}>
          {theme ? <Moon /> : <Sun />}
        </Button>
      </nav>
    </div>
  );
}
