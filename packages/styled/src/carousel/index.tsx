'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from '@your-lib/icons';
import { Carousel as CarouselPrimitive } from '@your-lib/primitives';
import { cn } from '@your-lib/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CarouselPrimitive.Root ref={ref} className={cn('relative', className)} {...props} />
));
Root.displayName = 'Carousel.Root';

const Content = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive.Container>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Container>
>(({ className, ...props }, ref) => (
  <CarouselPrimitive.Viewport className="overflow-hidden">
    <CarouselPrimitive.Container
      ref={ref}
      className={cn('flex -ml-4', className)}
      {...props}
    />
  </CarouselPrimitive.Viewport>
));
Content.displayName = 'Carousel.Content';

const Item = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive.Slide>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Slide>
>(({ className, ...props }, ref) => (
  <CarouselPrimitive.Slide ref={ref} className={cn('min-w-0 shrink-0 grow-0 basis-full pl-4', className)} {...props} />
));
Item.displayName = 'Carousel.Item';

const arrowCls = cn(
  'absolute h-8 w-8 inline-flex items-center justify-center rounded-full border border-border bg-bg shadow-sm',
  'hover:bg-accent disabled:pointer-events-none disabled:opacity-50',
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
);

const Previous = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive.Previous>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Previous>
>(({ className, ...props }, ref) => (
  <CarouselPrimitive.Previous
    ref={ref}
    className={cn(arrowCls, '-left-12 top-1/2 -translate-y-1/2', className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </CarouselPrimitive.Previous>
));
Previous.displayName = 'Carousel.Previous';

const Next = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive.Next>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Next>
>(({ className, ...props }, ref) => (
  <CarouselPrimitive.Next
    ref={ref}
    className={cn(arrowCls, '-right-12 top-1/2 -translate-y-1/2', className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </CarouselPrimitive.Next>
));
Next.displayName = 'Carousel.Next';

export { Root, Content, Item, Previous, Next };
