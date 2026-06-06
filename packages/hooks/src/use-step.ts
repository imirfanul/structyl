import { useCallback, useMemo, useState } from 'react';

export interface UseStepOptions {
  /** The initial step index (0-based). Defaults to 0. */
  initialStep?: number;
  /** Wrap around at the ends instead of clamping. Defaults to false. */
  loop?: boolean;
}

export interface UseStepReturn {
  /** Current step index (0-based). */
  currentStep: number;
  /** Total number of steps. */
  totalSteps: number;
  /** True when on the first step. */
  isFirst: boolean;
  /** True when on the last step. */
  isLast: boolean;
  /** Whether `next()` can advance (false on last step unless `loop`). */
  canGoNext: boolean;
  /** Whether `prev()` can go back (false on first step unless `loop`). */
  canGoPrev: boolean;
  /** Advance one step. */
  next: () => void;
  /** Go back one step. */
  prev: () => void;
  /** Jump to a specific step (clamped to range). */
  setStep: (step: number) => void;
  /** Reset to the initial step. */
  reset: () => void;
}

/**
 * Multi-step state machine for wizards, steppers, and carousels.
 *
 * @example
 * const { currentStep, next, prev, isLast } = useStep(steps.length);
 */
export function useStep(totalSteps: number, options: UseStepOptions = {}): UseStepReturn {
  const { initialStep = 0, loop = false } = options;
  const max = Math.max(0, totalSteps - 1);
  const clampStep = useCallback((s: number) => Math.min(max, Math.max(0, s)), [max]);

  const [currentStep, setCurrentStep] = useState(() => clampStep(initialStep));

  const canGoNext = loop || currentStep < max;
  const canGoPrev = loop || currentStep > 0;

  const next = useCallback(() => {
    setCurrentStep((s) => (s >= max ? (loop ? 0 : s) : s + 1));
  }, [max, loop]);

  const prev = useCallback(() => {
    setCurrentStep((s) => (s <= 0 ? (loop ? max : s) : s - 1));
  }, [max, loop]);

  const setStep = useCallback((step: number) => setCurrentStep(clampStep(step)), [clampStep]);
  const reset = useCallback(() => setCurrentStep(clampStep(initialStep)), [clampStep, initialStep]);

  return useMemo(
    () => ({
      currentStep,
      totalSteps,
      isFirst: currentStep === 0,
      isLast: currentStep === max,
      canGoNext,
      canGoPrev,
      next,
      prev,
      setStep,
      reset,
    }),
    [currentStep, totalSteps, max, canGoNext, canGoPrev, next, prev, setStep, reset],
  );
}
