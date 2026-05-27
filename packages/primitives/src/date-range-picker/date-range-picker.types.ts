import type * as React from 'react';
import type {
  DateRangePosition,
  DateRangeValidationError,
  PickerChangeContext,
  PickerFormatDensity,
  PickerLocaleText,
  PickerSelectedSections,
  PickerSlotProps,
  PickerSlots,
  PickerSx,
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

export interface DateRangePickerValueProps {
  format?: DateRangePickerFormat;
  formatDensity?: PickerFormatDensity;
  locale?: string;
  separator?: string;
  placeholder?: React.ReactNode;
}

export interface DateRangePickerShortcutsProps
  extends React.ComponentPropsWithoutRef<'div'> {
  shortcuts?: DateRangePickerShortcut[];
}
