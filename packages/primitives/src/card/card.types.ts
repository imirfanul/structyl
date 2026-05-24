import type * as React from 'react';

export interface CardRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

export interface CardSectionProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}
