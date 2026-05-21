'use client';

import * as React from 'react';
import { createContext, Primitive } from '@your-lib/core';
import { useControllableState } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';

export interface TimeValue {
  hour: number;
  minute: number;
  second?: number;
  period?: 'am' | 'pm';
}

interface TimePickerContextValue {
  value: TimeValue | undefined;
  onValueChange: (v: TimeValue) => void;
  hour12: boolean;
  withSeconds: boolean;
  disabled?: boolean;
}

const [TimePickerProvider, useTimePickerContext] = createContext<TimePickerContextValue>('TimePicker');

export interface TimePickerRootProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'defaultValue'> {
  asChild?: boolean;
  value?: TimeValue;
  defaultValue?: TimeValue;
  onValueChange?: (v: TimeValue) => void;
  hour12?: boolean;
  withSeconds?: boolean;
  disabled?: boolean;
}

const Root = React.forwardRef<HTMLDivElement, TimePickerRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange,
      hour12 = false,
      withSeconds = false,
      disabled,
      ...rest
    } = props;
    const [value, setValue] = useControllableState<TimeValue | undefined>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange as (v: TimeValue | undefined) => void,
    });
    return (
      <TimePickerProvider
        value={value}
        onValueChange={(v) => setValue(v)}
        hour12={hour12}
        withSeconds={withSeconds}
        disabled={disabled}
      >
        <Primitive.div role="group" {...rest} ref={forwardedRef} />
      </TimePickerProvider>
    );
  },
);
Root.displayName = 'TimePicker.Root';

type Segment = 'hour' | 'minute' | 'second' | 'period';

export interface SegmentProps extends React.ComponentPropsWithoutRef<'span'> {
  segment: Segment;
}

const SegmentField = React.forwardRef<HTMLSpanElement, SegmentProps>(
  (props, forwardedRef) => {
    const { segment, ...rest } = props;
    const ctx = useTimePickerContext('TimePicker.Segment');
    const value = ctx.value;
    const formatted = formatSegment(segment, value, ctx.hour12);
    const setSegment = (next: Partial<TimeValue>) => {
      const current = value ?? { hour: 0, minute: 0, second: 0, period: 'am' };
      ctx.onValueChange({ ...current, ...next });
    };
    const adjust = (delta: number) => {
      const v = value ?? { hour: 0, minute: 0, second: 0, period: 'am' };
      if (segment === 'hour') {
        const max = ctx.hour12 ? 12 : 23;
        const min = ctx.hour12 ? 1 : 0;
        let next = v.hour + delta;
        if (next > max) next = min;
        if (next < min) next = max;
        setSegment({ hour: next });
      } else if (segment === 'minute') {
        let next = v.minute + delta;
        if (next > 59) next = 0;
        if (next < 0) next = 59;
        setSegment({ minute: next });
      } else if (segment === 'second') {
        let next = (v.second ?? 0) + delta;
        if (next > 59) next = 0;
        if (next < 0) next = 59;
        setSegment({ second: next });
      } else if (segment === 'period') {
        setSegment({ period: v.period === 'am' ? 'pm' : 'am' });
      }
    };
    return (
      <Primitive.span
        role="spinbutton"
        aria-label={segment}
        tabIndex={ctx.disabled ? -1 : 0}
        contentEditable={false}
        aria-valuetext={formatted}
        data-segment={segment}
        {...rest}
        ref={forwardedRef}
        onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
          if (event.key === 'ArrowUp') {
            event.preventDefault();
            adjust(1);
          } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            adjust(-1);
          }
        })}
      >
        {formatted}
      </Primitive.span>
    );
  },
);
SegmentField.displayName = 'TimePicker.Segment';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function formatSegment(segment: Segment, v: TimeValue | undefined, hour12: boolean) {
  if (!v) return '--';
  if (segment === 'hour') return hour12 ? String(v.hour || 12) : pad(v.hour);
  if (segment === 'minute') return pad(v.minute);
  if (segment === 'second') return pad(v.second ?? 0);
  if (segment === 'period') return v.period === 'pm' ? 'PM' : 'AM';
  return '--';
}

export { Root, SegmentField as Segment };
