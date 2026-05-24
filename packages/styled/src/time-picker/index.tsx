'use client';

import * as React from 'react';
import { Clock } from '@aura-ui/icons';
import { TimePicker as TimePickerPrimitive } from '@aura-ui/primitives';
import type { PickerChangeContext, TimePickerView, TimeValidationError } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';
import { buttonVariants } from '../button';
import * as Popover from '../popover';

type PrimitiveRootProps = React.ComponentPropsWithoutRef<typeof TimePickerPrimitive.Root>;
type TimePickerValue = PrimitiveRootProps['value'];
type TimePickerFormat = PrimitiveRootProps['format'];

const Root = React.forwardRef<
  React.ElementRef<typeof TimePickerPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TimePickerPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TimePickerPrimitive.Root
    ref={ref}
    className={cn(
      'inline-flex h-9 items-center gap-0.5 rounded-md border border-input bg-transparent px-3 text-sm tabular-nums',
      className,
    )}
    {...props}
  />
));
Root.displayName = 'TimePicker.Root';

const Segment = React.forwardRef<
  React.ElementRef<typeof TimePickerPrimitive.Segment>,
  React.ComponentPropsWithoutRef<typeof TimePickerPrimitive.Segment>
>(({ className, ...props }, ref) => (
  <TimePickerPrimitive.Segment
    ref={ref}
    className={cn(
      'inline-flex h-6 min-w-[1.5ch] items-center justify-center rounded',
      'hover:bg-accent focus:bg-accent focus:outline-none',
      className,
    )}
    {...props}
  />
));
Segment.displayName = 'TimePicker.Segment';

const Value = TimePickerPrimitive.Value;

const Separator: React.FC<{ children?: React.ReactNode }> = ({ children = ':' }) => (
  <span className="text-muted-foreground">{children}</span>
);
Separator.displayName = 'TimePicker.Separator';

interface TimePickerProps extends Omit<PrimitiveRootProps, 'children'> {
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  columnClassName?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: React.ReactNode;
  format?: TimePickerFormat;
  id?: string;
  name?: string;
  required?: boolean;
  error?: boolean;
}

