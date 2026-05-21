import { useMemo, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders
 * when passed as a prop or in dependency arrays.
 */
export function useCallbackRef<T extends (...args: never[]) => unknown>(
  callback: T | undefined,
): T {
  const callbackRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(
    () => ((...args) => callbackRef.current?.(...args)) as T,
    [],
  );
}
