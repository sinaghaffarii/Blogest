'use client';
import { TagsIcon } from 'lucide-react';
import React from 'react';

import { useFilters } from '@/context/FiltersContext';

const tagsList = [
  'react',
  'typescript',
  'javascript',
  'docker',
  'ci/cd',
  'ai',
  'frontend',
  'backend',
  'node.js',
  'mongodb',
  'jest',
  'data structure',
  'algorithm',
];

export default function Tags() {
  const { filters, setFilter } = useFilters();

  return (
    <div className="w-full col-span-2 mb-auto space-y-8">
      <div className="flex items-center justify-start gap-4">
        <TagsIcon />
        <p>Tags</p>
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {tagsList.map((tag) => (
          <li key={tag}>
            <button
              className={`px-4 py-0.5 rounded-full font-medium text-xs sm:text-sm cursor-pointer hover:bg-transparent ${filters.tag === tag ? 'bg-blue-500 text-white' : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300'}`}
              type="button"
              onClick={() =>
                setFilter('tag', filters.tag === tag ? undefined : tag)
              }
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
