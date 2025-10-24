'use client';

import type { ColumnDef } from '@tanstack/react-table';

import {
  CheckCircleIcon,
  PenBoxIcon,
  RefreshCwIcon,
  Trash2Icon,
  XCircleIcon,
} from 'lucide-react';

import type { Blog } from '@/utils/types';

import DataTable from '@/components/DataTable';
import Loading from '@/components/loading/Loading';
import { Button } from '@/components/ui/Button';
import { useBlogs } from '@/services/blogs';
import { toEnglishDate } from '@/utils/toPersianDate';

export const columns: ColumnDef<Blog>[] = [
  {
    accessorFn: (row) => row.author?.name ?? '--',
    id: 'author',
    header: 'Author',
    cell: ({ getValue }) => (
      <div className="font-medium text-base">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
    cell: ({ row }) => <div>{row.getValue('slug')}</div>,
  },
  {
    accessorKey: 'likesCount',
    header: 'LikesCount',
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('likesCount')}</div>
    ),
  },
  {
    accessorKey: 'commentsCount',
    header: 'Comments Count',
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('commentsCount')}</div>
    ),
  },
  {
    accessorKey: 'published',
    header: 'Published',
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.getValue('published') ? (
          <CheckCircleIcon className="text-green-500" />
        ) : (
          <XCircleIcon className="text-red-500" />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <div>{toEnglishDate(row.getValue('createdAt'))}</div>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <div className="flex items-center justify-center gap-4 w-[150px]">
        <Button className="w-fit" variant="destructive">
          <Trash2Icon />
        </Button>
        <Button className="w-fit" variant="default">
          <PenBoxIcon />
        </Button>
      </div>
    ),
  },
];
const Blogs = () => {
  const { data, isPending, isError, error, refetch } = useBlogs();

  if (isPending) return <Loading />;

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-red-500 font-medium">An error has occurred:</p>
        <p className="text-gray-600 text-sm">
          {error?.message ?? 'Unknown error'}
        </p>
        <Button
          className="flex items-center gap-2"
          variant="outline"
          onClick={() => refetch()}
        >
          <RefreshCwIcon size={16} />
          try again
        </Button>
      </div>
    );

  return (
    <div>
      <DataTable data={data?.blogs ?? []} columns={columns} />
    </div>
  );
};

export default Blogs;
