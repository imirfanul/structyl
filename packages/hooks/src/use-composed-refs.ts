import { useCallback, type Ref } from 'react';

type PossibleRef<T> = Ref<T> | undefined | ((value: T | null) => void);

function setRef<T>(ref: PossibleRef<T>, value: T | null) {
  if (typeof ref === 'function') ref(value as T);
  else if (ref != null && typeof ref === 'object')
    (ref as { current: T | null }).current = value;
}

export function composeRefs<T>(...refs: PossibleRef<T>[]): (node: T | null) => void {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}

export function useComposedRefs<T>(...refs: PossibleRef<T>[]): (node: T | null) => void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(composeRefs(...refs), refs);
}
