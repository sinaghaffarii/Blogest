import type { Metadata } from 'next';

import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

import Providers from './provider';

export const metadata: Metadata = {
  title: 'Blogest',
  description: 'Generated Blog By AI',
  icons: { icon: '/favicon.ico' },
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <head />
      <body className="antialiased relative min-h-dvh w-full bg-background text-foreground">
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
