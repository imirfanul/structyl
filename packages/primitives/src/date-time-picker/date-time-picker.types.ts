import type * as React from 'react';
import type {
  DateTimePickerView,
  DateTimeValidationError,
  PickerChangeContext,
  PickerFormatDensity,
  PickerLocaleText,
  PickerOrientation,
  PickerSelectedSections,
  PickerSlotProps,
  PickerSlots,
  PickerSx,
  TimePickerView,
  TimeSteps,
  TimeValue,
} from '../picker-utils';

export type DateTimePickerFormat = Intl.DateTimeFormatOptions | string;

export type DateTimePickerViewRenderer = (params: {
  view: DateTimePickerView;
  value: Date | null;
  onChange: (value: Date | null) => void;
}) => React.ReactNode;

export type DateTimePickerSegment = 'hour' | 'minute' | 'second' | 'period';

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

export interface TimePanelRenderProps {
  value: Date | undefined;
  onChange: (value: Date) => void;
  onAccept: (value: Date) => void;
  onCancel: () => void;
  view: DateTimePickerView;
  setView: (view: DateTimePickerView) => void;
}

export interface TimePanelProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  children?: React.ReactNode | ((props: TimePanelRenderProps) => React.ReactNode);
}

export interface SegmentProps extends React.ComponentPropsWithoutRef<'span'> {
  segment: DateTimePickerSegment;
}

export interface DateTimePickerValueProps {
  format?: DateTimePickerFormat;
  locale?: string;
  placeholder?: React.ReactNode;
}

export type { TimeValue };
