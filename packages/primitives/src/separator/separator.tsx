'use client';

import * as React from 'react';
import { Primitive } from '@your-lib/core';

type Orientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends React.ComponentPropsWithoutRef<'div'> {
  orientation?: Orientation;
  decorative?: boolean;
  asChild?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>((props, forwardedRef) => {
  const { decorative, orientation = 'horizontal', ...rest } = props;
  const ariaProps = decorative
    ? { role: 'none' as const }
    : { 'aria-orientation': orientation, role: 'separator' as const };

  return (
    <Primitive.div
      data-orientation={orientation}
      {...ariaProps}
      {...rest}
      ref={forwardedRef}
    />
  );
});
Separator.displayName = 'Separator';

export { Separator };
