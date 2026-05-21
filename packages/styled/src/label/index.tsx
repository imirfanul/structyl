'use client';

import * as React from 'react';
import { Label as LabelPrimitive, type LabelProps as LabelPrimitiveProps } from '@your-lib/primitives';
import { cn } from '@your-lib/utils';

export interface LabelProps extends LabelPrimitiveProps {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = 'Label';

export { Label };
