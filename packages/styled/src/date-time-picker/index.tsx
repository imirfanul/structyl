'use client';

import * as React from 'react';
import { CalendarClock, ChevronLeft, ChevronRight } from '@structyl/icons';
import {
  Calendar as CalendarPrimitive,
  DateTimePicker as DateTimePickerPrimitive,
} from '@structyl/primitives';
import type { TimePickerView } from '@structyl/primitives';
import { cn } from '@structyl/utils';
import { buttonVariants } from '../button';
import { Calendar as StyledCalendar } from '../calendar';
import { TimePickerPanel } from '../time-picker';
import { Typography } from '../typography';

const Root = DateTimePickerPrimitive.Root;
const Value = DateTimePickerPrimitive.Value;
const Loading = DateTimePickerPrimitive.Loading;
const DatePanel = DateTimePickerPrimitive.DatePanel;
const TimePanel = DateTimePickerPrimitive.TimePanel;
const DateButton = DateTimePickerPrimitive.DateButton;

interface CalendarProps
  extends React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Calendar> {
  showOutsideDays?: boolean;
  showDaysOutsideCurrentMonth?: boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, showOutsideDays, showDaysOutsideCurrentMonth, ...props }, ref) => (
    <DateTimePickerPrimitive.Calendar
      ref={ref}
      className={cn('rounded-md bg-popover p-3 text-popover-foreground', className)}
      showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth ?? showOutsideDays}
      {...props}
    >
      <CalendarPrimitive.Header className="mb-2 flex items-center justify-between">
        <CalendarPrimitive.PreviousButton className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <ChevronLeft className="h-4 w-4" />
        </CalendarPrimitive.PreviousButton>
        <CalendarPrimitive.Heading />
        <CalendarPrimitive.NextButton className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <ChevronRight className="h-4 w-4" />
        </CalendarPrimitive.NextButton>
      </CalendarPrimitive.Header>
      <CalendarPrimitive.Grid className="w-full border-collapse">
        <CalendarPrimitive.GridHead />
        <CalendarPrimitive.GridBody>
          {(date, { isOutsideMonth }) => {
            if ((showDaysOutsideCurrentMonth ?? showOutsideDays ?? true) === false && isOutsideMonth) {
              return <span className="block h-8 w-8" aria-hidden="true" />;
            }

            return (
              <CalendarPrimitive.Day
                date={date}
                isOutsideMonth={isOutsideMonth}
                aria-label={new Intl.DateTimeFormat(props.locale, { dateStyle: 'full' }).format(date)}
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-normal',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'data-[state=selected]:bg-primary data-[state=selected]:text-primary-foreground',
                  'data-[today]:font-semibold data-[today]:text-primary',
                  'data-[outside]:text-muted-foreground/40',
                  'data-[in-range]:bg-accent data-[in-range]:text-accent-foreground',
                  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                )}
              />
            );
          }}
        </CalendarPrimitive.GridBody>
      </CalendarPrimitive.Grid>
    </DateTimePickerPrimitive.Calendar>
  ),
);
Calendar.displayName = 'DateTimePicker.Calendar';

const Segment = React.forwardRef<
  React.ElementRef<typeof DateTimePickerPrimitive.Segment>,
  React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Segment>
>(({ className, ...props }, ref) => (
  <DateTimePickerPrimitive.Segment
    ref={ref}
    className={cn(
      'inline-flex h-8 min-w-8 items-center justify-center rounded-md text-sm tabular-nums',
      'hover:bg-accent focus:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      className,
    )}
    {...props}
  />
));
Segment.displayName = 'DateTimePicker.Segment';

const Separator = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, children = ':', ...props }, ref) => (
    <span ref={ref} className={cn('text-muted-foreground', className)} {...props}>
      {children}
    </span>
  ),
);
Separator.displayName = 'DateTimePicker.Separator';

const Trigger = React.forwardRef<
  React.ElementRef<typeof DateTimePickerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DateTimePickerPrimitive.Trigger
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'w-[280px] justify-start text-left font-normal',
      'disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <CalendarClock className="mr-2 h-4 w-4" />
    {children ?? <DateTimePickerPrimitive.Value />}
  </DateTimePickerPrimitive.Trigger>
));
Trigger.displayName = 'DateTimePicker.Trigger';

