'use client';

import * as React from 'react';
import { createContext, Primitive } from '@structyl/core';
import { useControllableState } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';
import * as PopoverPrimitive from '../popover';
import * as CalendarPrimitive from '../calendar';
import {
  addDays,
  createPickerChangeContext,
  isAfterDay,
  startOfDay,
  validateDateValue,
  type DateRangePosition,
  type DateRangeValidationError,
  type PickerChangeContext,
  type PickerFormatDensity,
  type PickerLocaleText,
  type PickerSelectedSections,
  type PickerSlotProps,
  type PickerSlots,
  type PickerSx,
} from '../picker-utils';

export interface DateRange {
  from?: Date;
  to?: Date;
}

export type DateRangeTuple = [Date | null, Date | null];
export type DateRangeValue = DateRange | DateRangeTuple | null | undefined;
export type DateRangePickerFormat = Intl.DateTimeFormatOptions | string;

export interface DateRangePickerShortcut {
  label: React.ReactNode;
  getValue: (today: Date) => DateRangeValue;
  disabled?: boolean;
  closeOnSelect?: boolean;
}

export type DateRangePickerViewRenderer = (params: {
  value: DateRangeTuple;
  onChange: (value: DateRangeTuple) => void;
  rangePosition: DateRangePosition;
}) => React.ReactNode;

interface DateRangePickerContextValue {
  value: DateRange;
  onValueChange: (range: DateRange) => void;
  onShortcutSelect: (shortcut: DateRangePickerShortcut) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calendarProps: Omit<
    Pick<
      CalendarPrimitive.CalendarRootProps,
      | 'minDate'
      | 'maxDate'
      | 'disablePast'
      | 'disableFuture'
      | 'disabledDays'
      | 'shouldDisableDate'
      | 'weekStartsOn'
      | 'locale'
      | 'disabled'
      | 'disableHighlightToday'
      | 'displayWeekNumber'
      | 'fixedWeekNumber'
      | 'showDaysOutsideCurrentMonth'
      | 'dayOfWeekFormatter'
      | 'onMonthChange'
    >,
    'shouldDisableDate'
  > & {
    shouldDisableDate?: (date: Date) => boolean;
  };
  readOnly?: boolean;
  closeOnSelect: boolean;
  loading?: boolean;
  renderLoading?: () => React.ReactNode;
  localeText?: PickerLocaleText;
  rangePosition: DateRangePosition;
}

const [DateRangePickerProvider, useDateRangePickerContext] =
  createContext<DateRangePickerContextValue>('DateRangePicker');

export interface DateRangePickerRootProps {
  children?: React.ReactNode;
  value?: DateRangeValue;
  defaultValue?: DateRangeValue;
  onChange?: (
    range: DateRangeTuple,
    context: PickerChangeContext<DateRangeValidationError>,
  ) => void;
  onValueChange?: (range: DateRange) => void;
  onAccept?: (
    range: DateRangeTuple,
    context: PickerChangeContext<DateRangeValidationError>,
  ) => void;
  onError?: (error: DateRangeValidationError | null, value: DateRangeTuple) => void;
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
  disablePast?: boolean;
  disableFuture?: boolean;
  disabledDays?: (date: Date) => boolean;
  shouldDisableDate?: (date: Date, position: DateRangePosition) => boolean;
  weekStartsOn?: number;
  locale?: string;
  autoFocus?: boolean;
  calendars?: 1 | 2 | 3;
  currentMonthCalendarPosition?: 1 | 2 | 3;
  dayOfWeekFormatter?: (date: Date) => string;
  defaultRangePosition?: DateRangePosition;
  desktopModeMediaQuery?: string;
  disableAutoMonthSwitching?: boolean;
  disableDragEditing?: boolean;
  disableHighlightToday?: boolean;
  disableOpenPicker?: boolean;
  displayWeekNumber?: boolean;
  fixedWeekNumber?: number;
  format?: DateRangePickerFormat;
  formatDensity?: PickerFormatDensity;
  inputRef?: React.Ref<HTMLInputElement>;
  keepOpenDuringFieldFocus?: boolean;
  label?: React.ReactNode;
  loading?: boolean;
  localeText?: PickerLocaleText;
  name?: string;
  onMonthChange?: (month: Date) => void;
  onRangePositionChange?: (rangePosition: DateRangePosition) => void;
  onSelectedSectionsChange?: (newValue: PickerSelectedSections) => void;
  rangePosition?: DateRangePosition;
  referenceDate?: Date | DateRangeTuple;
  renderLoading?: () => React.ReactNode;
  selectedSections?: PickerSelectedSections;
  defaultSelectedSections?: PickerSelectedSections;
  showDaysOutsideCurrentMonth?: boolean;
  slotProps?: PickerSlotProps;
  slots?: PickerSlots;
  sx?: PickerSx;
  timezone?: string;
  viewRenderers?: { day?: DateRangePickerViewRenderer | null };
  shortcuts?: DateRangePickerShortcut[] | false;
}

function normalizeRange(value: DateRangeValue): DateRange | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    const [from, to] = value;
    return { from: from ?? undefined, to: to ?? undefined };
  }
  return value;
}

function rangeToTuple(range: DateRange): DateRangeTuple {
  return [range.from ?? null, range.to ?? null];
}

function validateRange(
  range: DateRange,
  options: {
    minDate?: Date;
    maxDate?: Date;
    disablePast?: boolean;
    disableFuture?: boolean;
    shouldDisableDate?: (date: Date, position: DateRangePosition) => boolean;
  },
): DateRangeValidationError | null {
  const fromError = validateDateValue(range.from, {
    ...options,
    shouldDisableDate: options.shouldDisableDate
      ? (date) => options.shouldDisableDate?.(date, 'start') ?? false
      : undefined,
  });
  if (fromError) return fromError;
  const toError = validateDateValue(range.to, {
    ...options,
    shouldDisableDate: options.shouldDisableDate
      ? (date) => options.shouldDisableDate?.(date, 'end') ?? false
      : undefined,
  });
  if (toError) return toError;
  if (range.from && range.to && isAfterDay(range.from, range.to)) return 'invalidRange';
  return null;
}

const Root: React.FC<DateRangePickerRootProps> = ({
  value: valueProp,
  defaultValue = {},
  onChange,
  onValueChange,
  onAccept,
  onError,
  open: openProp,
  defaultOpen,
  onOpenChange,
  onOpen,
  onClose,
  closeOnSelect = true,
  disabled,
  readOnly,
  minDate,
  maxDate,
  disablePast,
  disableFuture,
  disabledDays,
  shouldDisableDate,
  weekStartsOn,
  locale,
  dayOfWeekFormatter,
  defaultRangePosition = 'start',
  disableHighlightToday,
  displayWeekNumber,
  fixedWeekNumber,
  loading,
  onMonthChange,
  onRangePositionChange,
  onSelectedSectionsChange,
  rangePosition: rangePositionProp,
  renderLoading,
  selectedSections: selectedSectionsProp,
  defaultSelectedSections,
  showDaysOutsideCurrentMonth,
  localeText,
  children,
}) => {
  const normalizedValue = normalizeRange(valueProp);
  const normalizedDefaultValue = normalizeRange(defaultValue) ?? {};
  const validationOptions = React.useMemo(
    () => ({ minDate, maxDate, disablePast, disableFuture, shouldDisableDate }),
    [minDate, maxDate, disablePast, disableFuture, shouldDisableDate],
  );
  const [value = {}, setValue] = useControllableState<DateRange>({
    prop: normalizedValue,
    defaultProp: normalizedDefaultValue,
  });
  const [open = false, setOpenState] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
  });
  const [rangePosition = defaultRangePosition, setRangePosition] =
    useControllableState<DateRangePosition>({
      prop: rangePositionProp,
      defaultProp: defaultRangePosition,
      onChange: onRangePositionChange,
    });
  const [, setSelectedSections] = useControllableState<PickerSelectedSections>({
    prop: selectedSectionsProp,
    defaultProp: defaultSelectedSections,
    onChange: onSelectedSectionsChange,
  });

  const validationError = validateRange(value, validationOptions);
  const lastValidationError = React.useRef<DateRangeValidationError | null | undefined>(undefined);

  React.useEffect(() => {
    if (lastValidationError.current !== validationError) {
      const prev = lastValidationError.current;
      lastValidationError.current = validationError;
      if (prev !== undefined || validationError !== null) {
        onError?.(validationError, rangeToTuple(value));
      }
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

  const commitRange = React.useCallback(
    (
      range: DateRange,
      source: 'view' | 'shortcut' = 'view',
      shortcut?: DateRangePickerShortcut,
    ) => {
      if (readOnly || disabled) return;
      const nextError = validateRange(range, validationOptions);
      const tuple = rangeToTuple(range);
      const context = createPickerChangeContext<DateRangeValidationError>(
        nextError,
        source,
        shortcut ? { label: shortcut.label, value: tuple } : undefined,
      );
      const nextRangePosition = range.from && !range.to ? 'end' : 'start';
      setValue(range);
      setRangePosition(nextRangePosition);
      setSelectedSections(nextRangePosition === 'end' ? 'day' : null);
      onValueChange?.(range);
      onChange?.(tuple, context);
      if (range.from && range.to) {
        onAccept?.(tuple, context);
        if (source === 'shortcut') {
          if (shortcut?.closeOnSelect ?? closeOnSelect) setOpen(false);
        } else if (closeOnSelect) {
          setOpen(false);
        }
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
      setRangePosition,
      setSelectedSections,
      setValue,
      validationOptions,
    ],
  );

  const shouldDisableDateForPosition = React.useCallback(
    (date: Date) => shouldDisableDate?.(date, rangePosition) ?? false,
    [rangePosition, shouldDisableDate],
  );

  return (
    <DateRangePickerProvider
      value={value}
      onValueChange={(range) => commitRange(range)}
      onShortcutSelect={(shortcut) => {
        const normalized = normalizeRange(shortcut.getValue(startOfDay(new Date()))) ?? {};
        commitRange(normalized, 'shortcut', shortcut);
      }}
      open={open}
      onOpenChange={setOpen}
      calendarProps={{
        minDate,
        maxDate,
        disablePast,
        disableFuture,
        disabledDays,
        shouldDisableDate: shouldDisableDateForPosition,
        weekStartsOn,
        locale,
        disabled,
        disableHighlightToday,
        displayWeekNumber,
        fixedWeekNumber,
        showDaysOutsideCurrentMonth,
        dayOfWeekFormatter,
        onMonthChange,
      }}
      readOnly={readOnly}
      closeOnSelect={closeOnSelect}
      loading={loading}
      renderLoading={renderLoading}
      localeText={localeText}
      rangePosition={rangePosition}
    >
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        {children}
      </PopoverPrimitive.Root>
    </DateRangePickerProvider>
  );
};
Root.displayName = 'DateRangePicker.Root';

const Trigger = PopoverPrimitive.Trigger;
const Portal = PopoverPrimitive.Portal;
const Content = PopoverPrimitive.Content;
const Anchor = PopoverPrimitive.Anchor;

const Calendar = React.forwardRef<
  HTMLDivElement,
  Omit<CalendarPrimitive.CalendarRootProps, 'selected' | 'onSelect' | 'mode' | 'shouldDisableDate'>
>((props, forwardedRef) => {
  const ctx = useDateRangePickerContext('DateRangePicker.Calendar');
  const { disabled: calendarDisabled, ...calendarProps } = ctx.calendarProps;
  return (
    <CalendarPrimitive.Root
      ref={forwardedRef}
      mode="range"
      selected={ctx.value}
      onSelect={(v) => {
        if (v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date)) {
          ctx.onValueChange(v as DateRange);
        }
      }}
      disabled={calendarDisabled || ctx.readOnly}
      {...calendarProps}
      {...props}
    />
  );
});
Calendar.displayName = 'DateRangePicker.Calendar';

const Shortcuts = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & {
    shortcuts?: DateRangePickerShortcut[];
  }
>(({ shortcuts = getDefaultDateRangePickerShortcuts(), ...props }, forwardedRef) => {
  const ctx = useDateRangePickerContext('DateRangePicker.Shortcuts');
  return (
    <Primitive.div {...props} ref={forwardedRef}>
      {shortcuts.map((shortcut, index) => (
        <Primitive.button
          key={`${String(shortcut.label)}-${index}`}
          type="button"
          disabled={shortcut.disabled}
          onClick={composeEventHandlers(undefined, () => ctx.onShortcutSelect(shortcut))}
        >
          {shortcut.label}
        </Primitive.button>
      ))}
    </Primitive.div>
  );
});
Shortcuts.displayName = 'DateRangePicker.Shortcuts';

const Loading: React.FC = () => {
  const ctx = useDateRangePickerContext('DateRangePicker.Loading');
  return <>{ctx.renderLoading?.() ?? ctx.localeText?.loading ?? 'Loading...'}</>;
};
Loading.displayName = 'DateRangePicker.Loading';

const Value: React.FC<{
  format?: DateRangePickerFormat;
  formatDensity?: PickerFormatDensity;
  locale?: string;
  separator?: string;
  placeholder?: React.ReactNode;
}> = ({
  format = { dateStyle: 'medium' },
  formatDensity = 'dense',
  locale,
  separator = ' – ',
  placeholder = 'Pick a date range',
}) => {
  const ctx = useDateRangePickerContext('DateRangePicker.Value');
  if (!ctx.value.from) return <>{placeholder}</>;
  if (!ctx.value.to) return <>{formatDate(ctx.value.from, format, locale, formatDensity)}</>;
  return (
    <>
      {`${formatDate(ctx.value.from, format, locale, formatDensity)}${separator}${formatDate(
        ctx.value.to,
        format,
        locale,
        formatDensity,
      )}`}
    </>
  );
};
Value.displayName = 'DateRangePicker.Value';

export function getDefaultDateRangePickerShortcuts(): DateRangePickerShortcut[] {
  return [
    {
      label: 'Today',
      getValue: (today) => [today, today],
    },
    {
      label: 'Yesterday',
      getValue: (today) => {
        const yesterday = addDays(today, -1);
        return [yesterday, yesterday];
      },
    },
    {
      label: 'Last 7 days',
      getValue: (today) => [addDays(today, -6), today],
    },
    {
      label: 'Last 30 days',
      getValue: (today) => [addDays(today, -29), today],
    },
    {
      label: 'This month',
      getValue: (today) => [new Date(today.getFullYear(), today.getMonth(), 1), today],
    },
    {
      label: 'Last month',
      getValue: (today) => [
        new Date(today.getFullYear(), today.getMonth() - 1, 1),
        new Date(today.getFullYear(), today.getMonth(), 0),
      ],
    },
  ];
}

function formatDate(
  date: Date,
  format: DateRangePickerFormat,
  locale: string | undefined,
  density: PickerFormatDensity,
) {
  if (typeof format !== 'string') {
    return new Intl.DateTimeFormat(locale, format).format(date);
  }
  const value = format.replace(/yyyy|YYYY|MMMM|MMM|MM|M|dd|DD|d/g, (token) => {
    if (token === 'yyyy' || token === 'YYYY') return String(date.getFullYear());
    if (token === 'MMMM') return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
    if (token === 'MMM') return new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
    if (token === 'MM') return String(date.getMonth() + 1).padStart(2, '0');
    if (token === 'M') return String(date.getMonth() + 1);
    if (token === 'dd' || token === 'DD') return String(date.getDate()).padStart(2, '0');
    return String(date.getDate());
  });
  return density === 'spacious' ? value.replaceAll('/', ' / ').replaceAll('-', ' - ').replaceAll('.', ' . ') : value;
}

export {
  Root,
  Trigger,
  Anchor,
  Portal,
  Content,
  Calendar,
  Shortcuts,
  Loading,
  Value,
};
