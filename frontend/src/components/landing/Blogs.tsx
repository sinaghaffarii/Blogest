'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { useFilters } from '@/context/FiltersContext';
import { useBlogs } from '@/services/blogs';

import { Spinner } from '../ui/Spinner';
import BlogCard from './BlogCard';
import Filters from './Filters';
import BlogsPagination from './Pagination';

export default function BlogsContainer() {
  const { filters, setFilter } = useFilters();
  const sp = useSearchParams();
  const q = sp.get('q') ?? undefined;
  const category = sp.get('category') ?? undefined;
  const page = Number(sp.get('page') ?? '1');
  const limit = Number(sp.get('limit') ?? '3');
  const sortOrder = (sp.get('sortOrder') as 'asc' | 'desc') ?? 'desc';

  const { data, isLoading, isError } = useBlogs({
    q,
    category,
    page,
    limit,
    sortOrder,
  });

  if (isLoading)
    return (
      <div className="col-span-7">
        <Spinner />
      </div>
    );
  if (isError)
    return <div className="col-span-7 text-red-500">Error loading posts</div>;

  const blogs = data?.blogs ?? [];
  const pagination = data?.pagination ?? {
    current: page,
    hasNext: false,
    hasPrev: page > 1,
  };

  return (
    <div className="w-full col-span-12 md:col-span-7 order-3 pb-10 space-y-8">
      <Filters />
      <ul className="mt-4 flex flex-wrap md:hidden gap-5">
        {['Javascript', 'React', 'Algorithm', 'Data Structure'].map((tag) => (
          <li key={tag}>
            <button
              className={`font-medium text-sm text-gray-500 cursor-pointer hover:bg-transparent `}
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
      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-20">
          <DotLottieReact src="/images/EmptyBox.json" autoplay loop />
          <p className="text-lg text-gray-500">No blogs found!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {blogs.map((b) => (
            <BlogCard key={b._id} blog={b} />
          ))}
        </div>
      )}

      <BlogsPagination pagination={pagination} />
    </div>
  );
}
