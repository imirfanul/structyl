'use client';

import * as React from 'react';
import { createContext, Primitive } from '@aura-ui/core';
import { composeEventHandlers } from '@aura-ui/utils';
import { useComposedRefs } from '@aura-ui/hooks';
import * as DialogPrimitive from '../dialog';
import type {
  AlertDialogRootProps,
  AlertDialogTriggerProps,
  AlertDialogPortalProps,
  AlertDialogOverlayProps,
  AlertDialogContentProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from './alert-dialog.types';

interface AlertDialogContextValue {
  cancelRef: React.RefObject<HTMLButtonElement | null>;
}

const [AlertDialogProvider, useAlertDialogContext] =
  createContext<AlertDialogContextValue>('AlertDialog');

const Root: React.FC<AlertDialogRootProps> = (props) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  return (
    <AlertDialogProvider cancelRef={cancelRef}>
      <DialogPrimitive.Root {...props} modal={true} />
    </AlertDialogProvider>
  );
};
Root.displayName = 'AlertDialog.Root';

const Trigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  (props, forwardedRef) => <DialogPrimitive.Trigger {...props} ref={forwardedRef} />,
);
Trigger.displayName = 'AlertDialog.Trigger';

const Portal: React.FC<AlertDialogPortalProps> = (props) => (
  <DialogPrimitive.Portal {...props} />
);
Portal.displayName = 'AlertDialog.Portal';

const Overlay = React.forwardRef<HTMLDivElement, AlertDialogOverlayProps>(
  (props, forwardedRef) => <DialogPrimitive.Overlay {...props} ref={forwardedRef} />,
);
Overlay.displayName = 'AlertDialog.Overlay';

const Content = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(
  (props, forwardedRef) => {
    const ctx = useAlertDialogContext('AlertDialog.Content');
    return (
      <DialogPrimitive.Content
        role="alertdialog"
        {...props}
        ref={forwardedRef}
        onOpenAutoFocus={composeEventHandlers(props.onOpenAutoFocus, (event) => {
          event.preventDefault();
          ctx.cancelRef.current?.focus({ preventScroll: true });
        })}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      />
    );
  },
);
Content.displayName = 'AlertDialog.Content';

const Title = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  (props, forwardedRef) => <DialogPrimitive.Title {...props} ref={forwardedRef} />,
);
Title.displayName = 'AlertDialog.Title';

const Description = React.forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  (props, forwardedRef) => <DialogPrimitive.Description {...props} ref={forwardedRef} />,
);
Description.displayName = 'AlertDialog.Description';

const Action = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  (props, forwardedRef) => <DialogPrimitive.Close {...props} ref={forwardedRef} />,
);
Action.displayName = 'AlertDialog.Action';

const Cancel = React.forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  (props, forwardedRef) => {
    const ctx = useAlertDialogContext('AlertDialog.Cancel');
    const composedRef = useComposedRefs(forwardedRef, ctx.cancelRef);
    return <DialogPrimitive.Close {...props} ref={composedRef} />;
  },
);
Cancel.displayName = 'AlertDialog.Cancel';

export {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Action,
  Cancel,
};
