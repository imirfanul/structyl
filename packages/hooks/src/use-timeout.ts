import { useCallback, useEffect, useRef } from 'react';
import { useCallbackRef } from './use-callback-ref';

export interface UseTimeoutReturn {
  /** Restart the timeout from now (optionally with a new delay). */
  reset: (delay?: number) => void;
  /** Cancel a pending timeout. */
  clear: () => void;
}

/**
 * Declarative `setTimeout`. The callback always sees the latest closure, and the
 * timer is cleared on unmount. Pass `delay: null` to pause.
 *
 * @example
 * useTimeout(() => setVisible(false), 3000);
 */
export function useTimeout(callback: () => void, delay: number | null): UseTimeoutReturn {
  const savedCallback = useCallbackRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const clear = useCallback(() => {
    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  const set = useCallback(
    (ms: number | null) => {
      clear();
      if (ms === null) return;
      timeoutRef.current = setTimeout(() => savedCallback(), ms);
    },
    [clear, savedCallback],
  );

  useEffect(() => {
    set(delay);
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback((nextDelay?: number) => set(nextDelay ?? delay), [set, delay]);

  return { reset, clear };
}
