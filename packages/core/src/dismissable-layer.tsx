'use client';

import * as React from 'react';
import { useComposedRefs, useCallbackRef, composeEventHandlers } from './_internal';
import { Primitive } from './primitive';

const CONTEXT_UPDATE = 'dismissableLayer.update';
const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside';
const FOCUS_OUTSIDE = 'dismissableLayer.focusOutside';

let originalBodyPointerEvents: string;

interface DismissableLayerContextValue {
  layers: Set<HTMLElement>;
  layersWithOutsidePointerEventsDisabled: Set<HTMLElement>;
  branches: Set<HTMLElement>;
}

const DismissableLayerContext = React.createContext<DismissableLayerContextValue>({
  layers: new Set(),
  layersWithOutsidePointerEventsDisabled: new Set(),
  branches: new Set(),
});

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;
type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

interface DismissableLayerProps extends React.ComponentPropsWithoutRef<typeof Primitive.div> {
  /** When true, hovering outside the layer disables pointer events on outside elements. */
  disableOutsidePointerEvents?: boolean;
  /** Called when Escape is pressed. Call `event.preventDefault()` to cancel dismissal. */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /** Called on pointerdown outside the layer. */
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  /** Called when focus moves outside the layer. */
  onFocusOutside?: (event: FocusOutsideEvent) => void;
  /** Called on any interaction (pointer or focus) outside the layer. */
  onInteractOutside?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void;
  /** Called when the layer should dismiss. */
  onDismiss?: () => void;
}

