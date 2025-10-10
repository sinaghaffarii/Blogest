export interface Skill {
  name: string;
}
export const skills: Skill[] = [
  { name: 'React.js' },
  { name: 'JavaScript' },
  { name: 'Next.js' },
  { name: 'TypeScript' },
  { name: 'Tailwind CSS' },
  { name: 'Node.js' },
  { name: 'Express' },
  { name: 'MongoDB' },
  { name: 'GraphQL' },
  { name: 'Docker' },
  { name: 'GitLab' },
  { name: 'Linux' },
  { name: 'Jira' },
  { name: 'CI/CD' },
];

export const experiences = [
  {
    id: 'exp1',
    company: 'Kahkeshan Dana',
    role: 'Frontend Developer',
    period: '۱۴۰۲ - اکنون',
    bullets: [
      'طراحی و توسعه رابط‌های کاربری پیچیده با Next.js و React',
      'همکاری با تیم بک‌اند برای پیاده‌سازی APIهای مقیاس‌پذیر',
      'بهینه‌سازی عملکرد و دسترس‌پذیری صفحات',
    ],
  },
  {
    id: 'exp2',
    company: 'Kahkeshan Noor',
    role: 'Frontend Developer',
    period: '۱۳۹۹ - ۱۴۰۲',
    bullets: [
      'پیاده‌سازی کامپوننت‌های قابل استفاده مجدد',
      'طراحی صفحات ریسپانسیو برای موبایل و دسکتاپ',
    ],
  },
];

export const projects = [
  { id: 'p1', title: 'فروشگاه اینترنتی', tag: 'E-commerce' },
  { id: 'p2', title: 'پورتفولیو شخصی', tag: 'Portfolio' },
  { id: 'p3', title: 'DDSS', tag: 'Enterprise' },
  { id: 'p4', title: 'Sanjify', tag: 'Test' },
  { id: 'p5', title: 'DanaWiz', tag: 'Application' },
];

export const toolsDesign = ['Figma', 'Photoshop', 'Illustrator'];
export const toolsCollab = ['Notion', 'Linear', 'Slack'];
export const languages = ['فارسی (زبان مادری)', 'انگلیسی — سطح حرفه‌ای'];
