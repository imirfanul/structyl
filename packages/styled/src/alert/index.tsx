'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@aura-ui/utils';

const alertVariants = tv({
  base: [
    'relative w-full rounded-lg border p-4',
    '[&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
    '[&>svg]:text-fg [&>svg~*]:pl-7',
  ],
  variants: {
    variant: {
      default: 'bg-bg text-fg',
      destructive:
        'border-destructive/50 text-destructive [&>svg]:text-destructive dark:border-destructive',
      success: 'border-success/50 text-success [&>svg]:text-success',
      warning: 'border-warning/50 text-warning [&>svg]:text-warning',
      info: 'border-info/50 text-info [&>svg]:text-info',
    },
  },
  defaultVariants: { variant: 'default' },
});

interface AlertRootProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

const Root = React.forwardRef<HTMLDivElement, AlertRootProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  ),
);
Root.displayName = 'Alert.Root';

const Title = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  ),
);
Title.displayName = 'Alert.Title';

const Description = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref as React.Ref<HTMLDivElement>}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
Description.displayName = 'Alert.Description';

export { Root, Title, Description, alertVariants };
export type { AlertRootProps };
