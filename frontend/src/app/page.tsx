import {
  FolderGit2Icon,
  GithubIcon,
  HeadsetIcon,
  LaptopIcon,
  LinkedinIcon,
  MessageSquareIcon,
  StarIcon,
  TagsIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ModeToggle } from '@/components/ModeToggle';
import { RouteObject } from '@/utils/routeObject';

// async function fetchBlogs(): Promise<{
//   blogs: Blog[];
//   pagination: {
//     current: number;
//     hasNext: boolean;
//     hasPrev: boolean;
//     items: number;
//     total: number;
//   };
// }> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/getList`);
//   if (!res.ok) {
//     throw new Error('Received Articles encountered by error');
//   }
//   return res.json();
// }

const tagsList = [
  {
    id: 'c6b9d2b4-23ef-4c8a-8e13-b5b5f8c14d8a',
    title: 'react',
    link: '/react',
  },
  {
    id: 'd4c5f75b-2ef0-4b31-a8de-2b8c7f49a3f6',
    title: 'typescript',
    link: '/typescript',
  },
  {
    id: 'ae6f8a91-8c59-4d34-b532-97c7b09a1ef1',
    title: 'javascript',
    link: '/javascript',
  },
  {
    id: 'f8b42a7a-49e1-46cc-b42f-ec7f23f8a13e',
    title: 'docker',
    link: '/docker',
  },
  {
    id: 'ab7e1df6-5d7c-4f67-8c72-5a11b0a5dc72',
    title: 'ci/cd',
    link: '/ci-cd',
  },
  {
    id: 'b1a2b3c4-56d7-48e9-9123-a4b5c6d7e8f9',
    title: 'ai',
    link: '/ai',
  },
  {
    id: 'cb3a2f8d-6a3c-4214-bb83-93412cc8cdd5',
    title: 'frontend',
    link: '/frontend',
  },
  {
    id: 'da8f6e9a-2b7e-4f8b-8d3a-9b92a7a8c3e2',
    title: 'backend',
    link: '/backend',
  },
  {
    id: 'ea2c8b49-67a2-41f3-84d2-fdd49a6d1f01',
    title: 'node.js',
    link: '/node-js',
  },
  {
    id: 'f4a18a8f-7c5a-4562-9312-8fa93b1cd4e3',
    title: 'mongodb',
    link: '/mongodb',
  },
  {
    id: 'a7c12e5f-41f2-4b43-ae8a-4e2f8f9f8b6b',
    title: 'jest',
    link: '/jest',
  },
  {
    id: 'bb9e8c6a-5a13-4f2e-9b52-5f4a6d8b3c91',
    title: 'data structure',
    link: '/data-structure',
  },
  {
    id: 'cc8b4d1a-9e42-49a3-8b1f-7e2a6f1b4d8f',
    title: 'algorithm',
    link: '/algorithm',
  },
];

export default async function Home() {
  return (
    <div>
      <nav className="border-b">
        <div className="flex items-center justify-between w-[90vw] max-w-6xl mx-auto h-12">
          <p>Blogest</p>
          <div className="grid grid-cols-2 gap-6 place-items-center">
            <ModeToggle />
            <Link href={RouteObject.ABOUT}>About</Link>
          </div>
        </div>
      </nav>
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 place-items-center w-full max-w-6xl mx-auto mt-12">
        <div className="w-full col-span-2 mb-auto">
          <div className="flex items-center justify-start gap-4">
            <TagsIcon />
            <p>Tags</p>
          </div>
          <ul className="mt-4 space-y-1">
            {tagsList.map((tag) => (
              <li
                className="px-4 py-1 hover:bg-gray-300 rounded-full text-gray-600 dark:text-gray-300 font-medium text-xs sm:text-sm cursor-pointer active:scale-95 "
                key={tag.id}
              >
                <Link href={tag.link}>{tag.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-green-500 w-full col-span-7">blogs</div>
        <div className="w-full col-span-3 mb-auto space-y-8 sticky">
          <div className="flex items-center justify-start gap-4">
            <LaptopIcon />
            <p>Profile</p>
          </div>
          <div className="h-96 mt-4 bg-white dark:bg-slate-900 w-full rounded-2xl p-4">
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
              className="flex items-center justify-start gap-5 h-14 px-2 rounded-xl bg-white dark:bg-slate-900  cursor-pointer"
              href="#"
            >
              <FolderGit2Icon />
              <p>Blogest</p>
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-start gap-4 text-gray-600 dark:text-gray-300">
              <HeadsetIcon className="size-5" />
              <p>Service</p>
            </div>

            <ul className="p-4 rounded-xl bg-white dark:bg-slate-900 space-y-6 text-gray-600 dark:text-gray-300">
              <li>
                <Link
                  className="flex items-center justify-start gap-5 cursor-pointer"
                  href="#"
                >
                  <GithubIcon className="size-5" />
                  <p>Github</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-start gap-5 cursor-pointer"
                  href="#"
                >
                  <MessageSquareIcon className="size-5" />
                  <p>Email</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-start gap-5 cursor-pointer"
                  href="#"
                >
                  <LinkedinIcon className="size-5" />
                  <p>Linkedin</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
