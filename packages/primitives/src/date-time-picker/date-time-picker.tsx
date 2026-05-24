'use client';

import * as React from 'react';
import { createContext, Primitive } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';
import * as PopoverPrimitive from '../popover';
import * as CalendarPrimitive from '../calendar';
import {
  applyTimePart,
  createPickerChangeContext,
  dateToTimeValue,
  mergeDateAndTime,
  pad,
  validateDateTimeValue,
  type DateTimePickerView,
  type DateTimeValidationError,
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
  type TimeValue,
} from '../picker-utils';

export type DateTimePickerFormat = Intl.DateTimeFormatOptions | string;

export type DateTimePickerViewRenderer = (params: {
  view: DateTimePickerView;
  value: Date | null;
  onChange: (value: Date | null) => void;
}) => React.ReactNode;

interface DateTimePickerContextValue {
  value: Date | undefined;
  onValueChange: (date: Date | undefined) => void;
  onTimePartChange: (part: Partial<TimeValue>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calendarProps: Pick<
    CalendarPrimitive.CalendarRootProps,
    | 'minDate'
    | 'maxDate'
    | 'disablePast'
    | 'disableFuture'
    | 'disabledDays'
    | 'shouldDisableDate'
    | 'shouldDisableMonth'
    | 'shouldDisableYear'
    | 'weekStartsOn'
    | 'locale'
    | 'disabled'
    | 'disableHighlightToday'
    | 'displayWeekNumber'
    | 'fixedWeekNumber'
    | 'showDaysOutsideCurrentMonth'
    | 'dayOfWeekFormatter'
    | 'onMonthChange'
    | 'onYearChange'
  >;
  readOnly?: boolean;
  closeOnSelect: boolean;
  loading?: boolean;
  renderLoading?: () => React.ReactNode;
  localeText?: PickerLocaleText;
  ampm: boolean;
  withSeconds: boolean;
}

const [DateTimePickerProvider, useDateTimePickerContext] =
  createContext<DateTimePickerContextValue>('DateTimePicker');

export interface DateTimePickerRootProps {
  children?: React.ReactNode;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (
    value: Date | null,
    context: PickerChangeContext<DateTimeValidationError>,
  ) => void;
  onValueChange?: (value: Date | undefined) => void;
  onAccept?: (
    value: Date | null,
    context: PickerChangeContext<DateTimeValidationError>,
  ) => void;
  onError?: (error: DateTimeValidationError | null, value: Date | null) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnSelect?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  minDate?: Date;
  maxDate?: Date;
  minDateTime?: Date;
  maxDateTime?: Date;
  minTime?: Date;
  maxTime?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  disabledDays?: (date: Date) => boolean;
  shouldDisableDate?: (date: Date) => boolean;
  shouldDisableMonth?: (date: Date) => boolean;
  shouldDisableYear?: (date: Date) => boolean;
  shouldDisableTime?: (value: Date, view: TimePickerView) => boolean;
  weekStartsOn?: number;
  locale?: string;
  ampm?: boolean;
  ampmInClock?: boolean;
  autoFocus?: boolean;
  dayOfWeekFormatter?: (date: Date) => string;
  desktopModeMediaQuery?: string;
  disableHighlightToday?: boolean;
  disableIgnoringDatePartForTimeValidation?: boolean;
  disableOpenPicker?: boolean;
  displayWeekNumber?: boolean;
  fixedWeekNumber?: number;
  format?: DateTimePickerFormat;
  formatDensity?: PickerFormatDensity;
  inputRef?: React.Ref<HTMLInputElement>;
  keepOpenDuringFieldFocus?: boolean;
  label?: React.ReactNode;
  loading?: boolean;
  localeText?: PickerLocaleText;
  minutesStep?: number;
  monthsPerRow?: 3 | 4;
  name?: string;
  onMonthChange?: (month: Date) => void;
  onSelectedSectionsChange?: (newValue: PickerSelectedSections) => void;
  onViewChange?: (view: DateTimePickerView) => void;
  onYearChange?: (year: Date) => void;
  openTo?: DateTimePickerView;
  orientation?: PickerOrientation;
  reduceAnimations?: boolean;
  referenceDate?: Date;
  renderLoading?: () => React.ReactNode;
  selectedSections?: PickerSelectedSections;
  defaultSelectedSections?: PickerSelectedSections;
  showDaysOutsideCurrentMonth?: boolean;
  skipDisabled?: boolean;
  slotProps?: PickerSlotProps;
  slots?: PickerSlots;
  sx?: PickerSx;
  thresholdToRenderTimeInASingleColumn?: number;
  timeSteps?: TimeSteps;
  timezone?: string;
  view?: DateTimePickerView;
  defaultView?: DateTimePickerView;
  viewRenderers?: Partial<Record<DateTimePickerView, DateTimePickerViewRenderer | null>>;
  views?: DateTimePickerView[];
  yearsOrder?: 'asc' | 'desc';
  yearsPerRow?: 3 | 4;
}

const Root: React.FC<DateTimePickerRootProps> = ({
  value: valueProp,
  defaultValue,
  onChange,
  onValueChange,
  onAccept,
  onError,
  open: openProp,
  defaultOpen,
  onOpenChange,
  onOpen,
  onClose,
  closeOnSelect = false,
  disabled,
  readOnly,
  minDate,
  maxDate,
  minDateTime,
  maxDateTime,
  minTime,
  maxTime,
  disablePast,
  disableFuture,
  disabledDays,
  shouldDisableDate,
  shouldDisableMonth,
  shouldDisableYear,
  shouldDisableTime,
  weekStartsOn,
  locale,
  ampm = false,
  dayOfWeekFormatter,
  disableHighlightToday,
  disableIgnoringDatePartForTimeValidation,
  displayWeekNumber,
  fixedWeekNumber,
  loading,
  minutesStep,
  onMonthChange,
  onSelectedSectionsChange,
  onViewChange,
  onYearChange,
  openTo = 'day',
  referenceDate,
  renderLoading,
  selectedSections: selectedSectionsProp,
  defaultSelectedSections,
  showDaysOutsideCurrentMonth,
  timeSteps,
  localeText,
  view: viewProp,
  defaultView,
  children,
}) => {
  const normalizedValue = valueProp === null ? undefined : valueProp;
  const normalizedDefaultValue = defaultValue === null ? undefined : defaultValue;
  const validationOptions = React.useMemo(
    () => ({
      minDate,
      maxDate,
      minDateTime,
      maxDateTime,
      minTime,
      maxTime,
      disablePast,
      disableFuture,
      minutesStep: minutesStep ?? timeSteps?.minutes,
      disableIgnoringDatePartForTimeValidation,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableYear,
      shouldDisableTime,
    }),
    [
      minDate,
      maxDate,
      minDateTime,
      maxDateTime,
      minTime,
      maxTime,
      disablePast,
      disableFuture,
      minutesStep,
      timeSteps,
      disableIgnoringDatePartForTimeValidation,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableYear,
      shouldDisableTime,
    ],
  );
  const [value, setValue] = useControllableState<Date | undefined>({
    prop: normalizedValue,
    defaultProp: normalizedDefaultValue,
  });
  const [open = false, setOpenState] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
  });
  const [, setSelectedSections] = useControllableState<PickerSelectedSections>({
    prop: selectedSectionsProp,
    defaultProp: defaultSelectedSections,
    onChange: onSelectedSectionsChange,
  });
  const [, setView] = useControllableState<DateTimePickerView>({
    prop: viewProp,
    defaultProp: defaultView ?? openTo,
    onChange: onViewChange,
  });

  const validationError = validateDateTimeValue(value ?? null, validationOptions);
  const lastValidationError = React.useRef<DateTimeValidationError | null>(validationError);

  React.useEffect(() => {
    if (lastValidationError.current !== validationError) {
      lastValidationError.current = validationError;
      onError?.(validationError, value ?? null);
    }
  }, [onError, validationError, value]);

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      setOpenState(nextOpen);
      onOpenChange?.(nextOpen);
      if (nextOpen) onOpen?.();
      else onClose?.();
    },
    [onClose, onOpen, onOpenChange, setOpenState],
  );

  const commitValue = React.useCallback(
    (date: Date | undefined) => {
      if (readOnly || disabled) return;
      const nextValue = date ?? null;
      const nextError = validateDateTimeValue(nextValue, validationOptions);
      const context = createPickerChangeContext<DateTimeValidationError>(nextError, 'view');
      setValue(date);
      setSelectedSections(date ? 'day' : null);
      onValueChange?.(date);
      onChange?.(nextValue, context);
      if (closeOnSelect) {
        onAccept?.(nextValue, context);
        if (date) setOpen(false);
      }
    },
    [
      closeOnSelect,
      disabled,
      onAccept,
      onChange,
      onValueChange,
      readOnly,
      setOpen,
      setSelectedSections,
      setValue,
      validationOptions,
    ],
  );

  return (
    <DateTimePickerProvider
      value={value}
      onValueChange={commitValue}
      onTimePartChange={(part) => {
        const nextValue = applyTimePart(value, part, referenceDate ?? new Date());
        commitValue(nextValue);
        setSelectedSections(part.second != null ? 'seconds' : 'minutes');
        setView(part.second != null ? 'seconds' : 'minutes');
      }}
      open={open}
      onOpenChange={setOpen}
      calendarProps={{
        minDate,
        maxDate,
        disablePast,
        disableFuture,
        disabledDays,
        shouldDisableDate,
        shouldDisableMonth,
        shouldDisableYear,
        weekStartsOn,
        locale,
        disabled,
        disableHighlightToday,
        displayWeekNumber,
        fixedWeekNumber,
        showDaysOutsideCurrentMonth,
        dayOfWeekFormatter,
        onMonthChange,
        onYearChange,
      }}
      readOnly={readOnly}
      closeOnSelect={closeOnSelect}
      loading={loading}
      renderLoading={renderLoading}
      localeText={localeText}
      ampm={ampm}
      withSeconds={(timeSteps?.seconds ?? 0) > 0}
    >
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        {children}
      </PopoverPrimitive.Root>
    </DateTimePickerProvider>
  );
};
Root.displayName = 'DateTimePicker.Root';

