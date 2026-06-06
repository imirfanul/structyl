'use client';

import * as React from 'react';
import type { FormApi, FormValues } from './form.types';
import type { FormStore } from './form-store';

/** The value carried by the form context — the API plus its underlying store. */
export interface FormContextValue<T extends FormValues = FormValues> extends FormApi<T> {
  store: FormStore<T>;
}

const FormContext = React.createContext<FormContextValue | null>(null);

export interface FormProviderProps<T extends FormValues = FormValues> {
  form: FormContextValue<T>;
  children: React.ReactNode;
}

/** Provide a `useForm` instance to descendant `<Field>`/`useField` consumers. */
export function FormProvider<T extends FormValues>({ form, children }: FormProviderProps<T>) {
  return (
    <FormContext.Provider value={form as unknown as FormContextValue}>
      {children}
    </FormContext.Provider>
  );
}

/** Read the nearest form context. Throws if used outside a `<FormProvider>`. */
export function useFormContext<T extends FormValues = FormValues>(): FormContextValue<T> {
  const ctx = React.useContext(FormContext);
  if (!ctx) {
    throw new Error('useFormContext must be used within a <FormProvider> (or <Form>)');
  }
  return ctx as unknown as FormContextValue<T>;
}
