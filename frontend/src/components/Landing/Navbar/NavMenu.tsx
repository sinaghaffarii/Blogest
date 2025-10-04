'use client';
import type { ComponentProps } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/NavigationMenu';

import { menuItems } from './MenuItems';

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const pathname = usePathname();
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center data-[orientation=vertical]:justify-center flex-row-reverse">
        {menuItems.map((item, idx) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key
          <NavigationMenuItem
            key={idx}
            className={
              pathname === item.path
                ? 'underline underline-offset-[12px] text-blue-600 dark:text-blue-400'
                : ''
            }
          >
            <NavigationMenuLink asChild>
              <Link href={item.path}>{item.name}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
