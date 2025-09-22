'use client';

import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Link,
  Settings2,
  SquareTerminal,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/Dashboard/nav-main';
import { NavProjects } from '@/components/Dashboard/nav-projects';
import { NavSecondary } from '@/components/Dashboard/nav-secondary';
import { NavUser } from '@/components/Dashboard/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Sina Ghaffari',
    email: 'Sinaghafari18@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'داشبورد',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: 'مدیریت پست‌ها',
      url: '#',
      icon: Bot,
    },
    {
      title: 'مدیریت کاربران',
      url: '#',
      icon: BookOpen,
    },
    {
      title: 'مدیریت کامنت‌ها',
      url: '#',
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: 'تنظیمات',
      url: '#',
      icon: LifeBuoy,
    },
  ],
  projects: [
    {
      name: 'سیستم تیکت پشتیبانی',
      url: '#',
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-right text-sm leading-right">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary className="mt-auto" items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
