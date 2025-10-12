'use client';

import type { ReactNode } from 'react';

import Navbar from '@/components/Landing/Navbar/Navbar';

interface PublicLayoutProviderProps {
  children: ReactNode;
}

export default function PublicLayoutProvider({
  children,
}: PublicLayoutProviderProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex- w-6xl max-w-[85vw] mx-auto space-y-12">{children}</main>
      <footer
        dir="ltr"
        className="mt-auto border-t py-6 text-center text-sm text-muted-foreground"
      >
        © {new Date().getFullYear()} Sina Ghaffari — Blogest. All rights
        reserved.
      </footer>
    </div>
  );
}
