'use client';

import * as React from 'react';

let count = 0;

/**
 * Inject visually-hidden focusable sentinel elements at the start and end of
 * the document body. When Tab attempts to leave a trapped FocusScope the
 * sentinels catch focus and FocusScope re-enters the scope.
 *
 * Counted singleton — multiple `<FocusGuards />` mounted at once still only
 * inserts one pair of guards.
 */
function useFocusGuards() {
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const edgeGuards = document.querySelectorAll('[data-your-lib-focus-guard]');
    document.body.insertAdjacentElement('afterbegin', edgeGuards[0] ?? createFocusGuard());
    document.body.insertAdjacentElement('beforeend', edgeGuards[1] ?? createFocusGuard());
    count++;
    return () => {
      if (count === 1) {
        document
          .querySelectorAll('[data-your-lib-focus-guard]')
          .forEach((node) => node.remove());
      }
      count--;
    };
  }, []);
}

function createFocusGuard(): HTMLSpanElement {
  const element = document.createElement('span');
  element.setAttribute('data-your-lib-focus-guard', '');
  element.tabIndex = 0;
  element.style.cssText =
    'outline: none; opacity: 0; position: fixed; pointer-events: none';
  return element;
}

const FocusGuards: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  useFocusGuards();
  return <>{children}</>;
};
FocusGuards.displayName = 'FocusGuards';

export { FocusGuards, useFocusGuards };
