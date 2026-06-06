import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

export interface UseScrollLockOptions {
  /** Whether the lock is active. Defaults to true. */
  enabled?: boolean;
  /** Element to lock. Defaults to `document.body`. */
  target?: HTMLElement | null;
}

/**
 * Lock body (or a target element) scroll while active — for dialogs, drawers, sheets.
 * Compensates for scrollbar width to avoid layout shift, and restores prior styles on cleanup.
 * SSR-safe; no-op on the server.
 *
 * @example
 * useScrollLock({ enabled: open });
 */
export function useScrollLock({ enabled = true, target }: UseScrollLockOptions = {}): void {
  useIsomorphicLayoutEffect(() => {
    if (!enabled) return;
    if (typeof document === 'undefined') return;

    const el = target ?? document.body;
    const { overflow, paddingRight } = el.style;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    el.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      const current = parseFloat(window.getComputedStyle(el).paddingRight) || 0;
      el.style.paddingRight = `${current + scrollbarWidth}px`;
    }

    return () => {
      el.style.overflow = overflow;
      el.style.paddingRight = paddingRight;
    };
  }, [enabled, target]);
}
