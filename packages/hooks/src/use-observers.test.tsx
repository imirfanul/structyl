import { act, render } from '@testing-library/react';
import * as React from 'react';
import { useIntersectionObserver } from './use-intersection-observer';
import { useResizeObserver } from './use-resize-observer';

// ── IntersectionObserver mock ──────────────────────────────────────────────────

let intersectionCallback: IntersectionObserverCallback | null = null;
const ioDisconnect = vi.fn();

beforeEach(() => {
  intersectionCallback = null;
  ioDisconnect.mockClear();
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb: IntersectionObserverCallback) {
        intersectionCallback = cb;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = ioDisconnect;
      takeRecords = () => [];
    },
  );
});

afterEach(() => vi.unstubAllGlobals());

function IntersectionProbe({ onState }: { onState: (visible: boolean) => void }) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>();
  onState(isIntersecting);
  return <div ref={ref}>probe</div>;
}

describe('useIntersectionObserver', () => {
  it('reports false before any callback, true after intersecting', () => {
    const states: boolean[] = [];
    render(<IntersectionProbe onState={(v) => states.push(v)} />);
    expect(states.at(-1)).toBe(false);

    act(() => {
      intersectionCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(states.at(-1)).toBe(true);
  });

  it('disconnects on unmount', () => {
    const { unmount } = render(<IntersectionProbe onState={() => {}} />);
    unmount();
    expect(ioDisconnect).toHaveBeenCalled();
  });
});

// ── ResizeObserver mock ────────────────────────────────────────────────────────

describe('useResizeObserver', () => {
  let resizeCallback: ResizeObserverCallback | null = null;

  beforeEach(() => {
    resizeCallback = null;
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(cb: ResizeObserverCallback) {
          resizeCallback = cb;
        }
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );
  });

  function ResizeProbe({ onSize }: { onSize: (w: number, h: number) => void }) {
    const { ref, size } = useResizeObserver<HTMLDivElement>();
    onSize(size.width, size.height);
    return <div ref={ref}>probe</div>;
  }

  it('updates size from contentRect', () => {
    const sizes: Array<[number, number]> = [];
    render(<ResizeProbe onSize={(w, h) => sizes.push([w, h])} />);
    expect(sizes.at(-1)).toEqual([0, 0]);

    act(() => {
      resizeCallback?.(
        [{ contentRect: { width: 200, height: 100 } } as ResizeObserverEntry],
        {} as ResizeObserver,
      );
    });
    expect(sizes.at(-1)).toEqual([200, 100]);
  });
});
