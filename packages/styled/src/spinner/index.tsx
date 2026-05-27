'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@aura-ui/utils';

// ── Shared size/color variants ────────────────────────────────────────────────

export const spinnerVariants = tv({
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
      xl: 'size-12',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary-dark',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
      error: 'text-destructive',
      info: 'text-info',
      muted: 'text-muted-foreground',
      inherit: 'text-current',
    },
  },
  defaultVariants: { size: 'md', color: 'primary' },
});

// ── Unified Spinner ───────────────────────────────────────────────────────────

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'border' | 'dots' | 'pulse' | 'bars';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'error' | 'info' | 'muted' | 'inherit';
  label?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, variant = 'border', size, color, label = 'Loading', ...props }, ref) => {
    if (variant === 'dots') {
      const dotSize = size === 'xs' ? 'size-1' : size === 'sm' ? 'size-1.5' : size === 'lg' ? 'size-3' : size === 'xl' ? 'size-4' : 'size-2';
      return (
        <span ref={ref} role="status" aria-live="polite" className={cn(spinnerVariants({ color }), 'inline-flex items-center gap-1', className)} {...props}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn('animate-bounce rounded-full bg-current', dotSize)} style={{ animationDelay: `${i * 0.15}s` }} aria-hidden />
          ))}
          <span className="sr-only">{label}</span>
        </span>
      );
    }

    if (variant === 'pulse') {
      return (
        <span ref={ref} role="status" aria-live="polite" className={cn(spinnerVariants({ size, color }), 'inline-block animate-ping rounded-full bg-current opacity-75', className)} {...props}>
          <span className="sr-only">{label}</span>
        </span>
      );
    }

    if (variant === 'bars') {
      const barH = size === 'xs' ? 'h-2' : size === 'sm' ? 'h-3' : size === 'lg' ? 'h-5' : size === 'xl' ? 'h-7' : 'h-4';
      return (
        <span ref={ref} role="status" aria-live="polite" className={cn(spinnerVariants({ color }), 'inline-flex items-end gap-0.5', className)} {...props}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn('w-1 rounded-sm bg-current animate-bars', barH)}
              style={{ animationDelay: `${i * 0.1}s` }}
              aria-hidden
            />
          ))}
          <span className="sr-only">{label}</span>
        </span>
      );
    }

    // border (default)
    const borderSize = size === 'xs' ? 'border' : size === 'lg' ? 'border-[3px]' : size === 'xl' ? 'border-4' : 'border-2';
    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(spinnerVariants({ size, color }), 'inline-block animate-spin rounded-full border-current border-t-transparent', borderSize, className)}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </span>
    );
  },
);
Spinner.displayName = 'Spinner';

export { Spinner };
