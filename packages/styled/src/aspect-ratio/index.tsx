'use client';

import * as React from 'react';
import { AspectRatio as AspectRatioPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

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
