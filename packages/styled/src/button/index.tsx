'use client';

import * as React from 'react';
import { Slot } from '@structyl/core';
import { cn } from '@structyl/utils';
import { tv, type VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
  base: [
    'relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'select-none isolate',
    'transition-[transform,background-color,border-color,color,box-shadow,opacity] duration-150 ease-spring',
    'will-change-transform',
    'active:scale-[0.97] active:duration-snappy',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:pointer-events-none disabled:opacity-50 disabled:scale-100',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-150',
  ],
  variants: {
    variant: {
      // ── Legacy / convenience variants (no color prop needed) ──────────────
      default: [
        'bg-primary text-primary-foreground shadow-button',
        'hover:bg-primary-hover hover:shadow-md',
        'active:bg-primary-active active:shadow-button-active',
      ],
      destructive: [
        'bg-destructive text-destructive-foreground shadow-button',
        'hover:brightness-110 hover:shadow-md',
        'active:brightness-95 active:shadow-button-active',
      ],
      outline: [
        'border border-border bg-bg text-fg shadow-xs',
        'hover:bg-accent hover:text-accent-foreground hover:border-border-strong',
        'active:bg-accent/80',
      ],
      secondary: [
        'bg-secondary text-secondary-foreground shadow-xs',
        'hover:bg-secondary/80',
        'active:bg-secondary/70',
      ],
      ghost: ['text-fg', 'hover:bg-accent hover:text-accent-foreground', 'active:bg-accent/80'],
      link: ['text-primary underline-offset-4', 'hover:underline active:scale-100'],
      success: [
        'bg-success text-success-foreground shadow-button',
        'hover:brightness-110 hover:shadow-md',
        'active:brightness-95',
      ],
      warning: [
        'bg-warning text-warning-foreground shadow-button',
        'hover:brightness-110 hover:shadow-md',
        'active:brightness-95',
      ],
      // ── MUI-style semantic variants (pair with color prop) ────────────────
      contained: [
        'shadow-button',
        'hover:shadow-md',
        'active:shadow-button-active',
      ],
      outlined: [
        'border bg-transparent',
        'active:scale-[0.97]',
      ],
      text: [
        'bg-transparent shadow-none',
        'active:scale-[0.97]',
      ],
    },
    color: {
      primary: '',
      secondary: '',
      error: '',
      warning: '',
      info: '',
      success: '',
      default: '',
      inherit: 'text-inherit',
    },
    size: {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-11 rounded-lg px-6 text-base',
      xl: 'h-12 rounded-lg px-8 text-base',
      icon: 'size-9 rounded-md',
      'icon-sm': 'size-8 rounded-md',
      'icon-lg': 'size-11 rounded-lg',
      'icon-xl': 'size-12 rounded-lg',
    },
  },
  compoundVariants: [
    // ── contained × color ─────────────────────────────────────────────────
    {
      variant: 'contained',
      color: 'primary',
      class: [
        'bg-primary text-primary-foreground',
        'hover:bg-primary-state-contained',
      ],
    },
    {
      variant: 'contained',
      color: 'secondary',
      class: [
        'bg-secondary text-secondary-foreground',
        'hover:bg-secondary-state-contained',
      ],
    },
    {
      variant: 'contained',
      color: 'error',
      class: [
        'bg-destructive text-destructive-foreground',
        'hover:bg-error-state-contained',
      ],
    },
    {
      variant: 'contained',
      color: 'warning',
      class: [
        'bg-warning text-warning-foreground',
        'hover:bg-warning-state-contained',
      ],
    },
    {
      variant: 'contained',
      color: 'info',
      class: [
        'bg-info text-info-foreground',
        'hover:bg-info-state-contained',
      ],
    },
    {
      variant: 'contained',
      color: 'success',
      class: [
        'bg-success text-success-foreground',
        'hover:bg-success-state-contained',
      ],
    },
    {
      variant: 'contained',
      color: 'default',
      class: [
        'bg-muted text-fg',
        'hover:bg-muted/80',
      ],
    },
    // ── outlined × color ──────────────────────────────────────────────────
    {
      variant: 'outlined',
      color: 'primary',
      class: [
        'border-primary text-primary',
        'hover:bg-primary-state-outlined',
        'active:bg-primary-state-resting',
      ],
    },
    {
      variant: 'outlined',
      color: 'secondary',
      class: [
        'border-secondary text-secondary-dark',
        'hover:bg-secondary-state-outlined',
        'active:bg-secondary-state-resting',
      ],
    },
    {
      variant: 'outlined',
      color: 'error',
      class: [
        'border-destructive text-destructive',
        'hover:bg-error-state-outlined',
        'active:bg-error-state-resting',
      ],
    },
    {
      variant: 'outlined',
      color: 'warning',
      class: [
        'border-warning text-warning',
        'hover:bg-warning-state-outlined',
        'active:bg-warning-state-resting',
      ],
    },
    {
      variant: 'outlined',
      color: 'info',
      class: [
        'border-info text-info',
        'hover:bg-info-state-outlined',
        'active:bg-info-state-resting',
      ],
    },
    {
      variant: 'outlined',
      color: 'success',
      class: [
        'border-success text-success',
        'hover:bg-success-state-outlined',
        'active:bg-success-state-resting',
      ],
    },
    {
      variant: 'outlined',
      color: 'default',
      class: [
        'border-border text-fg',
        'hover:bg-accent hover:text-accent-foreground',
        'active:bg-accent/80',
      ],
    },
    // ── text × color ──────────────────────────────────────────────────────
    {
      variant: 'text',
      color: 'primary',
      class: [
        'text-primary',
        'hover:bg-primary-state-outlined',
        'active:bg-primary-state-resting',
      ],
    },
    {
      variant: 'text',
      color: 'secondary',
      class: [
        'text-secondary-dark',
        'hover:bg-secondary-state-outlined',
        'active:bg-secondary-state-resting',
      ],
    },
    {
      variant: 'text',
      color: 'error',
      class: [
        'text-destructive',
        'hover:bg-error-state-outlined',
        'active:bg-error-state-resting',
      ],
    },
    {
      variant: 'text',
      color: 'warning',
      class: [
        'text-warning',
        'hover:bg-warning-state-outlined',
        'active:bg-warning-state-resting',
      ],
    },
    {
      variant: 'text',
      color: 'info',
      class: [
        'text-info',
        'hover:bg-info-state-outlined',
        'active:bg-info-state-resting',
      ],
    },
    {
      variant: 'text',
      color: 'success',
      class: [
        'text-success',
        'hover:bg-success-state-outlined',
        'active:bg-success-state-resting',
      ],
    },
    {
      variant: 'text',
      color: 'default',
      class: [
        'text-fg',
        'hover:bg-accent hover:text-accent-foreground',
        'active:bg-accent/80',
      ],
    },
  ],
  defaultVariants: { variant: 'default', size: 'default' },
});

