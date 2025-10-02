import type { Metadata } from 'next';

import Navbar from '@/components/Landing/Navbar/navbar';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';
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
    <html dir="rtl" lang="fa">
      <body className="antialiased">
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
