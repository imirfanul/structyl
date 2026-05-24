'use client';

import * as React from 'react';
import { createContext, Primitive } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';
import {
  createPickerChangeContext,
  dateToTimeValue,
  pad,
  timeValueToDate,
  validateTimeValue,
  type PickerChangeContext,
  type PickerFormatDensity,
  type PickerLocaleText,
  type PickerOrientation,
  type PickerSelectedSections,
  type PickerSlotProps,
  type PickerSlots,
  type PickerSx,
  type TimePickerView,
  type TimeSteps,
  type TimeValidationError,
  type TimeValue as PickerTimeValue,
} from '../picker-utils';

export type TimeValue = PickerTimeValue;
export type TimePickerValue = Date | TimeValue | null | undefined;
export type TimePickerFormat = Intl.DateTimeFormatOptions | string;

export type TimePickerViewRenderer = (params: {
  view: TimePickerView;
  value: Date | null;
  onChange: (value: Date | null) => void;
}) => React.ReactNode;

interface TimePickerContextValue {
  value: TimeValue | undefined;
  dateValue: Date | undefined;
  onValueChange: (v: TimeValue) => void;
  onDateChange: (v: Date | undefined) => void;
  hour12: boolean;
  withSeconds: boolean;
  disabled?: boolean;
}

const [TimePickerProvider, useTimePickerContext] =
  createContext<TimePickerContextValue>('TimePicker');

export interface TimePickerRootProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'defaultValue' | 'onChange' | 'onError'> {
  asChild?: boolean;
  value?: TimePickerValue;
  defaultValue?: TimePickerValue;
  onChange?: (
    value: Date | null,
    context: PickerChangeContext<TimeValidationError>,
  ) => void;
  onValueChange?: (v: TimeValue) => void;
  onAccept?: (
    value: Date | null,
    context: PickerChangeContext<TimeValidationError>,
  ) => void;
  onError?: (error: TimeValidationError | null, value: Date | null) => void;
  hour12?: boolean;
  withSeconds?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  ampm?: boolean;
  ampmInClock?: boolean;
  autoFocus?: boolean;
  closeOnSelect?: boolean;
  desktopModeMediaQuery?: string;
  disableFuture?: boolean;
  disableIgnoringDatePartForTimeValidation?: boolean;
  disableOpenPicker?: boolean;
  disablePast?: boolean;
  format?: TimePickerFormat;
  formatDensity?: PickerFormatDensity;
  inputRef?: React.Ref<HTMLInputElement>;
  keepOpenDuringFieldFocus?: boolean;
  label?: React.ReactNode;
  locale?: string;
  localeText?: PickerLocaleText;
  maxTime?: Date;
  minTime?: Date;
  minutesStep?: number;
  name?: string;
  onClose?: () => void;
  onOpen?: () => void;
  onSelectedSectionsChange?: (newValue: PickerSelectedSections) => void;
  onViewChange?: (view: TimePickerView) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openTo?: TimePickerView;
  orientation?: PickerOrientation;
  readOnlyInput?: boolean;
  reduceAnimations?: boolean;
  referenceDate?: Date;
  selectedSections?: PickerSelectedSections;
  defaultSelectedSections?: PickerSelectedSections;
  shouldDisableTime?: (value: Date, view: TimePickerView) => boolean;
  skipDisabled?: boolean;
  slotProps?: PickerSlotProps;
  slots?: PickerSlots;
  sx?: PickerSx;
  thresholdToRenderTimeInASingleColumn?: number;
  timeSteps?: TimeSteps;
  timezone?: string;
  view?: TimePickerView;
  defaultView?: TimePickerView;
  viewRenderers?: Partial<Record<TimePickerView, TimePickerViewRenderer | null>>;
  views?: TimePickerView[];
}

