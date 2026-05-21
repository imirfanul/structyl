'use client';

import * as React from 'react';
import { createContext, Primitive } from '@your-lib/core';
import { useControllableState, useComposedRefs } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';

interface OtpContextValue {
  values: string[];
  length: number;
  inputs: React.RefObject<(HTMLInputElement | null)[]>;
  type: 'numeric' | 'alphanumeric';
  mask?: boolean;
  autoSubmit?: boolean;
  onValueChange: (values: string[]) => void;
  disabled?: boolean;
  onComplete?: (value: string) => void;
}

const [OtpProvider, useOtpContext] = createContext<OtpContextValue>('OneTimePasswordField');

export interface OtpRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  type?: 'numeric' | 'alphanumeric';
  mask?: boolean;
  autoSubmit?: boolean;
  disabled?: boolean;
  onComplete?: (value: string) => void;
}

const Root = React.forwardRef<HTMLDivElement, OtpRootProps>(
  (props, forwardedRef) => {
    const {
      length = 6,
      value: valueProp,
      defaultValue = '',
      onValueChange,
      type = 'numeric',
      mask,
      autoSubmit = true,
      disabled,
      onComplete,
      ...rest
    } = props;
    const [value = '', setValue] = useControllableState<string>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    const inputs = React.useRef<(HTMLInputElement | null)[]>([]);
    const values = Array.from({ length }, (_, i) => value[i] ?? '');
    return (
      <OtpProvider
        values={values}
        length={length}
        inputs={inputs}
        type={type}
        mask={mask}
        autoSubmit={autoSubmit}
        onValueChange={(vs) => {
          const joined = vs.join('');
          setValue(joined);
          if (autoSubmit && joined.length === length && !joined.includes('')) {
            onComplete?.(joined);
          }
        }}
        disabled={disabled}
        onComplete={onComplete}
      >
        <Primitive.div role="group" {...rest} ref={forwardedRef} />
      </OtpProvider>
    );
  },
);
Root.displayName = 'OneTimePasswordField.Root';

export interface OtpInputProps extends React.ComponentPropsWithoutRef<'input'> {
  index: number;
}

const Input = React.forwardRef<HTMLInputElement, OtpInputProps>(
  (props, forwardedRef) => {
    const { index, ...rest } = props;
    const ctx = useOtpContext('OneTimePasswordField.Input');
    const ref = React.useRef<HTMLInputElement>(null);
    const composedRef = useComposedRefs(forwardedRef, ref, (node) => {
      ctx.inputs.current[index] = node;
    });
    const value = ctx.values[index] ?? '';

    const updateAt = (i: number, char: string) => {
      const next = [...ctx.values];
      next[i] = char;
      ctx.onValueChange(next);
    };
    const moveFocus = (delta: number) => {
      const targetIdx = index + delta;
      const target = ctx.inputs.current[targetIdx];
      target?.focus();
      target?.select();
    };

    return (
      <Primitive.input
        type={ctx.mask ? 'password' : 'text'}
        inputMode={ctx.type === 'numeric' ? 'numeric' : 'text'}
        pattern={ctx.type === 'numeric' ? '[0-9]*' : undefined}
        maxLength={1}
        autoComplete={index === 0 ? 'one-time-code' : 'off'}
        value={value}
        disabled={ctx.disabled || rest.disabled}
        {...rest}
        ref={composedRef}
        onChange={composeEventHandlers(rest.onChange, (event) => {
          let v = event.currentTarget.value;
          if (ctx.type === 'numeric') v = v.replace(/[^0-9]/g, '');
          if (v.length > 1) {
            // paste
            const chars = v.split('');
            const next = [...ctx.values];
            for (let i = 0; i < chars.length && index + i < ctx.length; i++) {
              next[index + i] = chars[i] ?? '';
            }
            ctx.onValueChange(next);
            moveFocus(Math.min(chars.length, ctx.length - index));
            return;
          }
          updateAt(index, v);
          if (v) moveFocus(1);
        })}
        onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
          if (event.key === 'Backspace') {
            if (!value) moveFocus(-1);
            else updateAt(index, '');
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            moveFocus(-1);
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            moveFocus(1);
          }
        })}
        onFocus={composeEventHandlers(rest.onFocus, () => ref.current?.select())}
      />
    );
  },
);
Input.displayName = 'OneTimePasswordField.Input';

const HiddenInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'> & { name?: string }
>(({ name, ...props }, forwardedRef) => {
  const ctx = useOtpContext('OneTimePasswordField.HiddenInput');
  return (
    <Primitive.input
      type="hidden"
      name={name}
      value={ctx.values.join('')}
      {...props}
      ref={forwardedRef}
    />
  );
});
HiddenInput.displayName = 'OneTimePasswordField.HiddenInput';

export { Root, Input, HiddenInput };
