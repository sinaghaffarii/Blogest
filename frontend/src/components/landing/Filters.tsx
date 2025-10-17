// components/filters/Filters.tsx
'use client';

import debounce from 'lodash.debounce';
import { EraserIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { useFilters } from '@/context/FiltersContext';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';

export default function Filters() {
  const { filters, setFilter, clearFilters } = useFilters();

  const [qLocal, setQLocal] = useState<string>(filters.q ?? '');

  const debouncedRef = useRef(
    debounce((value?: string) => {
      setFilter('q', value);
      setFilter('page', 1);
    }, 500),
  );

  useEffect(() => {
    setQLocal(filters.q ?? '');
  }, [filters.q]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      debouncedRef.current?.cancel?.();
    };
  }, []);

  const onChangeQ = (value?: string) => {
    setQLocal(value ?? '');
    debouncedRef.current(value);
  };

  return (
    <form className="space-y-4 w-full" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center gap-3">
        <Input
          className="h-10 border-none bg-white"
          value={qLocal}
          onChange={(e) => onChangeQ(e.target.value)}
          placeholder="Search keywords..."
        />
        {filters.q || filters.category || filters.sortOrder || filters.tag ? (
          <Button type="button" variant="outline" onClick={clearFilters}>
            <EraserIcon />
          </Button>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Select
          value={filters.category ?? undefined}
          onValueChange={(v) =>
            setFilter('category', v === 'all' ? undefined : v)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">all</SelectItem>
              <SelectItem value="javascript">javascript</SelectItem>
              <SelectItem value="react">react</SelectItem>
              <SelectItem value="frontend">frontend</SelectItem>
              <SelectItem value="backend">backend</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={filters.sortOrder ?? 'desc'}
          onValueChange={(v) => setFilter('sortOrder', v as 'asc' | 'desc')}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="asc">Asc</SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
