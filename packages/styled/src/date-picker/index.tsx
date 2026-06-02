'use client';

import * as React from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from '@structyl/icons';
import { Calendar as CalendarPrimitive, DatePicker as DatePickerPrimitive } from '@structyl/primitives';
import { cn } from '@structyl/utils';
import { buttonVariants } from '../button';
import { Calendar as StyledCalendar } from '../calendar';
import { Typography } from '../typography';

const Root = DatePickerPrimitive.Root;

const Value = DatePickerPrimitive.Value;
const Loading = DatePickerPrimitive.Loading;

interface CalendarProps
  extends React.ComponentPropsWithoutRef<typeof DatePickerPrimitive.Calendar> {
  showOutsideDays?: boolean;
  showDaysOutsideCurrentMonth?: boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, showOutsideDays, showDaysOutsideCurrentMonth, ...props }, ref) => (
    <DatePickerPrimitive.Calendar
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
    </DatePickerPrimitive.Calendar>
  ),
);
Calendar.displayName = 'DatePicker.Calendar';

const Trigger = React.forwardRef<
  React.ElementRef<typeof DatePickerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DatePickerPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DatePickerPrimitive.Trigger
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'w-[240px] justify-start text-left font-normal',
      'disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <CalendarIcon className="mr-2 h-4 w-4" />
    {children ?? <DatePickerPrimitive.Value />}
  </DatePickerPrimitive.Trigger>
));
Trigger.displayName = 'DatePicker.Trigger';

const Content = React.forwardRef<
  React.ElementRef<typeof DatePickerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DatePickerPrimitive.Content> & {
    calendarClassName?: string;
    loading?: boolean;
    showOutsideDays?: boolean;
    showDaysOutsideCurrentMonth?: boolean;
  }
>(({
  className,
  children,
  align = 'center',
  sideOffset = 6,
  calendarClassName,
  loading,
  showOutsideDays,
  showDaysOutsideCurrentMonth,
  ...props
}, ref) => (
  <DatePickerPrimitive.Portal>
    <DatePickerPrimitive.Content
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
            <DatePickerPrimitive.Loading />
          </div>
        ) : (
          <Calendar
            className={calendarClassName}
            showOutsideDays={showOutsideDays}
            showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          />
        )
      )}
    </DatePickerPrimitive.Content>
  </DatePickerPrimitive.Portal>
));
Content.displayName = 'DatePicker.Content';

interface DatePickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DatePickerPrimitive.Root>, 'children'> {
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  calendarClassName?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: React.ReactNode;
  format?: React.ComponentPropsWithoutRef<typeof DatePickerPrimitive.Root>['format'];
  formatDensity?: React.ComponentPropsWithoutRef<typeof DatePickerPrimitive.Root>['formatDensity'];
  id?: string;
  name?: string;
  required?: boolean;
  error?: boolean;
  showOutsideDays?: boolean;
  /**
   * Native HTML attributes forwarded to the root wrapper `<div>`
   * (e.g. `onClick`, `style`, `role`, `tabIndex`, `data-*`, `aria-*`).
   * The forwarded `ref` already points at this element.
   */
  rootProps?: React.ComponentPropsWithoutRef<'div'>;
}

const DatePickerRoot = React.forwardRef<HTMLDivElement, DatePickerProps>(
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
      formatDensity,
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
      rootProps,
      ...props
    },
    ref,
  ) => {
    const { className: rootClassName, ...restRootProps } = rootProps ?? {};
    const generatedId = React.useId();
    const triggerId = id ?? generatedId;
    const helperId = helperText ? `${triggerId}-helper` : undefined;
    const labelText = typeof label === 'string' ? label : undefined;

    return (
      <Root
        {...props}
        disabled={disabled}
        readOnly={readOnly}
        locale={locale}
        loading={loading}
      >
        <div
          {...restRootProps}
          ref={ref}
          className={cn('grid w-fit gap-1.5', className, rootClassName)}
        >
          {label ? (
            <label className="text-sm font-medium text-foreground" htmlFor={triggerId}>
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
            aria-label={labelText ?? 'Choose date'}
            className={triggerClassName}
          >
            <DatePickerPrimitive.Value
              locale={locale}
              format={format}
              formatDensity={formatDensity}
              placeholder={placeholder ?? 'MM/DD/YYYY'}
            />
          </Trigger>
          {helperText ? (
            <Typography
              id={helperId}
              variant="muted"
              className={cn('text-xs', error && 'text-destructive')}
            >
              {helperText}
            </Typography>
          ) : null}
        </div>
        <Content className={contentClassName}>
          {loading ? (
            <div className="p-4 text-sm text-muted-foreground">
              <Loading />
            </div>
          ) : (
            <Calendar
              className={calendarClassName}
              locale={locale}
              showOutsideDays={showOutsideDays}
              showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
            />
          )}
        </Content>
      </Root>
    );
  },
);
DatePickerRoot.displayName = 'DatePicker';

const DatePicker = Object.assign(DatePickerRoot, {
  Root,
  Trigger,
  Content,
  Value,
  Calendar,
  Loading,
  StyledCalendar,
});

export { DatePicker, Root, Trigger, Content, Value, Calendar, Loading, StyledCalendar };
export type { DatePickerProps, CalendarProps };
