'use client';

import * as React from 'react';
import { ChevronRight, MoreHorizontal } from '@aura-ui/icons';
import { Slot } from '@aura-ui/core';
import { cn } from '@aura-ui/utils';

const Root = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & { separator?: React.ReactNode }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Root.displayName = 'Breadcrumb.Root';

const List = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5',
        className,
      )}
      {...props}
    />
  ),
);
List.displayName = 'Breadcrumb.List';

const Item = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
  ),
);
Item.displayName = 'Breadcrumb.Item';

interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  asChild?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    return (
      <Comp ref={ref} className={cn('cursor-pointer hover:text-fg transition-colors', className)} {...props} />
    );
  },
);
Link.displayName = 'Breadcrumb.Link';

const Page = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-fg font-normal', className)}
      {...props}
    />
  ),
);
Page.displayName = 'Breadcrumb.Page';

const Separator: React.FC<React.ComponentProps<'li'>> = ({ children, className, ...props }) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
Separator.displayName = 'Breadcrumb.Separator';

const Ellipsis: React.FC<React.ComponentProps<'span'>> = ({ className, ...props }) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
Ellipsis.displayName = 'Breadcrumb.Ellipsis';

export { Root, List, Item, Link, Page, Separator, Ellipsis };
