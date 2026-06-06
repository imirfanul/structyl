'use client';

import * as React from 'react';
import { Form as StyledForm } from '@structyl/styled';
import { useField } from '../core/use-field';
import { useFormContext } from '../core/form-context';
import type { FormValues } from '../core/form.types';
import type { FieldProps } from './components.types';

/**
 * A field row built on structyl's accessible styled `Form.*` parts. Renders a
 * label, control, and validation message, wired to the form store. Provide a
 * render-prop child for custom inputs (Select, DatePicker, etc.).
 */
export function Field<T extends FormValues>({
  name,
  label,
  description,
  children,
  placeholder,
  type = 'text',
}: FieldProps<T>) {
  const form = useFormContext<T>();
  const fieldApi = useField<T>(name);
  const { error, touched } = fieldApi;
  const showError = !!error && touched;
  const descId = description ? `${name}-description` : undefined;

  return (
    <StyledForm.Field name={name} serverInvalid={showError}>
      {label && <StyledForm.Label>{label}</StyledForm.Label>}

      {children ? (
        children(fieldApi)
      ) : (
        <StyledForm.Control
          type={type}
          placeholder={placeholder}
          aria-invalid={showError || undefined}
          aria-describedby={descId}
          {...form.register(name)}
        />
      )}

      {description && (
        <span id={descId} className="text-xs text-muted-foreground">
          {description}
        </span>
      )}

      {showError && <StyledForm.Message forceMatch>{error}</StyledForm.Message>}
    </StyledForm.Field>
  );
}
Field.displayName = 'Field';
