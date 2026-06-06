'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { X } from '@structyl/icons';
import { cn } from '@structyl/utils';

// ── Variants ─────────────────────────────────────────────────────────────────

export const bannerVariants = tv({
  base: 'flex w-full items-center gap-3 px-4 py-2.5 text-sm',
  variants: {
    variant: {
      default: 'bg-muted text-fg [&_.banner-icon]:text-fg',
      info: 'bg-info/10 text-info-foreground [&_.banner-icon]:text-info',
      success: 'bg-success/10 text-success-foreground [&_.banner-icon]:text-success',
      warning: 'bg-warning/10 text-warning-foreground [&_.banner-icon]:text-warning',
      error: 'bg-destructive/10 text-destructive-foreground [&_.banner-icon]:text-destructive',
      brand: 'bg-primary text-primary-foreground [&_.banner-icon]:text-primary-foreground',
    },
    align: {
      start: 'justify-start text-left',
      center: 'justify-center text-center',
    },
  },
  defaultVariants: { variant: 'default', align: 'start' },
});

// ── Banner ──────────────────────────────────────────────────────────────────

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /** Leading icon. */
  icon?: React.ReactNode;
  /** Trailing action (e.g. a link or button). */
  action?: React.ReactNode;
  /** Show a dismiss button. */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked. */
  onDismiss?: () => void;
}

/**
 * A full-width, site-level announcement bar. Distinct from the inline `Callout`/`Alert`
 * card components — Banner spans the page edge-to-edge.
 */
const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, align, icon, action, dismissible, onDismiss, children, ...props }, ref) => (
    <div ref={ref} role="region" aria-label="Banner" className={cn(bannerVariants({ variant, align }), className)} {...props}>
      {icon && (
        <span className="banner-icon flex shrink-0 [&_svg]:size-4" aria-hidden>
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="ml-1 shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  ),
);
Banner.displayName = 'Banner';

export { Banner };
