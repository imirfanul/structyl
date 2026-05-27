import type * as React from 'react';
import type {
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
  TimeValidationError,
  TimeValue as PickerTimeValue,
} from '../picker-utils';

export type TimeValue = PickerTimeValue;
export type TimePickerValue = Date | TimeValue | null | undefined;
export type TimePickerFormat = Intl.DateTimeFormatOptions | string;

export type TimePickerViewRenderer = (params: {
  view: TimePickerView;
  value: Date | null;
  onChange: (value: Date | null) => void;
}) => React.ReactNode;

export type TimePickerSegment = 'hour' | 'minute' | 'second' | 'period';

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
  /** Reserved for future analog-clock rendering — not yet implemented. */
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

export interface SegmentProps extends React.ComponentPropsWithoutRef<'span'> {
  segment: TimePickerSegment;
}

export interface TimePickerValueProps {
  format?: TimePickerFormat;
  locale?: string;
  placeholder?: React.ReactNode;
}
