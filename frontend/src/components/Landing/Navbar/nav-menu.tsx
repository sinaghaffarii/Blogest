import type { ComponentProps } from 'react';

import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { menuItems } from './menuItems';

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center data-[orientation=vertical]:justify-center flex-row-reverse">
      {menuItems.map((item, idx) => (
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <NavigationMenuItem key={idx}>
          <NavigationMenuLink asChild>
            <Link href={item.path}>{item.name}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
