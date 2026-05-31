'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@structyl/utils';

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
      error: 'border-destructive/50 bg-destructive/5 text-destructive',
    },
    color: {
      primary: '',
      secondary: '',
      error: '',
      warning: '',
      info: '',
      success: '',
      default: '',
    },
    filled: {
      true: '',
    },
  },
  compoundVariants: [
    // standard color variants
    { color: 'error', class: 'border-destructive/50 bg-error-alert-bg text-destructive' },
    { color: 'warning', class: 'border-warning/50 bg-warning-alert-bg text-warning' },
    { color: 'info', class: 'border-info/50 bg-info-alert-bg text-info' },
    { color: 'success', class: 'border-success/50 bg-success-alert-bg text-success' },
    { color: 'primary', class: 'border-primary/50 bg-primary/5 text-primary' },
    { color: 'secondary', class: 'border-secondary/50 bg-secondary/5 text-secondary-dark' },
    // filled variants
    { color: 'error', filled: true, class: 'border-transparent bg-destructive text-destructive-foreground' },
    { color: 'warning', filled: true, class: 'border-transparent bg-warning text-warning-foreground' },
    { color: 'info', filled: true, class: 'border-transparent bg-info text-info-foreground' },
    { color: 'success', filled: true, class: 'border-transparent bg-success text-success-foreground' },
    { color: 'primary', filled: true, class: 'border-transparent bg-primary text-primary-foreground' },
    { color: 'secondary', filled: true, class: 'border-transparent bg-secondary text-secondary-foreground' },
  ],
  defaultVariants: { variant: 'default' },
});

// ── Root (supports controlled closeable) ─────────────────────────────────────

export interface AlertRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof alertVariants> {
  /** Consumed by the convenience <Alert> wrapper; destructured so it never reaches the DOM. */
  onClose?: () => void;
}

const Root = React.forwardRef<HTMLDivElement, AlertRootProps>(
  ({ className, variant, color, filled, onClose: _onClose, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant, color, filled }), className)} {...props} />
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
  ({ icon, title, description, closeable, onClose, variant, color, filled, className, children, ...props }, ref) => (
    <Root ref={ref} variant={variant} color={color} filled={filled} className={cn('flex', className)} {...props}>
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

// Attach sub-components for compound usage: <Alert.Root>, <Alert.Title>, etc.
const AlertWithSubs = Alert as typeof Alert & {
  Root: typeof Root;
  Icon: typeof Icon;
  Content: typeof Content;
  Title: typeof Title;
  Description: typeof Description;
  Close: typeof Close;
};
AlertWithSubs.Root = Root;
AlertWithSubs.Icon = Icon;
AlertWithSubs.Content = Content;
AlertWithSubs.Title = Title;
AlertWithSubs.Description = Description;
AlertWithSubs.Close = Close;

export { AlertWithSubs as Alert, Root, Icon, Content, Title, Description, Close };
