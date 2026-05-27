'use client';

import * as React from 'react';
import { cn } from '@aura-ui/utils';
import { tv, type VariantProps } from 'tailwind-variants';

// ── Trend indicator ───────────────────────────────────────────────────────────

export type TrendDirection = 'up' | 'down' | 'neutral';

const trendVariants = tv({
  base: 'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium',
  variants: {
    direction: {
      up: 'bg-success/10 text-success',
      down: 'bg-destructive/10 text-destructive',
      neutral: 'bg-muted text-muted-foreground',
    },
  },
});

interface TrendBadgeProps {
  value: string | number;
  direction?: TrendDirection;
  className?: string;
}

const TrendBadge: React.FC<TrendBadgeProps> = ({ value, direction = 'neutral', className }) => (
  <span className={cn(trendVariants({ direction }), className)}>
    {direction === 'up' && <span aria-hidden>↑</span>}
    {direction === 'down' && <span aria-hidden>↓</span>}
    {direction === 'neutral' && <span aria-hidden>→</span>}
    {value}
  </span>
);

// ── Color map for highlight tint ──────────────────────────────────────────────

type StatColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

const highlightClasses: Record<StatColor, string> = {
  primary:   'border-primary/30 bg-primary/5',
  secondary: 'border-secondary/30 bg-secondary/5',
  error:     'border-destructive/30 bg-destructive/5',
  warning:   'border-warning/30 bg-warning/5',
  info:      'border-info/30 bg-info/5',
  success:   'border-success/30 bg-success/5',
};

const iconColorClasses: Record<StatColor, string> = {
  primary:   'text-primary',
  secondary: 'text-secondary-dark',
  error:     'text-destructive',
  warning:   'text-warning',
  info:      'text-info',
  success:   'text-success',
};

// ── Stat ──────────────────────────────────────────────────────────────────────

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  trend?: string | number;
  trendDirection?: TrendDirection;
  trendLabel?: string;
  icon?: React.ReactNode;
  /** Semantic color for the card tint and icon */
  color?: StatColor;
  /** @deprecated Use color instead */
  highlight?: boolean;
}

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, label, value, description, trend, trendDirection, trendLabel, icon, color, highlight, ...props }, ref) => {
    const resolvedColor: StatColor | undefined = color ?? (highlight ? 'primary' : undefined);
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-1 rounded-xl border border-border bg-card p-5',
          resolvedColor && highlightClasses[resolvedColor],
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {icon && (
            <span
              className={cn(
                '[&_svg]:size-4',
                resolvedColor ? iconColorClasses[resolvedColor] : 'text-muted-foreground',
              )}
              aria-hidden
            >
              {icon}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold tracking-tight text-fg">{value}</p>
        <div className="flex items-center gap-2">
          {trend !== undefined && (
            <TrendBadge value={trend} direction={trendDirection} />
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {trendLabel && (
            <p className="text-xs text-muted-foreground">{trendLabel}</p>
          )}
        </div>
      </div>
    );
  },
);
Stat.displayName = 'Stat';

// ── StatGroup ─────────────────────────────────────────────────────────────────

export interface StatGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

const StatGroup = React.forwardRef<HTMLDivElement, StatGroupProps>(
  ({ className, columns = 3, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid gap-4',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-2 lg:grid-cols-4',
        className,
      )}
      {...props}
    />
  ),
);
StatGroup.displayName = 'StatGroup';

export { Stat, StatGroup, TrendBadge };
