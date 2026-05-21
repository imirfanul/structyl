import { useId as useReactId } from 'react';

/** SSR-safe stable ID. Wraps React.useId with optional prefix. */
export function useId(prefix?: string): string {
  const id = useReactId();
  return prefix ? `${prefix}-${id}` : id;
}
