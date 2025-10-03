import type { Metadata } from 'next';

import Navbar from '@/components/Landing/Navbar/Navbar';
import { ThemeProvider } from '@/components/ThemProvider';

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
          defaultTheme="dark"
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
