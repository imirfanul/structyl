'use client';

import * as React from 'react';
import { VisuallyHidden } from './visually-hidden';

interface AccessibleIconProps {
  /** Visually-hidden label announced to assistive tech. */
  label: string;
  /** The icon element (must be a single React element). */
  children: React.ReactElement;
}

/**
 * Wraps an icon element with `aria-hidden` and an adjacent visually-hidden label,
 * so the icon is decorative to sighted users but still announced to screen readers.
 */
const AccessibleIcon: React.FC<AccessibleIconProps> = ({ label, children }) => {
  const child = React.Children.only(children);
  return (
    <>
      {React.cloneElement(child, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(child.props as any),
        'aria-hidden': 'true',
        focusable: 'false',
      } as React.HTMLAttributes<HTMLElement>)}
      <VisuallyHidden>{label}</VisuallyHidden>
    </>
  );
};
AccessibleIcon.displayName = 'AccessibleIcon';

export { AccessibleIcon };
export type { AccessibleIconProps };
