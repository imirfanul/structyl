'use client';

import * as React from 'react';
import { Slider as SliderPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** Number of thumbs to render. Inferred from value/defaultValue length when omitted. */
  thumbCount?: number;
}

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
  ({ className, thumbCount, defaultValue, value, ...props }, ref) => {
    const count =
      thumbCount ??
      value?.length ??
      defaultValue?.length ??
      1;
    return (
      <SliderPrimitive.Root
        ref={ref}
        defaultValue={defaultValue}
        value={value}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            'relative h-2 w-full grow overflow-hidden rounded-full bg-secondary',
            'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2',
          )}
        >
          <SliderPrimitive.Range
            className={cn(
              'absolute h-full bg-primary',
              'data-[orientation=vertical]:w-full',
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: count }).map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(
              'block h-4 w-4 cursor-pointer rounded-full border border-primary/50 bg-bg shadow transition-colors',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
              'disabled:pointer-events-none disabled:opacity-50',
            )}
          />
        ))}
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = 'Slider';

export { Slider };
export type { SliderProps };
