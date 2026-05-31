'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from '@structyl/icons';
import { Calendar as CalendarPrimitive } from '@structyl/primitives';
import { cn } from '@structyl/utils';

interface CalendarProps
  extends React.ComponentPropsWithoutRef<typeof CalendarPrimitive.Root> {
  showOutsideDays?: boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, showOutsideDays = true, ...props }, ref) => (
    <CalendarPrimitive.Root
      ref={ref}
      className={cn('p-3 bg-popover text-popover-foreground rounded-md', className)}
      {...props}
    >
      <CalendarPrimitive.Header className="flex items-center justify-between mb-2">
        <CalendarPrimitive.PreviousButton className="h-7 w-7 rounded-md p-1 hover:bg-accent">
          <ChevronLeft className="h-4 w-4" />
        </CalendarPrimitive.PreviousButton>
        <CalendarPrimitive.Heading />
        <CalendarPrimitive.NextButton className="h-7 w-7 rounded-md p-1 hover:bg-accent">
          <ChevronRight className="h-4 w-4" />
        </CalendarPrimitive.NextButton>
      </CalendarPrimitive.Header>
      <CalendarPrimitive.Grid className="w-full border-collapse">
        <CalendarPrimitive.GridHead />
        <CalendarPrimitive.GridBody>
          {(date, { isOutsideMonth }) => {
            if (!showOutsideDays && isOutsideMonth) return null;
            return (
              <CalendarPrimitive.Day
                date={date}
                isOutsideMonth={isOutsideMonth}
                className={cn(
                  'h-8 w-8 cursor-pointer rounded-md text-sm font-normal',
                  'hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'data-[state=selected]:bg-primary data-[state=selected]:text-primary-foreground',
                  'data-[today]:font-semibold',
                  'data-[outside]:text-muted-foreground/40',
                  'data-[in-range]:bg-accent',
                  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                )}
              />
            );
          }}
        </CalendarPrimitive.GridBody>
      </CalendarPrimitive.Grid>
    </CalendarPrimitive.Root>
  ),
);
Calendar.displayName = 'Calendar';

export { Calendar };
export type { CalendarProps };