const Trigger = PopoverPrimitive.Trigger;
const Portal = PopoverPrimitive.Portal;
const Anchor = PopoverPrimitive.Anchor;

const Content = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>((props, forwardedRef) => <PopoverPrimitive.Content {...props} ref={forwardedRef} />);
Content.displayName = 'DateTimePicker.Content';

const Calendar = React.forwardRef<
  HTMLDivElement,
  Omit<CalendarPrimitive.CalendarRootProps, 'selected' | 'onSelect' | 'mode'>
>((props, forwardedRef) => {
  const ctx = useDateTimePickerContext('DateTimePicker.Calendar');
  const { disabled: calendarDisabled, ...calendarProps } = ctx.calendarProps;
  return (
    <CalendarPrimitive.Root
      ref={forwardedRef}
      mode="single"
      selected={ctx.value}
      onSelect={(v) => {
        if (v instanceof Date) {
          ctx.onValueChange(ctx.value ? mergeDateAndTime(v, ctx.value) : mergeDateAndTime(v, new Date()));
        }
      }}
      disabled={calendarDisabled || ctx.readOnly}
      {...calendarProps}
      {...props}
    />
  );
});
Calendar.displayName = 'DateTimePicker.Calendar';

type Segment = 'hour' | 'minute' | 'second' | 'period';

