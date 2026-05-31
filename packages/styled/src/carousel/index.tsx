'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from '@structyl/icons';
import { Carousel as CarouselPrimitive } from '@structyl/primitives';
import { cn } from '@structyl/utils';

// ── Internal context to share index/count with Dots/Counter ──────────────────

interface CarouselState {
  index: number;
  count: number;
  goTo: (i: number) => void;
}

const CarouselStateContext = React.createContext<CarouselState>({ index: 0, count: 0, goTo: () => {} });

// ── Root ──────────────────────────────────────────────────────────────────────

export interface CarouselRootProps extends React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Root> {
  loop?: boolean;
  /** Autoplay interval in ms. Pauses on hover. */
  autoPlay?: number;
  slideCount?: number;
}

const Root = React.forwardRef<React.ElementRef<typeof CarouselPrimitive.Root>, CarouselRootProps>(
  ({ className, loop = false, autoPlay, slideCount = 0, index: indexProp, defaultIndex = 0, onIndexChange, ...props }, ref) => {
    const isControlled = indexProp !== undefined;
    const [uncontrolledIndex, setUncontrolledIndex] = React.useState(defaultIndex);
    const [paused, setPaused] = React.useState(false);

    const activeIndex = isControlled ? indexProp : uncontrolledIndex;

    const handleIndexChange = (i: number) => {
      if (!isControlled) setUncontrolledIndex(i);
      onIndexChange?.(i);
    };

    return (
      <CarouselStateContext.Provider value={{ index: activeIndex, count: slideCount, goTo: handleIndexChange }}>
        <CarouselPrimitive.Root
          ref={ref}
          loop={loop}
          index={activeIndex}
          onIndexChange={handleIndexChange}
          autoPlayInterval={paused ? 0 : autoPlay}
          className={cn('relative', className)}
          onMouseEnter={() => autoPlay && setPaused(true)}
          onMouseLeave={() => autoPlay && setPaused(false)}
          {...props}
        />
      </CarouselStateContext.Provider>
    );
  },
);
Root.displayName = 'Carousel.Root';

// ── Content ───────────────────────────────────────────────────────────────────

const Content = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive.Container>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Container>
>(({ className, ...props }, ref) => (
  <CarouselPrimitive.Viewport className="overflow-hidden">
    <CarouselPrimitive.Container ref={ref} className={cn('flex -ml-4', className)} {...props} />
  </CarouselPrimitive.Viewport>
));
Content.displayName = 'Carousel.Content';

// ── Item ──────────────────────────────────────────────────────────────────────

const Item = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive.Slide>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Slide>
>(({ className, ...props }, ref) => (
  <CarouselPrimitive.Slide
    ref={ref}
    className={cn('min-w-0 shrink-0 grow-0 basis-full pl-4', className)}
    {...props}
  />
));
Item.displayName = 'Carousel.Item';

// ── Arrows ────────────────────────────────────────────────────────────────────

const arrowCls = [
  'absolute h-9 w-9 inline-flex items-center justify-center rounded-full',
  'border border-border bg-bg/90 shadow-sm backdrop-blur-sm',
  'hover:bg-accent transition-colors duration-150',
  'disabled:pointer-events-none disabled:opacity-40',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
].join(' ');

const Previous = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive.Previous>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Previous>
>(({ className, ...props }, ref) => (
  <CarouselPrimitive.Previous ref={ref} className={cn(arrowCls, '-left-5 top-1/2 -translate-y-1/2', className)} {...props}>
    <ChevronLeft className="h-4 w-4" aria-hidden />
    <span className="sr-only">Previous slide</span>
  </CarouselPrimitive.Previous>
));
Previous.displayName = 'Carousel.Previous';

const Next = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive.Next>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive.Next>
>(({ className, ...props }, ref) => (
  <CarouselPrimitive.Next ref={ref} className={cn(arrowCls, '-right-5 top-1/2 -translate-y-1/2', className)} {...props}>
    <ChevronRight className="h-4 w-4" aria-hidden />
    <span className="sr-only">Next slide</span>
  </CarouselPrimitive.Next>
));
Next.displayName = 'Carousel.Next';

// ── Dot indicators ────────────────────────────────────────────────────────────

export interface DotsProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
}

const Dots = React.forwardRef<HTMLDivElement, DotsProps>(({ className, count, ...props }, ref) => {
  const ctx = React.useContext(CarouselStateContext);
  const resolvedCount = count ?? ctx.count;

  return (
    <div
      ref={ref}
      role="tablist"
      aria-label="Slide indicators"
      className={cn('mt-4 flex justify-center gap-1.5', className)}
      {...props}
    >
      {Array.from({ length: resolvedCount }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={ctx.index === i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => ctx.goTo(i)}
          className={cn(
            'h-2 rounded-full transition-all duration-200',
            ctx.index === i ? 'w-4 bg-primary' : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70',
          )}
        />
      ))}
    </div>
  );
});
Dots.displayName = 'Carousel.Dots';

// ── Slide counter ─────────────────────────────────────────────────────────────

export interface CounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number;
}

const Counter = React.forwardRef<HTMLSpanElement, CounterProps>(
  ({ className, count, ...props }, ref) => {
    const ctx = React.useContext(CarouselStateContext);
    const resolvedCount = count ?? ctx.count;
    return (
      <span
        ref={ref}
        aria-live="polite"
        aria-atomic
        className={cn(
          'absolute bottom-3 right-3 rounded-full bg-overlay/60 px-2.5 py-0.5 text-xs font-medium text-white',
          className,
        )}
        {...props}
      >
        {ctx.index + 1} / {resolvedCount}
      </span>
    );
  },
);
Counter.displayName = 'Carousel.Counter';

export { Root, Content, Item, Previous, Next, Dots, Counter };
