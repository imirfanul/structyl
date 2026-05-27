'use client';

import * as React from 'react';
import { cn } from '@aura-ui/utils';

// ── EmptyState ────────────────────────────────────────────────────────────────

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Icon or illustration to display */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Action button(s) */
  action?: React.ReactNode;
  /** 'page' = full viewport height, 'section' = fit content */
  size?: 'page' | 'section';
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, size = 'section', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center gap-4 text-center',
        size === 'page' ? 'min-h-[60vh] py-16' : 'py-10',
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="text-muted-foreground/50 flex size-16 items-center justify-center rounded-full bg-muted [&_svg]:size-8">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold text-fg">{title}</h3>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = 'EmptyState';

export { EmptyState };
