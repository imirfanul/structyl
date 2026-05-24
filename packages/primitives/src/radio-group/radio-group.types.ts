import type * as React from 'react';

export interface RadioGroupRootProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'onChange'
> {
  asChild?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  loop?: boolean;
}

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  value: string;
  disabled?: boolean;
  required?: boolean;
}

export interface RadioGroupIndicatorProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
  forceMount?: boolean;
}
