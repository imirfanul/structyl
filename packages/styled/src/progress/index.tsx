'use client';

import * as React from 'react';
import { Progress as ProgressPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';
import { tv, type VariantProps } from 'tailwind-variants';

// ── Variants ─────────────────────────────────────────────────────────────────

export const progressTrackVariants = tv({
  base: 'relative w-full overflow-hidden rounded-full bg-secondary',
  variants: {
    size: {
      xs: 'h-1',
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
    },
  },
  defaultVariants: { size: 'md' },
});

const colorMap: Record<string, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
  error: 'bg-destructive',
  info: 'bg-info',
  secondary: 'bg-secondary-dark',
};

// ── Progress ──────────────────────────────────────────────────────────────────

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressTrackVariants> {
  color?: 'primary' | 'success' | 'warning' | 'destructive' | 'error' | 'info' | 'secondary';
  /** Stripe pattern on the indicator */
  striped?: boolean;
  /** Animate the stripes (requires striped=true or stands alone) */
  animated?: boolean;
  /** Replace value with an indeterminate animation */
  indeterminate?: boolean;
  /** Show percentage label inside the bar (useful for lg/xl) */
  showLabel?: boolean;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      size,
      color = 'primary',
      striped = false,
      animated = false,
      indeterminate = false,
      showLabel = false,
      indicatorClassName,
      ...props
    },
    ref,
  ) => {
    const pct = indeterminate ? 0 : Math.min(100, Math.max(0, ((value ?? 0) / max) * 100));

    return (
      <ProgressPrimitive.Root
        ref={ref}
        value={indeterminate ? undefined : value}
        max={max}
        className={cn(progressTrackVariants({ size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            'h-full w-full flex-1 transition-all duration-500 ease-out',
            colorMap[color],
            striped && !animated && [
              'bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.2)_10px,rgba(255,255,255,0.2)_20px)]',
            ],
            animated && !indeterminate && 'animate-progress-stripes bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.15)_0,rgba(255,255,255,0.15)_10px,transparent_10px,transparent_20px)]',
            indeterminate && 'absolute left-0 top-0 w-1/3 animate-progress-indeterminate',
            indicatorClassName,
          )}
          style={indeterminate ? undefined : { transform: `translateX(-${100 - pct}%)` }}
        />
        {showLabel && !indeterminate && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-primary-foreground">
            {Math.round(pct)}%
          </span>
        )}
      </ProgressPrimitive.Root>
    );
  },
);
Progress.displayName = 'Progress';

export { Progress };
