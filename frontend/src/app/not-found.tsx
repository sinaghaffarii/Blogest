import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col w-full h-[calc(100vh-4rem)]">
      <h2>Not Found</h2>
      <Image
        height={400}
        width={400}
        alt="404 not found route!"
        src="/images/404-error.png"
      />
      <p>Could not find requested resource</p>
      <Link href="/">
        <Button className="mt-4" variant="outline">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
