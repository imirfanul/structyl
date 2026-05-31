'use client';

import * as React from 'react';
import { Primitive } from '@structyl/core';
import { useControllableState } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';

export type CheckedState = boolean | 'indeterminate';

interface CheckboxContextValue {
  checked: CheckedState;
  disabled?: boolean;
}

const CheckboxContext = React.createContext<CheckboxContextValue>({ checked: false });

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'value' | 'checked' | 'defaultChecked'> {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  asChild?: boolean;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>((props, forwardedRef) => {
  const {
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    disabled,
    required,
    name,
    value = 'on',
    onClick,
    onKeyDown,
    ...rest
  } = props;

  const [checked = false, setChecked] = useControllableState<CheckedState>({
    prop: checkedProp,
    defaultProp: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <CheckboxContext.Provider value={{ checked, disabled }}>
      <Primitive.button
        type="button"
        role="checkbox"
        aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
        aria-required={required}
        data-state={
          checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'
        }
        data-disabled={disabled ? '' : undefined}
        disabled={disabled}
        {...rest}
        ref={forwardedRef}
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          // Per APG: Enter should NOT toggle checkbox (only Space)
          if (event.key === 'Enter') event.preventDefault();
        })}
        onClick={composeEventHandlers(onClick, () => {
          if (disabled) return;
          setChecked((prev) => (prev === 'indeterminate' ? true : !prev));
        })}
      />
      {name ? (
        <input
          type="checkbox"
          aria-hidden
          tabIndex={-1}
          name={name}
          value={value}
          checked={checked === true}
          required={required}
          disabled={disabled}
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
    </CheckboxContext.Provider>
  );
});
Checkbox.displayName = 'Checkbox';

interface CheckboxIndicatorProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
  forceMount?: boolean;
  'data-disabled'?: string | boolean;
}

const CheckboxIndicator = React.forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(
  (props, forwardedRef) => {
    const { forceMount, 'data-disabled': dataDisabled, ...rest } = props;
    const { checked } = React.useContext(CheckboxContext);

    if (!forceMount && !checked) return null;

    return (
      <Primitive.span
        data-state={checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
        data-disabled={dataDisabled}
        {...rest}
        ref={forwardedRef}
      />
    );
  },
);
CheckboxIndicator.displayName = 'CheckboxIndicator';

export { Checkbox, CheckboxIndicator };
