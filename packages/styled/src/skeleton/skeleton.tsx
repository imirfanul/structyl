import * as React from 'react';
import { cn } from '@structyl/utils';
import { tv, type VariantProps } from 'tailwind-variants';

// ── Variants ─────────────────────────────────────────────────────────────────

export const skeletonVariants = tv({
  base: 'bg-muted/50 relative overflow-hidden',
  variants: {
    variant: {
      /** Solid pulse — default subtle loading */
      pulse: 'animate-pulse',
      /** Shimmer sweep effect */
      shimmer: [
        'after:absolute after:inset-0',
        'after:bg-gradient-to-r after:from-transparent after:via-fg/10 after:to-transparent',
        'after:translate-x-[-100%] after:animate-[shimmer_1.5s_infinite]',
      ],
      /** No animation (for reduced-motion users) */
      static: '',
    },
    shape: {
      rect: 'rounded-md',
      circle: 'rounded-full',
      text: 'h-4 rounded-md',
    },
  },
  defaultVariants: { variant: 'shimmer', shape: 'rect' },
});

// ── Skeleton ──────────────────────────────────────────────────────────────────

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /** Width of the skeleton (e.g. "100%", "120px") */
  width?: string | number;
  /** Height of the skeleton (e.g. "1rem", 40) */
  height?: string | number;
  /** Number of text lines to repeat */
  lines?: number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, shape, width, height, lines, style, ...props }, ref) => {
    if (lines && lines > 1) {
      return (
        <div className="flex flex-col gap-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              aria-hidden
              className={cn(
                skeletonVariants({ variant, shape: 'text' }),
                i === lines - 1 && 'w-4/5',
                className,
              )}
              style={{ width: i === lines - 1 ? undefined : width, height, ...style }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        aria-hidden
        className={cn(skeletonVariants({ variant, shape }), className)}
        style={{ width, height, ...style }}
        {...props}
      />
    );
  },
);
Skeleton.displayName = 'Skeleton';

// ── Skeleton.Group ────────────────────────────────────────────────────────────

export interface SkeletonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between skeleton items */
  gap?: number | string;
}

const Group = React.forwardRef<HTMLDivElement, SkeletonGroupProps>(
  ({ className, gap = '0.5rem', style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col', className)}
      style={{ gap, ...style }}
      {...props}
    />
  ),
);
Group.displayName = 'Skeleton.Group';

export { Skeleton, Group };
