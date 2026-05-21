import type * as React from 'react';

export interface TabsRootProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  asChild?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  /** When set, focusing a tab activates it. 'manual' requires Enter/Space. */
  activationMode?: 'automatic' | 'manual';
}

export interface TabsListProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  loop?: boolean;
}

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  value: string;
  disabled?: boolean;
}

export interface TabsContentProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  value: string;
  forceMount?: boolean;
}
