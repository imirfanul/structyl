import type * as React from 'react';

export interface AspectRatioProps extends React.ComponentPropsWithoutRef<'div'> {
  /** The desired ratio (width / height). */
  ratio?: number;
  asChild?: boolean;
}
