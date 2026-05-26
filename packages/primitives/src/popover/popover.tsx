'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  Portal as PortalPrimitive,
  Presence,
  FocusScope,
  FocusGuards,
  DismissableLayer,
  useScrollLock,
  Popper,
} from '@aura-ui/core';
import { useControllableState, useId, useComposedRefs } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';
import type {
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverAnchorProps,
  PopoverPortalProps,
  PopoverContentProps,
  PopoverCloseProps,
  PopoverArrowProps,
} from './popover.types';

interface PopoverContextValue {
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenToggle: () => void;
  hasCustomAnchor: boolean;
  onCustomAnchorAdd: () => void;
  onCustomAnchorRemove: () => void;
  modal: boolean;
}

const [PopoverProvider, usePopoverContext] = createContext<PopoverContextValue>('Popover');

/* ─── Root ─────────────────────────────────────────────────────────── */

const Root: React.FC<PopoverRootProps> = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  modal = false,
  children,
}) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [hasCustomAnchor, setHasCustomAnchor] = React.useState(false);
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  return (
    <Popper.Root>
      <PopoverProvider
        triggerRef={triggerRef}
        contentId={useId('popover-content')}
        open={open}
        onOpenChange={React.useCallback((v: boolean) => setOpen(v), [setOpen])}
        onOpenToggle={React.useCallback(() => setOpen((p) => !p), [setOpen])}
        hasCustomAnchor={hasCustomAnchor}
        onCustomAnchorAdd={React.useCallback(() => setHasCustomAnchor(true), [])}
        onCustomAnchorRemove={React.useCallback(() => setHasCustomAnchor(false), [])}
        modal={modal}
      >
        {children}
      </PopoverProvider>
    </Popper.Root>
  );
};
Root.displayName = 'Popover.Root';

/* ─── Anchor ──────────────────────────────────────────────────────── */

const Anchor = React.forwardRef<HTMLDivElement, PopoverAnchorProps>((props, forwardedRef) => {
  const ctx = usePopoverContext('Popover.Anchor');
  const { onCustomAnchorAdd, onCustomAnchorRemove } = ctx;
  React.useEffect(() => {
    onCustomAnchorAdd();
    return () => onCustomAnchorRemove();
  }, [onCustomAnchorAdd, onCustomAnchorRemove]);
  return <Popper.Anchor {...props} ref={forwardedRef} />;
});
Anchor.displayName = 'Popover.Anchor';

/* ─── Trigger ──────────────────────────────────────────────────────── */

const Trigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>((props, forwardedRef) => {
  const ctx = usePopoverContext('Popover.Trigger');
  const composedRef = useComposedRefs(forwardedRef, ctx.triggerRef);
  const trigger = (
    <Primitive.button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={ctx.open}
      aria-controls={ctx.contentId}
      data-state={ctx.open ? 'open' : 'closed'}
      {...props}
      ref={composedRef}
      onClick={composeEventHandlers(props.onClick, ctx.onOpenToggle)}
    />
  );
  return ctx.hasCustomAnchor ? trigger : <Popper.Anchor asChild>{trigger}</Popper.Anchor>;
});
Trigger.displayName = 'Popover.Trigger';

/* ─── Portal ──────────────────────────────────────────────────────── */

const PortalContext = React.createContext<{ forceMount?: boolean }>({});

const Portal: React.FC<PopoverPortalProps> = ({ children, container, forceMount }) => {
  const ctx = usePopoverContext('Popover.Portal');
  return (
    <PortalContext.Provider value={{ forceMount }}>
      <Presence present={forceMount || ctx.open}>
        <PortalPrimitive container={container ?? undefined}>{children}</PortalPrimitive>
      </Presence>
    </PortalContext.Provider>
  );
};
Portal.displayName = 'Popover.Portal';

/* ─── Content ─────────────────────────────────────────────────────── */

const Content = React.forwardRef<HTMLDivElement, PopoverContentProps>((props, forwardedRef) => {
  const portalCtx = React.useContext(PortalContext);
  const ctx = usePopoverContext('Popover.Content');
  const {
    forceMount = portalCtx.forceMount,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    ...rest
  } = props;

  return (
    <Presence present={forceMount || ctx.open}>
      {ctx.modal ? (
        <ContentModal
          {...rest}
          ref={forwardedRef}
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
        />
      ) : (
        <ContentNonModal
          {...rest}
          ref={forwardedRef}
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
        />
      )}
    </Presence>
  );
});
Content.displayName = 'Popover.Content';

