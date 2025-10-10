import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';

import { AuthContainer } from '@/components/Login/AuthContainer';
import PublicLayoutProvider from '@/providers/PublicLayoutProvider';

export default function LoginPage() {
  return (
    <PublicLayoutProvider>
      <div className="flex min-h-[90svh] flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-7xl flex-col gap-6">
          <AuthContainer />
        </div>
      </div>
    </PublicLayoutProvider>
  );
}
