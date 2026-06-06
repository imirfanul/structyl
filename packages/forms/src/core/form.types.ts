import type * as React from 'react';
import type { Schema, ValidationMode, Errors } from '../validation/validation.types';

export type FormValues = Record<string, unknown>;

/** Handler invoked with valid values on submit. May be async. */
export type SubmitHandler<T extends FormValues> = (values: T) => void | Promise<void>;

/** Handler invoked with the errors map when submit fails validation. */
export type SubmitErrorHandler<T extends FormValues> = (errors: Errors<T>) => void;

export interface UseFormOptions<T extends FormValues> {
  /** Initial values (uncontrolled). */
  defaultValues?: Partial<T>;
  /** Controlled values — when provided, the form mirrors them. */
  values?: T;
  /** Validation schema: a `v.*` validator map or a `(values) => errors` function. */
  schema?: Schema<T>;
  /** When validation runs. Defaults to `'onSubmit'`. */
  mode?: ValidationMode;
  /** When to re-validate after the first error. Defaults to `'onChange'`. */
  reValidateMode?: Exclude<ValidationMode, 'all'>;
  /** Debounce validation by this many ms (useful for async/onChange validation). */
  validateDebounce?: number;
  /** Called with valid values on submit. */
  onSubmit?: SubmitHandler<T>;
  /** Called with errors when submit fails validation. */
  onError?: SubmitErrorHandler<T>;
}

/** Binding returned by `register` for native inputs. */
export interface RegisterReturn {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  ref: (instance: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null) => void;
}

export interface RegisterOptions {
  /** Coerce the input value to a number before storing. */
  valueAsNumber?: boolean;
  /** Coerce to a boolean (for checkboxes). */
  valueAsBoolean?: boolean;
}

/** Per-field derived state. */
export interface FieldState {
  value: unknown;
  error: string | undefined;
  touched: boolean;
  dirty: boolean;
  invalid: boolean;
}

export interface SetValueOptions {
  shouldValidate?: boolean;
  shouldTouch?: boolean;
  shouldDirty?: boolean;
}

/** One field name, or several (for step-scoped validation). */
export type FieldNames<T extends FormValues> = (keyof T & string) | readonly (keyof T & string)[];

/** The full form API returned by `useForm` and provided via context. */
export interface FormApi<T extends FormValues = FormValues> {
  values: T;
  errors: Errors<T>;
  touched: Partial<Record<keyof T & string, boolean>>;
  /** Per-field dirty map (changed from initial value). */
  dirtyFields: Partial<Record<keyof T & string, boolean>>;
  isSubmitting: boolean;
  /** True while async validation is in flight. */
  isValidating: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;

  register: (name: keyof T & string, options?: RegisterOptions) => RegisterReturn;
  handleSubmit: (
    onValid?: SubmitHandler<T>,
    onInvalid?: SubmitErrorHandler<T>,
  ) => (event?: React.FormEvent) => Promise<void>;
  setValue: (name: string, value: unknown, options?: SetValueOptions) => void;
  setValues: (partial: Partial<T>) => void;
  setError: (name: keyof T & string, message: string) => void;
  clearErrors: (name?: keyof T & string) => void;
  setTouched: (name: keyof T & string, touched?: boolean) => void;
  reset: (nextValues?: Partial<T>) => void;
  /** Validate the whole form, one field, or a subset of fields (e.g. a wizard step). */
  validate: (names?: FieldNames<T>) => Promise<boolean>;
  /** Alias of `validate` — imperative validation trigger. */
  trigger: (names?: FieldNames<T>) => Promise<boolean>;
  getFieldState: (name: keyof T & string) => FieldState;
  /** Read current values without subscribing. Pass a name/path to read one. */
  getValues: (name?: string) => unknown;
  /** Read a single field's value (subscribing variant lives in `useWatch`). */
  watch: (name?: string) => unknown;
  /** Programmatically focus a registered field. */
  setFocus: (name: keyof T & string) => void;
}
