'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

export type ToastHorizontal = 'left' | 'center' | 'right';
export type ToastVertical = 'top' | 'bottom';

export interface ToastOptions {
  /** Reuse / update an existing toast when the same ID is fired again. */
  id?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss in ms. Pass `Infinity` to keep until manually dismissed. */
  duration?: number;
  /** Horizontal placement of the toast. */
  horizontal?: ToastHorizontal;
  /** Vertical placement of the toast. */
  vertical?: ToastVertical;
  /**
   * Adds a "Retry" button. When combined with `action`, `action` takes priority
   * for the button label — `retry` only supplies the click handler.
   */
  retry?: () => void;
  /** Custom action button. */
  action?: { label: string; onClick: () => void };
  /** Called right before the toast is dismissed. */
  onDismiss?: (id: string) => void;
}

export interface ToastItem extends Required<Pick<ToastOptions, 'id' | 'variant' | 'duration'>> {
  title?: string;
  description?: string;
  horizontal?: ToastHorizontal;
  vertical?: ToastVertical;
  retry?: () => void;
  action?: ToastOptions['action'];
  onDismiss?: (id: string) => void;
  open: boolean;
  createdAt: number;
}

// ── Global singleton store ────────────────────────────────────────────────────

type Listener = (toasts: ToastItem[]) => void;

let store: ToastItem[] = [];
const listeners = new Set<Listener>();
let counter = 0;

function genId() {
  return `t-${++counter}-${Math.random().toString(36).slice(2, 6)}`;
}

function emit() {
  const snapshot = [...store];
  listeners.forEach((l) => l(snapshot));
}

function add(opts: ToastOptions): string {
  const id = opts.id ?? genId();
  const exists = store.find((t) => t.id === id);

  if (exists) {
    store = store.map((t) =>
      t.id === id ? { ...t, ...opts, id, open: true, createdAt: Date.now() } : t,
    );
  } else {
    store = [
      ...store,
      {
        id,
        title: opts.title,
        description: opts.description,
        variant: opts.variant ?? 'default',
        duration: opts.duration ?? 4000,
        horizontal: opts.horizontal,
        vertical: opts.vertical,
        retry: opts.retry,
        action: opts.action,
        onDismiss: opts.onDismiss,
        open: true,
        createdAt: Date.now(),
      },
    ];
  }

  emit();
  return id;
}

function dismiss(id?: string) {
  if (id) {
    store.find((t) => t.id === id)?.onDismiss?.(id);
    store = store.map((t) => (t.id === id ? { ...t, open: false } : t));
  } else {
    store.forEach((t) => { if (t.open) t.onDismiss?.(t.id); });
    store = store.map((t) => ({ ...t, open: false }));
  }
  emit();
}

function remove(id: string) {
  store = store.filter((t) => t.id !== id);
  emit();
}

// ── Imperative API ────────────────────────────────────────────────────────────

/**
 * Fire toasts imperatively from anywhere — event handlers, async functions,
 * outside React components. Drop `<Toaster />` once in your app root and
 * call these methods wherever you need them.
 *
 * @example
 * toast.success('Saved!');
 * toast.error('Failed to save', { retry: () => save(), horizontal: 'right', vertical: 'top' });
 * toast.promise(fetchData(), { loading: 'Loading…', success: 'Done!', error: 'Failed' });
 */
export const toast = {
  /** Full control — fire any variant with any options. */
  show: (opts: ToastOptions): string => add(opts),

  success: (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>): string =>
    add({ ...opts, title, variant: 'success' }),

  error: (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>): string =>
    add({ ...opts, title, variant: 'error' }),

  warning: (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>): string =>
    add({ ...opts, title, variant: 'warning' }),

  info: (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>): string =>
    add({ ...opts, title, variant: 'info' }),

  loading: (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>): string =>
    add({ ...opts, title, variant: 'loading', duration: opts?.duration ?? Infinity }),

  /**
   * Show a loading toast while a promise is pending, then update it to
   * success or error when it settles. Message strings can also be functions
   * that receive the resolved value / rejection reason.
   */
  promise: <T>(
    promise: Promise<T>,
    msgs: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: unknown) => string);
    },
    opts?: Omit<ToastOptions, 'title' | 'variant'>,
  ): string => {
    const id = add({ ...opts, title: msgs.loading, variant: 'loading', duration: Infinity });
    promise
      .then((data) => {
        const title = typeof msgs.success === 'function' ? msgs.success(data) : msgs.success;
        add({ ...opts, id, title, variant: 'success', duration: opts?.duration ?? 4000 });
      })
      .catch((err: unknown) => {
        const title = typeof msgs.error === 'function' ? msgs.error(err) : msgs.error;
        add({ ...opts, id, title, variant: 'error', duration: opts?.duration ?? 4000 });
      });
    return id;
  },

  /** Close a toast (plays the exit animation). Omit `id` to dismiss all. */
  dismiss: (id?: string): void => dismiss(id),

  /** Instantly remove a toast without the exit animation. */
  remove: (id: string): void => remove(id),
};

// ── React hook ────────────────────────────────────────────────────────────────

/**
 * Subscribe to the toast store inside a React component.
 * Returns the current list of toasts plus the imperative `toast` API.
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([...store]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const listener: Listener = (items) => {
      if (mounted.current) setToasts(items);
    };
    listeners.add(listener);
    // Sync any toasts that fired before this component mounted
    setToasts([...store]);
    return () => {
      mounted.current = false;
      listeners.delete(listener);
    };
  }, []);

  return {
    toasts,
    toast,
    dismiss: useCallback((id?: string) => dismiss(id), []),
    remove: useCallback((id: string) => remove(id), []),
  };
}
