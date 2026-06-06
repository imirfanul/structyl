import { act, renderHook } from '@testing-library/react';
import { useInterval } from './use-interval';
import { useTimeout } from './use-timeout';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('useTimeout', () => {
  it('fires after the delay', () => {
    const cb = vi.fn();
    renderHook(() => useTimeout(cb, 1000));
    expect(cb).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1000));
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('does not fire when delay is null', () => {
    const cb = vi.fn();
    renderHook(() => useTimeout(cb, null));
    act(() => vi.advanceTimersByTime(5000));
    expect(cb).not.toHaveBeenCalled();
  });

  it('clear() cancels a pending timeout', () => {
    const cb = vi.fn();
    const { result } = renderHook(() => useTimeout(cb, 1000));
    act(() => result.current.clear());
    act(() => vi.advanceTimersByTime(1000));
    expect(cb).not.toHaveBeenCalled();
  });

  it('reset() restarts the timer', () => {
    const cb = vi.fn();
    const { result } = renderHook(() => useTimeout(cb, 1000));
    act(() => vi.advanceTimersByTime(600));
    act(() => result.current.reset());
    act(() => vi.advanceTimersByTime(600));
    expect(cb).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(400));
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('clears on unmount', () => {
    const cb = vi.fn();
    const { unmount } = renderHook(() => useTimeout(cb, 1000));
    unmount();
    act(() => vi.advanceTimersByTime(1000));
    expect(cb).not.toHaveBeenCalled();
  });
});

describe('useInterval', () => {
  it('fires repeatedly', () => {
    const cb = vi.fn();
    renderHook(() => useInterval(cb, 100));
    act(() => vi.advanceTimersByTime(350));
    expect(cb).toHaveBeenCalledTimes(3);
  });

  it('pauses when delay is null', () => {
    const cb = vi.fn();
    renderHook(() => useInterval(cb, null));
    act(() => vi.advanceTimersByTime(1000));
    expect(cb).not.toHaveBeenCalled();
  });

  it('clears on unmount', () => {
    const cb = vi.fn();
    const { unmount } = renderHook(() => useInterval(cb, 100));
    act(() => vi.advanceTimersByTime(100));
    unmount();
    act(() => vi.advanceTimersByTime(300));
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
