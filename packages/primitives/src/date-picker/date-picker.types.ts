import type * as React from 'react';
import type {
  DatePickerView,
  DateValidationError,
  PickerChangeContext,
  PickerFormatDensity,
  PickerLocaleText,
  PickerOrientation,
  PickerSelectedSections,
  PickerSlotProps,
  PickerSlots,
  PickerSx,
} from '../picker-utils';

export type DatePickerFormat = Intl.DateTimeFormatOptions | string;

export type DatePickerViewRenderer = (params: {
  view: DatePickerView;
  value: Date | null;
  onChange: (value: Date | null) => void;
}) => React.ReactNode;

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

export interface DatePickerValueProps {
  format?: DatePickerFormat;
  formatDensity?: PickerFormatDensity;
  locale?: string;
  placeholder?: React.ReactNode;
}
