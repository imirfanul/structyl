'use client';

import * as React from 'react';
import { Primitive } from './primitive';

const VISUALLY_HIDDEN_STYLES: React.CSSProperties = {
  position: 'absolute',
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
};

type VisuallyHiddenProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;

const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  (props, forwardedRef) => (
    <Primitive.span
      {...props}
      ref={forwardedRef}
      style={{ ...VISUALLY_HIDDEN_STYLES, ...props.style }}
    />
  ),
);
VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };
export type { VisuallyHiddenProps };
