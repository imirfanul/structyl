'use client';

import * as React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
  RotateCcw,
} from '@aura-ui/icons';
import { Toast as ToastPrimitive } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';
import { Root, Action, Close, Title, Description } from './toast-root';
import { useToast } from './use-toast';
import type { ToastHorizontal, ToastVariant, ToastVertical } from './use-toast';

// ── Position helpers ──────────────────────────────────────────────────────────

function getViewportClasses(h: ToastHorizontal, v: ToastVertical): string {
  const hClass = h === 'left' ? 'left-4' : h === 'right' ? 'right-4' : 'left-1/2 -translate-x-1/2';
  const vClass = v === 'top' ? 'top-4' : 'bottom-4';
  const flex   = v === 'top' ? 'flex-col' : 'flex-col-reverse';
  return `${vClass} ${hClass} ${flex}`;
}

function getSwipeDir(h: ToastHorizontal, v: ToastVertical): 'left' | 'right' | 'up' | 'down' {
  if (h === 'left')   return 'left';
  if (h === 'right')  return 'right';
  return v === 'top' ? 'up' : 'down';
}

// ── Variant → Icon ────────────────────────────────────────────────────────────

const ICONS: Partial<Record<ToastVariant, React.ElementType>> = {
  success: CheckCircle2,
  error:   XCircle,
  warning: AlertTriangle,
  info:    Info,
  loading: Loader2,
};

// Map the internal 'error' variant to the styled 'destructive' class
type StyledVariant = React.ComponentProps<typeof Root>['variant'];

function toStyleVariant(v: ToastVariant): StyledVariant {
  if (v === 'error') return 'destructive';
  if (v === 'default' || v === 'loading') return 'default';
  return v as StyledVariant;
}

// ── ToasterProps ──────────────────────────────────────────────────────────────

export interface ToasterProps {
  /**
   * Horizontal alignment of toasts.
   * @default 'right'
   */
  horizontal?: ToastHorizontal;
  /**
   * Vertical alignment of toasts.
   * @default 'bottom'
   */
  vertical?: ToastVertical;
  /**
   * Maximum number of toasts visible at once.
   * @default 5
   */
  maxToasts?: number;
  /** Extra classes forwarded to the viewport wrapper. */
  className?: string;
}

// ── Toaster ───────────────────────────────────────────────────────────────────

/**
 * Drop `<Toaster />` once in your app root (e.g. inside your root layout).
 * Then call `toast.success(...)`, `toast.error(...)` etc. from anywhere.
 *
 * Each toast can override the default placement via `horizontal` / `vertical` options.
 *
 * @example
 * // layout.tsx
 * import { Toaster } from '@aura-ui/styled';
 * export default function RootLayout({ children }) {
 *   return <html><body>{children}<Toaster /></body></html>;
 * }
 *
 * // anywhere.ts
 * import { toast } from '@aura-ui/styled';
 * toast.success('Saved!');
 * toast.error('Failed', { retry: () => save(), horizontal: 'right', vertical: 'top' });
 */
export function Toaster({
  horizontal: defaultH = 'right',
  vertical: defaultV   = 'bottom',
  maxToasts = 5,
  className,
}: ToasterProps) {
  const { toasts, remove } = useToast();

  // Group toasts by their resolved (horizontal, vertical) combo
  const groups = React.useMemo(() => {
    const map = new Map<string, { h: ToastHorizontal; v: ToastVertical; items: typeof toasts }>();
    for (const t of toasts) {
      const h = t.horizontal ?? defaultH;
      const v = t.vertical   ?? defaultV;
      const key = `${h}-${v}`;
      if (!map.has(key)) map.set(key, { h, v, items: [] });
      map.get(key)!.items.push(t);
    }
    return map;
  }, [toasts, defaultH, defaultV]);

  return (
    <>
      {Array.from(groups.values()).map(({ h, v, items }) => (
        <ToastPrimitive.Provider key={`${h}-${v}`} swipeDirection={getSwipeDir(h, v)}>
          {items.slice(0, maxToasts).map(({ id, title, description, variant, open, action, retry, duration }) => {
            const Icon = ICONS[variant];
            const effectiveAction = action ?? (retry ? { label: 'Retry', onClick: retry } : undefined);

            return (
              <Root
                key={id}
                open={open}
                onOpenChange={(isOpen) => { if (!isOpen) remove(id); }}
                variant={toStyleVariant(variant)}
                duration={duration}
              >
                <div className="flex flex-1 items-start gap-3">
                  {Icon && (
                    <Icon
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0',
                        variant === 'loading' && 'animate-spin',
                      )}
                      aria-hidden
                    />
                  )}
                  <div className="grid gap-0.5 min-w-0">
                    {title && <Title>{title}</Title>}
                    {description && <Description>{description}</Description>}
                  </div>
                </div>

                {effectiveAction && (
                  <Action altText={effectiveAction.label} onClick={effectiveAction.onClick}>
                    {retry && !action && <RotateCcw className="mr-1.5 h-3 w-3" aria-hidden />}
                    {effectiveAction.label}
                  </Action>
                )}

                <Close />
              </Root>
            );
          })}

          {/* Each position group gets its own Viewport */}
          <ToastPrimitive.Viewport
            className={cn(
              'fixed z-[100] flex max-h-screen w-full p-4 md:max-w-[420px] gap-2',
              getViewportClasses(h, v),
              className,
            )}
          />
        </ToastPrimitive.Provider>
      ))}
    </>
  );
}

Toaster.displayName = 'Toaster';