export interface SegmentProps extends React.ComponentPropsWithoutRef<'span'> {
  segment: Segment;
}

const SegmentField = React.forwardRef<HTMLSpanElement, SegmentProps>(
  ({ segment, ...props }, forwardedRef) => {
    const ctx = useDateTimePickerContext('DateTimePicker.Segment');
    const time = ctx.value ? dateToTimeValue(ctx.value, ctx.ampm) : undefined;
    const formatted = formatSegment(segment, time, ctx.ampm);
    const adjust = (delta: number) => {
      const current = time ?? { hour: ctx.ampm ? 12 : 0, minute: 0, second: 0, period: 'am' };
      if (segment === 'hour') {
        const max = ctx.ampm ? 12 : 23;
        const min = ctx.ampm ? 1 : 0;
        let next = current.hour + delta;
        if (next > max) next = min;
        if (next < min) next = max;
        ctx.onTimePartChange({ hour: next, period: current.period });
      } else if (segment === 'minute') {
        let next = current.minute + delta;
        if (next > 59) next = 0;
        if (next < 0) next = 59;
        ctx.onTimePartChange({ minute: next });
      } else if (segment === 'second') {
        let next = (current.second ?? 0) + delta;
        if (next > 59) next = 0;
        if (next < 0) next = 59;
        ctx.onTimePartChange({ second: next });
      } else {
        ctx.onTimePartChange({ period: current.period === 'pm' ? 'am' : 'pm' });
      }
    };
    return (
      <Primitive.span
        role="spinbutton"
        aria-label={segment}
        tabIndex={ctx.readOnly ? -1 : 0}
        aria-valuetext={formatted}
        data-segment={segment}
        {...props}
        ref={forwardedRef}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
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
SegmentField.displayName = 'DateTimePicker.Segment';

const Loading: React.FC = () => {
  const ctx = useDateTimePickerContext('DateTimePicker.Loading');
  return <>{ctx.renderLoading?.() ?? ctx.localeText?.loading ?? 'Loading...'}</>;
};
Loading.displayName = 'DateTimePicker.Loading';

const Value: React.FC<{
  format?: DateTimePickerFormat;
  locale?: string;
  placeholder?: React.ReactNode;
}> = ({ format = { dateStyle: 'medium', timeStyle: 'short' }, locale, placeholder = 'Pick date and time' }) => {
  const ctx = useDateTimePickerContext('DateTimePicker.Value');
  if (!ctx.value) return <>{placeholder}</>;
  if (typeof format !== 'string') {
    return <>{new Intl.DateTimeFormat(locale, format).format(ctx.value)}</>;
  }
  return <>{formatDateTime(ctx.value, format, locale, ctx.ampm)}</>;
};
Value.displayName = 'DateTimePicker.Value';

function formatSegment(segment: Segment, v: TimeValue | undefined, hour12: boolean) {
  if (!v) return '--';
  if (segment === 'hour') return hour12 ? String(v.hour || 12) : pad(v.hour);
  if (segment === 'minute') return pad(v.minute);
  if (segment === 'second') return pad(v.second ?? 0);
  if (segment === 'period') return v.period === 'pm' ? 'PM' : 'AM';
  return '--';
}

function formatDateTime(date: Date, format: string, locale: string | undefined, hour12: boolean) {
  const time = dateToTimeValue(date, hour12);
  return format.replace(/yyyy|YYYY|MMMM|MMM|MM|M|dd|DD|d|HH|H|hh|h|mm|m|ss|s|aa|a/g, (token) => {
    if (token === 'yyyy' || token === 'YYYY') return String(date.getFullYear());
    if (token === 'MMMM') return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
    if (token === 'MMM') return new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
    if (token === 'MM') return String(date.getMonth() + 1).padStart(2, '0');
    if (token === 'M') return String(date.getMonth() + 1);
    if (token === 'dd' || token === 'DD') return String(date.getDate()).padStart(2, '0');
    if (token === 'd') return String(date.getDate());
    if (token === 'HH') return pad(date.getHours());
    if (token === 'H') return String(date.getHours());
    if (token === 'hh') return pad(time.hour);
    if (token === 'h') return String(time.hour);
    if (token === 'mm') return pad(date.getMinutes());
    if (token === 'm') return String(date.getMinutes());
    if (token === 'ss') return pad(date.getSeconds());
    if (token === 's') return String(date.getSeconds());
    if (token === 'aa') return time.period === 'pm' ? 'pm' : 'am';
    return time.period === 'pm' ? 'PM' : 'AM';
  });
}

export {
  Root,
  Trigger,
  Anchor,
  Portal,
  Content,
  Calendar,
  SegmentField as Segment,
  Loading,
  Value,
};
