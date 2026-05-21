import type * as React from 'react';

export interface CollapsibleRootProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  asChild?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  forceMount?: boolean;
}