const Content = React.forwardRef<
  React.ElementRef<typeof DateTimePickerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Content> & {
    calendarClassName?: string;
    loading?: boolean;
    showOutsideDays?: boolean;
    showDaysOutsideCurrentMonth?: boolean;
    withSeconds?: boolean;
    ampm?: boolean;
    maxTime?: Date;
    minTime?: Date;
    minutesStep?: number;
    shouldDisableTime?: React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Root>['shouldDisableTime'];
    skipDisabled?: boolean;
    timeSteps?: React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Root>['timeSteps'];
    views?: React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Root>['views'];
  }
>(
  (
    {
      className,
      children,
      align = 'center',
      sideOffset = 6,
      calendarClassName,
      loading,
      showOutsideDays,
      showDaysOutsideCurrentMonth,
      withSeconds,
      ampm = true,
      maxTime,
      minTime,
      minutesStep,
      shouldDisableTime,
      skipDisabled,
      timeSteps,
      views,
      ...props
    },
    ref,
  ) => (
    <DateTimePickerPrimitive.Portal>
      <DateTimePickerPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 rounded-md border border-border bg-popover p-0 text-popover-foreground shadow-md outline-none',
          'origin-[var(--structyl-popper-transform-origin,center)]',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children ?? (
          loading ? (
            <div className="p-4 text-sm text-muted-foreground">
              <Loading />
            </div>
          ) : (
            <div>
              <DateTimePickerPrimitive.DatePanel>
                <Calendar
                  className={calendarClassName}
                  showOutsideDays={showOutsideDays}
                  showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
                />
              </DateTimePickerPrimitive.DatePanel>
              <DateTimePickerPrimitive.TimePanel>
                {({ value, onAccept, onCancel, onChange }) => (
                  <div className="grid gap-2 p-3">
                    <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                      <DateTimePickerPrimitive.DateButton className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        Change date
                      </DateTimePickerPrimitive.DateButton>
                      <div className="text-sm font-medium">
                        <DateTimePickerPrimitive.Value
                          format={{ dateStyle: 'medium' }}
                          placeholder="Select date"
                        />
                      </div>
                    </div>
                    <TimePickerPanel
                      ampm={ampm}
                      maxTime={maxTime}
                      minTime={minTime}
                      minutesStep={minutesStep}
                      onAccept={onAccept}
                      onCancel={onCancel}
                      onChange={onChange}
                      referenceDate={value}
                      shouldDisableTime={shouldDisableTime}
                      skipDisabled={skipDisabled}
                      timeSteps={timeSteps}
                      value={value}
                      views={getTimeViews(views)}
                      withSeconds={withSeconds}
                    />
                  </div>
                )}
              </DateTimePickerPrimitive.TimePanel>
            </div>
          )
        )}
      </DateTimePickerPrimitive.Content>
    </DateTimePickerPrimitive.Portal>
  ),
);
Content.displayName = 'DateTimePicker.Content';

type DateTimePickerRootConfig = Omit<
  React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Root>,
  'children'
>;

/**
 * Native HTML attributes for the root wrapper `<div>`, excluding any keys that
 * collide with the picker's configuration props (picker semantics win for
 * shared names). These reach the DOM element the forwarded `ref` points at.
 */
type DateTimePickerNativeProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  keyof DateTimePickerRootConfig | 'className'
>;

interface DateTimePickerOwnProps {
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  calendarClassName?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: React.ReactNode;
  id?: string;
  name?: string;
  required?: boolean;
  error?: boolean;
  showOutsideDays?: boolean;
}

interface DateTimePickerProps
  extends DateTimePickerRootConfig,
    DateTimePickerNativeProps,
    DateTimePickerOwnProps {}

const DATE_TIME_PICKER_ROOT_CONFIG_KEYS: ReadonlyArray<keyof DateTimePickerRootConfig> = [
  'value',
  'defaultValue',
  'onChange',
  'onValueChange',
  'onAccept',
  'onError',
  'open',
  'defaultOpen',
  'onOpenChange',
  'onOpen',
  'onClose',
  'closeOnSelect',
  'minDate',
  'maxDate',
  'minDateTime',
  'maxDateTime',
  'disablePast',
  'disableFuture',
  'disabledDays',
  'shouldDisableDate',
  'shouldDisableMonth',
  'shouldDisableYear',
  'weekStartsOn',
  'ampmInClock',
  'dayOfWeekFormatter',
  'desktopModeMediaQuery',
  'disableHighlightToday',
  'disableIgnoringDatePartForTimeValidation',
  'displayWeekNumber',
  'fixedWeekNumber',
  'formatDensity',
  'inputRef',
  'keepOpenDuringFieldFocus',
  'localeText',
  'monthsPerRow',
  'onMonthChange',
  'onSelectedSectionsChange',
  'onViewChange',
  'onYearChange',
  'openTo',
  'orientation',
  'reduceAnimations',
  'referenceDate',
  'renderLoading',
  'selectedSections',
  'defaultSelectedSections',
  'slotProps',
  'slots',
  'sx',
  'thresholdToRenderTimeInASingleColumn',
  'timezone',
  'view',
  'defaultView',
  'viewRenderers',
  'yearsOrder',
  'yearsPerRow',
];

