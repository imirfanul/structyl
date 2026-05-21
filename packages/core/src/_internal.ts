'use client';

import * as React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined | ((value: T | null) => void);

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
  return React.useCallback(composeRefs(...refs), refs);
}

export function useCallbackRef<T extends (...args: never[]) => unknown>(
  callback: T | undefined,
): T {
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  return React.useMemo(
    () => ((...args) => callbackRef.current?.(...args)) as T,
    [],
  );
}

interface ControllableStateParams<T> {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (value: T) => void;
}

export function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: ControllableStateParams<T>): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [uncontrolled, setUncontrolled] = React.useState(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolled;
  const handleChange = useCallbackRef(onChange);

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as ((prev?: T) => T) | T;
        const newValue =
          typeof setter === 'function' ? (setter as (prev?: T) => T)(prop) : (setter as T);
        if (newValue !== prop) handleChange(newValue as T);
      } else {
        setUncontrolled((prev) => {
          const setter = nextValue as ((prev?: T) => T) | T;
          const newValue =
            typeof setter === 'function' ? (setter as (prev?: T) => T)(prev) : (setter as T);
          if (newValue !== prev) handleChange(newValue as T);
          return newValue;
        });
      }
    },
    [isControlled, prop, handleChange],
  );

  return [value, setValue];
}

let idCounter = 0;
function useReactId() {
  return (React as unknown as { useId?: () => string }).useId?.() ?? '';
}

export function useId(prefix?: string): string {
  const reactId = useReactId();
  const [id, setId] = React.useState<string>(reactId);
  React.useEffect(() => {
    if (!reactId) setId(`yl-${++idCounter}`);
  }, [reactId]);
  return prefix ? `${prefix}-${id || reactId}` : id || reactId;
}

export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
): (event: E) => void {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);
    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as { defaultPrevented: boolean }).defaultPrevented
    ) {
      ourEventHandler?.(event);
    }
  };
}
