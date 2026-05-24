import * as React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rect', ...props }, ref) => {
    const base = 'bg-muted/50 animate-pulse';
    const shape =
      variant === 'text'
        ? 'h-4 rounded-md'
        : variant === 'circle'
          ? 'h-10 w-10 rounded-full'
          : 'h-6 rounded-md';

    return (
      <div
        ref={ref}
        className={[base, shape, className].filter(Boolean).join(' ')}
        aria-hidden
        {...props}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
