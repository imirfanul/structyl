'use client';

import * as React from 'react';
import { cn } from '@aura-ui/utils';
import { tv, type VariantProps } from 'tailwind-variants';

// ── Context ───────────────────────────────────────────────────────────────────

interface TimelineCtx {
  side: 'left' | 'right' | 'alternate';
}

const TimelineContext = React.createContext<TimelineCtx>({ side: 'left' });

// ── Root ──────────────────────────────────────────────────────────────────────

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  side?: 'left' | 'right' | 'alternate';
}

const Root = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, side = 'left', ...props }, ref) => (
    <TimelineContext.Provider value={{ side }}>
      <ol
        ref={ref}
        className={cn(
          'flex flex-col',
          // alternate: even children flip to right via CSS, no runtime counting
          side === 'alternate' && '[&>li:nth-child(even)]:flex-row-reverse [&>li:nth-child(even)>div:last-child]:text-right',
          className,
        )}
        {...props}
      />
    </TimelineContext.Provider>
  ),
);
Root.displayName = 'Timeline.Root';

// ── Item ──────────────────────────────────────────────────────────────────────

export interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Icon or dot in the connector */
  icon?: React.ReactNode;
  /** Whether this is the last item (hides the connector line) */
  last?: boolean;
}

const Item = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, icon, last = false, children, ...props }, ref) => {
    const { side } = React.useContext(TimelineContext);
    const isRight = side === 'right';

    return (
      <li
        ref={ref}
        className={cn('relative flex gap-4', isRight && 'flex-row-reverse', className)}
        {...props}
      >
        {/* Connector column */}
        <div className="flex flex-col items-center">
          <div className="border-border bg-bg text-muted-foreground z-10 flex size-8 shrink-0 items-center justify-center rounded-full border shadow-sm [&_svg]:size-4">
            {icon ?? <span className="size-2 rounded-full bg-muted-foreground" />}
          </div>
          {!last && <div className="bg-border mt-1 flex-1 w-px" />}
        </div>
        {/* Content */}
        <div className={cn('flex-1 pb-8', isRight && 'text-right')}>
          {children}
        </div>
      </li>
    );
  },
);
Item.displayName = 'Timeline.Item';

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

export { Root, Item, ItemTitle, ItemDescription, ItemTime };
