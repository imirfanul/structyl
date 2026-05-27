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
      error: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent',
    },
    color: {
      primary: '',
      secondary: '',
      error: '',
      warning: '',
      info: '',
      success: '',
      default: '',
    },
    size: {
      sm: 'px-2 py-0 text-[10px]',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },
  compoundVariants: [
    // filled (default shape) × color
    { variant: 'default', color: 'primary', class: 'bg-primary text-primary-foreground border-transparent' },
    { variant: 'default', color: 'secondary', class: 'bg-secondary text-secondary-foreground border-transparent' },
    { variant: 'default', color: 'error', class: 'bg-destructive text-destructive-foreground border-transparent' },
    { variant: 'default', color: 'warning', class: 'bg-warning text-warning-foreground border-transparent' },
    { variant: 'default', color: 'info', class: 'bg-info text-info-foreground border-transparent' },
    { variant: 'default', color: 'success', class: 'bg-success text-success-foreground border-transparent' },
    // outline × color
    { variant: 'outline', color: 'primary', class: 'text-primary border-primary' },
    { variant: 'outline', color: 'secondary', class: 'text-secondary-dark border-secondary' },
    { variant: 'outline', color: 'error', class: 'text-destructive border-destructive' },
    { variant: 'outline', color: 'warning', class: 'text-warning border-warning' },
    { variant: 'outline', color: 'info', class: 'text-info border-info' },
    { variant: 'outline', color: 'success', class: 'text-success border-success' },
  ],
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
      error: 'bg-destructive/10 text-destructive border-destructive/20',
    },
    color: {
      primary: '',
      secondary: '',
      error: '',
      warning: '',
      info: '',
      success: '',
      default: '',
    },
    size: {
      sm: 'px-2 py-0 text-[10px]',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },
  compoundVariants: [
    { variant: 'default', color: 'primary', class: 'bg-primary/10 text-primary border-primary/20' },
    { variant: 'default', color: 'secondary', class: 'bg-secondary/10 text-secondary-dark border-secondary/20' },
    { variant: 'default', color: 'error', class: 'bg-destructive/10 text-destructive border-destructive/20' },
    { variant: 'default', color: 'warning', class: 'bg-warning/10 text-warning border-warning/20' },
    { variant: 'default', color: 'info', class: 'bg-info/10 text-info border-info/20' },
    { variant: 'default', color: 'success', class: 'bg-success/10 text-success border-success/20' },
  ],
  defaultVariants: { variant: 'default', size: 'md' },
});

const dotColorMap: Record<string, string> = {
  default: 'bg-primary',
  primary: 'bg-primary',
  secondary: 'bg-secondary-dark',
  destructive: 'bg-destructive',
  error: 'bg-destructive',
  outline: 'bg-fg',
  success: 'bg-success',
  warning: 'bg-warning',
  info: 'bg-info',
};

// ── Badge ─────────────────────────────────────────────────────────────────────

interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
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
  ({ className, variant = 'default', color, size, asChild, dot, icon, removable, onRemove, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    const dotKey = (color ?? variant) as string;

    if (dot) {
      return (
        <Comp
          ref={ref}
          className={cn(dotBadgeVariants({ variant: variant ?? 'default', color, size }), className)}
          {...props}
        >
          <span className={cn('size-1.5 rounded-full', dotColorMap[dotKey] ?? 'bg-primary')} aria-hidden />
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
        className={cn(badgeVariants({ variant, color, size }), className)}
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
