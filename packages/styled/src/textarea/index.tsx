'use client';

import * as React from 'react';
import { cn } from '@aura-ui/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-border bg-bg px-3 py-2 text-sm shadow-xs',
        'transition-[border-color,box-shadow,background-color] duration-snappy ease-smooth',
        'placeholder:text-muted-foreground/70',
        'hover:border-border-strong',
        'focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30',
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
