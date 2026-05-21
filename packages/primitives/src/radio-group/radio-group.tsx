'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  RovingFocusGroup,
  RovingFocusItem,
  Presence,
} from '@your-lib/core';
import { useControllableState, useComposedRefs } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';
import type {
  RadioGroupRootProps,
  RadioGroupItemProps,
  RadioGroupIndicatorProps,
} from './radio-group.types';

interface RadioGroupContextValue {
  name?: string;
  required: boolean;
  disabled: boolean;
  value?: string;
  onValueChange: (value: string) => void;
}

const [RadioGroupProvider, useRadioGroupContext] =
  createContext<RadioGroupContextValue>('RadioGroup');

const Root = React.forwardRef<HTMLDivElement, RadioGroupRootProps>(
  (props, forwardedRef) => {
    const {
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation = 'vertical',
      dir,
      loop = true,
      onValueChange,
      ...rootProps
    } = props;

    const [value, setValue] = useControllableState<string | undefined>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: (v) => onValueChange?.(v as string),
    });

    return (
      <RadioGroupProvider
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onValueChange={(v) => setValue(v)}
      >
        <RovingFocusGroup
          asChild
          orientation={orientation}
          dir={dir}
          loop={loop}
        >
          <Primitive.div
            role="radiogroup"
            aria-required={required}
            aria-orientation={orientation}
            data-disabled={disabled ? '' : undefined}
            dir={dir}
            {...rootProps}
            ref={forwardedRef}
          />
        </RovingFocusGroup>
      </RadioGroupProvider>
    );
  },
);
Root.displayName = 'RadioGroup.Root';

/* ─── Item ──────────────────────────────────────────────────────────── */

interface RadioItemContextValue {
  checked: boolean;
  disabled?: boolean;
}

const [RadioItemProvider, useRadioItemContext] =
  createContext<RadioItemContextValue>('RadioGroupItem');

const Item = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  (props, forwardedRef) => {
    const { value, disabled, ...itemProps } = props;
    const ctx = useRadioGroupContext('RadioGroup.Item');
    const isDisabled = ctx.disabled || disabled;
    const checked = ctx.value === value;
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const composedRef = useComposedRefs(forwardedRef, buttonRef);

    return (
      <RadioItemProvider checked={checked} disabled={isDisabled}>
        <RovingFocusItem
          asChild
          focusable={!isDisabled}
          active={checked}
        >
          <Primitive.button
            type="button"
            role="radio"
            aria-checked={checked}
            data-state={checked ? 'checked' : 'unchecked'}
            data-disabled={isDisabled ? '' : undefined}
            disabled={isDisabled}
            value={value}
            {...itemProps}
            ref={composedRef}
            onClick={composeEventHandlers(itemProps.onClick, (event) => {
              if (checked) event.preventDefault();
              else ctx.onValueChange(value);
            })}
            onKeyDown={composeEventHandlers(itemProps.onKeyDown, (event) => {
              if (event.key === 'Enter') event.preventDefault();
            })}
          />
        </RovingFocusItem>
        {ctx.name ? (
          <input
            type="radio"
            aria-hidden
            tabIndex={-1}
            name={ctx.name}
            value={value}
            checked={checked}
            required={ctx.required}
            disabled={isDisabled}
            readOnly
            style={{
              transform: 'translateX(-100%)',
              position: 'absolute',
              pointerEvents: 'none',
              opacity: 0,
              margin: 0,
              width: 0,
              height: 0,
            }}
          />
        ) : null}
      </RadioItemProvider>
    );
  },
);
Item.displayName = 'RadioGroup.Item';

/* ─── Indicator ─────────────────────────────────────────────────────── */

const Indicator = React.forwardRef<HTMLSpanElement, RadioGroupIndicatorProps>(
  (props, forwardedRef) => {
    const { forceMount, ...indicatorProps } = props;
    const ctx = useRadioItemContext('RadioGroup.Indicator');
    return (
      <Presence present={forceMount || ctx.checked}>
        <Primitive.span
          data-state={ctx.checked ? 'checked' : 'unchecked'}
          data-disabled={ctx.disabled ? '' : undefined}
          {...indicatorProps}
          ref={forwardedRef}
        />
      </Presence>
    );
  },
);
Indicator.displayName = 'RadioGroup.Indicator';

export { Root, Item, Indicator };
