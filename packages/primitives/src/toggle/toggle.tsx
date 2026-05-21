'use client';

import * as React from 'react';
import { Primitive } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';

export interface ToggleProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'value'> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  asChild?: boolean;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>((props, forwardedRef) => {
  const {
    pressed: pressedProp,
    defaultPressed = false,
    onPressedChange,
    disabled,
    onClick,
    ...rest
  } = props;

  const [pressed = false, setPressed] = useControllableState<boolean>({
    prop: pressedProp,
    defaultProp: defaultPressed,
    onChange: onPressedChange,
  });

  return (
    <Primitive.button
      type="button"
      aria-pressed={pressed}
      data-state={pressed ? 'on' : 'off'}
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      {...rest}
      ref={forwardedRef}
      onClick={composeEventHandlers(onClick, () => {
        if (disabled) return;
        setPressed((prev) => !prev);
      })}
    />
  );
});
Toggle.displayName = 'Toggle';

export { Toggle };
