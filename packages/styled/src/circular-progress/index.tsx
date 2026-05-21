'use client';

import * as React from 'react';
import { cn } from '@your-lib/utils';

interface CircularProgressProps extends React.SVGAttributes<SVGSVGElement> {
  value?: number | null;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({ className, value, max = 100, size = 40, strokeWidth = 4, label = 'Loading', ...props }, ref) => {
    const isIndeterminate = value == null;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = isIndeterminate ? 0.25 : (value as number) / max;
    const offset = circumference - progress * circumference;
    return (
      <svg
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : (value as number)}
        aria-label={label}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn('text-primary', isIndeterminate && 'animate-spin', className)}
        {...props}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 200ms ease' }}
        />
      </svg>
    );
  },
);
CircularProgress.displayName = 'CircularProgress';

export { CircularProgress };
export type { CircularProgressProps };
