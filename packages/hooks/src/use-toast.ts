import { useCallback, useEffect, useRef, useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: (id: string) => void;
}

export interface Toast extends Required<Pick<ToastOptions, 'id' | 'variant' | 'duration'>> {
  title?: string;
  description?: string;
  action?: ToastOptions['action'];
  onDismiss?: (id: string) => void;
  open: boolean;
  createdAt: number;
}

// ── Global store (singleton outside React) ────────────────────────────────────

type Listener = (toasts: Toast[]) => void;

let toasts: Toast[] = [];
const listeners = new Set<Listener>();
let counter = 0;

function genId() {
  return `toast-${++counter}-${Math.random().toString(36).slice(2, 7)}`;
}

function notify() {
  listeners.forEach((l) => l([...toasts]));
}

function addToast(opts: ToastOptions): string {
  const id = opts.id ?? genId();
  const existing = toasts.find((t) => t.id === id);
  if (existing) {
    toasts = toasts.map((t) =>
      t.id === id ? { ...t, ...opts, id, open: true, createdAt: Date.now() } : t,
    );
  } else {
    toasts = [
      ...toasts,
      {
        id,
        title: opts.title,
        description: opts.description,
        variant: opts.variant ?? 'default',
        duration: opts.duration ?? 4000,
        action: opts.action,
        onDismiss: opts.onDismiss,
        open: true,
        createdAt: Date.now(),
      },
    ];
  }
  notify();
  return id;
}

function dismissToast(id?: string) {
  if (id) {
    const target = toasts.find((t) => t.id === id);
    target?.onDismiss?.(id);
    toasts = toasts.map((t) => (t.id === id ? { ...t, open: false } : t));
  } else {
    toasts.forEach((t) => { if (t.open) t.onDismiss?.(t.id); });
    toasts = toasts.map((t) => ({ ...t, open: false }));
  }
  notify();
}

function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}

// ── Imperative API ────────────────────────────────────────────────────────────

export const toast = {
  show: (opts: ToastOptions) => addToast(opts),
  success: (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>) =>
    addToast({ ...opts, title, variant: 'success' }),
  error: (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>) =>
    addToast({ ...opts, title, variant: 'error' }),
  warning: (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>) =>
    addToast({ ...opts, title, variant: 'warning' }),
  info: (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>) =>
    addToast({ ...opts, title, variant: 'info' }),
  loading: (title: string, opts?: Omit<ToastOptions, 'title' | 'variant'>) =>
    addToast({ ...opts, title, variant: 'loading', duration: opts?.duration ?? Infinity }),
  promise: <T>(
    promise: Promise<T>,
    msgs: { loading: string; success: string | ((data: T) => string); error: string | ((err: unknown) => string) },
    opts?: Omit<ToastOptions, 'title' | 'variant'>,
  ) => {
    const id = addToast({ ...opts, title: msgs.loading, variant: 'loading', duration: Infinity });
    promise
      .then((data) => {
        const title = typeof msgs.success === 'function' ? msgs.success(data) : msgs.success;
        addToast({ ...opts, id, title, variant: 'success', duration: opts?.duration ?? 4000 });
      })
      .catch((err) => {
        const title = typeof msgs.error === 'function' ? msgs.error(err) : msgs.error;
        addToast({ ...opts, id, title, variant: 'error', duration: opts?.duration ?? 4000 });
      });
    return id;
  },
  dismiss: (id?: string) => dismissToast(id),
  remove: (id: string) => removeToast(id),
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useToast() {
  const [state, setState] = useState<Toast[]>([...toasts]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const listener: Listener = (t) => {
      if (isMounted.current) setState(t);
    };
    listeners.add(listener);
    return () => {
      isMounted.current = false;
      listeners.delete(listener);
    };
  }, []);

  const dismiss = useCallback((id?: string) => dismissToast(id), []);
  const remove = useCallback((id: string) => removeToast(id), []);

  return { toasts: state, toast, dismiss, remove };
}