// ── Spinner (inline) ─────────────────────────────────────────────────────────

const ButtonSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

// ── Button ───────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Shows a spinner and disables the button */
  loading?: boolean;
  /** Text shown next to spinner when loading. Defaults to children. */
  loadingText?: string;
  /** Icon rendered before children */
  leftIcon?: React.ReactNode;
  /** Icon rendered after children */
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, color, asChild = false, loading = false, loadingText, leftIcon, rightIcon, disabled, children, ...props },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size, color }), className)}
          aria-disabled={isDisabled || undefined}
          data-loading={loading ? '' : undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(buttonVariants({ variant, size, color }), className)}
        disabled={isDisabled}
        data-loading={loading ? '' : undefined}
        {...props}
      >
        {loading ? (
          <>
            <ButtonSpinner className="size-4" />
            {loadingText ?? children}
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';

// ── ButtonGroup ──────────────────────────────────────────────────────────────

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Collapses shared borders between buttons */
  attached?: boolean;
  orientation?: 'horizontal' | 'vertical';
  /** Propagated to child Button components */
  variant?: VariantProps<typeof buttonVariants>['variant'];
  /** Propagated to child Button components */
  color?: VariantProps<typeof buttonVariants>['color'];
  /** Propagated to child Button components */
  size?: VariantProps<typeof buttonVariants>['size'];
  /** Propagated to child Button components */
  disabled?: boolean;
  /** Propagated to child Button components — makes each button full-width */
  fullWidth?: boolean;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, attached = false, orientation = 'horizontal', variant, color, size, disabled, fullWidth, children, ...props }, ref) => {
    const hasOverrides = variant !== undefined || color !== undefined || size !== undefined || disabled !== undefined || fullWidth !== undefined;
    const clonedChildren = hasOverrides
      ? React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            ...(variant !== undefined && { variant }),
            ...(color !== undefined && { color }),
            ...(size !== undefined && { size }),
            ...(disabled !== undefined && { disabled }),
            ...(fullWidth !== undefined && { fullWidth }),
          });
        })
      : children;

    return (
      <div
        ref={ref}
        role="group"
        data-orientation={orientation}
        className={cn(
          'inline-flex',
          orientation === 'vertical' ? 'flex-col' : 'flex-row',
          attached && [
            orientation === 'horizontal'
              ? '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:-ml-px'
              : '[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:-mt-px',
            '[&>*:focus-visible]:z-10 [&>*:hover]:z-10 [&>*]:relative',
          ],
          !attached && (orientation === 'horizontal' ? 'gap-2' : 'gap-2 flex-col'),
          className,
        )}
        {...props}
      >
        {clonedChildren}
      </div>
    );
  },
);
ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonGroup, ButtonSpinner };
