'use client';

import * as React from 'react';
import { ChevronDown } from '@aura-ui/icons';
import { Accordion as AccordionPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

export type AccordionVariant = 'default' | 'bordered' | 'separated' | 'flushed' | 'ghost';

const AccordionVariantContext = React.createContext<AccordionVariant>('default');

// ── Root ──────────────────────────────────────────────────────────────────────

export type AccordionRootProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant;
};

const Root = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Root>, AccordionRootProps>(
  ({ variant = 'default', className, ...props }, ref) => (
    <AccordionVariantContext.Provider value={variant}>
      <AccordionPrimitive.Root
        ref={ref}
        className={cn(
          variant === 'bordered' && 'rounded-lg border border-border overflow-hidden',
          variant === 'separated' && 'flex flex-col gap-2',
          className,
        )}
        {...props}
      />
    </AccordionVariantContext.Provider>
  ),
);
Root.displayName = 'Accordion.Root';

// ── Item ──────────────────────────────────────────────────────────────────────

const Item = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        variant === 'default' && 'border-b border-border',
        variant === 'bordered' && 'border-b border-border last:border-b-0',
        variant === 'separated' && 'rounded-lg border border-border',
        variant === 'flushed' && 'border-b border-border',
        variant === 'ghost' && '',
        className,
      )}
      {...props}
    />
  );
});
Item.displayName = 'Accordion.Item';

// ── Trigger ───────────────────────────────────────────────────────────────────

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  /** Override the default chevron icon */
  icon?: React.ReactNode;
  /** Position of the icon */
  iconPosition?: 'left' | 'right';
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, icon, iconPosition = 'right', ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext);
  const chevron = icon ?? (
    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
  );

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex flex-1 cursor-pointer items-center justify-between py-4 text-sm font-medium transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          '[&[data-state=open]>svg]:rotate-180 [&[data-state=open]_.accordion-icon]:rotate-180',
          variant !== 'ghost' && 'hover:underline',
          variant === 'separated' && 'px-4',
          variant === 'bordered' && 'px-4',
          variant === 'ghost' && 'hover:bg-muted/50 rounded-md px-2',
          className,
        )}
        {...props}
      >
        {iconPosition === 'left' && (
          <span className="accordion-icon mr-3 transition-transform duration-200">{chevron}</span>
        )}
        {children}
        {iconPosition === 'right' && (
          <span className="accordion-icon transition-transform duration-200">{chevron}</span>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
Trigger.displayName = 'Accordion.Trigger';

// ── Content ───────────────────────────────────────────────────────────────────

const Content = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(AccordionVariantContext);
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        'overflow-hidden text-sm',
        'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'pb-4 pt-0',
          (variant === 'separated' || variant === 'bordered') && 'px-4',
          variant === 'ghost' && 'px-2',
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});
Content.displayName = 'Accordion.Content';

export { Root, Item, Trigger, Content };
