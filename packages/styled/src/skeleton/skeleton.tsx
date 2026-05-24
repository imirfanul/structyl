import * as React from 'react';
import { cn } from '@aura-ui/utils';

const Skeleton = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('bg-muted/50 animate-pulse', className)} aria-hidden {...props} />
  ),
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
