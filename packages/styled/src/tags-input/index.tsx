'use client';

import * as React from 'react';
import { X } from '@aura-ui/icons';
import { TagsInput as TagsInputPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof TagsInputPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TagsInputPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TagsInputPrimitive.Root
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent p-1.5',
      'focus-within:ring-1 focus-within:ring-ring',
      className,
    )}
    {...props}
  />
));
Root.displayName = 'TagsInput.Root';

const Input = React.forwardRef<
  React.ElementRef<typeof TagsInputPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof TagsInputPrimitive.Input>
>(({ className, ...props }, ref) => (
  <TagsInputPrimitive.Input
    ref={ref}
    className={cn(
      'flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'TagsInput.Input';

const Tag: React.FC<{ index: number; tag: string }> = ({ index, tag }) => (
  <TagsInputPrimitive.Tag index={index}>
    <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs">
      {tag}
      <button
        type="button"
        className="inline-flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-sm hover:bg-fg/10"
        aria-label={`Remove ${tag}`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  </TagsInputPrimitive.Tag>
);
Tag.displayName = 'TagsInput.Tag';

const Items = TagsInputPrimitive.Items;

export { Root, Input, Tag, Items };
