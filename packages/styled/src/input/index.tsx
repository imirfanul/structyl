'use client';

import * as React from 'react';
import { cn } from '@aura-ui/utils';
import { tv, type VariantProps } from 'tailwind-variants';

// ── Variants ─────────────────────────────────────────────────────────────────

export const inputVariants = tv({
  base: [
    'border-border bg-bg shadow-xs flex w-full rounded-md border',
    'duration-snappy ease-smooth transition-[border-color,box-shadow,background-color]',
    'file:text-fg file:border-0 file:bg-transparent file:font-medium',
    'placeholder:text-muted-foreground/70',
    'hover:border-border-strong',
    'focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:outline-none focus-visible:ring-2',
    'disabled:bg-muted/30 disabled:cursor-not-allowed disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
    'aria-invalid:focus-visible:ring-destructive/30',
    'autofill:bg-bg',
  ],
  variants: {
    size: {
      sm: 'h-8 px-2.5 py-1 text-xs file:text-xs',
      md: 'h-9 px-3 py-1 text-sm file:text-sm',
      lg: 'h-11 px-4 py-2 text-base file:text-base',
    },
  },
  defaultVariants: { size: 'md' },
});

// ── Plain Input ───────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

// ── InputGroup ────────────────────────────────────────────────────────────────
// Wraps an Input with optional prefix/suffix addons and leading/trailing elements.

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon/element shown inside the input on the left */
  startElement?: React.ReactNode;
  /** Icon/element shown inside the input on the right */
  endElement?: React.ReactNode;
  /** Text/element attached outside the input on the left (e.g. "https://") */
  leftAddon?: React.ReactNode;
  /** Text/element attached outside the input on the right (e.g. ".com") */
  rightAddon?: React.ReactNode;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, startElement, endElement, leftAddon, rightAddon, children, ...props }, ref) => {
    const hasStart = !!startElement;
    const hasEnd = !!endElement;
    const hasLeftAddon = !!leftAddon;
    const hasRightAddon = !!rightAddon;

    return (
      <div ref={ref} className={cn('flex w-full items-stretch', className)} {...props}>
        {hasLeftAddon && (
          <span className="border-border bg-muted/40 text-muted-foreground inline-flex items-center rounded-l-md border border-r-0 px-3 text-sm select-none">
            {leftAddon}
          </span>
        )}
        <div className="relative flex flex-1 items-center">
          {hasStart && (
            <span className="text-muted-foreground pointer-events-none absolute left-3 flex items-center [&_svg]:size-4">
              {startElement}
            </span>
          )}
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            return React.cloneElement(child as React.ReactElement<any>, {
              className: cn(
                (child as React.ReactElement<any>).props.className,
                hasStart && 'pl-9',
                hasEnd && 'pr-9',
                hasLeftAddon && 'rounded-l-none',
                hasRightAddon && 'rounded-r-none',
              ),
            });
          })}
          {hasEnd && (
            <span className="text-muted-foreground absolute right-3 flex items-center [&_svg]:size-4">
              {endElement}
            </span>
          )}
        </div>
        {hasRightAddon && (
          <span className="border-border bg-muted/40 text-muted-foreground inline-flex items-center rounded-r-md border border-l-0 px-3 text-sm select-none">
            {rightAddon}
          </span>
        )}
      </div>
    );
  },
);
InputGroup.displayName = 'InputGroup';

// ── ClearableInput ────────────────────────────────────────────────────────────

export interface ClearableInputProps extends InputProps {
  onClear?: () => void;
  clearIcon?: React.ReactNode;
}

const ClearableInput = React.forwardRef<HTMLInputElement, ClearableInputProps>(
  ({ value, onChange, onClear, clearIcon, className, size, ...props }, ref) => {
    const hasValue = !!value || (props.defaultValue !== undefined && props.defaultValue !== '');

    const handleClear = () => {
      onClear?.();
      if (onChange) {
        const synth = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
        onChange(synth);
      }
    };

    return (
      <div className="relative flex w-full items-center">
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          className={cn(inputVariants({ size }), 'pr-8', className)}
          {...props}
        />
        {hasValue && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear input"
            onClick={handleClear}
            className="text-muted-foreground hover:text-fg absolute right-2.5 flex items-center transition-colors"
          >
            {clearIcon ?? (
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        )}
      </div>
    );
  },
);
ClearableInput.displayName = 'ClearableInput';

export { Input, InputGroup, ClearableInput };
export type { InputProps as InputStyleProps };
