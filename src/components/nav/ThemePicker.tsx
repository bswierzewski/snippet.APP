'use client';

import { LoaderIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Button size="icon" variant="ghost">
        <LoaderIcon className="h-[1.5rem] w-[1.5rem] animate-spin" />
      </Button>
    );

  return (
    mounted && (
      <Button size="icon" variant="ghost" onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
        {theme == 'dark' ? <Sun className="h-[1.5rem] w-[1.5rem]" /> : <Moon className="h-[1.5rem] w-[1.5rem]" />}
      </Button>
    )
  );
}
