import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';

import Providers from './provider';
import './globals.css';

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
    <html dir="rtl" lang="fa">
      <body className="antialiased">
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
