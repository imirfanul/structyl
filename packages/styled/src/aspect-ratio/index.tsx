'use client';

import * as React from 'react';
import { AspectRatio as AspectRatioPrimitive } from '@your-lib/primitives';
import { cn } from '@your-lib/utils';

type AspectRatioProps = React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive>;

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
