'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { Slot } from '@aura-ui/core';
import { cn } from '@aura-ui/utils';

const badgeVariants = tv({
  base: [
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
    'focus:ring-ring transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  ],
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent',
      outline: 'text-fg',
      success: 'bg-success text-success-foreground hover:bg-success/80 border-transparent',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/80 border-transparent',
    },
  },
  defaultVariants: { variant: 'default' },
});

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return <Comp ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />;
  },
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export type { BadgeProps };
