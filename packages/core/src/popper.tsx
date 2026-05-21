'use client';

import * as React from 'react';
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  arrow as arrowMiddleware,
  size as sizeMiddleware,
  hide as hideMiddleware,
  limitShift,
  type Placement,
  type Strategy,
  type Middleware,
} from '@floating-ui/react';
import { useComposedRefs, useCallbackRef } from './_internal';
import { createContext } from './create-context';
import { useDirection } from './direction';
import { Primitive } from './primitive';
import { Arrow as ArrowPrimitive, type ArrowProps } from './arrow';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'center' | 'end';
type Sticky = 'partial' | 'always';

/* ── Root context ────────────────────────────────────────────────────── */

interface PopperContextValue {
  anchor: HTMLElement | null;
  onAnchorChange: (anchor: HTMLElement | null) => void;
}

const [PopperProvider, usePopperContext] = createContext<PopperContextValue>('Popper');

const Popper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  return (
    <PopperProvider anchor={anchor} onAnchorChange={setAnchor}>
      {children}
    </PopperProvider>
  );
};
Popper.displayName = 'Popper';

/* ── Anchor ──────────────────────────────────────────────────────────── */

interface PopperAnchorProps extends React.ComponentPropsWithoutRef<typeof Primitive.div> {
  virtualRef?: React.RefObject<{ getBoundingClientRect: () => DOMRect }>;
}

const PopperAnchor = React.forwardRef<HTMLDivElement, PopperAnchorProps>(
  (props, forwardedRef) => {
    const { virtualRef, ...anchorProps } = props;
    const ctx = usePopperContext('PopperAnchor');
    const ref = React.useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);

    React.useEffect(() => {
      ctx.onAnchorChange((virtualRef?.current as unknown as HTMLElement) ?? ref.current);
    });

    return virtualRef ? null : <Primitive.div {...anchorProps} ref={composedRefs} />;
  },
);
PopperAnchor.displayName = 'PopperAnchor';

/* ── Content ─────────────────────────────────────────────────────────── */

interface PopperContentContextValue {
  placedSide: Side;
  placedAlign: Align;
  arrowX?: number;
  arrowY?: number;
  shouldHideArrow: boolean;
  onArrowChange: (arrow: HTMLSpanElement | null) => void;
}

const [PopperContentProvider, useContentContext] =
  createContext<PopperContentContextValue>('PopperContent');

interface PopperContentProps extends React.ComponentPropsWithoutRef<typeof Primitive.div> {
  side?: Side;
  sideOffset?: number;
  align?: Align;
  alignOffset?: number;
  arrowPadding?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | Element[] | null;
  collisionPadding?: number | Partial<Record<Side, number>>;
  sticky?: Sticky;
  hideWhenDetached?: boolean;
  updatePositionStrategy?: 'always' | 'optimized';
  onPlaced?: () => void;
  strategy?: Strategy;
}

const PopperContent = React.forwardRef<HTMLDivElement, PopperContentProps>(
  (props, forwardedRef) => {
    const {
      side = 'bottom',
      sideOffset = 0,
      align = 'center',
      alignOffset = 0,
      arrowPadding = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding: collisionPaddingProp = 0,
      sticky = 'partial',
      hideWhenDetached = false,
      updatePositionStrategy = 'optimized',
      onPlaced,
      strategy = 'fixed',
      ...contentProps
    } = props;

    const ctx = usePopperContext('PopperContent');
    const [content, setContent] = React.useState<HTMLDivElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, setContent);
    const [arrow, setArrow] = React.useState<HTMLSpanElement | null>(null);
    const arrowSize = useSize(arrow);
    const arrowWidth = arrowSize?.width ?? 0;
    const arrowHeight = arrowSize?.height ?? 0;

    const dir = useDirection();
    const desiredPlacement = (side + (align !== 'center' ? '-' + align : '')) as Placement;

    const collisionPadding =
      typeof collisionPaddingProp === 'number'
        ? collisionPaddingProp
        : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };

    const boundary = Array.isArray(collisionBoundary)
      ? collisionBoundary
      : [collisionBoundary].filter(Boolean);

    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isHTMLElement) as Element[],
      altBoundary: boundary.length > 0,
    } as const;

    const middleware: Middleware[] = [
      offsetMiddleware({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
      avoidCollisions &&
        shiftMiddleware({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === 'partial' ? limitShift() : undefined,
          ...detectOverflowOptions,
        }),
      avoidCollisions && flipMiddleware({ ...detectOverflowOptions }),
      sizeMiddleware({
        ...detectOverflowOptions,
        apply: ({ elements, rects, availableWidth, availableHeight }) => {
          const { width: anchorWidth, height: anchorHeight } = rects.reference;
          const contentStyle = elements.floating.style;
          contentStyle.setProperty('--aura-ui-popper-available-width', `${availableWidth}px`);
          contentStyle.setProperty('--aura-ui-popper-available-height', `${availableHeight}px`);
          contentStyle.setProperty('--aura-ui-popper-anchor-width', `${anchorWidth}px`);
          contentStyle.setProperty('--aura-ui-popper-anchor-height', `${anchorHeight}px`);
        },
      }),
      arrow && arrowMiddleware({ element: arrow, padding: arrowPadding }),
      transformOrigin({ arrowWidth, arrowHeight }),
      hideWhenDetached && hideMiddleware({ strategy: 'referenceHidden' }),
    ].filter(Boolean) as Middleware[];

    const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
      strategy,
      placement: desiredPlacement,
      whileElementsMounted: (...args) =>
        autoUpdate(...args, {
          animationFrame: updatePositionStrategy === 'always',
        }),
      elements: { reference: ctx.anchor },
      middleware,
    });

    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);

    const handlePlaced = useCallbackRef(onPlaced);
    React.useLayoutEffect(() => {
      if (isPositioned) handlePlaced();
    }, [isPositioned, handlePlaced]);

    const arrowX = middlewareData.arrow?.x;
    const arrowY = middlewareData.arrow?.y;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const [contentZIndex, setContentZIndex] = React.useState<string>();
    React.useLayoutEffect(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);

    return (
      <div
        ref={refs.setFloating}
        data-aura-ui-popper-content-wrapper=""
        style={{
          ...floatingStyles,
          transform: isPositioned ? floatingStyles.transform : 'translate(0, -200%)',
          minWidth: 'max-content',
          zIndex: contentZIndex,
          ['--aura-ui-popper-transform-origin' as string]:
            [
              middlewareData.transformOrigin?.x,
              middlewareData.transformOrigin?.y,
            ].join(' ') || undefined,
          ...(middlewareData.hide?.referenceHidden && { visibility: 'hidden', pointerEvents: 'none' }),
        }}
        dir={dir}
      >
        <PopperContentProvider
          placedSide={placedSide}
          placedAlign={placedAlign}
          arrowX={arrowX}
          arrowY={arrowY}
          shouldHideArrow={cannotCenterArrow}
          onArrowChange={setArrow}
        >
          <Primitive.div
            data-side={placedSide}
            data-align={placedAlign}
            {...contentProps}
            ref={composedRefs}
            style={{ ...contentProps.style, animation: !isPositioned ? 'none' : undefined }}
          />
        </PopperContentProvider>
      </div>
    );
  },
);
PopperContent.displayName = 'PopperContent';

