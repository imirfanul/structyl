'use client';

import * as React from 'react';

let lockCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';

function getScrollbarWidth(): number {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 0;
  return window.innerWidth - document.documentElement.clientWidth;
}

/**
 * Lock body scroll while mounted. Compensates for scrollbar disappearance
 * to avoid layout shift. Reference-counted so nested usages work.
 */
function useScrollLock(enabled: boolean = true) {
  React.useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;
    if (lockCount === 0) {
      const body = document.body;
      const scrollbarWidth = getScrollbarWidth();
      originalOverflow = body.style.overflow;
      originalPaddingRight = body.style.paddingRight;
      const existingPadding = parseInt(window.getComputedStyle(body).paddingRight, 10) || 0;
      body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${existingPadding + scrollbarWidth}px`;
      }
    }
    lockCount++;
    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [enabled]);
}

const ScrollLock: React.FC<{ children?: React.ReactNode; enabled?: boolean }> = ({
  children,
  enabled = true,
}) => {
  useScrollLock(enabled);
  return <>{children}</>;
};
ScrollLock.displayName = 'ScrollLock';

export { ScrollLock, useScrollLock };
