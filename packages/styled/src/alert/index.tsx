'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@aura-ui/utils';

// ── Variants ─────────────────────────────────────────────────────────────────

export const alertVariants = tv({
  base: 'relative w-full rounded-lg border p-4',
  variants: {
    variant: {
      default: 'bg-bg text-fg border-border',
      destructive: 'border-destructive/50 bg-destructive/5 text-destructive',
      success: 'border-success/50 bg-success/5 text-success',
      warning: 'border-warning/50 bg-warning/5 text-warning',
      info: 'border-info/50 bg-info/5 text-info',
    },
  },
  defaultVariants: { variant: 'default' },
});

// ── Root (supports controlled closeable) ─────────────────────────────────────

export interface AlertRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Consumed by the convenience <Alert> wrapper; destructured so it never reaches the DOM. */
  onClose?: () => void;
}

const Root = React.forwardRef<HTMLDivElement, AlertRootProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, variant, onClose: _onClose, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  ),
);
Root.displayName = 'Alert.Root';

// ── Icon ──────────────────────────────────────────────────────────────────────

const Icon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('mr-3 mt-0.5 inline-flex shrink-0 self-start [&_svg]:size-4', className)}
      aria-hidden
      {...props}
    >
      {children}
    </span>
  ),
);
Icon.displayName = 'Alert.Icon';

// ── Content wrapper ───────────────────────────────────────────────────────────

const Content = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 min-w-0', className)} {...props} />
  ),
);
Content.displayName = 'Alert.Content';

// ── Title ─────────────────────────────────────────────────────────────────────

const Title = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
  ),
);
Title.displayName = 'Alert.Title';

// ── Description ───────────────────────────────────────────────────────────────

const Description = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed opacity-90', className)} {...props} />
  ),
);
Description.displayName = 'Alert.Description';

// ── Close button ──────────────────────────────────────────────────────────────

export interface AlertCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Close = React.forwardRef<HTMLButtonElement, AlertCloseProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Close alert"
      className={cn(
        'absolute right-3 top-3 inline-flex items-center justify-center rounded-sm p-0.5',
        'opacity-70 hover:opacity-100 transition-opacity',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        className,
      )}
      {...props}
    >
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  ),
);
Close.displayName = 'Alert.Close';

// ── Convenience compound: <Alert> with icon+close built in ───────────────────

export interface AlertProps extends Omit<AlertRootProps, 'title'> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  closeable?: boolean;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ icon, title, description, closeable, onClose, variant, className, children, ...props }, ref) => (
    <Root ref={ref} variant={variant} className={cn('flex', className)} {...props}>
      {icon && <Icon>{icon}</Icon>}
      <Content>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
        {children}
      </Content>
      {(closeable || onClose) && <Close onClick={onClose} />}
    </Root>
  ),
);
Alert.displayName = 'Alert';

export { Alert, Root, Icon, Content, Title, Description, Close };
