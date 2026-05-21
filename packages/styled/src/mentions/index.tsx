'use client';

import * as React from 'react';
import { Mentions as MentionsPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Root = MentionsPrimitive.Root;

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

const Suggestions = MentionsPrimitive.Suggestions;
const Items = MentionsPrimitive.Items;
const Item = MentionsPrimitive.Item;

export { Root, Textarea, Suggestions, Items, Item };