/* ── Popper.Arrow ────────────────────────────────────────────────────── */

const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

const PopperArrow = React.forwardRef<SVGSVGElement, ArrowProps>((props, forwardedRef) => {
  const { ...arrowProps } = props;
  const contentContext = useContentContext('PopperArrow');
  const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
  return (
    <span
      ref={contentContext.onArrowChange}
      style={{
        position: 'absolute',
        left: contentContext.arrowX,
        top: contentContext.arrowY,
        [baseSide]: 0,
        transformOrigin: {
          top: '',
          right: '0 0',
          bottom: 'center 0',
          left: '100% 0',
        }[contentContext.placedSide],
        transform: {
          top: 'translateY(100%)',
          right: 'translateY(50%) rotate(90deg) translateX(-50%)',
          bottom: 'rotate(180deg)',
          left: 'translateY(50%) rotate(-90deg) translateX(50%)',
        }[contentContext.placedSide],
        visibility: contentContext.shouldHideArrow ? 'hidden' : undefined,
      }}
    >
      <ArrowPrimitive {...arrowProps} ref={forwardedRef} style={{ ...arrowProps.style, display: 'block' }} />
    </span>
  );
});
PopperArrow.displayName = 'PopperArrow';

/* ── helpers ─────────────────────────────────────────────────────────── */

function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof Element;
}

function getSideAndAlignFromPlacement(placement: Placement): [Side, Align] {
  const [side, align = 'center'] = placement.split('-');
  return [side as Side, align as Align];
}

function transformOrigin(options: { arrowWidth: number; arrowHeight: number }): Middleware {
  return {
    name: 'transformOrigin',
    options,
    fn(data) {
      const { placement, rects, middlewareData } = data;
      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = { start: '0%', center: '50%', end: '100%' }[placedAlign];
      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
      let x = '';
      let y = '';
      if (placedSide === 'bottom') {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === 'top') {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === 'right') {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === 'left') {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }
      return { data: { x, y } };
    },
  };
}

function useSize(element: HTMLElement | null) {
  const [size, setSize] = React.useState<{ width: number; height: number } | undefined>(undefined);
  React.useLayoutEffect(() => {
    if (!element) {
      setSize(undefined);
      return;
    }
    setSize({ width: element.offsetWidth, height: element.offsetHeight });
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const borderBox = entry.borderBoxSize?.[0];
      const w = borderBox ? borderBox.inlineSize : entry.contentRect.width;
      const h = borderBox ? borderBox.blockSize : entry.contentRect.height;
      setSize({ width: w, height: h });
    });
    observer.observe(element, { box: 'border-box' });
    return () => observer.disconnect();
  }, [element]);
  return size;
}

export {
  Popper as Root,
  PopperAnchor as Anchor,
  PopperContent as Content,
  PopperArrow as Arrow,
};
export type { PopperContentProps, PopperAnchorProps, Side, Align };
