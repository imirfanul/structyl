'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Primitive } from './primitive';

interface PortalProps extends React.ComponentPropsWithoutRef<typeof Primitive.div> {
  /** Element where the portal renders. Defaults to `document.body`. */
  container?: Element | DocumentFragment | null;
}

const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  (props, forwardedRef) => {
    const { container: containerProp, ...portalProps } = props;
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    const container =
      containerProp ?? (typeof document !== 'undefined' ? document.body : null);

    if (!mounted || !container) return null;

    return ReactDOM.createPortal(
      <Primitive.div {...portalProps} ref={forwardedRef} />,
      container,
    );
  },
);
Portal.displayName = 'Portal';

export { Portal };
export type { PortalProps };
