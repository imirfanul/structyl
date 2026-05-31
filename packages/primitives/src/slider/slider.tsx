'use client';

import * as React from 'react';
import { createContext, Primitive, useDirection } from '@structyl/core';
import { useControllableState, useComposedRefs } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';
import type {
  SliderRootProps,
  SliderTrackProps,
  SliderRangeProps,
  SliderThumbProps,
} from './slider.types';

const PAGE_KEYS = ['PageUp', 'PageDown'];
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

type Side = 'top' | 'right' | 'bottom' | 'left';

interface SliderOrientation {
  startEdge: Side;
  endEdge: Side;
  size: 'width' | 'height';
  direction: 1 | -1;
}

interface SliderContextValue {
  disabled?: boolean;
  min: number;
  max: number;
  values: number[];
  valueIndexToChangeRef: React.RefObject<number>;
  thumbs: Set<HTMLSpanElement>;
  orientation: 'horizontal' | 'vertical';
}

const [SliderProvider, useSliderContext] = createContext<SliderContextValue>('Slider');

interface OrientationContextValue extends SliderOrientation {}
const [OrientationProvider, useOrientationContext] =
  createContext<OrientationContextValue>('SliderOrientation');

/* ─── Root ─────────────────────────────────────────────────────────── */

const Root = React.forwardRef<HTMLSpanElement, SliderRootProps>(
  (props, forwardedRef) => {
    const {
      name,
      min = 0,
      max = 100,
      step = 1,
      orientation = 'horizontal',
      disabled = false,
      minStepsBetweenThumbs = 0,
      defaultValue = [min],
      value,
      onValueChange = () => {},
      onValueCommit = () => {},
      inverted = false,
      dir,
      ...rootProps
    } = props;

    const direction = useDirection(dir);
    const [thumbRefs] = React.useState(new Set<HTMLSpanElement>());
    const valueIndexToChangeRef = React.useRef<number>(0);
    const isHorizontal = orientation === 'horizontal';
    const sliderRef = React.useRef<HTMLSpanElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, sliderRef);

    const [values = defaultValue, setValues] = useControllableState<number[]>({
      prop: value,
      defaultProp: defaultValue,
      onChange: (v) => {
        const thumbs = [...thumbRefs];
        thumbs[valueIndexToChangeRef.current]?.focus();
        onValueChange(v);
      },
    });

    const valuesBeforeSlideStartRef = React.useRef(values);

    function handleSlideStart(value: number) {
      const closestIndex = getClosestValueIndex(values, value);
      updateValues(value, closestIndex);
    }

    function handleSlideMove(value: number) {
      updateValues(value, valueIndexToChangeRef.current);
    }

    function handleSlideEnd() {
      const prev = valuesBeforeSlideStartRef.current[valueIndexToChangeRef.current];
      const next = values[valueIndexToChangeRef.current];
      const hasChanged = next !== prev;
      if (hasChanged) onValueCommit(values);
    }

    function updateValues(value: number, atIndex: number, { commit = false } = {}) {
      const decimalCount = getDecimalCount(step);
      const snapToStep = roundValue(Math.round((value - min) / step) * step + min, decimalCount);
      const nextValue = clamp(snapToStep, min, max);
      setValues((prev = []) => {
        const nextValues = getNextSortedValues(prev, nextValue, atIndex);
        if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs * step)) {
          valueIndexToChangeRef.current = nextValues.indexOf(nextValue);
          const hasChanged = String(nextValues) !== String(prev);
          if (hasChanged && commit) onValueCommit(nextValues);
          return hasChanged ? nextValues : prev;
        }
        return prev;
      });
    }

    return (
      <SliderProvider
        disabled={disabled}
        min={min}
        max={max}
        valueIndexToChangeRef={valueIndexToChangeRef}
        thumbs={thumbRefs}
        values={values}
        orientation={orientation}
      >
        <OrientationProvider
          startEdge={
            isHorizontal ? (direction === 'rtl' ? 'right' : 'left') : 'bottom'
          }
          endEdge={
            isHorizontal ? (direction === 'rtl' ? 'left' : 'right') : 'top'
          }
          direction={isHorizontal ? (direction === 'rtl' ? -1 : 1) : -1}
          size={isHorizontal ? 'width' : 'height'}
        >
          <SliderImpl
            aria-disabled={disabled}
            data-disabled={disabled ? '' : undefined}
            data-orientation={orientation}
            {...rootProps}
            ref={composedRefs}
            onPointerDown={composeEventHandlers(rootProps.onPointerDown, () => {
              if (!disabled) valuesBeforeSlideStartRef.current = values;
            })}
            min={min}
            max={max}
            inverted={inverted}
            onSlideStart={disabled ? undefined : handleSlideStart}
            onSlideMove={disabled ? undefined : handleSlideMove}
            onSlideEnd={disabled ? undefined : handleSlideEnd}
            onHomeKeyDown={() => !disabled && updateValues(min, 0, { commit: true })}
            onEndKeyDown={() =>
              !disabled && updateValues(max, values.length - 1, { commit: true })
            }
            onStepKeyDown={({ event, direction: stepDirection }) => {
              if (!disabled) {
                const isPageKey = PAGE_KEYS.includes(event.key);
                const isSkipKey = isPageKey || (event.shiftKey && ARROW_KEYS.includes(event.key));
                const multiplier = isSkipKey ? 10 : 1;
                const atIndex = valueIndexToChangeRef.current;
                const v = values[atIndex] ?? min;
                const stepInDirection = step * multiplier * stepDirection;
                updateValues(v + stepInDirection, atIndex, { commit: true });
              }
            }}
          />
        </OrientationProvider>
        {name &&
          values.map((v, index) => (
            <BubbleInput
              key={index}
              name={name + (values.length > 1 ? '[]' : '')}
              value={v}
            />
          ))}
      </SliderProvider>
    );
  },
);
Root.displayName = 'Slider.Root';

