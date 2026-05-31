'use client';

import * as React from 'react';
import { cn } from '@structyl/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'border-border bg-bg shadow-xs min-h-[6rem] w-full rounded-md border px-3 py-2 text-sm',
        'duration-snappy ease-smooth transition-[border-color,box-shadow,background-color]',
        'placeholder:text-muted-foreground/70',
        'hover:border-border-strong',
        'focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:outline-none focus-visible:ring-2',
        'disabled:bg-muted/30 disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        'resize-y',
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };
