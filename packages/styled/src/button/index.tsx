'use client';

import * as React from 'react';
import { Primitive } from '@aura-ui/core';
import { cn } from '@aura-ui/utils';
import { tv, type VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
  base: [
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
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
    },
    size: {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-11 rounded-lg px-6 text-base',
      icon: 'size-9 rounded-md',
      'icon-sm': 'size-8 rounded-md',
      'icon-lg': 'size-11 rounded-lg',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <Primitive.button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { Button };
