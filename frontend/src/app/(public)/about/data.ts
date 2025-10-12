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
    period: '2023 – Present',
    bullets: [
      'Designed and developed complex user interfaces using Next.js and React',
      'Collaborated with the backend team to implement scalable APIs',
      'Optimized page performance and accessibility',
    ],
  },
  {
    id: 'exp2',
    company: 'Kahkeshan Noor',
    role: 'Frontend Developer',
    period: '2020 – 2023',
    bullets: [
      'Implemented reusable and modular UI components',
      'Developed fully responsive layouts for both mobile and desktop',
    ],
  },
];

export const projects = [
  { id: 'p1', title: 'Online Store', tag: 'E-commerce' },
  { id: 'p2', title: 'Personal Portfolio', tag: 'Portfolio' },
  { id: 'p3', title: 'DDSS', tag: 'Enterprise' },
  { id: 'p4', title: 'Sanjify', tag: 'Testing Platform' },
  { id: 'p5', title: 'DanaWiz', tag: 'Application' },
];

export const toolsDesign = ['Figma', 'Photoshop', 'Illustrator'];
export const toolsCollab = ['Notion', 'Linear', 'Slack'];
export const languages = [
  'Persian (Native)',
  'English — Professional Proficiency',
];
