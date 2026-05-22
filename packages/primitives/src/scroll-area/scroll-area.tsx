'use client';

import * as React from 'react';
import { createContext, Primitive } from '@aura-ui/core';
import { useComposedRefs } from '@aura-ui/hooks';

interface ScrollAreaContextValue {
  type: 'auto' | 'always' | 'scroll' | 'hover';
  viewport: HTMLDivElement | null;
  onViewportChange: (v: HTMLDivElement | null) => void;
  scrollHideDelay: number;
}

const [ScrollAreaProvider, useScrollAreaContext] =
  createContext<ScrollAreaContextValue>('ScrollArea');

export interface ScrollAreaRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  type?: 'auto' | 'always' | 'scroll' | 'hover';
  scrollHideDelay?: number;
}

const Root = React.forwardRef<HTMLDivElement, ScrollAreaRootProps>(
  (props, forwardedRef) => {
    const { type = 'hover', scrollHideDelay = 600, ...rest } = props;
    const [viewport, setViewport] = React.useState<HTMLDivElement | null>(null);
    return (
      <ScrollAreaProvider
        type={type}
        viewport={viewport}
        onViewportChange={setViewport}
        scrollHideDelay={scrollHideDelay}
      >
        <Primitive.div
          {...rest}
          ref={forwardedRef}
          style={{ position: 'relative', ...rest.style }}
        />
      </ScrollAreaProvider>
    );
  },
);
Root.displayName = 'ScrollArea.Root';

const Viewport = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const ctx = useScrollAreaContext('ScrollArea.Viewport');
    const composedRef = useComposedRefs(forwardedRef, ctx.onViewportChange);
    return (
      <Primitive.div
        data-aura-ui-scroll-area-viewport=""
        tabIndex={props.tabIndex ?? 0}
        {...props}
        ref={composedRef}
        style={{
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          ...props.style,
        }}
      />
    );
  },
);
Viewport.displayName = 'ScrollArea.Viewport';

export interface ScrollbarProps extends React.ComponentPropsWithoutRef<'div'> {
  orientation?: 'horizontal' | 'vertical';
  forceMount?: boolean;
}

const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>(
  (props, forwardedRef) => {
    const { orientation = 'vertical', forceMount, ...rest } = props;
    const ctx = useScrollAreaContext('ScrollArea.Scrollbar');
    const [visible, setVisible] = React.useState(ctx.type === 'always');
    const hideTimerRef = React.useRef(0);
    React.useEffect(() => {
      const v = ctx.viewport;
      if (!v) return;
      const show = () => {
        setVisible(true);
        if (ctx.type === 'scroll' || ctx.type === 'hover') {
          window.clearTimeout(hideTimerRef.current);
          hideTimerRef.current = window.setTimeout(() => setVisible(false), ctx.scrollHideDelay);
        }
      };
      v.addEventListener('scroll', show);
      if (ctx.type === 'hover') v.addEventListener('pointerenter', show);
      return () => {
        v.removeEventListener('scroll', show);
        v.removeEventListener('pointerenter', show);
        window.clearTimeout(hideTimerRef.current);
      };
    }, [ctx]);
    if (!forceMount && !visible) return null;
    return (
      <Primitive.div
        data-orientation={orientation}
        data-state={visible ? 'visible' : 'hidden'}
        {...rest}
        ref={forwardedRef}
        style={{
          position: 'absolute',
          [orientation === 'vertical' ? 'right' : 'bottom']: 0,
          [orientation === 'vertical' ? 'top' : 'left']: 0,
          [orientation === 'vertical' ? 'bottom' : 'right']: 0,
          touchAction: 'none',
          ...rest.style,
        }}
      />
    );
  },
);
Scrollbar.displayName = 'ScrollArea.Scrollbar';

const Thumb = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const ctx = useScrollAreaContext('ScrollArea.Thumb');
    const [size, setSize] = React.useState({ width: 0, height: 0, top: 0, left: 0 });
    React.useEffect(() => {
      const v = ctx.viewport;
      if (!v) return;
      const update = () => {
        const ratioY = v.clientHeight / v.scrollHeight;
        const ratioX = v.clientWidth / v.scrollWidth;
        setSize({
          width: ratioX * v.clientWidth,
          height: ratioY * v.clientHeight,
          top: (v.scrollTop / v.scrollHeight) * v.clientHeight,
          left: (v.scrollLeft / v.scrollWidth) * v.clientWidth,
        });
      };
      update();
      v.addEventListener('scroll', update);
      const ro = new ResizeObserver(update);
      ro.observe(v);
      return () => {
        v.removeEventListener('scroll', update);
        ro.disconnect();
      };
    }, [ctx]);
    return (
      <Primitive.div
        {...props}
        ref={forwardedRef}
        style={{
          height: size.height,
          width: size.width,
          transform: `translate(${size.left}px, ${size.top}px)`,
          ...props.style,
        }}
      />
    );
  },
);
Thumb.displayName = 'ScrollArea.Thumb';

const Corner = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => <Primitive.div {...props} ref={forwardedRef} />,
);
Corner.displayName = 'ScrollArea.Corner';

export { Root, Viewport, Scrollbar, Thumb, Corner };
