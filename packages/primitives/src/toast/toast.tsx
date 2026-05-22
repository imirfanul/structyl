'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createContext,
  Primitive,
  Portal as PortalPrimitive,
  Presence,
  DismissableLayer,
  VisuallyHidden,
} from '@aura-ui/core';
import { useControllableState, useComposedRefs } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';
import type {
  ToastProviderProps,
  ToastViewportProps,
  ToastRootProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
  SwipeDirection,
} from './toast.types';

const DEFAULT_DURATION = 5000;
const DEFAULT_SWIPE_THRESHOLD = 50;
const VIEWPORT_NAME = 'ToastViewport';

/* ─── Provider ───────────────────────────────────────────────────────── */

interface ToastProviderContextValue {
  label: string;
  duration: number;
  swipeDirection: SwipeDirection;
  swipeThreshold: number;
  toastCount: number;
  viewport: HTMLOListElement | null;
  onViewportChange: (viewport: HTMLOListElement | null) => void;
  onToastAdd: () => void;
  onToastRemove: () => void;
  isFocusedToastEscapeKeyDownRef: React.RefObject<boolean>;
  isClosePausedRef: React.RefObject<boolean>;
}

const [ToastProviderContextProvider, useToastProviderContext] =
  createContext<ToastProviderContextValue>('ToastProvider');

const Provider: React.FC<ToastProviderProps> = ({
  children,
  label = 'Notifications',
  duration = DEFAULT_DURATION,
  swipeDirection = 'right',
  swipeThreshold = DEFAULT_SWIPE_THRESHOLD,
}) => {
  const [viewport, setViewport] = React.useState<HTMLOListElement | null>(null);
  const [toastCount, setToastCount] = React.useState(0);
  const isFocusedToastEscapeKeyDownRef = React.useRef(false);
  const isClosePausedRef = React.useRef(false);
  return (
    <ToastProviderContextProvider
      label={label}
      duration={duration}
      swipeDirection={swipeDirection}
      swipeThreshold={swipeThreshold}
      toastCount={toastCount}
      viewport={viewport}
      onViewportChange={setViewport}
      onToastAdd={React.useCallback(() => setToastCount((c) => c + 1), [])}
      onToastRemove={React.useCallback(() => setToastCount((c) => c - 1), [])}
      isFocusedToastEscapeKeyDownRef={isFocusedToastEscapeKeyDownRef}
      isClosePausedRef={isClosePausedRef}
    >
      {children}
    </ToastProviderContextProvider>
  );
};
Provider.displayName = 'Toast.Provider';

/* ─── Viewport ───────────────────────────────────────────────────────── */

const Viewport = React.forwardRef<HTMLOListElement, ToastViewportProps>(
  (props, forwardedRef) => {
    const { hotkey = ['F8'], label = '{hotkey} hotkey to focus toasts', ...viewportProps } = props;
    const ctx = useToastProviderContext(VIEWPORT_NAME);
    const ref = React.useRef<HTMLOListElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, ctx.onViewportChange);
    const hotkeyLabel = hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');
    const hasToasts = ctx.toastCount > 0;

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        const isHotkeyPressed = hotkey.every((k) =>
          (event as unknown as Record<string, boolean>)[k] || event.code === k,
        );
        if (isHotkeyPressed) ref.current?.focus();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [hotkey]);

    return (
      <DismissableLayer
        asChild
        onFocusOutside={(event) => event.preventDefault()}
        onDismiss={() => {}}
      >
        <Primitive.ol
          tabIndex={-1}
          aria-label={label.replace('{hotkey}', hotkeyLabel)}
          {...viewportProps}
          ref={composedRefs}
          // Hide when empty so it doesn't obstruct clicks
          style={{
            pointerEvents: hasToasts ? undefined : 'none',
            ...viewportProps.style,
          }}
        />
      </DismissableLayer>
    );
  },
);
Viewport.displayName = VIEWPORT_NAME;

/* ─── Root ─────────────────────────────────────────────────────────── */

interface ToastContextValue {
  onClose: () => void;
}

const [ToastContextProvider, useToastContext] = createContext<ToastContextValue>('Toast');

