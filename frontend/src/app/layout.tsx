import type { Metadata } from 'next';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
