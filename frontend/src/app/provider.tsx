'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Toaster position="top-center" richColors />
        {children}
      </CookiesProvider>
    </QueryClientProvider>
  );
}