const DateTimePickerRoot = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  (
    {
      className,
      triggerClassName,
      contentClassName,
      calendarClassName,
      label,
      helperText,
      placeholder,
      format,
      locale,
      id,
      name,
      required,
      error,
      disabled,
      readOnly,
      autoFocus,
      disableOpenPicker,
      loading,
      showOutsideDays,
      showDaysOutsideCurrentMonth,
      ampm,
      maxTime,
      minTime,
      minutesStep,
      shouldDisableTime,
      skipDisabled,
      timeSteps,
      views,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const triggerId = id ?? generatedId;
    const helperId = helperText ? `${triggerId}-helper` : undefined;
    const labelText = typeof label === 'string' ? label : undefined;
    const withSeconds = (timeSteps?.seconds ?? 0) > 0;

    const rootConfigKeys = new Set<string>(DATE_TIME_PICKER_ROOT_CONFIG_KEYS as readonly string[]);
    const rootConfigProps: Partial<DateTimePickerRootConfig> = {};
    const nativeDivProps: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
      if (rootConfigKeys.has(key)) {
        (rootConfigProps as Record<string, unknown>)[key] = value;
      } else {
        nativeDivProps[key] = value;
      }
    }

    return (
      <Root
        {...rootConfigProps}
        disabled={disabled}
        readOnly={readOnly}
        locale={locale}
        loading={loading}
        ampm={ampm}
        maxTime={maxTime}
        minTime={minTime}
        minutesStep={minutesStep}
        shouldDisableTime={shouldDisableTime}
        skipDisabled={skipDisabled}
        timeSteps={timeSteps}
        views={views}
      >
        <div {...nativeDivProps} ref={ref} className={cn('grid w-fit gap-1.5', className)}>
          {label ? (
            <label className="text-sm font-medium text-foreground" htmlFor={triggerId} suppressHydrationWarning>
              {label}
              {required ? <span aria-hidden="true"> *</span> : null}
            </label>
          ) : null}
          <Trigger
            id={triggerId}
            name={name}
            disabled={disabled || disableOpenPicker}
            autoFocus={autoFocus}
            aria-invalid={error || undefined}
            aria-describedby={helperId}
            aria-label={labelText ?? 'Choose date and time'}
            className={triggerClassName}
            suppressHydrationWarning
          >
            <DateTimePickerPrimitive.Value
              locale={locale}
              format={format}
              placeholder={placeholder ?? 'MM/DD/YYYY HH:mm'}
            />
          </Trigger>
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
        <Content
          calendarClassName={calendarClassName}
          className={contentClassName}
          loading={loading}
          showOutsideDays={showOutsideDays}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          withSeconds={withSeconds}
          ampm={ampm}
          maxTime={maxTime}
          minTime={minTime}
          minutesStep={minutesStep}
          shouldDisableTime={shouldDisableTime}
          skipDisabled={skipDisabled}
          timeSteps={timeSteps}
          views={views}
        />
      </Root>
    );
  },
);
DateTimePickerRoot.displayName = 'DateTimePicker';

const DateTimePicker = Object.assign(DateTimePickerRoot, {
  Root,
  Trigger,
  Content,
  Value,
  Calendar,
  DatePanel,
  TimePanel,
  DateButton,
  Segment,
  Separator,
  Loading,
  StyledCalendar,
});

export {
  DateTimePicker,
  Root,
  Trigger,
  Content,
  Value,
  Calendar,
  DatePanel,
  TimePanel,
  DateButton,
  Segment,
  Separator,
  Loading,
  StyledCalendar,
};
export type { DateTimePickerProps, CalendarProps };

function getTimeViews(
  views: React.ComponentPropsWithoutRef<typeof DateTimePickerPrimitive.Root>['views'],
) {
  if (!views) return undefined;
  const timeViews = views.filter((view): view is TimePickerView =>
    view === 'hours' || view === 'minutes' || view === 'seconds' || view === 'meridiem',
  );
  return timeViews.length ? timeViews : undefined;
}
