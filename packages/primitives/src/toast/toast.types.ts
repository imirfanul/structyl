import type * as React from 'react';

export type SwipeDirection = 'up' | 'down' | 'left' | 'right';

export interface ToastProviderProps {
  children?: React.ReactNode;
  /** Aria label for the toast region. */
  label?: string;
  /** Time in ms to auto-dismiss toasts. Set to Infinity to disable. */
  duration?: number;
  /** Direction users can swipe to dismiss. */
  swipeDirection?: SwipeDirection;
  /** Distance in px to consider a swipe a dismissal. */
  swipeThreshold?: number;
}

export interface ToastViewportProps extends React.ComponentPropsWithoutRef<'ol'> {
  asChild?: boolean;
  /** Keys to focus next/previous toast (default F8). */
  hotkey?: string[];
  label?: string;
}

export interface ToastRootProps extends React.ComponentPropsWithoutRef<'li'> {
  asChild?: boolean;
  type?: 'foreground' | 'background';
  duration?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  forceMount?: boolean;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPause?: () => void;
  onResume?: () => void;
  onSwipeStart?: (event: React.PointerEvent) => void;
  onSwipeMove?: (event: React.PointerEvent) => void;
  onSwipeEnd?: (event: React.PointerEvent) => void;
  onSwipeCancel?: (event: React.PointerEvent) => void;
}

export interface ToastTitleProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

export interface ToastDescriptionProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

export interface ToastActionProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  altText: string;
}

export interface ToastCloseProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}
