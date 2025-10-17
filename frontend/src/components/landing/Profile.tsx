import {
  FolderGit2Icon,
  GithubIcon,
  HeadsetIcon,
  LaptopIcon,
  LinkedinIcon,
  MessageSquareIcon,
  StarIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const socialMediaList: {
  id: number;
  label: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 1,
    label: 'Linkedin',
    href: 'https://www.linkedin.com/in/sina-ghaffariii',
    icon: <LinkedinIcon className="size-5" />,
  },
  {
    id: 2,
    label: 'Github',
    href: 'https://github.com/sinaghaffarii',
    icon: <GithubIcon className="size-5" />,
  },
  {
    id: 3,
    label: 'Email',
    href: 'mailto:sinaghafari.dev@gmail.com',
    icon: <MessageSquareIcon className="size-5" />,
  },
];

const Profile = () => {
  return (
    <div className="w-full col-span-3 mb-auto space-y-8">
      <div className="flex items-center justify-start gap-4">
        <LaptopIcon />
        <p>Profile</p>
      </div>
      <div className="h-96 mt-4 bg-white dark:bg-slate-900 w-full rounded-md p-4">
        <Image
          height={200}
          width={150}
          alt="profile image"
          className="object-contain w-full h-8/12"
          src="/images/profile.png"
        />
        <div className="flex items-center justify-center flex-col w-full mx-auto mt-4">
          <p className="text-sm md:text-base font-bold text-gray-950 dark:text-gray-200">
            Sina Ghaffari
          </p>
          <p className="text-sm md:text-base">Front end developer</p>
          <p className="font-medium text-base mt-3">
            I develop everything using Javascript.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-start gap-4">
          <StarIcon className="size-5 text-yellow-500" />
          <p>Service</p>
        </div>
        <Link
          className="flex items-center justify-start gap-5 h-14 px-2 rounded-md bg-white dark:bg-slate-900  cursor-pointer"
          href="https://github.com/sinaghaffarii/Blogest"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FolderGit2Icon className="size-5" />
          <p>Blogest</p>
        </Link>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-start gap-4 text-gray-600 dark:text-gray-300">
          <HeadsetIcon className="size-5" />
          <p>Service</p>
        </div>

        <ul className="p-4 rounded-md bg-white dark:bg-slate-900 space-y-6 text-gray-600 dark:text-gray-300">
          {socialMediaList.map((add) => (
            <li key={add.id}>
              <Link
                className="flex items-center justify-start gap-5 cursor-pointer"
                href={add.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {add.icon}
                <p>{add.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
