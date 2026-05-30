'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, Clock } from '@aura-ui/icons';
import { TimePicker as TimePickerPrimitive } from '@aura-ui/primitives';
import type { PickerChangeContext, TimePickerView, TimeValidationError } from '@aura-ui/primitives';
import { cn } from '@aura-ui/utils';
import { Button } from '../button';
import * as Popover from '../popover';
import { Typography } from '../typography';

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

interface TimePickerPanelProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'title'> {
  value?: Date | null;
  referenceDate?: Date;
  onChange?: (value: Date) => void;
  onAccept?: (value: Date) => void;
  onCancel?: () => void;
  ampm?: boolean;
  views?: TimePickerView[];
  withSeconds?: boolean;
  minutesStep?: number;
  timeSteps?: PrimitiveRootProps['timeSteps'];
  minTime?: Date;
  maxTime?: Date;
  shouldDisableTime?: (value: Date, view: TimePickerView) => boolean;
  skipDisabled?: boolean;
  columnClassName?: string;
  title?: React.ReactNode;
  showActions?: boolean;
}

type ClockView = 'hours' | 'minutes' | 'seconds';
type Meridiem = 'am' | 'pm';

const TimePickerPanel = React.forwardRef<HTMLDivElement, TimePickerPanelProps>(
  (
    {
      className,
      columnClassName,
      value,
      referenceDate,
      onChange,
      onAccept,
      onCancel,
      ampm = true,
      views,
      withSeconds,
      minutesStep,
      timeSteps,
      minTime,
      maxTime,
      shouldDisableTime,
      skipDisabled,
      title = 'SELECT TIME',
      showActions = true,
      ...props
    },
    ref,
  ) => {
    const clockViews = React.useMemo(() => getClockViews(views, withSeconds), [views, withSeconds]);
    const [activeView, setActiveView] = React.useState<ClockView>(clockViews[0] ?? 'hours');
    const currentValue = value ?? referenceDate ?? new Date();
    const minuteStep = minutesStep ?? timeSteps?.minutes ?? 1;
    const hourStep = timeSteps?.hours ?? 1;
    const secondStep = timeSteps?.seconds ?? 1;

    React.useEffect(() => {
      if (!clockViews.includes(activeView)) {
        setActiveView(clockViews[0] ?? 'hours');
      }
    }, [activeView, clockViews]);

    const updatePart = (part: ClockView | 'period', amount: number | Meridiem, advance = true) => {
      const next = new Date(currentValue);
      if (part === 'hours' && typeof amount === 'number') {
        next.setHours(ampm ? to24Hour(amount, next.getHours() >= 12 ? 'pm' : 'am') : amount);
      } else if (part === 'minutes' && typeof amount === 'number') {
        next.setMinutes(amount);
      } else if (part === 'seconds' && typeof amount === 'number') {
        next.setSeconds(amount === 60 ? 0 : amount);
      } else if (part === 'period' && (amount === 'am' || amount === 'pm')) {
        next.setHours(to24Hour(toDisplayHour(next.getHours()), amount));
      }
      next.setMilliseconds(0);
      onChange?.(next);
      if (advance && part !== 'period') {
        const nextView = getAdjacentClockView(clockViews, part, 1);
        if (nextView) {
          setActiveView(nextView);
        } else {
          onAccept?.(next);
        }
      }
    };

    const selectedPart = getSelectedClockPart(currentValue, activeView, ampm);
    const values = getClockValues(activeView, {
      ampm,
      hourStep,
      minuteStep,
      secondStep,
    });
    const selectedAngle = getClockAngle(activeView, selectedPart);
    const selectedRadius = getClockRadius(activeView, selectedPart, ampm);
    const clockValues = values.includes(selectedPart)
      ? values
      : [...values, selectedPart].sort((first, second) => first - second);
    const period = currentValue.getHours() >= 12 ? 'pm' : 'am';
    const previousView = getAdjacentClockView(clockViews, activeView, -1);
    const nextView = getAdjacentClockView(clockViews, activeView, 1);
    const hasSeconds = clockViews.includes('seconds');
    const pointerIsDown = React.useRef(false);
    const getValueFromPointer = React.useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        let deg = Math.atan2(x, -y) * (180 / Math.PI);
        if (deg < 0) deg += 360;
        if (activeView === 'hours') {
          if (ampm) {
            const h = Math.round(deg / 30) % 12;
            return h === 0 ? 12 : h;
          }
          // 24h mode: inner ring (0, 13–23) vs outer ring (1–12)
          // threshold at ~77px, midpoint between r=62 (inner) and r=92 (outer)
          const dist = Math.hypot(x, y);
          const isInner = dist < rect.width * 0.344;
          const h12 = Math.round(deg / 30) % 12;
          return isInner ? (h12 === 0 ? 0 : h12 + 12) : (h12 === 0 ? 12 : h12);
        }
        const raw = Math.round(deg / 6) % 60;
        if (activeView === 'minutes') {
          if (minuteStep <= 1) return raw;
          return (Math.round(raw / minuteStep) * minuteStep) % 60;
        }
        // seconds: value 60 represents 0s at the 12-o'clock position
        if (raw === 0) return 60;
        if (secondStep <= 1) return raw;
        const snapped = Math.round(raw / secondStep) * secondStep;
        return snapped === 0 ? 60 : snapped;
      },
      [activeView, ampm, minuteStep, secondStep],
    );

    return (
      <div
        ref={ref}
        className={cn(
          'w-[280px] rounded-md bg-popover p-4 text-popover-foreground shadow-sm',
          className,
        )}
        {...props}
      >
        <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </div>
        <div className="mt-2 flex items-start justify-between gap-3">
          <div className="flex items-baseline text-5xl font-light leading-none tabular-nums">
            <button
              type="button"
              aria-label="Select hours"
              aria-pressed={activeView === 'hours'}
              className={cn(
                'rounded-md px-0.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                activeView === 'hours' ? 'text-primary' : 'text-popover-foreground',
              )}
              onClick={() => setActiveView('hours')}
            >
              {pad(ampm ? toDisplayHour(currentValue.getHours()) : currentValue.getHours())}
            </button>
            <span className="text-muted-foreground">:</span>
            <button
              type="button"
              aria-label="Select minutes"
              aria-pressed={activeView === 'minutes'}
              className={cn(
                'rounded-md px-0.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                activeView === 'minutes' ? 'text-primary' : 'text-popover-foreground',
              )}
              onClick={() => setActiveView('minutes')}
            >
              {pad(currentValue.getMinutes())}
            </button>
            {hasSeconds ? (
              <>
                <span className="text-muted-foreground">:</span>
                <button
                  type="button"
                  aria-label="Select seconds"
                  aria-pressed={activeView === 'seconds'}
                  className={cn(
                    'rounded-md px-0.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    activeView === 'seconds' ? 'text-primary' : 'text-popover-foreground',
                  )}
                  onClick={() => setActiveView('seconds')}
                >
                  {pad(currentValue.getSeconds())}
                </button>
              </>
            ) : null}
          </div>
          {ampm ? (
            <div className="grid gap-1 pt-0.5 text-base font-semibold">
              {(['am', 'pm'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-label={item === 'am' ? 'AM' : 'PM'}
                  aria-pressed={period === item}
                  className={cn(
                    'rounded px-2 py-0.5 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    period === item
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  )}
                  onClick={() => updatePart('period', item)}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Previous time view"
            disabled={!previousView}
            className="h-8 w-8 text-muted-foreground"
            onClick={() => previousView && setActiveView(previousView)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="sr-only">{getClockViewLabel(activeView)}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Next time view"
            disabled={!nextView}
            className="h-8 w-8 text-muted-foreground"
            onClick={() => nextView && setActiveView(nextView)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div
          role="group"
          aria-label={`${getClockViewLabel(activeView)} clock`}
          className="relative mx-auto mt-1 h-56 w-56 cursor-pointer select-none rounded-full bg-muted/30"
          onPointerDown={(e) => {
            e.preventDefault();
            pointerIsDown.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            updatePart(activeView, getValueFromPointer(e), false);
          }}
          onPointerMove={(e) => {
            if (!pointerIsDown.current) return;
            updatePart(activeView, getValueFromPointer(e), false);
          }}
          onPointerUp={() => {
            if (!pointerIsDown.current) return;
            pointerIsDown.current = false;
            const next = getAdjacentClockView(clockViews, activeView, 1);
            if (next) setActiveView(next);
          }}
          onPointerCancel={() => {
            pointerIsDown.current = false;
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-0.5 origin-bottom bg-primary"
            style={{
              height: selectedRadius,
              transform: `translate(-50%, -100%) rotate(${selectedAngle}deg)`,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
          />
          {clockValues.map((item) => {
            const isSelected = item === selectedPart;
            const disabled = !isSelected && isClockPartDisabled({
              current: currentValue,
              view: activeView,
              nextPart: item,
              ampm,
              shouldDisableTime,
              minTime,
              maxTime,
              minuteStep,
              secondStep,
            });
            if (disabled && skipDisabled) return null;
            return (
              <ClockNumber
                key={item}
                active={isSelected}
                ampm={ampm}
                className={columnClassName}
                disabled={disabled}
                value={item}
                view={activeView}
                onSelect={(nextPart) => updatePart(activeView, nextPart)}
              />
            );
          })}
        </div>
        {showActions ? (
          <div className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              className="h-8 px-3 text-xs font-semibold uppercase text-primary"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-8 px-3 text-xs font-semibold uppercase text-primary"
              onClick={() => onAccept?.(currentValue)}
            >
              OK
            </Button>
          </div>
        ) : null}
      </div>
    );
  },
);
TimePickerPanel.displayName = 'TimePicker.Panel';

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
      ampm = true,
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
    const minuteStep = minutesStep ?? timeSteps?.minutes ?? 1;

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

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <div ref={ref} className={cn('grid w-fit gap-1.5', className)}>
          {label ? (
            <label className="text-sm font-medium text-foreground" htmlFor={triggerId} suppressHydrationWarning>
              {label}
              {required ? <span aria-hidden="true"> *</span> : null}
            </label>
          ) : null}
          <Popover.Trigger asChild>
            <Button
              id={triggerId}
              name={name}
              type="button"
              variant="outline"
              disabled={disabled || disableOpenPicker}
              aria-invalid={error || undefined}
              aria-describedby={helperId}
              aria-label={labelText ?? 'Choose time'}
              suppressHydrationWarning
              className={cn(
                'w-[220px] justify-start text-left font-normal',
                'disabled:pointer-events-none disabled:opacity-50',
                triggerClassName,
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              {value ? formatTime(value, format, locale, ampm) : placeholder}
            </Button>
          </Popover.Trigger>
          {helperText ? (
            <Typography
              id={helperId}
              variant="muted"
              className={cn('text-xs', error && 'text-destructive')}
              suppressHydrationWarning
            >
              {helperText}
            </Typography>
          ) : null}
        </div>
        <Popover.Content
          className={cn('w-auto overflow-hidden p-0', contentClassName)}
          align="start"
        >
          <TimePickerPanel
            ampm={ampm}
            columnClassName={columnClassName}
            maxTime={maxTime}
            minTime={minTime}
            minutesStep={minutesStep}
            onAccept={(nextValue) => {
              if (disabled || readOnly) return;
              const validationError = validateTime(nextValue, {
                minTime,
                maxTime,
                minutesStep: minuteStep,
                shouldDisableTime,
              });
              onAccept?.(nextValue, { validationError, source: 'view' });
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
            onChange={commit}
            referenceDate={referenceDate}
            shouldDisableTime={shouldDisableTime}
            skipDisabled={skipDisabled}
            timeSteps={timeSteps}
            value={value}
            views={views}
            withSeconds={props.withSeconds}
          />
        </Popover.Content>
      </Popover.Root>
    );
  },
);
TimePickerRoot.displayName = 'TimePicker';

interface ClockNumberProps {
  active: boolean;
  ampm: boolean;
  className?: string;
  disabled?: boolean;
  value: number;
  view: ClockView;
  onSelect: (value: number) => void;
}

function ClockNumber({
  active,
  ampm,
  className,
  disabled,
  value,
  view,
  onSelect,
}: ClockNumberProps) {
  const angle = getClockAngle(view, value);
  const radius = getClockRadius(view, value, ampm);
  const position = getClockPosition(angle, radius);
  const showLabel = active || shouldShowClockLabel(view, value, ampm);

  return (
    <button
      type="button"
      aria-label={`${formatClockValue(view, value, ampm)} ${getClockUnitLabel(view)}`}
      aria-pressed={active}
      disabled={disabled}
      className={cn(
        'absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm tabular-nums transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active
          ? 'h-9 w-9 bg-primary text-primary-foreground'
          : showLabel
            ? 'h-8 w-8 text-popover-foreground hover:bg-accent hover:text-accent-foreground'
            : 'h-4 w-4 text-transparent hover:bg-accent/60',
        disabled && 'pointer-events-none opacity-40',
        className,
      )}
      style={{
        left: position.left,
        top: position.top,
      }}
      onClick={() => onSelect(value)}
    >
      {showLabel ? formatClockValue(view, value, ampm) : ''}
    </button>
  );
}

function getClockViews(views: TimePickerView[] | undefined, withSeconds: boolean | undefined): ClockView[] {
  const fallback: ClockView[] = withSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes'];
  if (!views) return fallback;
  const clockViews = views.filter((view): view is ClockView =>
    view === 'hours' || view === 'minutes' || view === 'seconds',
  );
  return clockViews.length ? clockViews : fallback;
}

function getAdjacentClockView(views: ClockView[], current: ClockView, delta: 1 | -1) {
  const index = views.indexOf(current);
  const nextIndex = index + delta;
  return nextIndex >= 0 && nextIndex < views.length ? views[nextIndex] : undefined;
}

function getSelectedClockPart(value: Date, view: ClockView, ampm: boolean) {
  if (view === 'hours') return ampm ? toDisplayHour(value.getHours()) : value.getHours();
  if (view === 'minutes') return value.getMinutes();
  return value.getSeconds() === 0 ? 60 : value.getSeconds();
}

function getClockValues(
  view: ClockView,
  options: {
    ampm: boolean;
    hourStep: number;
    minuteStep: number;
    secondStep: number;
  },
) {
  if (view === 'hours') {
    return range(options.ampm ? 1 : 0, options.ampm ? 12 : 23, options.hourStep);
  }
  if (view === 'minutes') {
    // All 60 positions so the user can click any minute.
    // Non-step values are disabled via isClockPartDisabled.
    // Non-label values (not divisible by 5) render as tiny invisible dots.
    return range(0, 59, 1);
  }
  // Seconds: all 60 positions (1-60 where 60 maps to 0s at the 12-o'clock position).
  return range(1, 60, 1);
}

function getClockAngle(view: ClockView, value: number) {
  if (view === 'hours') return (value % 12) * 30;
  return (value % 60) * 6;
}

function getClockRadius(view: ClockView, value: number, ampm: boolean) {
  if (view !== 'hours' || ampm) return 92;
  return value === 0 || value > 12 ? 62 : 92;
}

function getClockPosition(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  const center = 112;
  return {
    left: center + radius * Math.sin(radians),
    top: center - radius * Math.cos(radians),
  };
}

function shouldShowClockLabel(view: ClockView, value: number, _ampm: boolean) {
  if (view === 'hours') return true; // all hours always visible
  return value % 5 === 0; // label at every 5-min/sec mark
}

function formatClockValue(view: ClockView, value: number, ampm: boolean) {
  if (view === 'hours' && ampm) return String(value);
  return pad(value);
}

function getClockViewLabel(view: ClockView) {
  if (view === 'hours') return 'Hours';
  if (view === 'minutes') return 'Minutes';
  return 'Seconds';
}

function getClockUnitLabel(view: ClockView) {
  if (view === 'hours') return 'hours';
  if (view === 'minutes') return 'minutes';
  return 'seconds';
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

function isClockPartDisabled({
  current,
  view,
  nextPart,
  ampm,
  shouldDisableTime,
  minTime,
  maxTime,
  minuteStep,
  secondStep,
}: {
  current: Date;
  view: ClockView;
  nextPart: number;
  ampm: boolean;
  shouldDisableTime: ((value: Date, view: TimePickerView) => boolean) | undefined;
  minTime: Date | undefined;
  maxTime: Date | undefined;
  minuteStep: number;
  secondStep: number;
}) {
  // Disable clock positions that don't align with the configured step.
  if (view === 'minutes' && minuteStep > 1 && nextPart % minuteStep !== 0) return true;
  if (view === 'seconds') {
    const sec = nextPart === 60 ? 0 : nextPart;
    if (secondStep > 1 && sec !== 0 && sec % secondStep !== 0) return true;
  }

  const next = new Date(current);
  if (view === 'hours') next.setHours(nextPart);
  if (view === 'hours' && ampm) {
    next.setHours(to24Hour(nextPart, current.getHours() >= 12 ? 'pm' : 'am'));
  }
  if (view === 'minutes') next.setMinutes(nextPart);
  if (view === 'seconds') next.setSeconds(nextPart === 60 ? 0 : nextPart);
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
    // When ampm=false, force 24h output regardless of locale default
    const intlOptions = ampm ? format : { ...format, hour12: false };
    return new Intl.DateTimeFormat(locale, intlOptions).format(value);
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
  Panel: TimePickerPanel,
});

export { TimePicker, Root, Segment, Separator, Value, TimePickerPanel };
export type { TimePickerPanelProps, TimePickerProps };
