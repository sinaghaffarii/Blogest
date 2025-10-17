'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, use, useEffect, useMemo, useState } from 'react';

export interface FiltersState {
  q?: string;
  category?: string;
  sortOrder?: 'asc' | 'desc';
  tag?: string;
  page: number;
}

interface FiltersContextType {
  filters: FiltersState;
  setFilter: (
    key: keyof FiltersState,
    value?: number | string | 'asc' | 'desc',
  ) => void;
  clearFilters: () => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);
FiltersContext.displayName = 'FiltersContext';

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const sp = useSearchParams();

  const [filters, setFilters] = useState<FiltersState>({
    q: sp.get('q') ?? undefined,
    category: sp.get('category') ?? undefined,
    sortOrder: (sp.get('sortOrder') as 'asc' | 'desc') ?? undefined,
    tag: sp.get('tag') ?? undefined,
    page: Number(sp.get('page') ?? 1),
  });

  useEffect(() => {
    setFilters({
      q: sp.get('q') ?? undefined,
      category: sp.get('category') ?? undefined,
      sortOrder: (sp.get('sortOrder') as 'asc' | 'desc') ?? undefined,
      tag: sp.get('tag') ?? undefined,
      page: Number(sp.get('page') ?? 1),
    });
  }, [sp]);

  const updateUrl = (newFilters: Partial<FiltersState>) => {
    const updated = { ...filters, ...newFilters };
    const params = new URLSearchParams();

    if (updated.q) params.set('q', updated.q);
    if (updated.category) params.set('category', updated.category);
    if (updated.sortOrder) params.set('sortOrder', updated.sortOrder);
    if (updated.tag) params.set('tag', updated.tag);
    params.set('page', String(updated.page ?? 1));

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const setFilter = (
    key: keyof FiltersState,
    value?: number | string | 'asc' | 'desc',
  ) => {
    setFilters((prev) => {
      const newState = { ...prev, [key]: value === '' ? undefined : value };
      updateUrl(newState);
      return newState;
    });
  };

  const clearFilters = () => {
    const newState: FiltersState = {
      q: undefined,
      category: undefined,
      sortOrder: undefined,
      tag: undefined,
      page: 1,
    };
    setFilters(newState);
    updateUrl(newState);
  };

  const value = useMemo(
    () => ({ filters, setFilter, clearFilters }),
    [filters],
  );

  return <FiltersContext value={value}>{children}</FiltersContext>;
};

export const useFilters = () => {
  const context = use(FiltersContext);
  if (!context)
    throw new Error('useFilters must be used within FiltersProvider');
  return context;
};