/* ─── SliderImpl: horizontal/vertical pointer handling ───────────────── */

interface SliderImplProps extends React.ComponentPropsWithoutRef<'span'> {
  min: number;
  max: number;
  inverted: boolean;
  onSlideStart?: (value: number) => void;
  onSlideMove?: (value: number) => void;
  onSlideEnd?: () => void;
  onHomeKeyDown: (event: React.KeyboardEvent) => void;
  onEndKeyDown: (event: React.KeyboardEvent) => void;
  onStepKeyDown: (args: { event: React.KeyboardEvent; direction: 1 | -1 }) => void;
}

const SLIDER_KEYS: Record<Side, string[]> = {
  left: ['Home', 'End', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'],
  right: ['Home', 'End', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'],
  bottom: ['Home', 'End', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'],
  top: ['Home', 'End', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'],
};

const BACK_KEYS: Record<Side, string[]> = {
  left: ['Home', 'PageDown', 'ArrowDown', 'ArrowLeft'],
  right: ['Home', 'PageDown', 'ArrowDown', 'ArrowRight'],
  bottom: ['Home', 'PageDown', 'ArrowDown', 'ArrowLeft'],
  top: ['Home', 'PageDown', 'ArrowDown', 'ArrowRight'],
};

const SliderImpl = React.forwardRef<HTMLSpanElement, SliderImplProps>(
  (props, forwardedRef) => {
    const {
      min,
      max,
      inverted,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onHomeKeyDown,
      onEndKeyDown,
      onStepKeyDown,
      ...rest
    } = props;
    const orientation = useOrientationContext('Slider');
    const sliderRef = React.useRef<HTMLSpanElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, sliderRef);
    const rectRef = React.useRef<DOMRect | null>(null);

    function getValueFromPointer(pointerPosition: number): number {
      const rect = rectRef.current || sliderRef.current!.getBoundingClientRect();
      const input: [number, number] = [
        0,
        orientation.size === 'width' ? rect.width : rect.height,
      ];
      const output: [number, number] = inverted ? [max, min] : [min, max];
      const value = linearScale(input, output);
      rectRef.current = rect;
      const start = orientation.size === 'width' ? rect.left : rect.bottom;
      const offset = pointerPosition - start;
      return value(orientation.direction === 1 ? offset : -offset);
    }

    return (
      <Primitive.span
        {...rest}
        ref={composedRefs}
        style={{
          ...rest.style,
          ['--structyl-slider-thumb-transform' as string]:
            orientation.size === 'width' ? 'translateX(-50%)' : 'translateY(50%)',
        }}
        onPointerDown={composeEventHandlers(rest.onPointerDown, (event) => {
          const target = event.target as HTMLElement;
          target.setPointerCapture(event.pointerId);
          event.preventDefault();
          const value = getValueFromPointer(
            orientation.size === 'width' ? event.clientX : event.clientY,
          );
          onSlideStart?.(value);
        })}
        onPointerMove={composeEventHandlers(rest.onPointerMove, (event) => {
          const target = event.target as HTMLElement;
          if (target.hasPointerCapture(event.pointerId)) {
            const value = getValueFromPointer(
              orientation.size === 'width' ? event.clientX : event.clientY,
            );
            onSlideMove?.(value);
          }
        })}
        onPointerUp={composeEventHandlers(rest.onPointerUp, (event) => {
          const target = event.target as HTMLElement;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
            rectRef.current = null;
            onSlideEnd?.();
          }
        })}
        onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
          if (event.key === 'Home') {
            onHomeKeyDown(event);
            event.preventDefault();
          } else if (event.key === 'End') {
            onEndKeyDown(event);
            event.preventDefault();
          } else if (SLIDER_KEYS[orientation.startEdge].includes(event.key)) {
            const isBackKey = BACK_KEYS[orientation.startEdge].includes(event.key);
            onStepKeyDown({ event, direction: isBackKey ? -1 : 1 });
            event.preventDefault();
          }
        })}
      />
    );
  },
);
SliderImpl.displayName = 'Slider.Impl';

