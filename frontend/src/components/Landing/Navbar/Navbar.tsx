import { Button } from '@/components/ui/Button';

import { Logo } from './Logo';
import { NavigationSheet } from './NavigationSheet';
import { NavMenu } from './NavMenu';

const Navbar = () => {
  return (
    <div className="bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <Button className="hidden sm:inline-flex" variant="outline">
              ثبت نام
            </Button>
            <Button variant="secondary">ورود</Button>

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
