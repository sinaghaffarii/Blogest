'use client';

import { BookOpen, Bot, Settings2, SquareTerminal, User } from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/sidebar/NavMain';
import { NavProjects } from '@/components/sidebar/NavProjects';
import { NavUser } from '@/components/sidebar/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/Sidebar';

import { Avatar } from '../ui/Avatar';

const data = {
  user: {
    name: 'Sina Ghaffari',
    email: 'm@example.com',
    avatar: '/images/cat.jpg',
  },
  navMain: [
    {
      title: 'Analytics & Monitoring',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Website Analytics',
          url: '#',
        },
        {
          title: 'Google Analytics',
          url: '#',
        },
      ],
    },
    {
      title: 'User Management',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Users',
          url: '#',
        },
      ],
    },
    {
      title: 'Content Management',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Blogs',
          url: '#',
        },
        {
          title: 'Comments',
          url: '#',
        },
      ],
    },
    {
      title: 'System & Logs',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Winston Logs',
          url: '#',
        },
      ],
    },
  ],
  Setting: [
    {
      name: 'Profile',
      url: '#',
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Avatar className="bg-primary text-white rounded-md size-8 flex items-center justify-center m-auto">
            <p>SG</p>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Panel</span>
            <span className="truncate text-xs">Sina Ghaffari</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.Setting} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
