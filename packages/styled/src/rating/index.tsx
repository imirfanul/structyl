'use client';

import * as React from 'react';
import { cn } from '@aura-ui/utils';
import { tv, type VariantProps } from 'tailwind-variants';

// ── Icons ─────────────────────────────────────────────────────────────────────

const StarIcon = ({ filled, className }: { filled?: boolean; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={1.5}
    className={className}
    aria-hidden
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const HeartIcon = ({ filled, className }: { filled?: boolean; className?: string }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// ── Variants ─────────────────────────────────────────────────────────────────

export const ratingVariants = tv({
  base: 'flex items-center outline-none',
  variants: {
    size: {
      sm: '[&_svg]:size-4',
      md: '[&_svg]:size-6',
      lg: '[&_svg]:size-8',
      xl: '[&_svg]:size-10',
    },
    color: {
      yellow: 'text-yellow-400 [&_svg]:stroke-yellow-400',
      orange: 'text-orange-400 [&_svg]:stroke-orange-400',
      red: 'text-red-400 [&_svg]:stroke-red-400',
      primary: 'text-primary [&_svg]:stroke-primary',
    },
  },
  defaultVariants: { size: 'md', color: 'yellow' },
});

// ── Rating ────────────────────────────────────────────────────────────────────

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  icon?: 'star' | 'heart';
  gap?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'yellow' | 'orange' | 'red' | 'primary';
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      size,
      color,
      icon = 'star',
      max = 5,
      step = 1,
      gap = '0.25rem',
      value: valueProp,
      defaultValue = 0,
      onChange,
      disabled = false,
      readOnly = false,
      required,
      name,
      style,
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const [hovered, setHovered] = React.useState<number | null>(null);

    const value = isControlled ? valueProp : uncontrolledValue;
    const displayValue = hovered ?? value;
    const items = Array.from({ length: Math.ceil(max / step) }, (_, i) => (i + 1) * step);

    const setValue = (next: number) => {
      if (!isControlled) setUncontrolledValue(next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value} out of ${max}`}
        aria-disabled={disabled || undefined}
        aria-readonly={readOnly || undefined}
        aria-required={required || undefined}
        tabIndex={disabled ? -1 : 0}
        data-disabled={disabled ? '' : undefined}
        data-readonly={readOnly ? '' : undefined}
        className={cn(ratingVariants({ size, color }), className)}
        style={{ gap, ...style }}
        onMouseLeave={() => !readOnly && setHovered(null)}
        onKeyDown={(e) => {
          if (disabled || readOnly) return;
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault();
            setValue(Math.min(value + step, max));
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault();
            setValue(Math.max(value - step, 0));
          } else if (e.key === 'Home') {
            e.preventDefault();
            setValue(0);
          } else if (e.key === 'End') {
            e.preventDefault();
            setValue(max);
          }
        }}
        {...props}
      >
        {items.map((itemValue) => {
          const filled = displayValue >= itemValue;
          return (
            <span
              key={itemValue}
              onMouseEnter={() => !disabled && !readOnly && setHovered(itemValue)}
              onClick={() => {
                if (disabled || readOnly) return;
                setValue(itemValue === value ? 0 : itemValue);
              }}
              className={cn(
                'transition-transform duration-100',
                !disabled && !readOnly && 'cursor-pointer hover:scale-110',
                !filled && 'opacity-30',
              )}
            >
              {icon === 'heart' ? <HeartIcon filled={filled} /> : <StarIcon filled={filled} />}
            </span>
          );
        })}
        {name && <input type="hidden" name={name} value={value} />}
      </div>
    );
  },
);
Rating.displayName = 'Rating';

export { Rating };
