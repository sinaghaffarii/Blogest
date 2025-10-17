'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function BlogsPagination({
  pagination,
}: {
  pagination: {
    current?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const current = Number(sp.get('page') ?? pagination.current ?? 1);
  const totalPages = pagination.totalPages ?? 1;

  const go = (page: number) => {
    const params = new URLSearchParams(Object.fromEntries(sp.entries()));
    if (page <= 1) params.delete('page');
    else params.set('page', String(page));
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent className="justify-center">
        <PaginationItem>
          <PaginationPrevious
            className={current <= 1 ? 'opacity-50 pointer-events-none' : ''}
            onClick={() => current > 1 && go(current - 1)}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={current === i + 1}
              onClick={() => go(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => current < totalPages && go(current + 1)}
            className={
              current >= totalPages ? 'opacity-50 pointer-events-none' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
