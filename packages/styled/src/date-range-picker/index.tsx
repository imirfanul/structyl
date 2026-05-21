'use client';

import * as React from 'react';
import { CalendarIcon } from '@your-lib/icons';
import { DateRangePicker as DateRangePickerPrimitive } from '@your-lib/primitives';
import { cn } from '@your-lib/utils';
import { buttonVariants } from '../button';
import { Calendar as StyledCalendar } from '../calendar';

const Root = DateRangePickerPrimitive.Root;

const Trigger = React.forwardRef<
  React.ElementRef<typeof DateRangePickerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DateRangePickerPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DateRangePickerPrimitive.Trigger
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline' }), 'w-[280px] justify-start text-left font-normal', className)}
    {...props}
  >
    <CalendarIcon className="mr-2 h-4 w-4" />
    {children ?? <DateRangePickerPrimitive.Value />}
  </DateRangePickerPrimitive.Trigger>
));
Trigger.displayName = 'DateRangePicker.Trigger';

const Content = React.forwardRef<
  React.ElementRef<typeof DateRangePickerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DateRangePickerPrimitive.Content>
>(({ className, ...props }, ref) => (
  <DateRangePickerPrimitive.Portal>
    <DateRangePickerPrimitive.Content
      ref={ref}
      className={cn(
        'z-50 rounded-md border border-border bg-popover p-0 text-popover-foreground shadow-md',
        className,
      )}
      {...props}
    >
      <DateRangePickerPrimitive.Calendar />
    </DateRangePickerPrimitive.Content>
  </DateRangePickerPrimitive.Portal>
));
Content.displayName = 'DateRangePicker.Content';

const Value = DateRangePickerPrimitive.Value;

export { Root, Trigger, Content, Value, StyledCalendar as Calendar };
