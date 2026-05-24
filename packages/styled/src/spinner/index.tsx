'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@aura-ui/utils';

const spinnerVariants = tv({
  base: 'text-primary inline-block animate-spin rounded-full border-current border-t-transparent',
  variants: {
    size: {
      sm: 'h-4 w-4 border-2',
      md: 'h-6 w-6 border-2',
      lg: 'h-8 w-8 border-[3px]',
      xl: 'h-12 w-12 border-4',
    },
  },
  defaultVariants: { size: 'md' },
});

interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof spinnerVariants> {
  /** Visually hidden label for screen readers. */
  label?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, label = 'Loading', ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </span>
  ),
);
Spinner.displayName = 'Spinner';

export { Spinner, spinnerVariants };
export type { SpinnerProps };
