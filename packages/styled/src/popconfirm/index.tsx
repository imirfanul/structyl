'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from '@structyl/primitives';
import { cn } from '@structyl/utils';
import { Button, type ButtonProps } from '../button';
import { Typography } from '../typography';

// ── Popconfirm ────────────────────────────────────────────────────────────────

export interface PopconfirmProps {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /**
   * Variant of the confirm button. Uses MUI-style naming:
   * use `"outlined"` (not `"outline"`) for the bordered style.
   */
  confirmVariant?: ButtonProps['variant'];
  /** Color of the confirm button when using contained/outlined/text variants */
  confirmColor?: ButtonProps['color'];
  onConfirm?: () => void;
  onCancel?: () => void;
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  /** Show loading spinner on confirm button while async confirm runs */
  loading?: boolean;
}

const Popconfirm: React.FC<PopconfirmProps> = ({
  children,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'default',
  confirmColor,
  onConfirm,
  onCancel,
  open: openProp,
  onOpenChange,
  disabled = false,
  side = 'top',
  align = 'center',
  loading = false,
}) => {
  const titleId = React.useId();
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const setOpen = (v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  };

  const handleConfirm = () => {
    onConfirm?.();
    if (!loading) setOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  if (disabled) return <>{children}</>;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={8}
          className={cn(
            'z-50 w-72 rounded-lg border border-border bg-bg p-4 shadow-lg',
            'animate-in fade-in-0 zoom-in-95 duration-100',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1',
            'data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
          )}
          aria-labelledby={titleId}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Warning icon + title */}
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-warning" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </span>
            <div className="flex-1">
              <Typography id={titleId} variant="body2" className="font-semibold text-fg">{title}</Typography>
              {description && (
                <Typography variant="muted" className="mt-1 text-xs leading-relaxed">{description}</Typography>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              variant={confirmVariant}
              color={confirmColor}
              size="sm"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-1.5">
                  <svg className="size-3 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {confirmLabel}
                </span>
              ) : confirmLabel}
            </Button>
          </div>
          <PopoverPrimitive.Arrow className="fill-border" width={10} height={5} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
Popconfirm.displayName = 'Popconfirm';

export { Popconfirm };
