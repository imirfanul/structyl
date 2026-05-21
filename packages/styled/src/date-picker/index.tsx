'use client';

import * as React from 'react';
import { CalendarIcon } from '@your-lib/icons';
import { DatePicker as DatePickerPrimitive } from '@your-lib/primitives';
import { cn } from '@your-lib/utils';
import { buttonVariants } from '../button';
import { Calendar as StyledCalendar } from '../calendar';

const Root = DatePickerPrimitive.Root;

const Trigger = React.forwardRef<
  React.ElementRef<typeof DatePickerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DatePickerPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DatePickerPrimitive.Trigger
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'w-[240px] justify-start text-left font-normal',
      'data-[placeholder]:text-muted-foreground',
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
  React.ComponentPropsWithoutRef<typeof DatePickerPrimitive.Content>
>(({ className, ...props }, ref) => (
  <DatePickerPrimitive.Portal>
    <DatePickerPrimitive.Content
      ref={ref}
      className={cn(
        'z-50 rounded-md border border-border bg-popover p-0 text-popover-foreground shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        className,
      )}
      {...props}
    >
      <DatePickerPrimitive.Calendar>
        {/* fallback in case user doesn't provide a child */}
      </DatePickerPrimitive.Calendar>
    </DatePickerPrimitive.Content>
  </DatePickerPrimitive.Portal>
));
Content.displayName = 'DatePicker.Content';

const Value = DatePickerPrimitive.Value;

export { Root, Trigger, Content, Value, StyledCalendar as Calendar };
