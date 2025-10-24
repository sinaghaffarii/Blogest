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
import { RouteObject } from '@/utils/routeObject';

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
          url: RouteObject.WebsiteAnalytics,
        },
        {
          title: 'Google Analytics',
          url: RouteObject.GoogleAnalytics,
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
          url: RouteObject.Users,
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
          url: RouteObject.Blogs,
        },
        {
          title: 'Comments',
          url: RouteObject.Comments,
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
          url: RouteObject.WinstonLogs,
        },
      ],
    },
  ],
  Setting: [
    {
      name: 'Profile',
      url: RouteObject.Profile,
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
