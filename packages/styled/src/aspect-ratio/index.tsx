'use client';

import * as React from 'react';
import { AspectRatio as AspectRatioPrimitive } from '@structyl/primitives';
import { cn } from '@structyl/utils';

interface AspectRatioProps extends React.ComponentPropsWithoutRef<'div'> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ...props }, ref) => (
    <AspectRatioPrimitive
      ref={ref}
      className={cn('overflow-hidden rounded-md', className)}
      {...props}
    />
  ),
);
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
export type { AspectRatioProps };