const Root = React.forwardRef<HTMLLIElement, ToastRootProps>((props, forwardedRef) => {
  const {
    type = 'foreground',
    duration: durationProp,
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    forceMount,
    onEscapeKeyDown,
    onPause,
    onResume,
    onSwipeStart,
    onSwipeMove,
    onSwipeEnd,
    onSwipeCancel,
    ...rest
  } = props;

  const ctx = useToastProviderContext('Toast.Root');
  const duration = durationProp ?? ctx.duration;
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const closeTimerStartTimeRef = React.useRef(0);
  const closeTimerRemainingTimeRef = React.useRef(duration);
  const closeTimerRef = React.useRef(0);

  const handleClose = React.useCallback(() => setOpen(false), [setOpen]);

  const startTimer = React.useCallback(
    (remaining: number) => {
      if (!remaining || remaining === Infinity) return;
      window.clearTimeout(closeTimerRef.current);
      closeTimerStartTimeRef.current = new Date().getTime();
      closeTimerRef.current = window.setTimeout(handleClose, remaining);
    },
    [handleClose],
  );

  React.useEffect(() => {
    const viewport = ctx.viewport;
    if (!viewport) return;
    const handlePause = () => {
      const elapsed = new Date().getTime() - closeTimerStartTimeRef.current;
      closeTimerRemainingTimeRef.current -= elapsed;
      window.clearTimeout(closeTimerRef.current);
      onPause?.();
    };
    const handleResume = () => {
      startTimer(closeTimerRemainingTimeRef.current);
      onResume?.();
    };
    viewport.addEventListener('pointerenter', handlePause);
    viewport.addEventListener('pointerleave', handleResume);
    viewport.addEventListener('focusin', handlePause);
    viewport.addEventListener('focusout', handleResume);
    return () => {
      viewport.removeEventListener('pointerenter', handlePause);
      viewport.removeEventListener('pointerleave', handleResume);
      viewport.removeEventListener('focusin', handlePause);
      viewport.removeEventListener('focusout', handleResume);
    };
  }, [ctx.viewport, onPause, onResume, startTimer]);

  React.useEffect(() => {
    if (open && !ctx.isClosePausedRef.current) {
      closeTimerRemainingTimeRef.current = duration;
      startTimer(duration);
    }
    return () => window.clearTimeout(closeTimerRef.current);
  }, [open, duration, ctx.isClosePausedRef, startTimer]);

  const { onToastAdd, onToastRemove } = ctx;
  React.useEffect(() => {
    onToastAdd();
    return () => onToastRemove();
  }, [onToastAdd, onToastRemove]);

  const swipeStartPointRef = React.useRef<{ x: number; y: number } | null>(null);
  const swipeDeltaRef = React.useRef<{ x: number; y: number } | null>(null);

  const toast = (
    <Primitive.li
      aria-live={type === 'foreground' ? 'assertive' : 'polite'}
      aria-atomic
      data-state={open ? 'open' : 'closed'}
      data-swipe-direction={ctx.swipeDirection}
      tabIndex={0}
      {...rest}
      ref={forwardedRef}
      style={{
        userSelect: 'none',
        touchAction: 'none',
        ...rest.style,
      }}
      onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
        if (event.key !== 'Escape') return;
        onEscapeKeyDown?.(event.nativeEvent);
        if (!event.nativeEvent.defaultPrevented) {
          ctx.isFocusedToastEscapeKeyDownRef.current = true;
          handleClose();
        }
      })}
      onPointerDown={composeEventHandlers(rest.onPointerDown, (event) => {
        if (event.button !== 0) return;
        swipeStartPointRef.current = { x: event.clientX, y: event.clientY };
      })}
      onPointerMove={composeEventHandlers(rest.onPointerMove, (event) => {
        if (!swipeStartPointRef.current) return;
        const x = event.clientX - swipeStartPointRef.current.x;
        const y = event.clientY - swipeStartPointRef.current.y;
        const hasMoved = swipeDeltaRef.current !== null;
        const isHorizontal =
          ctx.swipeDirection === 'left' || ctx.swipeDirection === 'right';
        const clampedX = ['left', 'up'].includes(ctx.swipeDirection)
          ? Math.min(0, x)
          : Math.max(0, x);
        const clampedY = ['up', 'left'].includes(ctx.swipeDirection)
          ? Math.min(0, y)
          : Math.max(0, y);
        const moveStarted = Math.abs(isHorizontal ? clampedX : clampedY) > 10;
        const target = event.currentTarget as HTMLElement;
        if (hasMoved || moveStarted) {
          swipeDeltaRef.current = { x: clampedX, y: clampedY };
          const move = isHorizontal ? clampedX : clampedY;
          target.setAttribute('data-swipe', 'move');
          target.style.setProperty(
            '--aura-ui-toast-swipe-move-x',
            `${clampedX}px`,
          );
          target.style.setProperty(
            '--aura-ui-toast-swipe-move-y',
            `${clampedY}px`,
          );
          if (!hasMoved) onSwipeStart?.(event);
          onSwipeMove?.(event);
          if (Math.abs(move) > ctx.swipeThreshold) {
            target.setAttribute('data-swipe', 'end');
            target.style.setProperty(
              '--aura-ui-toast-swipe-end-x',
              `${clampedX}px`,
            );
            target.style.setProperty(
              '--aura-ui-toast-swipe-end-y',
              `${clampedY}px`,
            );
            onSwipeEnd?.(event);
            handleClose();
            swipeStartPointRef.current = null;
            swipeDeltaRef.current = null;
          }
        }
      })}
      onPointerUp={composeEventHandlers(rest.onPointerUp, (event) => {
        const target = event.currentTarget as HTMLElement;
        if (swipeDeltaRef.current) {
          target.setAttribute('data-swipe', 'cancel');
          target.style.removeProperty('--aura-ui-toast-swipe-move-x');
          target.style.removeProperty('--aura-ui-toast-swipe-move-y');
          onSwipeCancel?.(event);
        }
        swipeStartPointRef.current = null;
        swipeDeltaRef.current = null;
      })}
    />
  );

  const content = <Presence present={forceMount || open}>{toast}</Presence>;

  return (
    <ToastContextProvider onClose={handleClose}>
      {ctx.viewport ? ReactDOM.createPortal(content, ctx.viewport) : content}
    </ToastContextProvider>
  );
});
Root.displayName = 'Toast.Root';

