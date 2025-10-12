import type { Metadata } from 'next';

import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

import Providers from './provider';

export const metadata: Metadata = {
  title: 'Blogest',
  description: 'Generated Blog By AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="ltr" lang="en">
      <body className="antialiased relative min-h-screen w-screen">
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
