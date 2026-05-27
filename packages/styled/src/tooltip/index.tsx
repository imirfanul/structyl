'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';
import { tv, type VariantProps } from 'tailwind-variants';

// ── Variants ─────────────────────────────────────────────────────────────────

export const tooltipContentVariants = tv({
  base: [
    'z-50 overflow-hidden rounded-md px-2.5 py-1.5 text-xs font-medium shadow-md',
    'origin-[var(--aura-ui-popper-transform-origin,center)]',
    'animate-in fade-in-0 zoom-in-95 duration-snappy',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1',
    'data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
  ],
  variants: {
    variant: {
      default: 'bg-fg/90 text-bg backdrop-blur-sm',
      dark: 'bg-gray-900 text-gray-100',
      light: 'bg-bg text-fg border border-border shadow-lg',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      info: 'bg-info text-info-foreground',
      warning: 'bg-warning text-warning-foreground',
      error: 'bg-destructive text-destructive-foreground',
      success: 'bg-success text-success-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});

// ── Re-exports ────────────────────────────────────────────────────────────────

const Provider = TooltipPrimitive.Provider;
const Root = TooltipPrimitive.Root;
const Trigger = TooltipPrimitive.Trigger;
const Portal = TooltipPrimitive.Portal;
const Arrow = TooltipPrimitive.Arrow;

// ── Content ───────────────────────────────────────────────────────────────────

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {
  maxWidth?: string | number;
  arrow?: boolean;
}

const Content = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, sideOffset = 6, maxWidth = 280, arrow = false, style, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipContentVariants({ variant }), className)}
      style={{ maxWidth, ...style }}
      {...props}
    >
      {props.children}
      {arrow && (
        <TooltipPrimitive.Arrow
          className={cn(
            'fill-fg/90',
            variant === 'light' && 'fill-border',
            variant === 'dark' && 'fill-gray-900',
            variant === 'primary' && 'fill-primary',
            variant === 'secondary' && 'fill-secondary',
            variant === 'info' && 'fill-info',
            variant === 'warning' && 'fill-warning',
            variant === 'error' && 'fill-destructive',
            variant === 'success' && 'fill-success',
          )}
          width={8}
          height={4}
        />
      )}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
Content.displayName = 'Tooltip.Content';

// ── Shorthand compound ────────────────────────────────────────────────────────

export interface TooltipProps {
  label: React.ReactNode;
  children: React.ReactNode;
  side?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>['side'];
  align?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>['align'];
  delayDuration?: number;
  skipDelayDuration?: number;
  variant?: VariantProps<typeof tooltipContentVariants>['variant'];
  maxWidth?: string | number;
  arrow?: boolean;
  disabled?: boolean;
}

const Tooltip = ({
  children,
  label,
  side = 'top',
  align,
  delayDuration,
  skipDelayDuration,
  variant,
  maxWidth,
  arrow,
  disabled,
}: TooltipProps) => {
  if (disabled) return <>{children}</>;
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <Root>
        <Trigger asChild>{children}</Trigger>
        <Content side={side} align={align} variant={variant} maxWidth={maxWidth} arrow={arrow}>
          {label}
        </Content>
      </Root>
    </TooltipPrimitive.Provider>
  );
};
Tooltip.displayName = 'Tooltip';

export { Provider, Root, Trigger, Portal, Arrow, Content, Tooltip };
