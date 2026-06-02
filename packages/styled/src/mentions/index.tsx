'use client';

import * as React from 'react';
import { Mentions as MentionsPrimitive } from '@structyl/primitives';
import { cn } from '@structyl/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof MentionsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MentionsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MentionsPrimitive.Root ref={ref} className={cn('relative', className)} {...props} />
));
Root.displayName = 'Mentions.Root';

const Textarea = React.forwardRef<
  React.ElementRef<typeof MentionsPrimitive.Textarea>,
  React.ComponentPropsWithoutRef<typeof MentionsPrimitive.Textarea>
>(({ className, ...props }, ref) => (
  <MentionsPrimitive.Textarea
    ref={ref}
    className={cn(
      'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      className,
    )}
    {...props}
  />
));
Textarea.displayName = 'Mentions.Textarea';

const Suggestions = React.forwardRef<
  HTMLDivElement,
  Pick<
    React.ComponentPropsWithoutRef<typeof MentionsPrimitive.Suggestions>,
    'items' | 'container'
  > &
    React.ComponentPropsWithoutRef<'div'>
>(({ items, container, className, children, ...rest }, ref) => (
  <MentionsPrimitive.Suggestions items={items} container={container} disablePortal>
    <div
      ref={ref}
      className={cn('absolute left-0 top-full z-50 mt-1 min-w-[8rem]', className)}
      {...rest}
    >
      {children}
    </div>
  </MentionsPrimitive.Suggestions>
));
Suggestions.displayName = 'Mentions.Suggestions';

export type MentionsItemProps = React.ComponentPropsWithoutRef<typeof MentionsPrimitive.Item>;

const Items = MentionsPrimitive.Items;
const Item: React.FC<MentionsItemProps> = MentionsPrimitive.Item;

export { Root, Textarea, Suggestions, Items, Item };
