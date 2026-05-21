import { useCallback, useState } from 'react';

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = useCallback((by = 1) => setCount((c) => c + by), []);
  const decrement = useCallback((by = 1) => setCount((c) => c - by), []);
  const reset = useCallback(() => setCount(initial), [initial]);
  return { count, increment, decrement, reset, set: setCount };
}
