'use client';

import * as React from 'react';
import { createContext, Primitive } from '@aura-ui/core';
import type {
  ProgressRootProps,
  ProgressIndicatorProps,
  ProgressState,
} from './progress.types';

const DEFAULT_MAX = 100;

interface ProgressContextValue {
  value: number | null;
  max: number;
}

const [ProgressProvider, useProgressContext] =
  createContext<ProgressContextValue>('Progress');

const Root = React.forwardRef<HTMLDivElement, ProgressRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...rest
    } = props;

    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : undefined;

    return (
      <ProgressProvider value={value} max={max}>
        <Primitive.div
          aria-valuemax={max}
          aria-valuemin={0}
          aria-valuenow={isNumber(value) ? value : undefined}
          aria-valuetext={valueLabel}
          role="progressbar"
          data-state={getProgressState(value, max)}
          data-value={value ?? undefined}
          data-max={max}
          {...rest}
          ref={forwardedRef}
        />
      </ProgressProvider>
    );
  },
);
Root.displayName = 'Progress.Root';

const Indicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  (props, forwardedRef) => {
    const ctx = useProgressContext('Progress.Indicator');
    return (
      <Primitive.div
        data-state={getProgressState(ctx.value, ctx.max)}
        data-value={ctx.value ?? undefined}
        data-max={ctx.max}
        {...props}
        ref={forwardedRef}
      />
    );
  },
);
Indicator.displayName = 'Progress.Indicator';

/* ── helpers ─────────────────────────────────────────────────────────── */

function defaultGetValueLabel(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`;
}

function getProgressState(value: number | null, max: number): ProgressState {
  if (value == null) return 'indeterminate';
  if (value === max) return 'complete';
  return 'loading';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isValidMaxNumber(max: unknown): max is number {
  return isNumber(max) && !isNaN(max) && max > 0;
}

function isValidValueNumber(value: unknown, max: number): value is number {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}

export { Root, Indicator };
