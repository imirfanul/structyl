'use client';

import * as React from 'react';
import { getPath } from './get-set-path';
import { useFormContext } from './form-context';
import type { FieldState, FormValues } from './form.types';

export interface UseFieldReturn extends FieldState {
  name: string;
  /** Set this field's value (touches + validates per form mode). */
  setValue: (value: unknown) => void;
  /** Imperatively mark this field touched. */
  setTouched: (touched?: boolean) => void;
  /** Controlled-input props for custom components. */
  field: {
    name: string;
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
  };
}

/**
 * Subscribe to a single field within the nearest `<FormProvider>`/`<Form>`.
 * Re-renders only when this field's value, error, or touched state changes.
 */
export function useField<T extends FormValues = FormValues>(name: keyof T & string): UseFieldReturn {
  const form = useFormContext<T>();
  const { store } = form;

  // Slice selector: snapshot only the parts of state this field cares about.
  const getSlice = React.useCallback(() => {
    const state = store.getState();
    return JSON.stringify({
      value: getPath(state.values, name),
      error: state.errors[name],
      touched: !!state.touched[name],
    });
  }, [store, name]);

  const sliceKey = React.useSyncExternalStore(store.subscribe, getSlice, getSlice);
  void sliceKey; // sliceKey drives re-renders; the real values come from getFieldState

  const state = form.getFieldState(name);

  const setValue = React.useCallback(
    (value: unknown) => form.setValue(name, value, { shouldTouch: true }),
    [form, name],
  );
  const setTouched = React.useCallback(
    (touched = true) => form.setTouched(name, touched),
    [form, name],
  );

  return {
    name,
    ...state,
    setValue,
    setTouched,
    field: {
      name,
      value: state.value,
      onChange: setValue,
      onBlur: () => form.setTouched(name, true),
    },
  };
}
