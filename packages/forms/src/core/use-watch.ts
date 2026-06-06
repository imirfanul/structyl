'use client';

import * as React from 'react';
import { getPath } from './get-set-path';
import { useFormContext } from './form-context';
import type { FormValues } from './form.types';

/**
 * Subscribe to a single field's value (or the whole form's values) and re-render
 * only when that slice changes. Read-only — use `setValue` to write.
 *
 * @example
 * const country = useWatch('country');
 * return country === 'US' ? <StateSelect /> : null;
 */
export function useWatch<V = unknown, T extends FormValues = FormValues>(name?: string): V {
  const form = useFormContext<T>();
  const { store } = form;

  const getSnapshot = React.useCallback(() => {
    const values = store.getState().values;
    const slice = name ? getPath(values, name) : values;
    return JSON.stringify(slice ?? null);
  }, [store, name]);

  const serialized = React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
  return React.useMemo(() => JSON.parse(serialized) as V, [serialized]);
}
