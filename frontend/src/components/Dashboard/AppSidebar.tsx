'use client';

import {
  BookOpen,
  Bot,
  Command,
  Frame,
  Github,
  LifeBuoy,
  Link,
  Settings2,
  SquareTerminal,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/Dashboard/NavMain';
import { NavProjects } from '@/components/Dashboard/NavProjects';
import { NavSecondary } from '@/components/Dashboard/NavSecondary';
import { NavUser } from '@/components/Dashboard/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';

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
              <div>
                <Github className="!size-6" />
                <p className="text-lg font-semibold p-2 text-start rounded-sm">
                  پنل مدیریتی
                </p>
              </div>
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
