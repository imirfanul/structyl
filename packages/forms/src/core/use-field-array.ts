'use client';

import * as React from 'react';
import { getPath } from './get-set-path';
import { useFormContext } from './form-context';
import type { FormValues } from './form.types';

/** An item in a field array, with a stable React key. */
export interface FieldArrayItem<V = unknown> {
  /** Stable key for React lists — survives reorders, unlike the index. */
  id: string;
  /** The item's current value. */
  value: V;
}

export interface UseFieldArrayReturn<V = unknown> {
  /** The current items, each with a stable `id` for use as a React `key`. */
  fields: FieldArrayItem<V>[];
  /** Add one or more items to the end. */
  append: (...items: V[]) => void;
  /** Add one or more items to the front. */
  prepend: (...items: V[]) => void;
  /** Insert an item at `index`. */
  insert: (index: number, item: V) => void;
  /** Remove the item at `index` (or all items if omitted). */
  remove: (index?: number) => void;
  /** Swap two items by index. */
  swap: (a: number, b: number) => void;
  /** Move an item from one index to another. */
  move: (from: number, to: number) => void;
  /** Update the item at `index` in place. */
  update: (index: number, item: V) => void;
  /** Replace the whole array. */
  replace: (items: V[]) => void;
}

let keyCounter = 0;
const nextKey = () => `fa-${++keyCounter}`;

/**
 * Manage a dynamic list field (e.g. `items`, `contacts`) within the nearest
 * `<FormProvider>`/`<Form>`. Returns stable `fields` with `id` keys plus the
 * usual array operations, all wired through the form store.
 *
 * @example
 * const { fields, append, remove } = useFieldArray('contacts');
 * return (
 *   <>
 *     {fields.map((field, i) => (
 *       <input key={field.id} {...form.register(`contacts[${i}].email`)} />
 *     ))}
 *     <button type="button" onClick={() => append({ email: '' })}>Add</button>
 *   </>
 * );
 */
export function useFieldArray<V = unknown, T extends FormValues = FormValues>(
  name: keyof T & string,
): UseFieldArrayReturn<V> {
  const form = useFormContext<T>();
  const { store } = form;

  // Track a stable key per index. Re-derived only when the array length changes.
  const keysRef = React.useRef<string[]>([]);

  const getArray = React.useCallback((): V[] => {
    const value = getPath(store.getState().values, name);
    return Array.isArray(value) ? (value as V[]) : [];
  }, [store, name]);

  // Subscribe to length + contents so the component re-renders on changes.
  const serialized = React.useSyncExternalStore(
    store.subscribe,
    () => JSON.stringify(getArray()),
    () => JSON.stringify(getArray()),
  );

  const items = React.useMemo(() => JSON.parse(serialized) as V[], [serialized]);

  // Keep keysRef in sync with the current length (add/remove keys as needed).
  if (keysRef.current.length < items.length) {
    while (keysRef.current.length < items.length) keysRef.current.push(nextKey());
  } else if (keysRef.current.length > items.length) {
    keysRef.current = keysRef.current.slice(0, items.length);
  }

  const fields: FieldArrayItem<V>[] = items.map((value, i) => ({
    id: keysRef.current[i]!,
    value,
  }));

  const commit = React.useCallback(
    (next: V[], keys: string[]) => {
      keysRef.current = keys;
      form.setValue(name, next, { shouldDirty: true, shouldValidate: false });
    },
    [form, name],
  );

  const append = React.useCallback(
    (...newItems: V[]) => {
      commit([...getArray(), ...newItems], [...keysRef.current, ...newItems.map(nextKey)]);
    },
    [commit, getArray],
  );

  const prepend = React.useCallback(
    (...newItems: V[]) => {
      commit([...newItems, ...getArray()], [...newItems.map(nextKey), ...keysRef.current]);
    },
    [commit, getArray],
  );

  const insert = React.useCallback(
    (index: number, item: V) => {
      const arr = getArray();
      const keys = [...keysRef.current];
      arr.splice(index, 0, item);
      keys.splice(index, 0, nextKey());
      commit(arr, keys);
    },
    [commit, getArray],
  );

  const remove = React.useCallback(
    (index?: number) => {
      if (index === undefined) {
        commit([], []);
        return;
      }
      const arr = getArray();
      const keys = [...keysRef.current];
      arr.splice(index, 1);
      keys.splice(index, 1);
      commit(arr, keys);
    },
    [commit, getArray],
  );

  const swap = React.useCallback(
    (a: number, b: number) => {
      const arr = getArray();
      const keys = [...keysRef.current];
      [arr[a], arr[b]] = [arr[b]!, arr[a]!];
      [keys[a], keys[b]] = [keys[b]!, keys[a]!];
      commit(arr, keys);
    },
    [commit, getArray],
  );

  const move = React.useCallback(
    (from: number, to: number) => {
      const arr = getArray();
      const keys = [...keysRef.current];
      const [item] = arr.splice(from, 1);
      const [key] = keys.splice(from, 1);
      arr.splice(to, 0, item!);
      keys.splice(to, 0, key!);
      commit(arr, keys);
    },
    [commit, getArray],
  );

  const update = React.useCallback(
    (index: number, item: V) => {
      const arr = getArray();
      arr[index] = item;
      commit(arr, keysRef.current);
    },
    [commit, getArray],
  );

  const replace = React.useCallback(
    (next: V[]) => {
      commit(next, next.map(nextKey));
    },
    [commit],
  );

  return { fields, append, prepend, insert, remove, swap, move, update, replace };
}
