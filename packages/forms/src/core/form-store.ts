import type { Errors } from '../validation/validation.types';
import type { FormValues } from './form.types';

export interface FormState<T extends FormValues> {
  values: T;
  errors: Errors<T>;
  touched: Partial<Record<keyof T & string, boolean>>;
  dirtyFields: Partial<Record<keyof T & string, boolean>>;
  isSubmitting: boolean;
  isValidating: boolean;
  submitCount: number;
}

type Listener = () => void;

/**
 * A tiny per-form external store consumable by `useSyncExternalStore`.
 * `getSnapshot` returns a referentially-stable state object that only changes
 * when `setState` produces a new reference.
 */
export interface FormStore<T extends FormValues> {
  subscribe: (listener: Listener) => () => void;
  getSnapshot: () => FormState<T>;
  setState: (updater: (prev: FormState<T>) => FormState<T>) => void;
  getState: () => FormState<T>;
}

export function createFormStore<T extends FormValues>(initial: FormState<T>): FormStore<T> {
  let state = initial;
  const listeners = new Set<Listener>();

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => state,
    getState: () => state,
    setState(updater) {
      const next = updater(state);
      if (next === state) return;
      state = next;
      listeners.forEach((l) => l());
    },
  };
}
