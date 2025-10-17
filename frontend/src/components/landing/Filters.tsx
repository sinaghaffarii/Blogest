'use client';
import debounce from 'lodash.debounce';
import { EraserIcon } from 'lucide-react';
import React, { useMemo } from 'react';

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

  const onChangeQ = useMemo(
    () =>
      debounce((value?: string) => {
        setFilter('q', value);
        setFilter('page', 1);
      }, 1000),
    [setFilter],
  );

  return (
    <form className="space-y-4 w-full">
      <div className="flex items-center gap-3">
        <Input
          className="h-10 border-none bg-white"
          value={filters.q ?? ''}
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
