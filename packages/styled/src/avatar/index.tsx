'use client';

import * as React from 'react';
import { Avatar as AvatarPrimitive } from '@structyl/primitives';
import { cn } from '@structyl/utils';
import { tv, type VariantProps } from 'tailwind-variants';

// ── Size variants ─────────────────────────────────────────────────────────────

export const avatarVariants = tv({
  base: 'relative flex shrink-0 overflow-hidden rounded-full',
  variants: {
    size: {
      xs: 'size-6 text-[10px]',
      sm: 'size-8 text-xs',
      md: 'size-10 text-sm',
      lg: 'size-12 text-base',
      xl: 'size-16 text-lg',
      '2xl': 'size-20 text-xl',
    },
  },
  defaultVariants: { size: 'md' },
});

// ── Status dot variants ───────────────────────────────────────────────────────

const statusDotVariants = tv({
  base: 'ring-bg absolute block rounded-full ring-2',
  variants: {
    status: {
      online: 'bg-success',
      offline: 'bg-muted-foreground',
      busy: 'bg-destructive',
      away: 'bg-warning',
    },
    size: {
      xs: 'size-1.5 bottom-0 right-0',
      sm: 'size-2 bottom-0 right-0',
      md: 'size-2.5 bottom-0.5 right-0.5',
      lg: 'size-3 bottom-0.5 right-0.5',
      xl: 'size-3.5 bottom-1 right-1',
      '2xl': 'size-4 bottom-1 right-1',
    },
  },
  defaultVariants: { size: 'md' },
});

// ── Root ──────────────────────────────────────────────────────────────────────

export interface AvatarRootProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const Root = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarRootProps>(
  ({ className, size, status, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      {props.children}
      {status && (
        <span
          className={statusDotVariants({ status, size: size ?? 'md' })}
          aria-label={status}
        />
      )}
    </AvatarPrimitive.Root>
  ),
);
Root.displayName = 'Avatar.Root';

// ── Image ─────────────────────────────────────────────────────────────────────

const Image = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
Image.displayName = 'Avatar.Image';

// ── Fallback ──────────────────────────────────────────────────────────────────

const Fallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'bg-muted text-muted-foreground flex h-full w-full items-center justify-center rounded-full font-medium uppercase',
      className,
    )}
    {...props}
  />
));
Fallback.displayName = 'Avatar.Fallback';

// ── AvatarGroup ───────────────────────────────────────────────────────────────

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max avatars to show before showing overflow count */
  max?: number;
  size?: VariantProps<typeof avatarVariants>['size'];
}

const Group = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, size = 'md', children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const overflow = max !== undefined ? Math.max(0, childArray.length - max) : 0;
    const visible = max !== undefined ? childArray.slice(0, max) : childArray;

    return (
      <div
        ref={ref}
        className={cn('flex items-center [&>*:not(:first-child)]:-ml-2', className)}
        {...props}
      >
        {visible.map((child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<{ className?: string; size?: VariantProps<typeof avatarVariants>['size'] }>, {
                key: i,
                className: cn(
                  (child as React.ReactElement<{ className?: string; size?: VariantProps<typeof avatarVariants>['size'] }>).props.className,
                  'ring-bg ring-2',
                ),
                size,
              })
            : child,
        )}
        {overflow > 0 && (
          <span
            className={cn(
              avatarVariants({ size }),
              'ring-bg bg-muted text-muted-foreground items-center justify-center font-medium ring-2',
            )}
            aria-label={`${overflow} more`}
          >
            +{overflow}
          </span>
        )}
      </div>
    );
  },
);
Group.displayName = 'Avatar.Group';

export { Root, Image, Fallback, Group };
export type { AvatarRootProps as AvatarRootStyledProps };
