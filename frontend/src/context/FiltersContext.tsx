'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

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

  const initial: FiltersState = {
    q: sp.get('q') ?? undefined,
    category: sp.get('category') ?? undefined,
    sortOrder: (sp.get('sortOrder') as 'asc' | 'desc') ?? undefined,
    tag: sp.get('tag') ?? undefined,
    page: Number(sp.get('page') ?? 1),
  };

  const [filters, setFilters] = useState<FiltersState>(initial);

  useEffect(() => {
    // keep state in sync when search params change externally
    setFilters({
      q: sp.get('q') ?? undefined,
      category: sp.get('category') ?? undefined,
      sortOrder: (sp.get('sortOrder') as 'asc' | 'desc') ?? undefined,
      tag: sp.get('tag') ?? undefined,
      page: Number(sp.get('page') ?? 1),
    });
  }, [sp]);

  // update URL based on the provided full state (not closure)
  const updateUrl = useCallback(
    (fullState: FiltersState) => {
      const params = new URLSearchParams();

      if (fullState.q) params.set('q', fullState.q);
      if (fullState.category) params.set('category', fullState.category);
      if (fullState.sortOrder) params.set('sortOrder', fullState.sortOrder);
      if (fullState.tag) params.set('tag', fullState.tag);
      params.set('page', String(fullState.page ?? 1));

      // use router.push (client navigation) — avoid window.location when possible
      const next = `${window.location.pathname}?${params.toString()}`;
      router.push(next);
    },
    [router],
  );

  // stable setter
  const setFilter = useCallback(
    (key: keyof FiltersState, value?: number | string | 'asc' | 'desc') => {
      setFilters((prev) => {
        const normalized = value === '' ? undefined : value;
        const newState = { ...prev, [key]: normalized };
        // if page is not set in this change, keep it if needed; you already set page in callers when necessary
        // ensure page is a number
        if (typeof newState.page !== 'number' || Number.isNaN(newState.page)) {
          newState.page = 1;
        }
        updateUrl(newState);
        return newState;
      });
    },
    [updateUrl],
  );

  const clearFilters = useCallback(() => {
    const newState: FiltersState = {
      q: undefined,
      category: undefined,
      sortOrder: undefined,
      tag: undefined,
      page: 1,
    };
    setFilters(newState);
    updateUrl(newState);
  }, [updateUrl]);

  const value = useMemo(
    () => ({ filters, setFilter, clearFilters }),
    [filters, setFilter, clearFilters],
  );

  return <FiltersContext value={value}>{children}</FiltersContext>;
};

export const useFilters = () => {
  const context = use(FiltersContext);
  if (!context)
    throw new Error('useFilters must be used within FiltersProvider');
  return context;
};