const Root = React.forwardRef<HTMLDivElement, TimePickerRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onChange,
      onValueChange,
      onAccept,
      onError,
      hour12,
      withSeconds = false,
      disabled,
      readOnly,
      ampm,
      ampmInClock,
      autoFocus,
      closeOnSelect = false,
      desktopModeMediaQuery,
      disableFuture,
      disableIgnoringDatePartForTimeValidation,
      disableOpenPicker,
      disablePast,
      format,
      formatDensity,
      inputRef,
      keepOpenDuringFieldFocus,
      label,
      locale,
      localeText,
      maxTime,
      minTime,
      minutesStep,
      name,
      onClose,
      onOpen,
      open,
      defaultOpen,
      onOpenChange,
      onSelectedSectionsChange,
      onViewChange,
      openTo = 'hours',
      orientation,
      readOnlyInput,
      reduceAnimations,
      referenceDate,
      selectedSections: selectedSectionsProp,
      defaultSelectedSections,
      shouldDisableTime,
      skipDisabled,
      slotProps,
      slots,
      sx,
      thresholdToRenderTimeInASingleColumn,
      timeSteps,
      timezone,
      view: viewProp,
      defaultView,
      viewRenderers,
      views,
      ...rest
    } = props;
    void [
      ampmInClock,
      autoFocus,
      desktopModeMediaQuery,
      disableOpenPicker,
      format,
      formatDensity,
      inputRef,
      keepOpenDuringFieldFocus,
      label,
      locale,
      localeText,
      name,
      onClose,
      onOpen,
      open,
      defaultOpen,
      onOpenChange,
      orientation,
      readOnlyInput,
      reduceAnimations,
      skipDisabled,
      slotProps,
      slots,
      sx,
      thresholdToRenderTimeInASingleColumn,
      timezone,
      viewRenderers,
      views,
    ];
    const isHour12 = ampm ?? hour12 ?? false;
    const normalizedValue = normalizeTimePickerValue(valueProp, referenceDate, isHour12);
    const normalizedDefaultValue = normalizeTimePickerValue(defaultValue, referenceDate, isHour12);
    const [dateValue, setDateValue] = useControllableState<Date | undefined>({
      prop: normalizedValue,
      defaultProp: normalizedDefaultValue,
    });
    const [, setSelectedSections] = useControllableState<PickerSelectedSections>({
      prop: selectedSectionsProp,
      defaultProp: defaultSelectedSections,
      onChange: onSelectedSectionsChange,
    });
    const [, setView] = useControllableState<TimePickerView>({
      prop: viewProp,
      defaultProp: defaultView ?? openTo,
      onChange: onViewChange,
    });
    const validationOptions = React.useMemo(
      () => ({
        minTime,
        maxTime,
        disablePast,
        disableFuture,
        minutesStep: minutesStep ?? timeSteps?.minutes,
        disableIgnoringDatePartForTimeValidation,
        shouldDisableTime,
      }),
      [
        minTime,
        maxTime,
        disablePast,
        disableFuture,
        minutesStep,
        timeSteps,
        disableIgnoringDatePartForTimeValidation,
        shouldDisableTime,
      ],
    );
    const validationError = validateTimeValue(dateValue ?? null, validationOptions);
    const lastValidationError = React.useRef<TimeValidationError | null>(validationError);

    React.useEffect(() => {
      if (lastValidationError.current !== validationError) {
        lastValidationError.current = validationError;
        onError?.(validationError, dateValue ?? null);
      }
    }, [dateValue, onError, validationError]);

    const commitDate = React.useCallback(
      (nextDate: Date | undefined) => {
        if (readOnly || disabled) return;
        const nextValue = nextDate ?? null;
        const nextError = validateTimeValue(nextValue, validationOptions);
        const context = createPickerChangeContext<TimeValidationError>(nextError, 'view');
        setDateValue(nextDate);
        if (nextDate) onValueChange?.(dateToTimeValue(nextDate, isHour12));
        onChange?.(nextValue, context);
        if (closeOnSelect) onAccept?.(nextValue, context);
      },
      [
        closeOnSelect,
        disabled,
        isHour12,
        onAccept,
        onChange,
        onValueChange,
        readOnly,
        setDateValue,
        validationOptions,
      ],
    );

    return (
      <TimePickerProvider
        value={dateValue ? dateToTimeValue(dateValue, isHour12) : undefined}
        dateValue={dateValue}
        onValueChange={(v) => {
          const nextDate = timeValueToDate(v, dateValue ?? referenceDate ?? new Date());
          commitDate(nextDate);
          setSelectedSections('minutes');
          setView(withSeconds ? 'seconds' : 'minutes');
        }}
        onDateChange={commitDate}
        hour12={isHour12}
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
      const current = value ?? { hour: ctx.hour12 ? 12 : 0, minute: 0, second: 0, period: 'am' };
      ctx.onValueChange({ ...current, ...next });
    };
    const adjust = (delta: number) => {
      const v = value ?? { hour: ctx.hour12 ? 12 : 0, minute: 0, second: 0, period: 'am' };
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

const Value: React.FC<{
  format?: TimePickerFormat;
  locale?: string;
  placeholder?: React.ReactNode;
}> = ({ format = { timeStyle: 'short' }, locale, placeholder = 'Pick a time' }) => {
  const ctx = useTimePickerContext('TimePicker.Value');
  if (!ctx.dateValue) return <>{placeholder}</>;
  if (typeof format !== 'string') {
    return <>{new Intl.DateTimeFormat(locale, format).format(ctx.dateValue)}</>;
  }
  return <>{formatTime(ctx.dateValue, format, ctx.hour12)}</>;
};
Value.displayName = 'TimePicker.Value';

function normalizeTimePickerValue(
  value: TimePickerValue,
  referenceDate: Date | undefined,
  hour12: boolean,
) {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  const normalized = hour12 && !value.period
    ? { ...value, period: value.hour >= 12 ? ('pm' as const) : ('am' as const) }
    : value;
  return timeValueToDate(normalized, referenceDate ?? new Date());
}

function formatSegment(segment: Segment, v: TimeValue | undefined, hour12: boolean) {
  if (!v) return '--';
  if (segment === 'hour') return hour12 ? String(v.hour || 12) : pad(v.hour);
  if (segment === 'minute') return pad(v.minute);
  if (segment === 'second') return pad(v.second ?? 0);
  if (segment === 'period') return v.period === 'pm' ? 'PM' : 'AM';
  return '--';
}

function formatTime(value: Date, format: string, hour12: boolean) {
  const time = dateToTimeValue(value, hour12);
  return format.replace(/HH|H|hh|h|mm|m|ss|s|aa|a/g, (token) => {
    if (token === 'HH') return pad(value.getHours());
    if (token === 'H') return String(value.getHours());
    if (token === 'hh') return pad(time.hour);
    if (token === 'h') return String(time.hour);
    if (token === 'mm') return pad(value.getMinutes());
    if (token === 'm') return String(value.getMinutes());
    if (token === 'ss') return pad(value.getSeconds());
    if (token === 's') return String(value.getSeconds());
    if (token === 'aa') return time.period === 'pm' ? 'pm' : 'am';
    return time.period === 'pm' ? 'PM' : 'AM';
  });
}

export { Root, SegmentField as Segment, Value };
