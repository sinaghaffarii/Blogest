import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('bg-accent animate-pulse rounded-xl-md', className)}
      data-slot="skeleton"
      {...props}
    />
  );
}

export { Skeleton };
