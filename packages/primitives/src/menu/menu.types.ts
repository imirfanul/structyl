import type * as React from 'react';
import type { PointerDownOutsideEvent, FocusOutsideEvent } from '@aura-ui/core';

export interface MenuRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  dir?: 'ltr' | 'rtl';
}

export interface MenuAnchorProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  virtualRef?: React.RefObject<{ getBoundingClientRect: () => DOMRect }>;
}

export interface MenuPortalProps {
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
  forceMount?: boolean;
}

export interface MenuContentProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  forceMount?: boolean;
  loop?: boolean;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  onFocusOutside?: (event: FocusOutsideEvent) => void;
  onInteractOutside?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionPadding?: number;
}

export interface MenuItemProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  asChild?: boolean;
  disabled?: boolean;
  onSelect?: (event: Event) => void;
  textValue?: string;
}

export interface MenuGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

export interface MenuLabelProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

export interface MenuCheckboxItemProps extends Omit<MenuItemProps, 'onSelect'> {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
  onSelect?: (event: Event) => void;
}

export interface MenuRadioGroupProps extends MenuGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface MenuRadioItemProps extends Omit<MenuItemProps, 'onSelect'> {
  value: string;
  onSelect?: (event: Event) => void;
}

export interface MenuItemIndicatorProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
  forceMount?: boolean;
}

export interface MenuSeparatorProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}