const TimePickerRoot = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      className,
      triggerClassName,
      contentClassName,
      columnClassName,
      label,
      helperText,
      placeholder = 'HH:mm',
      format = { timeStyle: 'short' },
      id,
      name,
      required,
      error,
      value: valueProp,
      defaultValue,
      onChange,
      onValueChange,
      onAccept,
      onError,
      disabled,
      readOnly,
      ampm = false,
      closeOnSelect = false,
      disableOpenPicker,
      minTime,
      maxTime,
      minutesStep,
      shouldDisableTime,
      skipDisabled,
      timeSteps,
      locale,
      referenceDate,
      views,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const triggerId = id ?? generatedId;
    const helperId = helperText ? `${triggerId}-helper` : undefined;
    const labelText = typeof label === 'string' ? label : undefined;
    const isControlled = valueProp !== undefined;
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<Date | null>(() =>
      normalizeValue(defaultValue, referenceDate, ampm) ?? null,
    );
    const value = isControlled ? normalizeValue(valueProp, referenceDate, ampm) ?? null : internalValue;
    const visibleViews = views ?? (props.withSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']);
    const minuteStep = minutesStep ?? timeSteps?.minutes ?? 1;
    const hourStep = timeSteps?.hours ?? 1;
    const secondStep = timeSteps?.seconds ?? 5;

    const commit = React.useCallback(
      (nextValue: Date | null) => {
        if (disabled || readOnly) return;
        const validationError = validateTime(nextValue, {
          minTime,
          maxTime,
          minutesStep: minuteStep,
          shouldDisableTime,
        });
        const context: PickerChangeContext<TimeValidationError> = {
          validationError,
          source: 'view',
        };
        if (!isControlled) setInternalValue(nextValue);
        if (nextValue) onValueChange?.(toTimeValue(nextValue, ampm));
        onChange?.(nextValue, context);
        onError?.(validationError, nextValue);
        if (closeOnSelect) {
          onAccept?.(nextValue, context);
          setOpen(false);
        }
      },
      [
        ampm,
        closeOnSelect,
        disabled,
        isControlled,
        maxTime,
        minTime,
        minuteStep,
        onAccept,
        onChange,
        onError,
        onValueChange,
        readOnly,
        shouldDisableTime,
      ],
    );

    const updatePart = (part: 'hour' | 'minute' | 'second' | 'period', amount: number | 'am' | 'pm') => {
      const next = new Date(value ?? referenceDate ?? new Date());
      if (part === 'hour' && typeof amount === 'number') {
        next.setHours(ampm ? to24Hour(amount, next.getHours() >= 12 ? 'pm' : 'am') : amount);
      } else if (part === 'minute' && typeof amount === 'number') {
        next.setMinutes(amount);
      } else if (part === 'second' && typeof amount === 'number') {
        next.setSeconds(amount);
      } else if (part === 'period' && (amount === 'am' || amount === 'pm')) {
        next.setHours(to24Hour(toDisplayHour(next.getHours()), amount));
      }
      next.setMilliseconds(0);
      commit(next);
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <div ref={ref} className={cn('grid w-fit gap-1.5', className)}>
          {label ? (
            <label className="text-sm font-medium text-foreground" htmlFor={triggerId}>
              {label}
              {required ? <span aria-hidden="true"> *</span> : null}
            </label>
          ) : null}
          <Popover.Trigger asChild>
            <button
              id={triggerId}
              name={name}
              type="button"
              disabled={disabled || disableOpenPicker}
              aria-invalid={error || undefined}
              aria-describedby={helperId}
              aria-label={labelText ?? 'Choose time'}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'w-[220px] justify-start text-left font-normal',
                'disabled:pointer-events-none disabled:opacity-50',
                triggerClassName,
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              {value ? formatTime(value, format, locale, ampm) : placeholder}
            </button>
          </Popover.Trigger>
          {helperText ? (
            <p
              id={helperId}
              className={cn('text-xs text-muted-foreground', error && 'text-destructive')}
            >
              {helperText}
            </p>
          ) : null}
        </div>
        <Popover.Content
          className={cn('w-auto p-2', contentClassName)}
          align="start"
        >
          <div className="flex max-h-72 gap-2 overflow-auto">
            {visibleViews.includes('hours') ? (
              <TimeColumn
                ariaLabel="Hours"
                className={columnClassName}
                values={range(ampm ? 1 : 0, ampm ? 12 : 23, hourStep)}
                value={value ? (ampm ? toDisplayHour(value.getHours()) : value.getHours()) : undefined}
                formatValue={(hour) => (ampm ? String(hour) : pad(hour))}
                isDisabled={(hour) => isPartDisabled(value, 'hours', ampm ? to24Hour(hour, value && value.getHours() >= 12 ? 'pm' : 'am') : hour, shouldDisableTime, minTime, maxTime)}
                skipDisabled={skipDisabled}
                onSelect={(hour) => updatePart('hour', hour)}
              />
            ) : null}
            {visibleViews.includes('minutes') ? (
              <TimeColumn
                ariaLabel="Minutes"
                className={columnClassName}
                values={range(0, 59, minuteStep)}
                value={value?.getMinutes()}
                formatValue={pad}
                isDisabled={(minute) => isPartDisabled(value, 'minutes', minute, shouldDisableTime, minTime, maxTime)}
                skipDisabled={skipDisabled}
                onSelect={(minute) => updatePart('minute', minute)}
              />
            ) : null}
            {visibleViews.includes('seconds') ? (
              <TimeColumn
                ariaLabel="Seconds"
                className={columnClassName}
                values={range(0, 59, secondStep)}
                value={value?.getSeconds()}
                formatValue={pad}
                isDisabled={(second) => isPartDisabled(value, 'seconds', second, shouldDisableTime, minTime, maxTime)}
                skipDisabled={skipDisabled}
                onSelect={(second) => updatePart('second', second)}
              />
            ) : null}
            {ampm ? (
              <TimeColumn
                ariaLabel="Meridiem"
                className={columnClassName}
                values={['am', 'pm']}
                value={value && value.getHours() >= 12 ? 'pm' : 'am'}
                formatValue={(period) => period.toUpperCase()}
                onSelect={(period) => updatePart('period', period)}
              />
            ) : null}
          </div>
        </Popover.Content>
      </Popover.Root>
    );
  },
);
TimePickerRoot.displayName = 'TimePicker';

interface TimeColumnProps<TValue extends string | number> {
  ariaLabel: string;
  className?: string;
  values: TValue[];
  value?: TValue;
  formatValue: (value: TValue) => string;
  isDisabled?: (value: TValue) => boolean;
  skipDisabled?: boolean;
  onSelect: (value: TValue) => void;
}

function TimeColumn<TValue extends string | number>({
  ariaLabel,
  className,
  values,
  value,
  formatValue,
  isDisabled,
  skipDisabled,
  onSelect,
}: TimeColumnProps<TValue>) {
  return (
    <div role="listbox" aria-label={ariaLabel} className={cn('grid min-w-16 gap-1', className)}>
      {values.map((item) => {
        const disabled = isDisabled?.(item) ?? false;
        if (disabled && skipDisabled) return null;
        return (
          <button
            key={item}
            type="button"
            role="option"
            aria-selected={item === value}
            disabled={disabled}
            className={cn(
              'rounded-md px-2 py-1.5 text-sm tabular-nums text-muted-foreground transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'aria-selected:bg-primary aria-selected:text-primary-foreground',
              'disabled:pointer-events-none disabled:opacity-50',
            )}
            onClick={() => onSelect(item)}
          >
            {formatValue(item)}
          </button>
        );
      })}
    </div>
  );
}

