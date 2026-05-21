import type * as React from 'react';

export interface HoverCardRootProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
}

export interface HoverCardTriggerProps extends React.ComponentPropsWithoutRef<'a'> {
  asChild?: boolean;
}

export interface HoverCardPortalProps {
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
  forceMount?: boolean;
}

export interface HoverCardContentProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  forceMount?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  arrowPadding?: number;
  avoidCollisions?: boolean;
  collisionPadding?: number;
}

export interface HoverCardArrowProps extends React.ComponentPropsWithoutRef<'svg'> {
  width?: number;
  height?: number;
}
