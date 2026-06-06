'use client';

import * as React from 'react';
import { Form as StyledForm } from '@structyl/styled';
import { FormProvider } from '../core/form-context';
import type { FormValues } from '../core/form.types';
import type { FormProps } from './components.types';

/**
 * The form root. Renders structyl's accessible `Form.Root` (so descendant
 * `Form.Field`/`Control`/`Message` parts get their context), wires the native
 * `onSubmit` to the form's `handleSubmit`, and provides the form instance to
 * descendant `<Field>`/`useField` consumers.
 *
 * @example
 * const form = useForm({ schema, onSubmit });
 * return (
 *   <Form form={form}>
 *     <Field name="email" label="Email" />
 *     <button type="submit">Save</button>
 *   </Form>
 * );
 */
function FormComponent<T extends FormValues>({ form, onSubmit, children, ...props }: FormProps<T>) {
  const submit = React.useMemo(() => form.handleSubmit(onSubmit), [form, onSubmit]);

  return (
    <FormProvider form={form}>
      <StyledForm.Root onSubmit={submit} {...props}>
        {children}
      </StyledForm.Root>
    </FormProvider>
  );
}
FormComponent.displayName = 'Form';

export const Form = FormComponent;
