'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  Portal as PortalPrimitive,
  Presence,
  DismissableLayer,
  Popper,
} from '@structyl/core';
import { useControllableState } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';
import type {
  HoverCardRootProps,
  HoverCardTriggerProps,
  HoverCardPortalProps,
  HoverCardContentProps,
  HoverCardArrowProps,
} from './hover-card.types';

const DEFAULT_OPEN_DELAY = 700;
const DEFAULT_CLOSE_DELAY = 300;

interface HoverCardContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  onDismiss: () => void;
  hasSelectionRef: React.RefObject<boolean>;
  isPointerDownOnContentRef: React.RefObject<boolean>;
}

const [HoverCardProvider, useHoverCardContext] = createContext<HoverCardContextValue>('HoverCard');

const Root: React.FC<HoverCardRootProps> = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  openDelay = DEFAULT_OPEN_DELAY,
  closeDelay = DEFAULT_CLOSE_DELAY,
  children,
}) => {
  const openTimerRef = React.useRef(0);
  const closeTimerRef = React.useRef(0);
  const hasSelectionRef = React.useRef(false);
  const isPointerDownOnContentRef = React.useRef(false);
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const handleOpen = React.useCallback(() => {
    window.clearTimeout(closeTimerRef.current);
    openTimerRef.current = window.setTimeout(() => setOpen(true), openDelay);
  }, [openDelay, setOpen]);

  const handleClose = React.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    if (!hasSelectionRef.current && !isPointerDownOnContentRef.current) {
      closeTimerRef.current = window.setTimeout(() => setOpen(false), closeDelay);
    }
  }, [closeDelay, setOpen]);

  const handleDismiss = React.useCallback(() => setOpen(false), [setOpen]);

  React.useEffect(() => {
    return () => {
      window.clearTimeout(openTimerRef.current);
      window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <Popper.Root>
      <HoverCardProvider
        open={open}
        onOpenChange={setOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        onDismiss={handleDismiss}
        hasSelectionRef={hasSelectionRef}
        isPointerDownOnContentRef={isPointerDownOnContentRef}
      >
        {children}
      </HoverCardProvider>
    </Popper.Root>
  );
};
Root.displayName = 'HoverCard.Root';

const Trigger = React.forwardRef<HTMLAnchorElement, HoverCardTriggerProps>(
  (props, forwardedRef) => {
    const ctx = useHoverCardContext('HoverCard.Trigger');
    return (
      <Popper.Anchor asChild>
        <Primitive.a
          data-state={ctx.open ? 'open' : 'closed'}
          {...props}
          ref={forwardedRef}
          onPointerEnter={composeEventHandlers(props.onPointerEnter, (event) => {
            if (event.pointerType === 'touch') return;
            ctx.onOpen();
          })}
          onPointerLeave={composeEventHandlers(props.onPointerLeave, (event) => {
            if (event.pointerType === 'touch') return;
            ctx.onClose();
          })}
          onFocus={composeEventHandlers(props.onFocus, ctx.onOpen)}
          onBlur={composeEventHandlers(props.onBlur, ctx.onClose)}
          onTouchStart={composeEventHandlers(props.onTouchStart, (event) => event.preventDefault())}
        />
      </Popper.Anchor>
    );
  },
);
Trigger.displayName = 'HoverCard.Trigger';

const PortalContext = React.createContext<{ forceMount?: boolean }>({});

const Portal: React.FC<HoverCardPortalProps> = ({ children, container, forceMount }) => {
  const ctx = useHoverCardContext('HoverCard.Portal');
  return (
    <PortalContext.Provider value={{ forceMount }}>
      <Presence present={forceMount || ctx.open}>
        <PortalPrimitive container={container ?? undefined}>{children}</PortalPrimitive>
      </Presence>
    </PortalContext.Provider>
  );
};
Portal.displayName = 'HoverCard.Portal';

const Content = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  (props, forwardedRef) => {
    const portalCtx = React.useContext(PortalContext);
    const ctx = useHoverCardContext('HoverCard.Content');
    const {
      forceMount = portalCtx.forceMount,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionPadding,
      children,
      ...rest
    } = props;

    return (
      <Presence present={forceMount || ctx.open}>
        <Popper.Content
          data-state={ctx.open ? 'open' : 'closed'}
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
            onEscapeKeyDown={() => ctx.onDismiss()}
            onPointerDownOutside={() => ctx.onDismiss()}
            onFocusOutside={(event) => event.preventDefault()}
            onDismiss={ctx.onDismiss}
          >
            <Primitive.div
              {...rest}
              ref={forwardedRef}
              onPointerEnter={composeEventHandlers(rest.onPointerEnter, (event) => {
                if (event.pointerType === 'touch') return;
                ctx.onOpen();
              })}
              onPointerLeave={composeEventHandlers(rest.onPointerLeave, (event) => {
                if (event.pointerType === 'touch') return;
                ctx.onClose();
              })}
            >
              {children}
            </Primitive.div>
          </DismissableLayer>
        </Popper.Content>
      </Presence>
    );
  },
);
Content.displayName = 'HoverCard.Content';

const Arrow = React.forwardRef<SVGSVGElement, HoverCardArrowProps>((props, forwardedRef) => (
  <Popper.Arrow {...props} ref={forwardedRef} />
));
Arrow.displayName = 'HoverCard.Arrow';

export { Root, Trigger, Portal, Content, Arrow };
