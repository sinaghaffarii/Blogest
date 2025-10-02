import { HouseIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { NavMenu } from './nav-menu';

const Navbar = () => {
  return (
    <nav
      className="
        fixed bottom-3 inset-x-0 h-12
        border-t dark:border-slate-700/70
        flex items-center justify-between p-2 bg-white z-50
        md:top-6 md:inset-x-4 md:bottom-auto w-[500px] max-w-[80%] rounded-full border shadow-sm mx-auto
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <Button size="icon" className="rounded-full" variant="outline">
          <SunIcon className="h-5 w-5" />
          {/* <MoonIcon /> */}
        </Button>
      </div>

      <Separator className="!h-[70%] sm:me-2" orientation="vertical" />
      {/* Desktop Menu */}

      <NavMenu />

      <Separator className="!h-[70%] sm:ms-2" orientation="vertical" />
      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button size="icon" className="rounded-full" variant="outline">
          <HouseIcon className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
