import type * as React from 'react';

export type PickerChangeSource = 'field' | 'view' | 'shortcut' | 'unknown';

export interface PickerShortcutMetadata {
  label?: React.ReactNode;
  value?: unknown;
}

export interface PickerChangeContext<TError> {
  validationError: TError | null;
  source: PickerChangeSource;
  shortcut?: PickerShortcutMetadata;
}

export type PickerFieldSection =
  | 'day'
  | 'empty'
  | 'hours'
  | 'meridiem'
  | 'minutes'
  | 'month'
  | 'seconds'
  | 'weekDay'
  | 'year';

export type PickerSelectedSections = 'all' | PickerFieldSection | number | null;
export type PickerOrientation = 'landscape' | 'portrait';
export type PickerFormatDensity = 'dense' | 'spacious';
export type DatePickerView = 'day' | 'month' | 'year';
export type TimePickerView = 'hours' | 'minutes' | 'seconds' | 'meridiem';
export type DateTimePickerView = DatePickerView | TimePickerView;
export type DateRangePosition = 'start' | 'end';

export type PickerSxValue =
  | boolean
  | Record<string, unknown>
  | ((theme: unknown) => Record<string, unknown> | null | undefined);
export type PickerSx = PickerSxValue | PickerSxValue[];
export type PickerSlots = Record<string, React.ElementType | null | undefined>;
export type PickerSlotProps = Record<string, unknown>;
export type PickerLocaleText = Record<string, React.ReactNode>;

export type DateValidationError =
  | 'invalidDate'
  | 'disablePast'
  | 'disableFuture'
  | 'minDate'
  | 'maxDate'
  | 'shouldDisableDate'
  | 'shouldDisableMonth'
  | 'shouldDisableYear';

export type TimeValidationError =
  | 'invalidDate'
  | 'disablePast'
  | 'disableFuture'
  | 'minTime'
  | 'maxTime'
  | 'minutesStep'
  | 'shouldDisableTime';

export type DateTimeValidationError =
  | DateValidationError
  | TimeValidationError
  | 'minDateTime'
  | 'maxDateTime';

export type DateRangeValidationError = DateValidationError | 'invalidRange';

export interface DateValidationOptions {
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  shouldDisableDate?: (date: Date) => boolean;
  shouldDisableMonth?: (date: Date) => boolean;
  shouldDisableYear?: (date: Date) => boolean;
}

export interface TimeValidationOptions {
  minTime?: Date;
  maxTime?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  minutesStep?: number;
  disableIgnoringDatePartForTimeValidation?: boolean;
  shouldDisableTime?: (value: Date, view: TimePickerView) => boolean;
}

export interface DateTimeValidationOptions extends DateValidationOptions, TimeValidationOptions {
  minDateTime?: Date;
  maxDateTime?: Date;
}

