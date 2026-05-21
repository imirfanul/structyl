import type * as React from 'react';

export type ValidityMatcher =
  | 'badInput'
  | 'patternMismatch'
  | 'rangeOverflow'
  | 'rangeUnderflow'
  | 'stepMismatch'
  | 'tooLong'
  | 'tooShort'
  | 'typeMismatch'
  | 'valid'
  | 'valueMissing';

export type CustomMatcher = string;
export type Matcher = ValidityMatcher | CustomMatcher;

export interface FormProps extends React.ComponentPropsWithoutRef<'form'> {
  asChild?: boolean;
  /** Map of field name → server-side validity errors. */
  onClearServerErrors?: () => void;
}

export interface FormFieldProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  name: string;
  serverInvalid?: boolean;
}

export interface FormLabelProps extends React.ComponentPropsWithoutRef<'label'> {
  asChild?: boolean;
}

export interface FormControlProps extends React.ComponentPropsWithoutRef<'input'> {
  asChild?: boolean;
}

export interface FormMessageProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
  match?: Matcher | ((value: string, formData: FormData) => boolean | Promise<boolean>);
  forceMatch?: boolean;
}

export interface FormValidityStateProps {
  children: (validity: ValidityState | undefined) => React.ReactNode;
}

export interface FormSubmitProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}
