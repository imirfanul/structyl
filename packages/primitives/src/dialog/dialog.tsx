'use client';

import * as React from 'react';
import {
  createContext,
  Portal as PortalPrimitive,
  Primitive,
  Presence,
  FocusScope,
  FocusGuards,
  DismissableLayer,
  useScrollLock,
} from '@your-lib/core';
import { useControllableState, useId, useComposedRefs } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';
import type {
  DialogRootProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
} from './dialog.types';

/* ─── Root ─────────────────────────────────────────────────────────── */

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenToggle: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  contentId: string;
  titleId: string;
  descriptionId: string;
  modal: boolean;
}

const [DialogProvider, useDialogContext] = createContext<DialogContextValue>('Dialog');

const Root: React.FC<DialogRootProps> = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  modal = true,
  children,
}) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const contentId = useId('dialog-content');
  const titleId = useId('dialog-title');
  const descriptionId = useId('dialog-description');

  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const handleOpenChange = React.useCallback(
    (next: boolean) => setOpen(next),
    [setOpen],
  );
  const handleOpenToggle = React.useCallback(
    () => setOpen((p) => !p),
    [setOpen],
  );

  return (
    <DialogProvider
      open={open}
      onOpenChange={handleOpenChange}
      onOpenToggle={handleOpenToggle}
      triggerRef={triggerRef}
      contentRef={contentRef}
      contentId={contentId}
      titleId={titleId}
      descriptionId={descriptionId}
      modal={modal}
    >
      {children}
    </DialogProvider>
  );
};
Root.displayName = 'Dialog.Root';

/* ─── Trigger ──────────────────────────────────────────────────────── */

const Trigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  (props, forwardedRef) => {
    const ctx = useDialogContext('Dialog.Trigger');
    const composedRef = useComposedRefs(forwardedRef, ctx.triggerRef);
    return (
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
  },
);
Trigger.displayName = 'Dialog.Trigger';

/* ─── Portal ───────────────────────────────────────────────────────── */

const PortalContext = React.createContext<{ forceMount?: boolean }>({});

const Portal: React.FC<DialogPortalProps> = ({ children, container, forceMount }) => {
  const ctx = useDialogContext('Dialog.Portal');
  return (
    <PortalContext.Provider value={{ forceMount }}>
      <Presence present={forceMount || ctx.open}>
        <PortalPrimitive container={container ?? undefined}>{children}</PortalPrimitive>
      </Presence>
    </PortalContext.Provider>
  );
};
Portal.displayName = 'Dialog.Portal';

function usePortalContext() {
  return React.useContext(PortalContext);
}

/* ─── Overlay ──────────────────────────────────────────────────────── */

const Overlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  (props, forwardedRef) => {
    const portalCtx = usePortalContext();
    const ctx = useDialogContext('Dialog.Overlay');
    const { forceMount = portalCtx.forceMount, ...overlayProps } = props as DialogOverlayProps & {
      forceMount?: boolean;
    };
    if (!ctx.modal) return null;
    return (
      <Presence present={forceMount || ctx.open}>
        <Primitive.div
          data-state={ctx.open ? 'open' : 'closed'}
          {...overlayProps}
          ref={forwardedRef}
          style={{ pointerEvents: 'auto', ...overlayProps.style }}
        />
      </Presence>
    );
  },
);
Overlay.displayName = 'Dialog.Overlay';

/* ─── Content ──────────────────────────────────────────────────────── */

