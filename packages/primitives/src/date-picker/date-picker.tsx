'use client';

import * as React from 'react';
import { createContext } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import * as PopoverPrimitive from '../popover';
import * as CalendarPrimitive from '../calendar';
import {
  createPickerChangeContext,
  validateDateValue,
  type DatePickerView,
  type DateValidationError,
  type PickerChangeContext,
  type PickerFormatDensity,
  type PickerLocaleText,
  type PickerOrientation,
  type PickerSelectedSections,
  type PickerSlotProps,
  type PickerSlots,
  type PickerSx,
} from '../picker-utils';

export type DatePickerFormat = Intl.DateTimeFormatOptions | string;

export type DatePickerViewRenderer = (params: {
  view: DatePickerView;
  value: Date | null;
  onChange: (value: Date | null) => void;
}) => React.ReactNode;

interface DatePickerContextValue {
  value: Date | undefined;
  onValueChange: (date: Date | undefined) => void;
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
}

const [DatePickerProvider, useDatePickerContext] =
  createContext<DatePickerContextValue>('DatePicker');

export interface DatePickerRootProps {
  children?: React.ReactNode;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (
    date: Date | null,
    context: PickerChangeContext<DateValidationError>,
  ) => void;
  onValueChange?: (date: Date | undefined) => void;
  onAccept?: (
    date: Date | null,
    context: PickerChangeContext<DateValidationError>,
  ) => void;
  onError?: (error: DateValidationError | null, value: Date | null) => void;
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
  shouldDisableDate?: (date: Date) => boolean;
  shouldDisableMonth?: (date: Date) => boolean;
  shouldDisableYear?: (date: Date) => boolean;
  weekStartsOn?: number;
  locale?: string;
  autoFocus?: boolean;
  dayOfWeekFormatter?: (date: Date) => string;
  desktopModeMediaQuery?: string;
  disableHighlightToday?: boolean;
  disableOpenPicker?: boolean;
  displayWeekNumber?: boolean;
  fixedWeekNumber?: number;
  format?: DatePickerFormat;
  formatDensity?: PickerFormatDensity;
  inputRef?: React.Ref<HTMLInputElement>;
  keepOpenDuringFieldFocus?: boolean;
  label?: React.ReactNode;
  loading?: boolean;
  localeText?: PickerLocaleText;
  monthsPerRow?: 3 | 4;
  name?: string;
  onMonthChange?: (month: Date) => void;
  onSelectedSectionsChange?: (newValue: PickerSelectedSections) => void;
  onViewChange?: (view: DatePickerView) => void;
  onYearChange?: (year: Date) => void;
  openTo?: DatePickerView;
  orientation?: PickerOrientation;
  reduceAnimations?: boolean;
  referenceDate?: Date;
  renderLoading?: () => React.ReactNode;
  selectedSections?: PickerSelectedSections;
  defaultSelectedSections?: PickerSelectedSections;
  showDaysOutsideCurrentMonth?: boolean;
  slotProps?: PickerSlotProps;
  slots?: PickerSlots;
  sx?: PickerSx;
  timezone?: string;
  view?: DatePickerView;
  defaultView?: DatePickerView;
  viewRenderers?: Partial<Record<DatePickerView, DatePickerViewRenderer | null>>;
  views?: DatePickerView[];
  yearsOrder?: 'asc' | 'desc';
  yearsPerRow?: 3 | 4;
}

const Root: React.FC<DatePickerRootProps> = ({
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
  closeOnSelect = true,
  disabled,
  readOnly,
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
  dayOfWeekFormatter,
  disableHighlightToday,
  displayWeekNumber,
  fixedWeekNumber,
  loading,
  onMonthChange,
  onYearChange,
  renderLoading,
  showDaysOutsideCurrentMonth,
  localeText,
  onSelectedSectionsChange,
  onViewChange,
  openTo = 'day',
  selectedSections: selectedSectionsProp,
  defaultSelectedSections,
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
      disablePast,
      disableFuture,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableYear,
    }),
    [
      minDate,
      maxDate,
      disablePast,
      disableFuture,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableYear,
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
  const [, setView] = useControllableState<DatePickerView>({
    prop: viewProp,
    defaultProp: defaultView ?? openTo,
    onChange: onViewChange,
  });

  const validationError = validateDateValue(value ?? null, validationOptions);
  const lastValidationError = React.useRef<DateValidationError | null>(validationError);

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
      const nextError = validateDateValue(nextValue, validationOptions);
      const context = createPickerChangeContext<DateValidationError>(nextError, 'view');
      setValue(date);
      setSelectedSections('day');
      setView('day');
      onValueChange?.(date);
      onChange?.(nextValue, context);
      if (date) {
        onAccept?.(nextValue, context);
        if (closeOnSelect) setOpen(false);
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
      setView,
      validationOptions,
    ],
  );

  return (
    <DatePickerProvider
      value={value}
      onValueChange={commitValue}
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
    >
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        {children}
      </PopoverPrimitive.Root>
    </DatePickerProvider>
  );
};
Root.displayName = 'DatePicker.Root';

const Trigger = PopoverPrimitive.Trigger;
const Portal = PopoverPrimitive.Portal;
const Anchor = PopoverPrimitive.Anchor;

const Content = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>((props, forwardedRef) => <PopoverPrimitive.Content {...props} ref={forwardedRef} />);
Content.displayName = 'DatePicker.Content';

const Calendar = React.forwardRef<
  HTMLDivElement,
  Omit<CalendarPrimitive.CalendarRootProps, 'selected' | 'onSelect' | 'mode'>
>((props, forwardedRef) => {
  const ctx = useDatePickerContext('DatePicker.Calendar');
  const { disabled: calendarDisabled, ...calendarProps } = ctx.calendarProps;
  return (
    <CalendarPrimitive.Root
      ref={forwardedRef}
      mode="single"
      selected={ctx.value}
      onSelect={(v) => {
        if (v instanceof Date || v === undefined) {
          ctx.onValueChange(v);
        }
      }}
      disabled={calendarDisabled || ctx.readOnly}
      {...calendarProps}
      {...props}
    />
  );
});
Calendar.displayName = 'DatePicker.Calendar';

const Loading: React.FC = () => {
  const ctx = useDatePickerContext('DatePicker.Loading');
  return <>{ctx.renderLoading?.() ?? ctx.localeText?.loading ?? 'Loading...'}</>;
};
Loading.displayName = 'DatePicker.Loading';

const Value: React.FC<{
  format?: DatePickerFormat;
  formatDensity?: PickerFormatDensity;
  locale?: string;
  placeholder?: React.ReactNode;
}> = ({
  format = { dateStyle: 'medium' },
  formatDensity = 'dense',
  locale,
  placeholder = 'Pick a date',
}) => {
  const ctx = useDatePickerContext('DatePicker.Value');
  if (!ctx.value) return <>{placeholder}</>;
  return <>{formatDate(ctx.value, format, locale, formatDensity)}</>;
};
Value.displayName = 'DatePicker.Value';

function formatDate(
  date: Date,
  format: DatePickerFormat,
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

export { Root, Trigger, Anchor, Portal, Content, Calendar, Loading, Value };
