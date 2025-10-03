import { RouteObject } from '@/utils/routeObject';

export const menuItems = [
  { name: 'خانه', path: RouteObject.HOME },
  { name: 'درباره من', path: RouteObject.ABOUT },
  {
    name: 'مقالات',
    path: RouteObject.BLOG,
    children: [
      { name: 'همه مقالات', path: RouteObject.BLOG },
      { name: 'جاوا اسکریپت', path: '/blog/javascript' },
      { name: 'ری‌اکت و نکست', path: '/blog/react-next' },
      { name: 'طراحی و UX', path: '/blog/design' },
    ],
  },
  { name: 'پروژه‌ها', path: RouteObject.PROGECTS },
  { name: 'تماس با من', path: RouteObject.CONTACT },
];
