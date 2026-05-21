'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  Portal as PortalPrimitive,
  Presence,
  DismissableLayer,
  Popper,
  VisuallyHidden,
} from '@your-lib/core';
import { useControllableState, useId, useComposedRefs } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';
import type {
  TooltipProviderProps,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipPortalProps,
  TooltipContentProps,
  TooltipArrowProps,
} from './tooltip.types';

const DEFAULT_DELAY_DURATION = 700;
const DEFAULT_SKIP_DELAY_DURATION = 300;
const TOOLTIP_OPEN = 'tooltip.open';

/* ─── Provider (shared timing) ───────────────────────────────────────── */

interface TooltipProviderContextValue {
  isOpenDelayed: boolean;
  delayDuration: number;
  onOpen: () => void;
  onClose: () => void;
  onPointerInTransitChange: (inTransit: boolean) => void;
  isPointerInTransitRef: React.RefObject<boolean>;
  disableHoverableContent: boolean;
}

const [TooltipProviderContextProvider, useTooltipProviderContext] =
  createContext<TooltipProviderContextValue>('TooltipProvider', {
    isOpenDelayed: true,
    delayDuration: DEFAULT_DELAY_DURATION,
    onOpen: () => {},
    onClose: () => {},
    onPointerInTransitChange: () => {},
    isPointerInTransitRef: { current: false },
    disableHoverableContent: false,
  });

const Provider: React.FC<TooltipProviderProps> = ({
  children,
  delayDuration = DEFAULT_DELAY_DURATION,
  skipDelayDuration = DEFAULT_SKIP_DELAY_DURATION,
  disableHoverableContent = false,
}) => {
  const [isOpenDelayed, setIsOpenDelayed] = React.useState(true);
  const isPointerInTransitRef = React.useRef(false);
  const skipDelayTimerRef = React.useRef<number>(0);

  React.useEffect(() => {
    const t = skipDelayTimerRef.current;
    return () => window.clearTimeout(t);
  }, []);

  return (
    <TooltipProviderContextProvider
      isOpenDelayed={isOpenDelayed}
      delayDuration={delayDuration}
      onOpen={React.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        setIsOpenDelayed(false);
      }, [])}
      onClose={React.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        skipDelayTimerRef.current = window.setTimeout(
          () => setIsOpenDelayed(true),
          skipDelayDuration,
        );
      }, [skipDelayDuration])}
      onPointerInTransitChange={React.useCallback((inTransit: boolean) => {
        isPointerInTransitRef.current = inTransit;
      }, [])}
      isPointerInTransitRef={isPointerInTransitRef}
      disableHoverableContent={disableHoverableContent}
    >
      {children}
    </TooltipProviderContextProvider>
  );
};
Provider.displayName = 'Tooltip.Provider';

/* ─── Root ─────────────────────────────────────────────────────────── */

interface TooltipContextValue {
  contentId: string;
  open: boolean;
  stateAttribute: 'closed' | 'delayed-open' | 'instant-open';
  trigger: HTMLButtonElement | null;
  onTriggerChange: (trigger: HTMLButtonElement | null) => void;
  onTriggerEnter: () => void;
  onTriggerLeave: () => void;
  onOpen: () => void;
  onClose: () => void;
  disableHoverableContent: boolean;
}

const [TooltipContextProvider, useTooltipContext] = createContext<TooltipContextValue>('Tooltip');

const Root: React.FC<TooltipRootProps> = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  delayDuration,
  disableHoverableContent: disableHoverableContentProp,
  children,
}) => {
  const providerContext = useTooltipProviderContext('Tooltip.Root');
  const disableHoverableContent =
    disableHoverableContentProp ?? providerContext.disableHoverableContent;
  const _delayDuration = delayDuration ?? providerContext.delayDuration;
  const [trigger, setTrigger] = React.useState<HTMLButtonElement | null>(null);
  const contentId = useId('tooltip-content');
  const openTimerRef = React.useRef(0);
  const wasOpenDelayedRef = React.useRef(false);
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: (isOpen) => {
      if (isOpen) {
        providerContext.onOpen();
        document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
      } else {
        providerContext.onClose();
      }
      onOpenChange?.(isOpen);
    },
  });

  const stateAttribute = React.useMemo(() => {
    return open
      ? wasOpenDelayedRef.current
        ? 'delayed-open'
        : 'instant-open'
      : 'closed';
  }, [open]);

  const handleOpen = React.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    wasOpenDelayedRef.current = false;
    setOpen(true);
  }, [setOpen]);

  const handleClose = React.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    setOpen(false);
  }, [setOpen]);

  const handleDelayedOpen = React.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => {
      wasOpenDelayedRef.current = true;
      setOpen(true);
      openTimerRef.current = 0;
    }, _delayDuration);
  }, [_delayDuration, setOpen]);

  React.useEffect(() => () => window.clearTimeout(openTimerRef.current), []);

  return (
    <Popper.Root>
      <TooltipContextProvider
        contentId={contentId}
        open={open}
        stateAttribute={stateAttribute}
        trigger={trigger}
        onTriggerChange={setTrigger}
        onTriggerEnter={React.useCallback(() => {
          if (providerContext.isOpenDelayed) handleDelayedOpen();
          else handleOpen();
        }, [providerContext.isOpenDelayed, handleDelayedOpen, handleOpen])}
        onTriggerLeave={React.useCallback(() => {
          if (disableHoverableContent) handleClose();
          else {
            window.clearTimeout(openTimerRef.current);
            openTimerRef.current = 0;
          }
        }, [disableHoverableContent, handleClose])}
        onOpen={handleOpen}
        onClose={handleClose}
        disableHoverableContent={disableHoverableContent}
      >
        {children}
      </TooltipContextProvider>
    </Popper.Root>
  );
};
Root.displayName = 'Tooltip.Root';

