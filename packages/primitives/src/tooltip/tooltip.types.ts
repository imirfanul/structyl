import type * as React from 'react';

export interface TooltipProviderProps {
  children?: React.ReactNode;
  /** Delay before the tooltip opens (ms). */
  delayDuration?: number;
  /** How long after closing before another tooltip will skip the delay (ms). */
  skipDelayDuration?: number;
  /** When true, all tooltips inside disable the hoverable content behavior. */
  disableHoverableContent?: boolean;
}

export interface TooltipRootProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  disableHoverableContent?: boolean;
}

export interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export interface TooltipPortalProps {
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
  forceMount?: boolean;
}

export interface TooltipContentProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  forceMount?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  arrowPadding?: number;
  avoidCollisions?: boolean;
  collisionPadding?: number;
  /** Time (ms) to allow the cursor to leave trigger before closing. */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerEvent) => void;
}

export interface TooltipArrowProps extends React.ComponentPropsWithoutRef<'svg'> {
  width?: number;
  height?: number;
}
