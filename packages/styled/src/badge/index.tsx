'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { Slot } from '@aura-ui/core';
import { cn } from '@aura-ui/utils';

// ── Variants ─────────────────────────────────────────────────────────────────

export const badgeVariants = tv({
  base: [
    'inline-flex items-center gap-1 rounded-full border font-semibold',
    'focus:ring-ring transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  ],
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent',
      outline: 'text-fg border-border',
      success: 'bg-success text-success-foreground hover:bg-success/80 border-transparent',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/80 border-transparent',
      info: 'bg-info text-info-foreground hover:bg-info/80 border-transparent',
    },
    size: {
      sm: 'px-2 py-0 text-[10px]',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

// ── Dot badge ─────────────────────────────────────────────────────────────────

export const dotBadgeVariants = tv({
  base: 'inline-flex items-center gap-1.5 rounded-full border font-medium',
  variants: {
    variant: {
      default: 'bg-primary/10 text-primary border-primary/20',
      secondary: 'bg-secondary/50 text-secondary-foreground border-secondary/30',
      destructive: 'bg-destructive/10 text-destructive border-destructive/20',
      outline: 'text-fg border-border',
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      info: 'bg-info/10 text-info border-info/20',
    },
    size: {
      sm: 'px-2 py-0 text-[10px]',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

const dotColorMap: Record<string, string> = {
  default: 'bg-primary',
  secondary: 'bg-secondary-foreground',
  destructive: 'bg-destructive',
  outline: 'bg-fg',
  success: 'bg-success',
  warning: 'bg-warning',
  info: 'bg-info',
};

// ── Badge ─────────────────────────────────────────────────────────────────────

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  /** Render a status dot before label text */
  dot?: boolean;
  /** Icon shown before label text */
  icon?: React.ReactNode;
  /** Show remove button — calls onRemove when clicked */
  removable?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size, asChild, dot, icon, removable, onRemove, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';

    if (dot) {
      return (
        <Comp
          ref={ref}
          className={cn(dotBadgeVariants({ variant: variant ?? 'default', size }), className)}
          {...props}
        >
          <span className={cn('size-1.5 rounded-full', dotColorMap[variant ?? 'default'])} aria-hidden />
          {children}
          {removable && (
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove"
              className="hover:opacity-70 ml-0.5 inline-flex items-center transition-opacity"
            >
              <svg className="size-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path strokeLinecap="round" d="M3 3l6 6M9 3l-6 6" />
              </svg>
            </button>
          )}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {icon && <span className="inline-flex [&_svg]:size-3" aria-hidden>{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove"
            className="hover:opacity-70 -mr-0.5 ml-0.5 inline-flex items-center transition-opacity"
          >
            <svg className="size-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <path strokeLinecap="round" d="M3 3l6 6M9 3l-6 6" />
            </svg>
          </button>
        )}
      </Comp>
    );
  },
);
Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };
