'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center flex-col w-full h-[calc(100vh-4rem)]">
      <h2>Something went wrong!</h2>
      <Image
        height={400}
        width={400}
        alt="404 not found route!"
        src="/images/Feeling-sorry-cuate.png"
      />

      <Button className="mt-4" variant="outline" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
