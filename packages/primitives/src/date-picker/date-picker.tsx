'use client';

import * as React from 'react';
import { createContext, Primitive } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import * as PopoverPrimitive from '../popover';
import * as CalendarPrimitive from '../calendar';

interface DatePickerContextValue {
  value: Date | undefined;
  onValueChange: (date: Date | undefined) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const [DatePickerProvider, useDatePickerContext] = createContext<DatePickerContextValue>('DatePicker');

export interface DatePickerRootProps {
  children?: React.ReactNode;
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Root: React.FC<DatePickerRootProps> = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
}) => {
  const [value, setValue] = useControllableState<Date | undefined>({
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
    <DatePickerProvider
      value={value}
      onValueChange={(d) => {
        setValue(d);
        if (d) setOpen(false);
      }}
      open={open}
      onOpenChange={(v) => setOpen(v)}
    >
      <PopoverPrimitive.Root open={open} onOpenChange={(v) => setOpen(v)}>
        {children}
      </PopoverPrimitive.Root>
    </DatePickerProvider>
  );
};
Root.displayName = 'DatePicker.Root';

const Trigger = PopoverPrimitive.Trigger;
const Portal = PopoverPrimitive.Portal;
const Anchor = PopoverPrimitive.Anchor;

const Content = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>((props, forwardedRef) => <PopoverPrimitive.Content {...props} ref={forwardedRef} />);
Content.displayName = 'DatePicker.Content';

const Calendar: React.FC<Omit<CalendarPrimitive.CalendarRootProps, 'selected' | 'onSelect' | 'mode'>> = (
  props,
) => {
  const ctx = useDatePickerContext('DatePicker.Calendar');
  return (
    <CalendarPrimitive.Root
      mode="single"
      selected={ctx.value}
      onSelect={(v) => {
        if (v instanceof Date || v === undefined) {
          ctx.onValueChange(v);
        }
      }}
      {...props}
    />
  );
};
Calendar.displayName = 'DatePicker.Calendar';

const Value: React.FC<{
  format?: Intl.DateTimeFormatOptions;
  locale?: string;
  placeholder?: React.ReactNode;
}> = ({ format = { dateStyle: 'medium' }, locale, placeholder = 'Pick a date' }) => {
  const ctx = useDatePickerContext('DatePicker.Value');
  if (!ctx.value) return <>{placeholder}</>;
  return <>{new Intl.DateTimeFormat(locale, format).format(ctx.value)}</>;
};
Value.displayName = 'DatePicker.Value';

export { Root, Trigger, Anchor, Portal, Content, Calendar, Value };
