'use client';

import * as React from 'react';
import { createContext, Primitive } from '@your-lib/core';
import { useComposedRefs } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';

interface ResizableContextValue {
  direction: 'horizontal' | 'vertical';
  panelRefs: React.RefObject<Map<string, HTMLDivElement>>;
  sizes: Map<string, number>;
  setSize: (id: string, size: number) => void;
  containerSize: number;
  onContainerSizeChange: (size: number) => void;
}

const [ResizableProvider, useResizableContext] = createContext<ResizableContextValue>('Resizable');

export interface ResizableGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  direction?: 'horizontal' | 'vertical';
  onLayout?: (sizes: number[]) => void;
}

const Group = React.forwardRef<HTMLDivElement, ResizableGroupProps>(
  (props, forwardedRef) => {
    const { direction = 'horizontal', onLayout, ...rest } = props;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(forwardedRef, containerRef);
    const panelRefs = React.useRef(new Map<string, HTMLDivElement>());
    const [sizes, setSizes] = React.useState(new Map<string, number>());
    const [containerSize, setContainerSize] = React.useState(0);
    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const update = () => {
        setContainerSize(direction === 'horizontal' ? el.clientWidth : el.clientHeight);
      };
      update();
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => ro.disconnect();
    }, [direction]);
    React.useEffect(() => {
      onLayout?.(Array.from(sizes.values()));
    }, [sizes, onLayout]);
    return (
      <ResizableProvider
        direction={direction}
        panelRefs={panelRefs}
        sizes={sizes}
        setSize={(id, size) => setSizes((prev) => new Map(prev).set(id, size))}
        containerSize={containerSize}
        onContainerSizeChange={setContainerSize}
      >
        <Primitive.div
          data-direction={direction}
          {...rest}
          ref={composedRef}
          style={{
            display: 'flex',
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
            ...rest.style,
          }}
        />
      </ResizableProvider>
    );
  },
);
Group.displayName = 'Resizable.Group';

export interface ResizablePanelProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  id: string;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

const Panel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  (props, forwardedRef) => {
    const { id, defaultSize = 50, minSize = 10, maxSize = 90, ...rest } = props;
    const ctx = useResizableContext('Resizable.Panel');
    const ref = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(forwardedRef, ref, (node) => {
      if (node) ctx.panelRefs.current?.set(id, node);
      else ctx.panelRefs.current?.delete(id);
    });
    React.useEffect(() => {
      if (!ctx.sizes.has(id)) ctx.setSize(id, defaultSize);
    }, [ctx, id, defaultSize]);
    const size = ctx.sizes.get(id) ?? defaultSize;
    return (
      <Primitive.div
        data-panel-id={id}
        data-min-size={minSize}
        data-max-size={maxSize}
        {...rest}
        ref={composedRef}
        style={{
          flex: `${size} 1 0`,
          overflow: 'auto',
          ...rest.style,
        }}
      />
    );
  },
);
Panel.displayName = 'Resizable.Panel';

export interface ResizableHandleProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  /** Panel IDs on each side of the handle */
  between: [string, string];
}

const Handle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  (props, forwardedRef) => {
    const { between, ...rest } = props;
    const ctx = useResizableContext('Resizable.Handle');
    const startRef = React.useRef<{ pos: number; sizes: [number, number] } | null>(null);
    const [a, b] = between;
    const sumSizes = (ctx.sizes.get(a) ?? 0) + (ctx.sizes.get(b) ?? 0);
    return (
      <Primitive.div
        role="separator"
        aria-orientation={ctx.direction === 'horizontal' ? 'vertical' : 'horizontal'}
        aria-valuenow={Math.round(((ctx.sizes.get(a) ?? 0) / sumSizes) * 100) || 50}
        tabIndex={0}
        {...rest}
        ref={forwardedRef}
        style={{
          cursor: ctx.direction === 'horizontal' ? 'col-resize' : 'row-resize',
          touchAction: 'none',
          ...rest.style,
        }}
        onPointerDown={composeEventHandlers(rest.onPointerDown, (event) => {
          (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
          startRef.current = {
            pos: ctx.direction === 'horizontal' ? event.clientX : event.clientY,
            sizes: [ctx.sizes.get(a) ?? 0, ctx.sizes.get(b) ?? 0],
          };
        })}
        onPointerMove={composeEventHandlers(rest.onPointerMove, (event) => {
          if (!startRef.current) return;
          if (!(event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId)) return;
          const pos = ctx.direction === 'horizontal' ? event.clientX : event.clientY;
          const delta = pos - startRef.current.pos;
          const pxPerUnit = ctx.containerSize / ((startRef.current.sizes[0] ?? 0) + (startRef.current.sizes[1] ?? 0));
          const deltaUnits = delta / pxPerUnit;
          const newA = (startRef.current.sizes[0] ?? 0) + deltaUnits;
          const newB = (startRef.current.sizes[1] ?? 0) - deltaUnits;
          if (newA >= 5 && newB >= 5) {
            ctx.setSize(a, newA);
            ctx.setSize(b, newB);
          }
        })}
        onPointerUp={composeEventHandlers(rest.onPointerUp, (event) => {
          (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
          startRef.current = null;
        })}
        onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
          const isInline = ctx.direction === 'horizontal';
          const decrease = isInline ? 'ArrowLeft' : 'ArrowUp';
          const increase = isInline ? 'ArrowRight' : 'ArrowDown';
          const step = event.shiftKey ? 10 : 1;
          const sizeA = ctx.sizes.get(a) ?? 0;
          const sizeB = ctx.sizes.get(b) ?? 0;
          if (event.key === decrease && sizeA > 5) {
            ctx.setSize(a, sizeA - step);
            ctx.setSize(b, sizeB + step);
            event.preventDefault();
          } else if (event.key === increase && sizeB > 5) {
            ctx.setSize(a, sizeA + step);
            ctx.setSize(b, sizeB - step);
            event.preventDefault();
          }
        })}
      />
    );
  },
);
Handle.displayName = 'Resizable.Handle';

export { Group, Panel, Handle };
