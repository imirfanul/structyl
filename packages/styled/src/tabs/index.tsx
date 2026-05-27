'use client';

import * as React from 'react';
import { Tabs as TabsPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

export type TabsVariant = 'default' | 'underline' | 'pills' | 'enclosed';
export type TabsColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

// Shared context so List/Trigger can read variant + color without prop-drilling
interface TabsCtx { variant: TabsVariant; color: TabsColor }
const TabsContext = React.createContext<TabsCtx>({ variant: 'default', color: 'primary' });

// ── Active-color classes per color ────────────────────────────────────────────
// Note: color prop only applies to 'underline' and 'pills' variants.
// 'default' and 'enclosed' variants intentionally ignore it.

const activeColorMap: Record<TabsColor, {
  underlineBorder: string;
  pillsBg: string;
  pillsText: string;
}> = {
  primary:   { underlineBorder: 'data-[state=active]:border-primary',   pillsBg: 'data-[state=active]:bg-primary',   pillsText: 'data-[state=active]:text-primary-foreground' },
  secondary: { underlineBorder: 'data-[state=active]:border-secondary',  pillsBg: 'data-[state=active]:bg-secondary',  pillsText: 'data-[state=active]:text-secondary-foreground' },
  error:     { underlineBorder: 'data-[state=active]:border-destructive', pillsBg: 'data-[state=active]:bg-destructive', pillsText: 'data-[state=active]:text-destructive-foreground' },
  warning:   { underlineBorder: 'data-[state=active]:border-warning',    pillsBg: 'data-[state=active]:bg-warning',    pillsText: 'data-[state=active]:text-warning-foreground' },
  info:      { underlineBorder: 'data-[state=active]:border-info',       pillsBg: 'data-[state=active]:bg-info',       pillsText: 'data-[state=active]:text-info-foreground' },
  success:   { underlineBorder: 'data-[state=active]:border-success',    pillsBg: 'data-[state=active]:bg-success',    pillsText: 'data-[state=active]:text-success-foreground' },
};

// ── Root ──────────────────────────────────────────────────────────────────────

export interface TabsRootProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
  color?: TabsColor;
}

const Root = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsRootProps>(
  ({ variant = 'default', color = 'primary', ...props }, ref) => (
    <TabsContext.Provider value={{ variant, color }}>
      <TabsPrimitive.Root ref={ref} {...props} />
    </TabsContext.Provider>
  ),
);
Root.displayName = 'Tabs.Root';

// ── List ──────────────────────────────────────────────────────────────────────

const listVariantClasses: Record<TabsVariant, string> = {
  default:  'inline-flex h-9 items-center justify-center rounded-lg bg-muted/70 p-1 text-muted-foreground gap-0.5 border border-border/50',
  underline:'inline-flex items-center gap-0 border-b border-border text-muted-foreground w-full',
  pills:    'inline-flex items-center gap-1 text-muted-foreground',
  enclosed: 'inline-flex items-center gap-0 rounded-t-lg border border-border bg-muted/30 text-muted-foreground',
};

const List = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { scrollable?: boolean }
>(({ className, scrollable = false, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(listVariantClasses[variant], scrollable && 'overflow-x-auto scrollbar-none', className)}
      {...props}
    />
  );
});
List.displayName = 'Tabs.List';

// ── Trigger ───────────────────────────────────────────────────────────────────

const Trigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { variant, color } = React.useContext(TabsContext);
  const c = activeColorMap[color];

  const variantClass = {
    default: [
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium',
      'transition-[background-color,color,box-shadow,transform] duration-smooth ease-spring',
      'hover:text-fg/80',
      'data-[state=active]:bg-bg data-[state=active]:text-fg data-[state=active]:shadow-sm',
      'active:scale-[0.97]',
    ].join(' '),
    underline: [
      'relative inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium',
      'border-b-2 border-transparent -mb-px',
      'transition-[color,border-color] duration-smooth',
      'hover:text-fg',
      'data-[state=active]:text-fg',
      c.underlineBorder,
    ].join(' '),
    pills: [
      'inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium',
      'transition-[background-color,color] duration-smooth',
      'hover:bg-muted hover:text-fg',
      c.pillsBg,
      c.pillsText,
      'active:scale-[0.97]',
    ].join(' '),
    enclosed: [
      'relative inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium',
      'border-b border-transparent -mb-px',
      'transition-[color,background-color] duration-smooth',
      'hover:bg-muted/50 hover:text-fg',
      'data-[state=active]:bg-bg data-[state=active]:text-fg data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:border-t data-[state=active]:border-border data-[state=active]:border-b-bg',
    ].join(' '),
  }[variant];

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        variantClass,
        'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});
Trigger.displayName = 'Tabs.Trigger';

// ── Content ───────────────────────────────────────────────────────────────────

const Content = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-3',
      'data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:duration-comfortable',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md',
      className,
    )}
    {...props}
  />
));
Content.displayName = 'Tabs.Content';

export { Root, List, Trigger, Content };
