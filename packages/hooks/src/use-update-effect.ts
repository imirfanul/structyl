import { useEffect, useRef, type DependencyList, type EffectCallback } from 'react';

/** Like useEffect, but skips the first run (on mount). */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) return effect();
    isMounted.current = true;
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
