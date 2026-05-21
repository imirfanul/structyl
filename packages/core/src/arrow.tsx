'use client';

import * as React from 'react';
import { Primitive } from './primitive';

interface ArrowProps extends React.ComponentPropsWithoutRef<typeof Primitive.svg> {
  width?: number;
  height?: number;
}

/**
 * SVG arrow used by `Popper` (and any tooltip/popover that needs a pointer).
 * Composed via `Popper.Arrow` which positions and rotates this element.
 */
const Arrow = React.forwardRef<SVGSVGElement, ArrowProps>((props, forwardedRef) => {
  const { width = 10, height = 5, ...arrowProps } = props;
  return (
    <Primitive.svg
      {...arrowProps}
      ref={forwardedRef as React.Ref<SVGSVGElement>}
      width={width}
      height={height}
      viewBox="0 0 30 10"
      preserveAspectRatio="none"
    >
      <polygon points="0,0 30,0 15,10" fill="currentColor" />
    </Primitive.svg>
  );
});
Arrow.displayName = 'Arrow';

export { Arrow };
export type { ArrowProps };
