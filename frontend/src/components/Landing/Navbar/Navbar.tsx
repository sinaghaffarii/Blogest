'use client';
import { useRouter } from 'next/navigation';

import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/Button';
import { RouteObject } from '@/utils/routeObject';

import { Logo } from './Logo';
import { NavigationSheet } from './NavigationSheet';
import { NavMenu } from './NavMenu';

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start gap-3 w-60">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center">
            <NavMenu />
          </div>

          <div className="flex items-center justify-end gap-3 w-60">
            <ModeToggle />
            <Button
              className="hidden sm:inline-flex"
              variant="outline"
              onClick={() => router.push(RouteObject.LOGIN)}
            >
              Sign in & Sign up
            </Button>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
