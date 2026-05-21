'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { Slot } from '@aura-ui/core';
import { cn } from '@aura-ui/utils';

const badgeVariants = tv({
  base: [
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ],
  variants: {
    variant: {
      default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      outline: 'text-fg',
      success: 'border-transparent bg-success text-success-foreground hover:bg-success/80',
      warning: 'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
    },
  },
  defaultVariants: { variant: 'default' },
});

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
    );
  },
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export type { BadgeProps };