function normalizeValue(value: TimePickerValue, referenceDate: Date | undefined, ampm: boolean) {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  const next = new Date(referenceDate ?? new Date());
  next.setHours(ampm ? to24Hour(value.hour, value.period ?? 'am') : value.hour);
  next.setMinutes(value.minute, value.second ?? 0, 0);
  return next;
}

function validateTime(
  value: Date | null,
  options: {
    minTime?: Date;
    maxTime?: Date;
    minutesStep?: number;
    shouldDisableTime?: (value: Date, view: TimePickerView) => boolean;
  },
): TimeValidationError | null {
  if (!value) return null;
  const time = value.getHours() * 3600 + value.getMinutes() * 60 + value.getSeconds();
  const min = options.minTime
    ? options.minTime.getHours() * 3600 + options.minTime.getMinutes() * 60 + options.minTime.getSeconds()
    : undefined;
  const max = options.maxTime
    ? options.maxTime.getHours() * 3600 + options.maxTime.getMinutes() * 60 + options.maxTime.getSeconds()
    : undefined;
  if (min != null && time < min) return 'minTime';
  if (max != null && time > max) return 'maxTime';
  if (options.minutesStep && options.minutesStep > 1 && value.getMinutes() % options.minutesStep !== 0) {
    return 'minutesStep';
  }
  if (options.shouldDisableTime?.(value, 'hours')) return 'shouldDisableTime';
  if (options.shouldDisableTime?.(value, 'minutes')) return 'shouldDisableTime';
  if (options.shouldDisableTime?.(value, 'seconds')) return 'shouldDisableTime';
  return null;
}

function isPartDisabled(
  current: Date | null,
  view: TimePickerView,
  nextPart: number,
  shouldDisableTime: ((value: Date, view: TimePickerView) => boolean) | undefined,
  minTime: Date | undefined,
  maxTime: Date | undefined,
) {
  const next = new Date(current ?? new Date());
  if (view === 'hours') next.setHours(nextPart);
  if (view === 'minutes') next.setMinutes(nextPart);
  if (view === 'seconds') next.setSeconds(nextPart);
  return validateTime(next, { minTime, maxTime, shouldDisableTime }) != null;
}

function toTimeValue(value: Date, ampm: boolean) {
  if (!ampm) {
    return { hour: value.getHours(), minute: value.getMinutes(), second: value.getSeconds() };
  }
  const hour = toDisplayHour(value.getHours());
  return {
    hour,
    minute: value.getMinutes(),
    second: value.getSeconds(),
    period: value.getHours() >= 12 ? ('pm' as const) : ('am' as const),
  };
}

function formatTime(value: Date, format: TimePickerFormat, locale: string | undefined, ampm: boolean) {
  if (typeof format !== 'string') {
    return new Intl.DateTimeFormat(locale, format).format(value);
  }
  const timeValue = toTimeValue(value, ampm);
  return format.replace(/HH|H|hh|h|mm|m|ss|s|aa|a/g, (token) => {
    if (token === 'HH') return pad(value.getHours());
    if (token === 'H') return String(value.getHours());
    if (token === 'hh') return pad(timeValue.hour);
    if (token === 'h') return String(timeValue.hour);
    if (token === 'mm') return pad(value.getMinutes());
    if (token === 'm') return String(value.getMinutes());
    if (token === 'ss') return pad(value.getSeconds());
    if (token === 's') return String(value.getSeconds());
    if (token === 'aa') return timeValue.period === 'pm' ? 'pm' : 'am';
    return timeValue.period === 'pm' ? 'PM' : 'AM';
  });
}

function range(start: number, end: number, step: number) {
  const values: number[] = [];
  for (let value = start; value <= end; value += Math.max(step, 1)) {
    values.push(value);
  }
  return values;
}

function toDisplayHour(hour: number) {
  return hour % 12 === 0 ? 12 : hour % 12;
}

function to24Hour(hour: number, period: 'am' | 'pm') {
  return (hour % 12) + (period === 'pm' ? 12 : 0);
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

const TimePicker = Object.assign(TimePickerRoot, {
  Root,
  Segment,
  Separator,
  Value,
});

export { TimePicker, Root, Segment, Separator, Value };
export type { TimePickerProps };
