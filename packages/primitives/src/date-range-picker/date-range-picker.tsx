'use client';

import * as React from 'react';
import { createContext } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import * as PopoverPrimitive from '../popover';
import * as CalendarPrimitive from '../calendar';

export interface DateRange {
  from?: Date;
  to?: Date;
}

interface DateRangePickerContextValue {
  value: DateRange;
  onValueChange: (range: DateRange) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const [DateRangePickerProvider, useDateRangePickerContext] =
  createContext<DateRangePickerContextValue>('DateRangePicker');

export interface DateRangePickerRootProps {
  children?: React.ReactNode;
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Root: React.FC<DateRangePickerRootProps> = ({
  value: valueProp,
  defaultValue = {},
  onValueChange,
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
}) => {
  const [value = {}, setValue] = useControllableState<DateRange>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
  });
  return (
    <DateRangePickerProvider
      value={value}
      onValueChange={(r) => setValue(r)}
      open={open}
      onOpenChange={(v) => setOpen(v)}
    >
      <PopoverPrimitive.Root open={open} onOpenChange={(v) => setOpen(v)}>
        {children}
      </PopoverPrimitive.Root>
    </DateRangePickerProvider>
  );
};
Root.displayName = 'DateRangePicker.Root';

const Trigger = PopoverPrimitive.Trigger;
const Portal = PopoverPrimitive.Portal;
const Content = PopoverPrimitive.Content;
const Anchor = PopoverPrimitive.Anchor;

const Calendar: React.FC<Omit<CalendarPrimitive.CalendarRootProps, 'selected' | 'onSelect' | 'mode'>> = (
  props,
) => {
  const ctx = useDateRangePickerContext('DateRangePicker.Calendar');
  return (
    <CalendarPrimitive.Root
      mode="range"
      selected={ctx.value as { from: Date; to?: Date }}
      onSelect={(v) => {
        if (v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date)) {
          ctx.onValueChange(v as DateRange);
        }
      }}
      {...props}
    />
  );
};
Calendar.displayName = 'DateRangePicker.Calendar';

const Value: React.FC<{
  format?: Intl.DateTimeFormatOptions;
  locale?: string;
  separator?: string;
  placeholder?: React.ReactNode;
}> = ({
  format = { dateStyle: 'medium' },
  locale,
  separator = ' – ',
  placeholder = 'Pick a date range',
}) => {
  const ctx = useDateRangePickerContext('DateRangePicker.Value');
  const fmt = new Intl.DateTimeFormat(locale, format);
  if (!ctx.value.from) return <>{placeholder}</>;
  if (!ctx.value.to) return <>{fmt.format(ctx.value.from)}</>;
  return <>{`${fmt.format(ctx.value.from)}${separator}${fmt.format(ctx.value.to)}`}</>;
};
Value.displayName = 'DateRangePicker.Value';

export { Root, Trigger, Anchor, Portal, Content, Calendar, Value };