export interface TimeSteps {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface TimeValue {
  hour: number;
  minute: number;
  second?: number;
  period?: 'am' | 'pm';
}

export const DEFAULT_MIN_DATE = new Date(1900, 0, 1);
export const DEFAULT_MAX_DATE = new Date(2099, 11, 31);

export function isValidDate(value: Date | null | undefined): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function startOfMonth(date: Date) {
  const next = new Date(date);
  next.setDate(1);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function addMonths(date: Date, amount: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + amount);
  return next;
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function isBeforeDay(a: Date, b: Date) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfterDay(a: Date, b: Date) {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

export function clampDate(date: Date, minDate?: Date, maxDate?: Date) {
  if (minDate && isBeforeDay(date, minDate)) return startOfDay(minDate);
  if (maxDate && isAfterDay(date, maxDate)) return startOfDay(maxDate);
  return date;
}

export function createPickerChangeContext<TError>(
  validationError: TError | null,
  source: PickerChangeSource,
  shortcut?: PickerShortcutMetadata,
): PickerChangeContext<TError> {
  return shortcut ? { validationError, source, shortcut } : { validationError, source };
}

export function validateDateValue(
  value: Date | null | undefined,
  options: DateValidationOptions = {},
): DateValidationError | null {
  if (value == null) return null;
  if (!isValidDate(value)) return 'invalidDate';
  const minDate = options.minDate ?? DEFAULT_MIN_DATE;
  const maxDate = options.maxDate ?? DEFAULT_MAX_DATE;
  const today = startOfDay(new Date());
  if (options.disablePast && isBeforeDay(value, today)) return 'disablePast';
  if (options.disableFuture && isAfterDay(value, today)) return 'disableFuture';
  if (isBeforeDay(value, minDate)) return 'minDate';
  if (isAfterDay(value, maxDate)) return 'maxDate';
  if (options.shouldDisableYear?.(value)) return 'shouldDisableYear';
  if (options.shouldDisableMonth?.(value)) return 'shouldDisableMonth';
  if (options.shouldDisableDate?.(value)) return 'shouldDisableDate';
  return null;
}

function getTimeNumber(value: Date, includeDate: boolean) {
  if (includeDate) return value.getTime();
  return (
    value.getHours() * 60 * 60 * 1000 +
    value.getMinutes() * 60 * 1000 +
    value.getSeconds() * 1000 +
    value.getMilliseconds()
  );
}

export function validateTimeValue(
  value: Date | null | undefined,
  options: TimeValidationOptions = {},
): TimeValidationError | null {
  if (value == null) return null;
  if (!isValidDate(value)) return 'invalidDate';
  const includeDate = options.disableIgnoringDatePartForTimeValidation ?? false;
  const current = getTimeNumber(value, includeDate);
  const now = new Date();
  if (options.disablePast && current < getTimeNumber(now, includeDate)) return 'disablePast';
  if (options.disableFuture && current > getTimeNumber(now, includeDate)) return 'disableFuture';
  if (options.minTime && current < getTimeNumber(options.minTime, includeDate)) return 'minTime';
  if (options.maxTime && current > getTimeNumber(options.maxTime, includeDate)) return 'maxTime';
  if (options.minutesStep && options.minutesStep > 1 && value.getMinutes() % options.minutesStep !== 0) {
    return 'minutesStep';
  }
  if (options.shouldDisableTime?.(value, 'hours')) return 'shouldDisableTime';
  if (options.shouldDisableTime?.(value, 'minutes')) return 'shouldDisableTime';
  if (options.shouldDisableTime?.(value, 'seconds')) return 'shouldDisableTime';
  return null;
}

export function validateDateTimeValue(
  value: Date | null | undefined,
  options: DateTimeValidationOptions = {},
): DateTimeValidationError | null {
  if (value == null) return null;
  if (!isValidDate(value)) return 'invalidDate';
  if (options.minDateTime && value.getTime() < options.minDateTime.getTime()) return 'minDateTime';
  if (options.maxDateTime && value.getTime() > options.maxDateTime.getTime()) return 'maxDateTime';
  return validateDateValue(value, options) ?? validateTimeValue(value, options);
}

export function timeValueToDate(value: TimeValue, referenceDate = new Date()) {
  const next = new Date(referenceDate);
  const isPm = value.period === 'pm';
  const hour = value.period
    ? ((value.hour % 12) + (isPm ? 12 : 0))
    : value.hour;
  next.setHours(hour, value.minute, value.second ?? 0, 0);
  return next;
}

export function dateToTimeValue(value: Date, hour12 = false): TimeValue {
  const hour = value.getHours();
  if (!hour12) {
    return { hour, minute: value.getMinutes(), second: value.getSeconds() };
  }
  const period = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return { hour: displayHour, minute: value.getMinutes(), second: value.getSeconds(), period };
}

export function mergeDateAndTime(datePart: Date, timePart: Date) {
  const next = new Date(datePart);
  next.setHours(timePart.getHours(), timePart.getMinutes(), timePart.getSeconds(), timePart.getMilliseconds());
  return next;
}

export function applyTimePart(value: Date | null | undefined, part: Partial<TimeValue>, referenceDate = new Date()) {
  const base = isValidDate(value) ? new Date(value) : new Date(referenceDate);
  const current = dateToTimeValue(base, part.period != null);
  const merged = { ...current, ...part };
  return timeValueToDate(merged, base);
}

export function pad(value: number) {
  return String(value).padStart(2, '0');
}
