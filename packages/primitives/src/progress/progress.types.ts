import type * as React from 'react';

export type ProgressState = 'indeterminate' | 'loading' | 'complete';

export interface ProgressRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  /** Current progress value (0 to max). Pass `null` for indeterminate. */
  value?: number | null;
  /** Maximum value. */
  max?: number;
  /** Returns the localized label to announce. */
  getValueLabel?: (value: number, max: number) => string;
}

export interface ProgressIndicatorProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}