const Content = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (props, forwardedRef) => {
    const portalCtx = usePortalContext();
    const ctx = useDialogContext('Dialog.Content');
    const {
      forceMount = portalCtx.forceMount,
      onEscapeKeyDown,
      onPointerDownOutside,
      onInteractOutside,
      onOpenAutoFocus,
      onCloseAutoFocus,
      ...contentProps
    } = props;

    return (
      <Presence present={forceMount || ctx.open}>
        {ctx.modal ? (
          <ModalContent
            {...contentProps}
            ref={forwardedRef}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            onInteractOutside={onInteractOutside}
            onOpenAutoFocus={onOpenAutoFocus}
            onCloseAutoFocus={onCloseAutoFocus}
          />
        ) : (
          <NonModalContent
            {...contentProps}
            ref={forwardedRef}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            onInteractOutside={onInteractOutside}
            onOpenAutoFocus={onOpenAutoFocus}
            onCloseAutoFocus={onCloseAutoFocus}
          />
        )}
      </Presence>
    );
  },
);
Content.displayName = 'Dialog.Content';

const ModalContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (props, forwardedRef) => {
    const ctx = useDialogContext('Dialog.Content');
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
ModalContent.displayName = 'Dialog.ModalContent';

const NonModalContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (props, forwardedRef) => {
    const ctx = useDialogContext('Dialog.Content');
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
        })}
      />
    );
  },
);
NonModalContent.displayName = 'Dialog.NonModalContent';

interface ContentImplProps extends DialogContentProps {
  trapFocus?: boolean;
  disableOutsidePointerEvents?: boolean;
}

const ContentImpl = React.forwardRef<HTMLDivElement, ContentImplProps>(
  (props, forwardedRef) => {
    const ctx = useDialogContext('Dialog.Content');
    const composedRef = useComposedRefs(forwardedRef, ctx.contentRef);
    const {
      trapFocus,
      disableOutsidePointerEvents,
      onEscapeKeyDown,
      onPointerDownOutside,
      onInteractOutside,
      onOpenAutoFocus,
      onCloseAutoFocus,
      children,
      ...rest
    } = props;

    return (
      <>
        <FocusGuards />
        <DismissableLayer
          role="dialog"
          id={ctx.contentId}
          aria-describedby={ctx.descriptionId}
          aria-labelledby={ctx.titleId}
          aria-modal={ctx.modal ? true : undefined}
          data-state={ctx.open ? 'open' : 'closed'}
          tabIndex={-1}
          disableOutsidePointerEvents={disableOutsidePointerEvents}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onInteractOutside={onInteractOutside}
          onDismiss={() => ctx.onOpenChange(false)}
          {...rest}
          ref={composedRef}
        >
          <FocusScopeChildren
            trapped={trapFocus}
            onOpenAutoFocus={onOpenAutoFocus}
            onCloseAutoFocus={onCloseAutoFocus}
          >
            {children}
          </FocusScopeChildren>
        </DismissableLayer>
      </>
    );
  },
);
ContentImpl.displayName = 'Dialog.ContentImpl';

const FocusScopeChildren: React.FC<{
  children?: React.ReactNode;
  trapped?: boolean;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
}> = ({ children, trapped, onOpenAutoFocus, onCloseAutoFocus }) => (
  <FocusScope
    loop
    trapped={trapped}
    onMountAutoFocus={onOpenAutoFocus}
    onUnmountAutoFocus={onCloseAutoFocus}
    style={{ display: 'contents' }}
  >
    {children}
  </FocusScope>
);

/* ─── Title / Description / Close ──────────────────────────────────── */

const Title = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  (props, forwardedRef) => {
    const ctx = useDialogContext('Dialog.Title');
    return <Primitive.h2 id={ctx.titleId} {...props} ref={forwardedRef} />;
  },
);
Title.displayName = 'Dialog.Title';

const Description = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  (props, forwardedRef) => {
    const ctx = useDialogContext('Dialog.Description');
    return <Primitive.p id={ctx.descriptionId} {...props} ref={forwardedRef} />;
  },
);
Description.displayName = 'Dialog.Description';

const Close = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  (props, forwardedRef) => {
    const ctx = useDialogContext('Dialog.Close');
    return (
      <Primitive.button
        type="button"
        {...props}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, () => ctx.onOpenChange(false))}
      />
    );
  },
);
Close.displayName = 'Dialog.Close';

export {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
};
