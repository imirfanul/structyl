'use client';

import * as React from 'react';
import { Primitive } from '@structyl/core';
import { useControllableState } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';
import type { SwitchProps } from './switch.types';

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>((props, forwardedRef) => {
  const {
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    disabled,
    required,
    name,
    value = 'on',
    onClick,
    ...rest
  } = props;

  const [checked = false, setChecked] = useControllableState<boolean>({
    prop: checkedProp,
    defaultProp: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <>
      <Primitive.button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-required={required}
        data-state={checked ? 'checked' : 'unchecked'}
        data-disabled={disabled ? '' : undefined}
        disabled={disabled}
        {...rest}
        ref={forwardedRef}
        onClick={composeEventHandlers(onClick, () => {
          if (disabled) return;
          setChecked((prev) => !prev);
        })}
      />
      {name ? (
        <input
          type="checkbox"
          aria-hidden
          tabIndex={-1}
          name={name}
          value={value}
          checked={checked}
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
    </>
  );
});
Switch.displayName = 'Switch';

export { Switch };
