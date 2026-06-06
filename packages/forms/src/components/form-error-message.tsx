'use client';

import * as React from 'react';
import { useField } from '../core/use-field';
import type { FormValues } from '../core/form.types';
import type { ErrorMessageProps } from './components.types';

/**
 * Standalone error message for a field — reads the error from the form store.
 * Renders nothing when the field is valid or untouched.
 */
export function ErrorMessage<T extends FormValues>({ name, ...props }: ErrorMessageProps<T>) {
  const { error, touched } = useField<T>(name);
  if (!error || !touched) return null;
  return (
    <span role="alert" className="text-xs text-destructive" {...props}>
      {error}
    </span>
  );
}
ErrorMessage.displayName = 'ErrorMessage';
