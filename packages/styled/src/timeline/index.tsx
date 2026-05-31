'use client';

import * as React from 'react';
import { cn } from '@structyl/utils';

// ── Context ───────────────────────────────────────────────────────────────────

interface TimelineCtx {
  side: 'left' | 'right' | 'alternate';
}

const TimelineContext = React.createContext<TimelineCtx>({ side: 'left' });

interface TimelineItemCtx {
  last: boolean;
}

const TimelineItemContext = React.createContext<TimelineItemCtx>({ last: false });

// ── Root ──────────────────────────────────────────────────────────────────────

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  side?: 'left' | 'right' | 'alternate';
  /** Alias for side */
  position?: 'left' | 'right' | 'alternate';
}

const Root = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, side, position, ...props }, ref) => {
    const resolvedSide = side ?? position ?? 'left';
    return (
      <TimelineContext.Provider value={{ side: resolvedSide }}>
        <ol
          ref={ref}
          className={cn(
            'flex flex-col',
            resolvedSide === 'alternate' && '[&>li:nth-child(even)]:flex-row-reverse [&>li:nth-child(even)>div:last-child]:text-right',
            className,
          )}
          {...props}
        />
      </TimelineContext.Provider>
    );
  },
);
Root.displayName = 'Timeline.Root';

// ── Item ──────────────────────────────────────────────────────────────────────

export interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Whether this is the last item (hides the connector line) */
  last?: boolean;
}

const Item = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, last = false, children, ...props }, ref) => {
    const { side } = React.useContext(TimelineContext);
    const isRight = side === 'right';

    return (
      <TimelineItemContext.Provider value={{ last }}>
        <li
          ref={ref}
          className={cn('relative flex gap-4', isRight && 'flex-row-reverse', className)}
          {...props}
        >
          {children}
        </li>
      </TimelineItemContext.Provider>
    );
  },
);
Item.displayName = 'Timeline.Item';

// ── Separator ─────────────────────────────────────────────────────────────────

const Separator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { last } = React.useContext(TimelineItemContext);
    return (
      <div ref={ref} className={cn('flex flex-col items-center', className)} {...props}>
        {children}
        {!last && <div className="bg-border mt-1 flex-1 w-px" />}
      </div>
    );
  },
);
Separator.displayName = 'Timeline.Separator';

// ── Dot ───────────────────────────────────────────────────────────────────────

const dotColorMap: Record<string, string> = {
  success: 'border-success text-success',
  warning: 'border-warning text-warning',
  error: 'border-destructive text-destructive',
  info: 'border-info text-info',
  primary: 'border-primary text-primary',
};

const dotFilledColorMap: Record<string, string> = {
  success: 'bg-success text-success-foreground border-success',
  warning: 'bg-warning text-warning-foreground border-warning',
  error: 'bg-destructive text-destructive-foreground border-destructive',
  info: 'bg-info text-info-foreground border-info',
  primary: 'bg-primary text-primary-foreground border-primary',
};

export interface TimelineDotProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'success' | 'warning' | 'error' | 'info' | 'primary';
  variant?: 'filled' | 'outlined';
}

const Dot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, children, color, variant = 'filled', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'z-10 flex size-8 shrink-0 items-center justify-center rounded-full border shadow-sm [&_svg]:size-4',
        !color && 'border-border bg-bg text-muted-foreground',
        color && variant === 'outlined' && dotColorMap[color],
        color && variant === 'outlined' && 'bg-bg',
        color && variant === 'filled' && dotFilledColorMap[color],
        className,
      )}
      {...props}
    >
      {children ?? <span className="size-2 rounded-full bg-current" />}
    </div>
  ),
);
Dot.displayName = 'Timeline.Dot';

// ── Content ───────────────────────────────────────────────────────────────────

const Content = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 pb-8', className)} {...props} />
  ),
);
Content.displayName = 'Timeline.Content';

// ── Convenience sub-parts ─────────────────────────────────────────────────────

const ItemTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm font-semibold text-fg leading-none', className)} {...props} />
  ),
);
ItemTitle.displayName = 'Timeline.ItemTitle';

const ItemDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('mt-1 text-sm text-muted-foreground', className)} {...props} />
  ),
);
ItemDescription.displayName = 'Timeline.ItemDescription';

const ItemTime = React.forwardRef<HTMLTimeElement, React.HTMLAttributes<HTMLTimeElement>>(
  ({ className, ...props }, ref) => (
    <time ref={ref} className={cn('text-xs text-muted-foreground/70', className)} {...props} />
  ),
);
ItemTime.displayName = 'Timeline.ItemTime';

export { Root, Item, Separator, Dot, Content, ItemTitle, ItemDescription, ItemTime };