const DismissableLayer = React.forwardRef<HTMLDivElement, DismissableLayerProps>(
  (props, forwardedRef) => {
    const {
      disableOutsidePointerEvents = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...layerProps
    } = props;

    const context = React.useContext(DismissableLayerContext);
    const [node, setNode] = React.useState<HTMLDivElement | null>(null);
    const ownerDocument = node?.ownerDocument ?? (typeof document !== 'undefined' ? document : null);
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled
      ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled)
      : -1;
    const index = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;

    const pointerDownOutside = usePointerDownOutside((event) => {
      const target = event.target as HTMLElement;
      const isPointerDownOnBranch = [...context.branches].some((branch) =>
        branch.contains(target),
      );
      if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
      onPointerDownOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);

    const focusOutside = useFocusOutside((event) => {
      const target = event.target as HTMLElement;
      const isFocusOnBranch = [...context.branches].some((branch) =>
        branch.contains(target),
      );
      if (isFocusOnBranch) return;
      onFocusOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);

    useEscapeKeydown((event) => {
      const isHighest = index === context.layers.size - 1;
      if (!isHighest) return;
      onEscapeKeyDown?.(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    }, ownerDocument);

    React.useEffect(() => {
      if (!node) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0 && ownerDocument) {
          originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = 'none';
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate();
      return () => {
        if (
          disableOutsidePointerEvents &&
          context.layersWithOutsidePointerEventsDisabled.size === 1 &&
          ownerDocument
        ) {
          ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
        }
      };
    }, [node, ownerDocument, disableOutsidePointerEvents, context]);

    React.useEffect(() => {
      return () => {
        if (!node) return;
        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate();
      };
    }, [node, context]);

    const composedRefs = useComposedRefs(forwardedRef, setNode);

    return (
      <Primitive.div
        {...layerProps}
        ref={composedRefs}
        style={{
          pointerEvents: isBodyPointerEventsDisabled
            ? isPointerEventsEnabled
              ? 'auto'
              : 'none'
            : undefined,
          ...layerProps.style,
        }}
        onFocusCapture={composeEventHandlers(layerProps.onFocusCapture, focusOutside.onFocusCapture)}
        onBlurCapture={composeEventHandlers(layerProps.onBlurCapture, focusOutside.onBlurCapture)}
        onPointerDownCapture={composeEventHandlers(
          layerProps.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture,
        )}
      />
    );
  },
);
DismissableLayer.displayName = 'DismissableLayer';

/* ── Branch (lets nested portaled content be treated as "inside") ───── */

interface DismissableLayerBranchProps extends React.ComponentPropsWithoutRef<typeof Primitive.div> {}

const DismissableLayerBranch = React.forwardRef<HTMLDivElement, DismissableLayerBranchProps>(
  (props, forwardedRef) => {
    const context = React.useContext(DismissableLayerContext);
    const ref = React.useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);

    React.useEffect(() => {
      const node = ref.current;
      if (!node) return;
      context.branches.add(node);
      return () => {
        context.branches.delete(node);
      };
    }, [context]);

    return <Primitive.div {...props} ref={composedRefs} />;
  },
);
DismissableLayerBranch.displayName = 'DismissableLayerBranch';

/* ── helpers ─────────────────────────────────────────────────────────── */

function dispatchUpdate() {
  if (typeof document === 'undefined') return;
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}

function usePointerDownOutside(
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void,
  ownerDocument: Document | null = typeof document !== 'undefined' ? document : null,
) {
  const handler = useCallbackRef(onPointerDownOutside);
  const isPointerInsideReactTreeRef = React.useRef(false);
  const handleClickRef = React.useRef(() => {});

  React.useEffect(() => {
    if (!ownerDocument) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        const handleAndDispatchPointerDownOutsideEvent = () => {
          const customEvent = new CustomEvent(POINTER_DOWN_OUTSIDE, {
            bubbles: false,
            cancelable: true,
            detail: eventDetail,
          }) as PointerDownOutsideEvent;
          const targetEl = event.target as HTMLElement;
          targetEl.addEventListener(POINTER_DOWN_OUTSIDE, handler as EventListener, { once: true });
          targetEl.dispatchEvent(customEvent);
        };

        if (event.pointerType === 'touch') {
          ownerDocument.removeEventListener('click', handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent;
          ownerDocument.addEventListener('click', handleClickRef.current, { once: true });
        } else {
          handleAndDispatchPointerDownOutsideEvent();
        }
      } else {
        ownerDocument.removeEventListener('click', handleClickRef.current);
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener('pointerdown', handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener('pointerdown', handlePointerDown);
      ownerDocument.removeEventListener('click', handleClickRef.current);
    };
  }, [ownerDocument, handler]);

  return {
    onPointerDownCapture: () => {
      isPointerInsideReactTreeRef.current = true;
    },
  };
}

function useFocusOutside(
  onFocusOutside?: (event: FocusOutsideEvent) => void,
  ownerDocument: Document | null = typeof document !== 'undefined' ? document : null,
) {
  const handler = useCallbackRef(onFocusOutside);
  const isFocusInsideReactTreeRef = React.useRef(false);

  React.useEffect(() => {
    if (!ownerDocument) return;
    const handleFocus = (event: FocusEvent) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        const customEvent = new CustomEvent(FOCUS_OUTSIDE, {
          bubbles: false,
          cancelable: true,
          detail: eventDetail,
        }) as FocusOutsideEvent;
        const targetEl = event.target as HTMLElement;
        targetEl.addEventListener(FOCUS_OUTSIDE, handler as EventListener, { once: true });
        targetEl.dispatchEvent(customEvent);
      }
    };
    ownerDocument.addEventListener('focusin', handleFocus);
    return () => ownerDocument.removeEventListener('focusin', handleFocus);
  }, [ownerDocument, handler]);

  return {
    onFocusCapture: () => {
      isFocusInsideReactTreeRef.current = true;
    },
    onBlurCapture: () => {
      isFocusInsideReactTreeRef.current = false;
    },
  };
}

function useEscapeKeydown(
  onEscapeKeyDown?: (event: KeyboardEvent) => void,
  ownerDocument: Document | null = typeof document !== 'undefined' ? document : null,
) {
  const handler = useCallbackRef(onEscapeKeyDown);
  React.useEffect(() => {
    if (!ownerDocument) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler(event);
    };
    ownerDocument.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [handler, ownerDocument]);
}

export { DismissableLayer, DismissableLayerBranch };
export type {
  DismissableLayerProps,
  DismissableLayerBranchProps,
  PointerDownOutsideEvent,
  FocusOutsideEvent,
};
