'use client';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useAuthenticateContext } from '@/context/AuthenticateContext';
import { RouteObject } from '@/utils/routeObject';

import { ModeToggle } from '../ModeToggle';
import { Button } from '../ui/Button';

const Navbar = () => {
  const { open, setOpen } = useAuthenticateContext();

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between w-[90vw] max-w-6xl mx-auto h-12">
        <Link href={RouteObject.HOME}>Blogest</Link>
        <div className="grid grid-cols-3 gap-3 place-items-center">
          <ModeToggle />
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(!open)}
          >
            <UserIcon
              size="icon"
              className="h-[1rem] w-[1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            />
          </Button>
          <Link href={RouteObject.ABOUT}>About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
