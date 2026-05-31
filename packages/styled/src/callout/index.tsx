'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@structyl/utils';

// ── Variants ─────────────────────────────────────────────────────────────────

export const calloutVariants = tv({
  base: 'flex gap-3 rounded-lg border p-4 text-sm',
  variants: {
    variant: {
      default: 'bg-muted/50 border-border text-fg',
      info: 'bg-info/10 border-info/30 text-info-foreground [&_.callout-icon]:text-info',
      success: 'bg-success/10 border-success/30 text-success-foreground [&_.callout-icon]:text-success',
      warning: 'bg-warning/10 border-warning/30 text-warning-foreground [&_.callout-icon]:text-warning',
      error: 'bg-destructive/10 border-destructive/30 text-destructive-foreground [&_.callout-icon]:text-destructive',
      neutral: 'bg-secondary border-border text-secondary-foreground',
    },
  },
  defaultVariants: { variant: 'info' },
});

// ── Root ──────────────────────────────────────────────────────────────────────

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof calloutVariants> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant, icon, title, children, ...props }, ref) => (
    <div ref={ref} className={cn(calloutVariants({ variant }), className)} {...props}>
      {icon && (
        <span className="callout-icon mt-0.5 flex shrink-0 [&_svg]:size-4" aria-hidden>
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="mb-1 font-semibold leading-none">{title}</p>
        )}
        <div className="leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  ),
);
Callout.displayName = 'Callout';

export { Callout };
