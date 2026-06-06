import type * as React from 'react';
import type { FormApi, FormValues } from '../core/form.types';
import type { FormStore } from '../core/form-store';
import type { UseFieldReturn } from '../core/use-field';

export interface FormProps<T extends FormValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
  /** The form instance from `useForm`. */
  form: FormApi<T> & { store: FormStore<T> };
  /** Submit handler; receives valid values. Overrides `useForm`'s `onSubmit`. */
  onSubmit?: (values: T) => void | Promise<void>;
  children: React.ReactNode;
}

export interface FieldProps<T extends FormValues> {
  /** Field name (supports dot paths). */
  name: keyof T & string;
  /** Visible label text. */
  label?: React.ReactNode;
  /** Helper/description text shown under the control. */
  description?: React.ReactNode;
  /** Render-prop for full control over the input. Receives the field binding. */
  children?: (field: UseFieldReturn) => React.ReactNode;
  /** Placeholder for the default input (when no render-prop is given). */
  placeholder?: string;
  /** Input type for the default input. */
  type?: string;
}

export interface ControllerProps<T extends FormValues> {
  name: keyof T & string;
  /** Render-prop receiving the controlled field binding. */
  render: (props: { field: UseFieldReturn['field']; fieldState: UseFieldReturn }) => React.ReactElement;
}

export interface ErrorMessageProps<T extends FormValues>
  extends React.HTMLAttributes<HTMLSpanElement> {
  name: keyof T & string;
}