/* ─── Track / Range / Thumb ──────────────────────────────────────────── */

const Track = React.forwardRef<HTMLSpanElement, SliderTrackProps>(
  (props, forwardedRef) => {
    const ctx = useSliderContext('Slider.Track');
    return (
      <Primitive.span
        data-disabled={ctx.disabled ? '' : undefined}
        data-orientation={ctx.orientation}
        {...props}
        ref={forwardedRef}
      />
    );
  },
);
Track.displayName = 'Slider.Track';

const Range = React.forwardRef<HTMLSpanElement, SliderRangeProps>(
  (props, forwardedRef) => {
    const ctx = useSliderContext('Slider.Range');
    const orientation = useOrientationContext('Slider.Range');
    const valueA = ctx.values.length > 1 ? Math.min(...ctx.values) : ctx.min;
    const valueB = ctx.values.length > 1 ? Math.max(...ctx.values) : ctx.values[0] ?? ctx.min;
    const offsetStart = 100 - convertValueToPercentage(valueA, ctx.min, ctx.max);
    const offsetEnd = 100 - convertValueToPercentage(valueB, ctx.min, ctx.max);

    return (
      <Primitive.span
        data-orientation={ctx.orientation}
        data-disabled={ctx.disabled ? '' : undefined}
        {...props}
        ref={forwardedRef}
        style={{
          ...props.style,
          [orientation.startEdge]: `${ctx.values.length === 1 ? 0 : offsetStart}%`,
          [orientation.endEdge]: `${offsetEnd}%`,
        }}
      />
    );
  },
);
Range.displayName = 'Slider.Range';

const Thumb = React.forwardRef<HTMLSpanElement, SliderThumbProps>(
  (props, forwardedRef) => {
    const { thumbs } = useSliderContext('Slider.Thumb');
    const [thumb, setThumb] = React.useState<HTMLSpanElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, setThumb);
    const index = React.useMemo(
      () => (thumb ? Array.from(thumbs).indexOf(thumb) : -1),
      [thumbs, thumb],
    );
    React.useEffect(() => {
      if (!thumb) return undefined;
      thumbs.add(thumb);
      return () => {
        thumbs.delete(thumb);
      };
    }, [thumb, thumbs]);
    return <SliderThumbImpl {...props} ref={composedRefs} index={index} />;
  },
);
Thumb.displayName = 'Slider.Thumb';

