'use client';

import * as React from 'react';
import { resolveSchema, createCoercer } from '../validation/resolve';
import type { Errors } from '../validation/validation.types';
import { createFormStore, type FormState, type FormStore } from './form-store';
import { getPath, setPath } from './get-set-path';
import type {
  FieldNames,
  FieldState,
  FormApi,
  FormValues,
  RegisterOptions,
  RegisterReturn,
  SetValueOptions,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormOptions,
} from './form.types';

function buildInitialState<T extends FormValues>(values: T): FormState<T> {
  return {
    values,
    errors: {},
    touched: {},
    dirtyFields: {},
    isSubmitting: false,
    isValidating: false,
    submitCount: 0,
  };
}

/** Normalize a single name or array of names into a string array. */
function toNameList(names?: FieldNames<FormValues>): string[] {
  if (names === undefined) return [];
  return Array.isArray(names) ? [...names] : [names as string];
}

/**
 * Headless, reactive form engine. Schema-driven validation, controlled +
 * uncontrolled support, slice-level subscriptions via an external store.
 */
export function useForm<T extends FormValues = FormValues>(
  options: UseFormOptions<T> = {},
): FormApi<T> & { store: FormStore<T> } {
  const {
    defaultValues,
    values: controlledValues,
    schema,
    mode = 'onSubmit',
    reValidateMode = 'onChange',
    validateDebounce = 0,
    onSubmit,
    onError,
  } = options;

  // The store is created once; later updates flow through setState.
  const storeRef = React.useRef<FormStore<T>>(undefined as unknown as FormStore<T>);
  if (!storeRef.current) {
    const initial = (controlledValues ?? (defaultValues as T) ?? ({} as T)) as T;
    storeRef.current = createFormStore<T>(buildInitialState({ ...initial }));
  }
  const store = storeRef.current;

  // Mirror controlled `values` into the store when they change.
  const controlledKey = controlledValues ? JSON.stringify(controlledValues) : null;
  React.useEffect(() => {
    if (!controlledValues) return;
    store.setState((prev) => ({ ...prev, values: { ...controlledValues } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledKey]);

  const resolver = React.useMemo(() => resolveSchema<T>(schema), [schema]);
  // Applies .default()/.coerce()/.transform() to produce effective values (or null).
  const coercer = React.useMemo(() => createCoercer<T>(schema), [schema]);
  const refs = React.useRef(
    new Map<string, HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(),
  );
  const debounceTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  // Stable references to the latest config for use inside callbacks.
  const latest = React.useRef({ resolver, coercer, mode, reValidateMode, validateDebounce, onSubmit, onError });
  latest.current = { resolver, coercer, mode, reValidateMode, validateDebounce, onSubmit, onError };

  const snapshot = React.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);

  /** Raw stored values with defaults/coercions applied (fill-on-read). */
  const coercedValues = React.useMemo(
    () => (coercer ? coercer(snapshot.values) : snapshot.values),
    [coercer, snapshot.values],
  );

  const initialValuesRef = React.useRef(store.getState().values);

  // ── validation ──────────────────────────────────────────────────────────────

  /** Run the resolver and merge errors. `names` scopes which fields are updated. */
  const runValidation = React.useCallback(
    async (names?: string[]): Promise<Errors<T>> => {
      store.setState((prev) => (prev.isValidating ? prev : { ...prev, isValidating: true }));
      const allErrors = await latest.current.resolver(store.getState().values);
      store.setState((prev) => {
        let next: Errors<T>;
        if (names && names.length > 0) {
          next = { ...prev.errors };
          for (const name of names) {
            const key = name as keyof T & string;
            if (allErrors[key]) next[key] = allErrors[key];
            else delete next[key];
          }
        } else {
          next = allErrors;
        }
        return { ...prev, errors: next, isValidating: false };
      });
      return allErrors;
    },
    [store],
  );

  /** Debounced wrapper used by onChange validation. */
  const runValidationDebounced = React.useCallback(
    (names?: string[]) => {
      const ms = latest.current.validateDebounce;
      if (!ms) {
        void runValidation(names);
        return;
      }
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => void runValidation(names), ms);
    },
    [runValidation],
  );

  React.useEffect(() => () => clearTimeout(debounceTimer.current), []);

  const validate = React.useCallback(
    async (names?: FieldNames<T>): Promise<boolean> => {
      const list = toNameList(names as FieldNames<FormValues>);
      const errors = await runValidation(list);
      if (list.length > 0) return list.every((name) => !errors[name as keyof T & string]);
      return Object.keys(errors).length === 0;
    },
    [runValidation],
  );

  // ── value setters ─────────────────────────────────────────────────────────────

  const computeDirty = React.useCallback((name: string, value: unknown): boolean => {
    return getPath(initialValuesRef.current, name) !== value;
  }, []);

  const setValue = React.useCallback(
    (name: string, value: unknown, opts: SetValueOptions = {}) => {
      store.setState((prev) => {
        const nextState: FormState<T> = {
          ...prev,
          values: setPath(prev.values, name, value),
        };
        if (opts.shouldTouch) {
          nextState.touched = { ...prev.touched, [name]: true };
        }
        if (opts.shouldDirty !== false) {
          const dirty = computeDirty(name, value);
          const prevDirty = !!prev.dirtyFields[name as keyof T & string];
          if (dirty !== prevDirty) {
            nextState.dirtyFields = { ...prev.dirtyFields, [name]: dirty };
          }
        }
        return nextState;
      });
      const modeWantsValidation =
        latest.current.mode === 'onChange' || latest.current.mode === 'all';
      const shouldValidate = opts.shouldValidate ?? modeWantsValidation;
      if (shouldValidate) runValidationDebounced([name]);
    },
    [store, runValidationDebounced, computeDirty],
  );

  const setValues = React.useCallback(
    (partial: Partial<T>) => {
      store.setState((prev) => ({ ...prev, values: { ...prev.values, ...partial } }));
    },
    [store],
  );

  const setError = React.useCallback(
    (name: keyof T & string, message: string) => {
      store.setState((prev) => ({ ...prev, errors: { ...prev.errors, [name]: message } }));
    },
    [store],
  );

  const clearErrors = React.useCallback(
    (name?: keyof T & string) => {
      store.setState((prev) => {
        if (!name) return { ...prev, errors: {} };
        const next = { ...prev.errors };
        delete next[name];
        return { ...prev, errors: next };
      });
    },
    [store],
  );

  const setTouched = React.useCallback(
    (name: keyof T & string, touched = true) => {
      store.setState((prev) => ({ ...prev, touched: { ...prev.touched, [name]: touched } }));
    },
    [store],
  );

  const reset = React.useCallback(
    (nextValues?: Partial<T>) => {
      const base = (nextValues as T) ?? initialValuesRef.current;
      const fresh = { ...base } as T;
      initialValuesRef.current = fresh;
      store.setState(() => buildInitialState(fresh));
    },
    [store],
  );

  // ── native input binding ───────────────────────────────────────────────────────

  const register = React.useCallback(
    (name: keyof T & string, regOpts: RegisterOptions = {}): RegisterReturn => ({
      name,
      onChange: (event) => {
        const target = event.target;
        let value: unknown = target.value;
        if (regOpts.valueAsNumber) value = target.value === '' ? undefined : Number(target.value);
        else if (regOpts.valueAsBoolean) value = (target as HTMLInputElement).checked;
        else if (target instanceof HTMLInputElement && target.type === 'checkbox') value = target.checked;
        setValue(name, value, { shouldValidate: shouldValidateOnChange() });
      },
      onBlur: () => {
        setTouched(name, true);
        const m = latest.current.mode;
        if (m === 'onBlur' || m === 'all') void runValidation([name]);
      },
      ref: (instance) => {
        if (instance) refs.current.set(name, instance);
        else refs.current.delete(name);
      },
    }),
    [setValue, setTouched, runValidation],
  );

  function shouldValidateOnChange(): boolean {
    const { mode: m, reValidateMode: rm } = latest.current;
    if (m === 'onChange' || m === 'all') return true;
    // After a field already has an error, re-validate per reValidateMode.
    return rm === 'onChange';
  }

  const setFocus = React.useCallback((name: keyof T & string) => {
    refs.current.get(name)?.focus();
  }, []);

  // ── submit ──────────────────────────────────────────────────────────────────────

  const handleSubmit = React.useCallback(
    (onValid?: SubmitHandler<T>, onInvalid?: SubmitErrorHandler<T>) =>
      async (event?: React.FormEvent) => {
        event?.preventDefault?.();
        store.setState((prev) => ({ ...prev, isSubmitting: true, submitCount: prev.submitCount + 1 }));
        const errors = await runValidation();
        const valid = Object.keys(errors).length === 0;

        if (valid) {
          const handler = onValid ?? latest.current.onSubmit;
          try {
            // Apply defaults/coercions/transforms to the submitted values.
            const raw = store.getState().values;
            const finalValues = latest.current.coercer ? latest.current.coercer(raw) : raw;
            await handler?.(finalValues);
          } finally {
            store.setState((prev) => ({ ...prev, isSubmitting: false }));
          }
        } else {
          // Mark every errored field as touched so messages show.
          store.setState((prev) => {
            const touched = { ...prev.touched };
            for (const key of Object.keys(errors)) touched[key as keyof T & string] = true;
            return { ...prev, touched, isSubmitting: false };
          });
          (onInvalid ?? latest.current.onError)?.(errors);
        }
      },
    [store, runValidation],
  );

  // ── derived / reads ─────────────────────────────────────────────────────────────

  const getFieldState = React.useCallback(
    (name: keyof T & string): FieldState => {
      const state = store.getState();
      const value = getPath(state.values, name);
      const error = state.errors[name];
      return {
        value,
        error,
        touched: !!state.touched[name],
        dirty: getPath(initialValuesRef.current, name) !== value,
        invalid: !!error,
      };
    },
    [store],
  );

  const getValues = React.useCallback(
    (name?: string): unknown => {
      const raw = store.getState().values;
      const values = latest.current.coercer ? latest.current.coercer(raw) : raw;
      return name ? getPath(values, name) : values;
    },
    [store],
  );

  // Subscribing `watch` is provided via useWatch; this is the imperative read.
  const watch = getValues;

  const isDirty = React.useMemo(
    () => JSON.stringify(snapshot.values) !== JSON.stringify(initialValuesRef.current),
    [snapshot.values],
  );

  return {
    store,
    values: coercedValues,
    errors: snapshot.errors,
    touched: snapshot.touched,
    dirtyFields: snapshot.dirtyFields,
    isSubmitting: snapshot.isSubmitting,
    isValidating: snapshot.isValidating,
    isValid: Object.keys(snapshot.errors).length === 0,
    isDirty,
    submitCount: snapshot.submitCount,
    register,
    handleSubmit,
    setValue,
    setValues,
    setError,
    clearErrors,
    setTouched,
    reset,
    validate,
    trigger: validate,
    getFieldState,
    getValues,
    watch,
    setFocus,
  };
}
