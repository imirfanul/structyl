import { useEffect } from 'react';
import { useCallbackRef } from './use-callback-ref';

/**
 * Declarative `setInterval` (the classic pattern). The callback always sees the
 * latest closure, and the interval is cleared on unmount. Pass `delay: null` to pause.
 *
 * @example
 * useInterval(() => setCount((c) => c + 1), running ? 1000 : null);
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useCallbackRef(callback);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback(), delay);
    return () => clearInterval(id);
  }, [delay, savedCallback]);
}
