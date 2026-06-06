import { useEffect, useRef, useState } from 'react';

export interface Size {
  width: number;
  height: number;
}

export interface UseResizeObserverReturn<T extends Element> {
  /** Attach to the element you want to measure. */
  ref: React.RefObject<T | null>;
  /** The element's current content-box size; `{ width: 0, height: 0 }` before first measure. */
  size: Size;
}

/**
 * Track an element's size with ResizeObserver. SSR-safe; measures on mount and on resize.
 *
 * @example
 * const { ref, size } = useResizeObserver<HTMLDivElement>();
 * return <div ref={ref}>{size.width}×{size.height}</div>;
 */
export function useResizeObserver<T extends Element = Element>(): UseResizeObserverReturn<T> {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const box = entry.contentBoxSize?.[0];
      if (box) {
        setSize({ width: box.inlineSize, height: box.blockSize });
      } else {
        const rect = entry.contentRect;
        setSize({ width: rect.width, height: rect.height });
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}
