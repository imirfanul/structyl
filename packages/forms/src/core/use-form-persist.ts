'use client';

import * as React from 'react';
import type { FormApi, FormValues } from './form.types';
import type { FormStore } from './form-store';

export interface UseFormPersistOptions<T extends FormValues> {
  /** Where to persist. Defaults to `localStorage`. */
  storage?: 'local' | 'session';
  /** Only persist these fields (defaults to all). */
  include?: (keyof T & string)[];
  /** Never persist these fields (e.g. passwords). */
  exclude?: (keyof T & string)[];
  /** Debounce writes by this many ms. Defaults to 300. */
  debounce?: number;
  /** Skip persistence entirely (e.g. until the user opts in). */
  enabled?: boolean;
}

function getStorage(kind: 'local' | 'session'): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return kind === 'session' ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Persist a form's values to `localStorage`/`sessionStorage` and restore them on
 * mount. Ideal for multi-step wizards — progress survives refresh/navigation until
 * you call `clear()` (e.g. after a successful submit).
 *
 * @example
 * const form = useForm({ defaultValues });
 * const { clear } = useFormPersist(form, 'signup-wizard', { storage: 'session' });
 * // on success: clear();
 */
export function useFormPersist<T extends FormValues>(
  form: FormApi<T> & { store: FormStore<T> },
  key: string,
  options: UseFormPersistOptions<T> = {},
): { clear: () => void } {
  const { storage = 'local', include, exclude, debounce = 300, enabled = true } = options;
  const store = form.store;
  const optsRef = React.useRef({ include, exclude });
  optsRef.current = { include, exclude };
  const restored = React.useRef(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const filterValues = React.useCallback((values: T): Partial<T> => {
    const { include: inc, exclude: exc } = optsRef.current;
    const out: Partial<T> = {};
    for (const k of Object.keys(values) as (keyof T & string)[]) {
      if (inc && !inc.includes(k)) continue;
      if (exc && exc.includes(k)) continue;
      out[k] = values[k];
    }
    return out;
  }, []);

  // Restore once on mount (client only).
  React.useEffect(() => {
    if (!enabled || restored.current) return;
    restored.current = true;
    const s = getStorage(storage);
    if (!s) return;
    try {
      const raw = s.getItem(key);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<T>;
        form.setValues(saved);
      }
    } catch {
      /* ignore malformed storage */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, key, storage]);

  // Persist on change (debounced), plus an initial write so the current values
  // are saved even if nothing changes after mount.
  React.useEffect(() => {
    if (!enabled) return undefined;
    const s = getStorage(storage);
    if (!s) return undefined;
    const write = () => {
      try {
        s.setItem(key, JSON.stringify(filterValues(store.getState().values)));
      } catch {
        /* quota or serialization error — ignore */
      }
    };
    write(); // initial snapshot
    const unsubscribe = store.subscribe(() => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(write, debounce);
    });
    return () => {
      unsubscribe();
      clearTimeout(timer.current);
    };
  }, [enabled, key, storage, debounce, store, filterValues]);

  const clear = React.useCallback(() => {
    const s = getStorage(storage);
    try {
      s?.removeItem(key);
    } catch {
      /* ignore */
    }
  }, [storage, key]);

  return { clear };
}