/* ─── Title / Description / Action / Close ───────────────────────────── */

const Title = React.forwardRef<HTMLDivElement, ToastTitleProps>((props, forwardedRef) => (
  <Primitive.div {...props} ref={forwardedRef} />
));
Title.displayName = 'Toast.Title';

const Description = React.forwardRef<HTMLDivElement, ToastDescriptionProps>(
  (props, forwardedRef) => <Primitive.div {...props} ref={forwardedRef} />,
);
Description.displayName = 'Toast.Description';

const Action = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  (props, forwardedRef) => {
    const { altText, children, ...rest } = props;
    const ctx = useToastContext('Toast.Action');
    return (
      <>
        <Primitive.button
          type="button"
          {...rest}
          ref={forwardedRef}
          onClick={composeEventHandlers(rest.onClick, ctx.onClose)}
        >
          {children}
        </Primitive.button>
        <VisuallyHidden>{altText}</VisuallyHidden>
      </>
    );
  },
);
Action.displayName = 'Toast.Action';

const Close = React.forwardRef<HTMLButtonElement, ToastCloseProps>((props, forwardedRef) => {
  const ctx = useToastContext('Toast.Close');
  return (
    <Primitive.button
      type="button"
      {...props}
      ref={forwardedRef}
      onClick={composeEventHandlers(props.onClick, ctx.onClose)}
    />
  );
});
Close.displayName = 'Toast.Close';

/* ─── Portal helper ──────────────────────────────────────────────────── */

const Portal: React.FC<{
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
}> = ({ children, container }) => (
  <PortalPrimitive container={container ?? undefined}>{children}</PortalPrimitive>
);
Portal.displayName = 'Toast.Portal';

export { Provider, Viewport, Root, Title, Description, Action, Close, Portal };