const ContentModal = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (props, forwardedRef) => {
    const ctx = usePopoverContext('Popover.Content');
    useScrollLock(ctx.open);
    return (
      <ContentImpl
        {...props}
        ref={forwardedRef}
        trapFocus
        disableOutsidePointerEvents
        onCloseAutoFocus={composeEventHandlers(props.onCloseAutoFocus, (event) => {
          event.preventDefault();
          ctx.triggerRef.current?.focus();
        })}
      />
    );
  },
);
ContentModal.displayName = 'Popover.ContentModal';

const ContentNonModal = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (props, forwardedRef) => {
    const ctx = usePopoverContext('Popover.Content');
    const hasInteractedOutsideRef = React.useRef(false);
    return (
      <ContentImpl
        {...props}
        ref={forwardedRef}
        trapFocus={false}
        disableOutsidePointerEvents={false}
        onCloseAutoFocus={composeEventHandlers(props.onCloseAutoFocus, (event) => {
          if (!event.defaultPrevented && !hasInteractedOutsideRef.current) {
            ctx.triggerRef.current?.focus();
          }
          event.preventDefault();
        })}
        onInteractOutside={composeEventHandlers(props.onInteractOutside, (event) => {
          if (!event.defaultPrevented) hasInteractedOutsideRef.current = true;
          const target = event.target as HTMLElement;
          if (ctx.triggerRef.current?.contains(target)) {
            event.preventDefault();
          }
        })}
      />
    );
  },
);
ContentNonModal.displayName = 'Popover.ContentNonModal';

interface ContentImplProps extends PopoverContentProps {
  trapFocus?: boolean;
  disableOutsidePointerEvents?: boolean;
}

const ContentImpl = React.forwardRef<HTMLDivElement, ContentImplProps>((props, forwardedRef) => {
  const ctx = usePopoverContext('Popover.Content');
  const {
    trapFocus,
    disableOutsidePointerEvents,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    strategy,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    children,
    ...rest
  } = props;

  return (
    <>
      <FocusGuards />
      <Popper.Content
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        avoidCollisions={avoidCollisions}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        strategy={strategy}
        sticky={sticky}
        hideWhenDetached={hideWhenDetached}
        updatePositionStrategy={updatePositionStrategy}
      >
        <DismissableLayer
          asChild
          disableOutsidePointerEvents={disableOutsidePointerEvents}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
          onDismiss={() => ctx.onOpenChange(false)}
        >
          <FocusScope
            loop
            trapped={trapFocus}
            onMountAutoFocus={onOpenAutoFocus}
            onUnmountAutoFocus={onCloseAutoFocus}
            style={{ display: 'contents' }}
          >
            <Primitive.div
              role="dialog"
              id={ctx.contentId}
              data-state={ctx.open ? 'open' : 'closed'}
              tabIndex={-1}
              {...rest}
              ref={forwardedRef}
            >
              {children}
            </Primitive.div>
          </FocusScope>
        </DismissableLayer>
      </Popper.Content>
    </>
  );
});
ContentImpl.displayName = 'Popover.ContentImpl';

/* ─── Close ────────────────────────────────────────────────────────── */

const Close = React.forwardRef<HTMLButtonElement, PopoverCloseProps>((props, forwardedRef) => {
  const ctx = usePopoverContext('Popover.Close');
  return (
    <Primitive.button
      type="button"
      {...props}
      ref={forwardedRef}
      onClick={composeEventHandlers(props.onClick, () => ctx.onOpenChange(false))}
    />
  );
});
Close.displayName = 'Popover.Close';

/* ─── Arrow ────────────────────────────────────────────────────────── */

const Arrow = React.forwardRef<SVGSVGElement, PopoverArrowProps>((props, forwardedRef) => (
  <Popper.Arrow {...props} ref={forwardedRef} />
));
Arrow.displayName = 'Popover.Arrow';

export { Root, Trigger, Anchor, Portal, Content, Close, Arrow };
