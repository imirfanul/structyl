'use client';

import * as React from 'react';
import { createContext, Primitive } from '@structyl/core';
import { useComposedRefs, useControllableState } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';

interface CarouselContextValue {
  index: number;
  setIndex: (i: number) => void;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  orientation: 'horizontal' | 'vertical';
  loop: boolean;
  next: () => void;
  prev: () => void;
  goTo: (i: number) => void;
}

const [CarouselProvider, useCarouselContext] = createContext<CarouselContextValue>('Carousel');

export interface CarouselRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  orientation?: 'horizontal' | 'vertical';
  loop?: boolean;
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (i: number) => void;
  autoPlayInterval?: number;
}

const Root = React.forwardRef<HTMLDivElement, CarouselRootProps>(
  (props, forwardedRef) => {
    const {
      orientation = 'horizontal',
      loop = false,
      index: indexProp,
      defaultIndex = 0,
      onIndexChange,
      autoPlayInterval,
      ...rest
    } = props;
    const [index = 0, setIndex] = useControllableState<number>({
      prop: indexProp,
      defaultProp: defaultIndex,
      onChange: onIndexChange,
    });
    const [count, setCount] = React.useState(0);
    const next = React.useCallback(
      () => setIndex((i = 0) => (loop ? (i + 1) % count : Math.min(i + 1, count - 1))),
      [count, loop, setIndex],
    );
    const prev = React.useCallback(
      () => setIndex((i = 0) => (loop ? (i - 1 + count) % count : Math.max(i - 1, 0))),
      [count, loop, setIndex],
    );
    const goTo = React.useCallback((i: number) => setIndex(i), [setIndex]);
    React.useEffect(() => {
      if (!autoPlayInterval || autoPlayInterval <= 0) return undefined;
      const id = window.setInterval(next, autoPlayInterval);
      return () => window.clearInterval(id);
    }, [autoPlayInterval, next]);
    return (
      <CarouselProvider
        index={index}
        setIndex={setIndex as (i: number) => void}
        count={count}
        setCount={setCount as React.Dispatch<React.SetStateAction<number>>}
        orientation={orientation}
        loop={loop}
        next={next}
        prev={prev}
        goTo={goTo}
      >
        <Primitive.div
          role="region"
          aria-roledescription="carousel"
          data-orientation={orientation}
          {...rest}
          ref={forwardedRef}
          onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
              event.preventDefault();
              prev();
            } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
              event.preventDefault();
              next();
            }
          })}
        />
      </CarouselProvider>
    );
  },
);
Root.displayName = 'Carousel.Root';

const Viewport = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => (
    <Primitive.div
      {...props}
      ref={forwardedRef}
      style={{ overflow: 'hidden', ...props.style }}
    />
  ),
);
Viewport.displayName = 'Carousel.Viewport';

const Container = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const ctx = useCarouselContext('Carousel.Container');
    const translation =
      ctx.orientation === 'horizontal'
        ? `translateX(-${ctx.index * 100}%)`
        : `translateY(-${ctx.index * 100}%)`;
    return (
      <Primitive.div
        {...props}
        ref={forwardedRef}
        style={{
          display: 'flex',
          flexDirection: ctx.orientation === 'horizontal' ? 'row' : 'column',
          transform: translation,
          transition: 'transform 300ms ease',
          ...props.style,
        }}
      />
    );
  },
);
Container.displayName = 'Carousel.Container';

const Slide = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const ctx = useCarouselContext('Carousel.Slide');
    const ref = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(forwardedRef, ref);
    React.useEffect(() => {
      ctx.setCount(c => c + 1);
      return () => ctx.setCount(c => Math.max(0, c - 1));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <Primitive.div
        role="group"
        aria-roledescription="slide"
        {...props}
        ref={composedRef}
        style={{ flex: '0 0 100%', minWidth: 0, ...props.style }}
      />
    );
  },
);
Slide.displayName = 'Carousel.Slide';

const Previous = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>(
  (props, forwardedRef) => {
    const ctx = useCarouselContext('Carousel.Previous');
    const disabled = !ctx.loop && ctx.index === 0;
    return (
      <Primitive.button
        type="button"
        aria-label="Previous slide"
        disabled={disabled}
        {...props}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, ctx.prev)}
      />
    );
  },
);
Previous.displayName = 'Carousel.Previous';

const Next = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>(
  (props, forwardedRef) => {
    const ctx = useCarouselContext('Carousel.Next');
    const disabled = !ctx.loop && ctx.index === ctx.count - 1;
    return (
      <Primitive.button
        type="button"
        aria-label="Next slide"
        disabled={disabled}
        {...props}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, ctx.next)}
      />
    );
  },
);
Next.displayName = 'Carousel.Next';

export { Root, Viewport, Container, Slide, Previous, Next };
