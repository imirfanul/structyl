import type * as React from 'react';
import type {
  DialogRootProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
} from '../dialog';

export interface AlertDialogRootProps extends Omit<DialogRootProps, 'modal'> {}

export interface AlertDialogTriggerProps extends DialogTriggerProps {}

export interface AlertDialogPortalProps extends DialogPortalProps {}

export interface AlertDialogOverlayProps extends DialogOverlayProps {}

export interface AlertDialogContentProps
  extends Omit<DialogContentProps, 'onPointerDownOutside' | 'onInteractOutside'> {}

export interface AlertDialogTitleProps extends DialogTitleProps {}

export interface AlertDialogDescriptionProps extends DialogDescriptionProps {}

export interface AlertDialogActionProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export interface AlertDialogCancelProps extends DialogCloseProps {}
