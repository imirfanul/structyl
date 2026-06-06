import { act, renderHook } from '@testing-library/react';
import { useStep } from './use-step';

describe('useStep', () => {
  it('starts at 0 and reports flags', () => {
    const { result } = renderHook(() => useStep(3));
    expect(result.current.currentStep).toBe(0);
    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(false);
    expect(result.current.canGoPrev).toBe(false);
    expect(result.current.canGoNext).toBe(true);
  });

  it('honors initialStep', () => {
    const { result } = renderHook(() => useStep(3, { initialStep: 1 }));
    expect(result.current.currentStep).toBe(1);
  });

  it('advances and goes back, clamping at the ends', () => {
    const { result } = renderHook(() => useStep(2));
    act(() => result.current.next());
    expect(result.current.currentStep).toBe(1);
    expect(result.current.isLast).toBe(true);
    act(() => result.current.next()); // clamp
    expect(result.current.currentStep).toBe(1);
    act(() => result.current.prev());
    act(() => result.current.prev()); // clamp
    expect(result.current.currentStep).toBe(0);
  });

  it('loops when enabled', () => {
    const { result } = renderHook(() => useStep(2, { loop: true }));
    act(() => result.current.next());
    act(() => result.current.next()); // wraps to 0
    expect(result.current.currentStep).toBe(0);
    act(() => result.current.prev()); // wraps to last
    expect(result.current.currentStep).toBe(1);
  });

  it('setStep clamps and reset returns to initial', () => {
    const { result } = renderHook(() => useStep(4, { initialStep: 1 }));
    act(() => result.current.setStep(99));
    expect(result.current.currentStep).toBe(3);
    act(() => result.current.reset());
    expect(result.current.currentStep).toBe(1);
  });
});
