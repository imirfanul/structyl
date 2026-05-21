import type * as React from 'react';
import type {
  PointerDownOutsideEvent,
  FocusOutsideEvent,
} from '@aura-ui/core';

export interface PopoverRootProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export interface PopoverAnchorProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

export interface PopoverPortalProps {
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
  forceMount?: boolean;
}

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  forceMount?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  arrowPadding?: number;
  avoidCollisions?: boolean;
  collisionPadding?: number;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  onFocusOutside?: (event: FocusOutsideEvent) => void;
  onInteractOutside?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void;
}

export interface PopoverCloseProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export interface PopoverArrowProps extends React.ComponentPropsWithoutRef<'svg'> {
  width?: number;
  height?: number;
}
