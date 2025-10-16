import Link from 'next/link';
import React from 'react';

import { RouteObject } from '@/utils/routeObject';

import { ModeToggle } from '../ModeToggle';

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between w-[90vw] max-w-6xl mx-auto h-12">
        <p>Blogest</p>
        <div className="grid grid-cols-2 gap-6 place-items-center">
          <ModeToggle />
          <Link href={RouteObject.ABOUT}>About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
