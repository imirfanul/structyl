import type * as React from 'react';

export interface StepperProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export interface StepperButtonProps extends React.ComponentPropsWithoutRef<'button'> {}
