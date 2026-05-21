'use client';

import * as React from 'react';
import { createContext, Primitive } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';

interface NumberFieldContextValue {
  value: number | undefined;
  inputValue: string;
  min?: number;
  max?: number;
  step: number;
  disabled?: boolean;
  readOnly?: boolean;
  onValueChange: (value: number | undefined) => void;
  onInputValueChange: (value: string) => void;
  increment: (multiplier?: number) => void;
  decrement: (multiplier?: number) => void;
  setToMin: () => void;
  setToMax: () => void;
}

const [NumberFieldProvider, useNumberFieldContext] =
  createContext<NumberFieldContextValue>('NumberField');

export interface NumberFieldRootProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  asChild?: boolean;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
}

function clamp(v: number, min?: number, max?: number) {
  if (min !== undefined) v = Math.max(min, v);
  if (max !== undefined) v = Math.min(max, v);
  return v;
}

const Root = React.forwardRef<HTMLDivElement, NumberFieldRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange,
      min,
      max,
      step = 1,
      disabled,
      readOnly,
      formatOptions,
      locale,
      ...rest
    } = props;
    const [value, setValue] = useControllableState<number | undefined>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    const formatter = React.useMemo(
      () => new Intl.NumberFormat(locale, formatOptions),
      [locale, formatOptions],
    );
    const [inputValue, setInputValue] = React.useState<string>(
      value !== undefined ? formatter.format(value) : '',
    );

    React.useEffect(() => {
      if (document.activeElement?.getAttribute('role') === 'spinbutton') return;
      setInputValue(value !== undefined ? formatter.format(value) : '');
    }, [value, formatter]);

    const setNumeric = (n: number | undefined) => {
      const next = n === undefined ? undefined : clamp(n, min, max);
      setValue(next);
    };
    return (
      <NumberFieldProvider
        value={value}
        inputValue={inputValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        readOnly={readOnly}
        onValueChange={setNumeric}
        onInputValueChange={(v) => {
          setInputValue(v);
          const parsed = Number(v.replace(/,/g, '.'));
          if (!Number.isNaN(parsed)) setNumeric(parsed);
          else if (v === '') setNumeric(undefined);
        }}
        increment={(mult = 1) => setNumeric((value ?? min ?? 0) + step * mult)}
        decrement={(mult = 1) => setNumeric((value ?? max ?? 0) - step * mult)}
        setToMin={() => min !== undefined && setNumeric(min)}
        setToMax={() => max !== undefined && setNumeric(max)}
      >
        <Primitive.div role="group" {...rest} ref={forwardedRef} />
      </NumberFieldProvider>
    );
  },
);
Root.displayName = 'NumberField.Root';

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  (props, forwardedRef) => {
    const ctx = useNumberFieldContext('NumberField.Input');
    return (
      <Primitive.input
        role="spinbutton"
        inputMode="decimal"
        aria-valuenow={ctx.value}
        aria-valuemin={ctx.min}
        aria-valuemax={ctx.max}
        value={ctx.inputValue}
        disabled={ctx.disabled}
        readOnly={ctx.readOnly}
        {...props}
        ref={forwardedRef}
        onChange={composeEventHandlers(props.onChange, (event) =>
          ctx.onInputValueChange(event.currentTarget.value),
        )}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (event.key === 'ArrowUp') {
            event.preventDefault();
            ctx.increment(event.shiftKey ? 10 : 1);
          } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            ctx.decrement(event.shiftKey ? 10 : 1);
          } else if (event.key === 'PageUp') {
            event.preventDefault();
            ctx.increment(10);
          } else if (event.key === 'PageDown') {
            event.preventDefault();
            ctx.decrement(10);
          } else if (event.key === 'Home') {
            event.preventDefault();
            ctx.setToMin();
          } else if (event.key === 'End') {
            event.preventDefault();
            ctx.setToMax();
          }
        })}
        onWheel={composeEventHandlers(props.onWheel, (event) => {
          if (document.activeElement === event.currentTarget) {
            event.preventDefault();
            if (event.deltaY < 0) ctx.increment();
            else ctx.decrement();
          }
        })}
      />
    );
  },
);
Input.displayName = 'NumberField.Input';

const IncrementTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>((props, forwardedRef) => {
  const ctx = useNumberFieldContext('NumberField.IncrementTrigger');
  const isAtMax = ctx.max !== undefined && ctx.value !== undefined && ctx.value >= ctx.max;
  return (
    <Primitive.button
      type="button"
      aria-label="Increase"
      tabIndex={-1}
      disabled={ctx.disabled || isAtMax}
      {...props}
      ref={forwardedRef}
      onClick={composeEventHandlers(props.onClick, () => ctx.increment())}
    />
  );
});
IncrementTrigger.displayName = 'NumberField.IncrementTrigger';

const DecrementTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>((props, forwardedRef) => {
  const ctx = useNumberFieldContext('NumberField.DecrementTrigger');
  const isAtMin = ctx.min !== undefined && ctx.value !== undefined && ctx.value <= ctx.min;
  return (
    <Primitive.button
      type="button"
      aria-label="Decrease"
      tabIndex={-1}
      disabled={ctx.disabled || isAtMin}
      {...props}
      ref={forwardedRef}
      onClick={composeEventHandlers(props.onClick, () => ctx.decrement())}
    />
  );
});
DecrementTrigger.displayName = 'NumberField.DecrementTrigger';

export { Root, Input, IncrementTrigger, DecrementTrigger };
