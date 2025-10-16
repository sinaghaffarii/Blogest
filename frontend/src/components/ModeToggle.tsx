'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/Button';

const enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() =>
        setTheme(theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK)
      }
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">change theme</span>
    </Button>
  );
}
