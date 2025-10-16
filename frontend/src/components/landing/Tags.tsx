import { TagsIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
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

const Tags = () => {
  return (
    <div className="w-full col-span-2 mb-auto space-y-8">
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
  );
};

export default Tags;