/* ─── Trigger ──────────────────────────────────────────────────────── */

const Trigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  (props, forwardedRef) => {
    const ctx = useTooltipContext('Tooltip.Trigger');
    const providerCtx = useTooltipProviderContext('Tooltip.Trigger');
    const composedRefs = useComposedRefs(forwardedRef, ctx.onTriggerChange);
    const isPointerDownRef = React.useRef(false);

    const handlePointerUp = React.useCallback(() => {
      isPointerDownRef.current = false;
    }, []);

    React.useEffect(() => {
      return () => document.removeEventListener('pointerup', handlePointerUp);
    }, [handlePointerUp]);

    return (
      <Popper.Anchor asChild>
        <Primitive.button
          type="button"
          aria-describedby={ctx.open ? ctx.contentId : undefined}
          data-state={ctx.stateAttribute}
          {...props}
          ref={composedRefs}
          onPointerMove={composeEventHandlers(props.onPointerMove, (event) => {
            if (event.pointerType === 'touch') return;
            if (!isPointerDownRef.current && !providerCtx.isPointerInTransitRef.current) {
              ctx.onTriggerEnter();
            }
          })}
          onPointerLeave={composeEventHandlers(props.onPointerLeave, () => ctx.onTriggerLeave())}
          onPointerDown={composeEventHandlers(props.onPointerDown, () => {
            isPointerDownRef.current = true;
            document.addEventListener('pointerup', handlePointerUp, { once: true });
          })}
          onFocus={composeEventHandlers(props.onFocus, () => {
            if (!isPointerDownRef.current) ctx.onOpen();
          })}
          onBlur={composeEventHandlers(props.onBlur, ctx.onClose)}
          onClick={composeEventHandlers(props.onClick, ctx.onClose)}
        />
      </Popper.Anchor>
    );
  },
);
Trigger.displayName = 'Tooltip.Trigger';

/* ─── Portal ───────────────────────────────────────────────────────── */

const PortalContext = React.createContext<{ forceMount?: boolean }>({});

const Portal: React.FC<TooltipPortalProps> = ({ children, container, forceMount }) => {
  const ctx = useTooltipContext('Tooltip.Portal');
  return (
    <PortalContext.Provider value={{ forceMount }}>
      <Presence present={forceMount || ctx.open}>
        <PortalPrimitive container={container ?? undefined}>{children}</PortalPrimitive>
      </Presence>
    </PortalContext.Provider>
  );
};
Portal.displayName = 'Tooltip.Portal';

/* ─── Content ──────────────────────────────────────────────────────── */

const Content = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  (props, forwardedRef) => {
    const portalCtx = React.useContext(PortalContext);
    const ctx = useTooltipContext('Tooltip.Content');
    const {
      forceMount = portalCtx.forceMount,
      side = 'top',
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionPadding,
      onEscapeKeyDown,
      onPointerDownOutside,
      children,
      ...rest
    } = props;

    return (
      <Presence present={forceMount || ctx.open}>
        <Popper.Content
          data-state={ctx.stateAttribute}
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          arrowPadding={arrowPadding}
          avoidCollisions={avoidCollisions}
          collisionPadding={collisionPadding}
        >
          <DismissableLayer
            asChild
            disableOutsidePointerEvents={false}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={(event) => {
              if (ctx.disableHoverableContent) {
                event.preventDefault();
              }
              onPointerDownOutside?.(event.detail.originalEvent);
            }}
            onFocusOutside={(event) => event.preventDefault()}
            onDismiss={() => ctx.onClose()}
          >
            <Primitive.div
              data-state={ctx.stateAttribute}
              role="tooltip"
              id={ctx.contentId}
              {...rest}
              ref={forwardedRef}
              style={{ ...rest.style, pointerEvents: 'auto' }}
            >
              {children}
              <VisuallyHidden>{children}</VisuallyHidden>
            </Primitive.div>
          </DismissableLayer>
        </Popper.Content>
      </Presence>
    );
  },
);
Content.displayName = 'Tooltip.Content';

/* ─── Arrow ────────────────────────────────────────────────────────── */

const Arrow = React.forwardRef<SVGSVGElement, TooltipArrowProps>((props, forwardedRef) => (
  <Popper.Arrow {...props} ref={forwardedRef} />
));
Arrow.displayName = 'Tooltip.Arrow';

export { Provider, Root, Trigger, Portal, Content, Arrow };