const SliderThumbImpl = React.forwardRef<HTMLSpanElement, SliderThumbProps & { index: number }>(
  (props, forwardedRef) => {
    const { index, ...thumbProps } = props;
    const ctx = useSliderContext('Slider.Thumb');
    const orientation = useOrientationContext('Slider.Thumb');
    const value = ctx.values[index];
    const percent = value === undefined ? 0 : convertValueToPercentage(value, ctx.min, ctx.max);
    const label = getLabel(index, ctx.values.length);
    const orientationSize = orientation.size === 'width' ? 'width' : 'height';
    const ref = React.useRef<HTMLSpanElement>(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);

    return (
      <span
        style={{
          transform: 'var(--structyl-slider-thumb-transform)',
          position: 'absolute',
          [orientation.startEdge]: `calc(${percent}% + ${0}px)`,
        }}
      >
        <Primitive.span
          role="slider"
          aria-label={thumbProps['aria-label'] || label}
          aria-valuemin={ctx.min}
          aria-valuenow={value}
          aria-valuemax={ctx.max}
          aria-orientation={ctx.orientation}
          data-orientation={ctx.orientation}
          data-disabled={ctx.disabled ? '' : undefined}
          tabIndex={ctx.disabled ? undefined : 0}
          {...thumbProps}
          ref={composedRefs}
          style={{
            ...(value === undefined ? { display: 'none' } : {}),
            ...thumbProps.style,
          }}
          onFocus={composeEventHandlers(thumbProps.onFocus, () => {
            ctx.valueIndexToChangeRef.current = index;
          })}
          // disable double-percent transform for vertical
          aria-valuetext={String(value)}
          // Hint for vertical orientation
          {...(orientationSize ? {} : {})}
        />
      </span>
    );
  },
);
SliderThumbImpl.displayName = 'Slider.ThumbImpl';

/* ─── BubbleInput (hidden form input) ────────────────────────────────── */

const BubbleInput: React.FC<{ name: string; value: number }> = ({ name, value }) => {
  return (
    <input
      type="number"
      name={name}
      value={value}
      aria-hidden
      tabIndex={-1}
      readOnly
      style={{
        display: 'none',
      }}
    />
  );
};

/* ─── helpers ─────────────────────────────────────────────────────────── */

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getNextSortedValues(prevValues: number[] = [], nextValue: number, atIndex: number) {
  const nextValues = [...prevValues];
  nextValues[atIndex] = nextValue;
  return nextValues.slice().sort((a, b) => a - b);
}

function convertValueToPercentage(value: number, min: number, max: number) {
  const maxSteps = max - min;
  const percentPerStep = 100 / maxSteps;
  const percentage = percentPerStep * (value - min);
  return clamp(percentage, 0, 100);
}

function getLabel(index: number, totalValues: number): string | undefined {
  if (totalValues > 2) return `Value ${index + 1} of ${totalValues}`;
  if (totalValues === 2) return ['Minimum', 'Maximum'][index];
  return undefined;
}

function getClosestValueIndex(values: number[], nextValue: number) {
  const distances = values.map((v) => Math.abs(v - nextValue));
  const closestDistance = Math.min(...distances);
  return distances.indexOf(closestDistance);
}

function hasMinStepsBetweenValues(values: number[], minStepsBetweenValues: number) {
  if (minStepsBetweenValues > 0) {
    const stepsBetweenValues = values
      .slice()
      .sort((a, b) => a - b)
      .map((v, i, arr) => (i === 0 ? 0 : v - (arr[i - 1] ?? 0)));
    const actualMinSteps = Math.min(...stepsBetweenValues.slice(1));
    return actualMinSteps >= minStepsBetweenValues;
  }
  return true;
}

function linearScale(input: readonly [number, number], output: readonly [number, number]) {
  return (value: number) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}

function getDecimalCount(value: number) {
  return (String(value).split('.')[1] || '').length;
}

function roundValue(value: number, decimalCount: number) {
  const rounder = Math.pow(10, decimalCount);
  return Math.round(value * rounder) / rounder;
}

export { Root, Track, Range, Thumb };
