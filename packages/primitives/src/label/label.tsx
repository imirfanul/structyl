'use client';

import * as React from 'react';
import { Primitive } from '@your-lib/core';

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  asChild?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>((props, forwardedRef) => (
  <Primitive.label
    {...props}
    ref={forwardedRef}
    onMouseDown={(event) => {
      // Prevent text selection on double-click but allow form control focus
      if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      props.onMouseDown?.(event);
    }}
  />
));
Label.displayName = 'Label';

export { Label };
