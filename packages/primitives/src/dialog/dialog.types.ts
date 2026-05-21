import type * as React from 'react';
import type {
  PointerDownOutsideEvent,
  FocusOutsideEvent,
} from '@aura-ui/core';

export interface DialogRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  children?: React.ReactNode;
}

export interface DialogTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export interface DialogPortalProps {
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
  forceMount?: boolean;
}

export interface DialogOverlayProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  forceMount?: boolean;
}

export interface DialogContentProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  forceMount?: boolean;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  onInteractOutside?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
}

export interface DialogTitleProps extends React.ComponentPropsWithoutRef<'h2'> {
  asChild?: boolean;
}

export interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<'p'> {
  asChild?: boolean;
}

export interface DialogCloseProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}
