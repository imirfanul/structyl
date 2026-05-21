'use client';

import * as React from 'react';
import { cn } from '@aura-ui/utils';

interface MeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  low?: number;
  high?: number;
  optimum?: number;
  label?: string;
}

function getStatus(value: number, low?: number, high?: number, optimum?: number) {
  if (low !== undefined && value < low) return optimum !== undefined && optimum < low ? 'optimal' : 'sub-optimal';
  if (high !== undefined && value > high)
    return optimum !== undefined && optimum > high ? 'optimal' : 'sub-optimal';
  return 'normal';
}

const Meter = React.forwardRef<HTMLDivElement, MeterProps>(
  ({ className, value, min = 0, max = 100, low, high, optimum, label, ...props }, ref) => {
    const clamped = Math.max(min, Math.min(max, value));
    const percent = ((clamped - min) / (max - min)) * 100;
    const status = getStatus(clamped, low, high, optimum);
    return (
      <div
        ref={ref}
        role="meter"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clamped}
        aria-label={label}
        data-status={status}
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
        {...props}
      >
        <div
          className={cn(
            'h-full transition-all',
            status === 'normal' && 'bg-success',
            status === 'sub-optimal' && 'bg-warning',
            status === 'optimal' && 'bg-primary',
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  },
);
Meter.displayName = 'Meter';

export { Meter };
export type { MeterProps };
