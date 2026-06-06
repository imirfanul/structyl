import { useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Freeze the observer once the element has become visible (useful for lazy-load). */
  freezeOnceVisible?: boolean;
  /** Skip observing entirely. */
  disabled?: boolean;
}

export interface UseIntersectionObserverReturn<T extends Element> {
  /** Attach to the element you want to observe. */
  ref: React.RefObject<T | null>;
  /** The latest IntersectionObserverEntry, or null before the first callback. */
  entry: IntersectionObserverEntry | null;
  /** Convenience flag derived from `entry.isIntersecting`. */
  isIntersecting: boolean;
}

/**
 * Observe an element's intersection with the viewport (or a root element).
 * SSR-safe; does nothing until mounted on the client.
 *
 * @example
 * const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ rootMargin: '200px' });
 * return <div ref={ref}>{isIntersecting && <Heavy />}</div>;
 */
export function useIntersectionObserver<T extends Element = Element>(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn<T> {
  const { root, rootMargin, threshold, freezeOnceVisible = false, disabled = false } = options;
  const ref = useRef<T>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const frozen = freezeOnceVisible && entry?.isIntersecting;

  useEffect(() => {
    const node = ref.current;
    if (disabled || frozen || !node) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([newEntry]) => {
        if (newEntry) setEntry(newEntry);
      },
      { root, rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
    // threshold may be an array; stringify to keep deps stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, rootMargin, JSON.stringify(threshold), disabled, frozen]);

  return { ref, entry, isIntersecting: entry?.isIntersecting ?? false };
}
