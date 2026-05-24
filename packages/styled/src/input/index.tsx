'use client';

import * as React from 'react';
import { cn } from '@aura-ui/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'border-border bg-bg shadow-xs flex h-9 w-full rounded-md border px-3 py-1 text-sm',
        'duration-snappy ease-smooth transition-[border-color,box-shadow,background-color]',
        'file:text-fg file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-muted-foreground/70',
        'hover:border-border-strong',
        'focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:outline-none focus-visible:ring-2',
        'disabled:bg-muted/30 disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        'aria-invalid:focus-visible:ring-destructive/30',
        'autofill:bg-bg',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input };
export type { InputProps };
