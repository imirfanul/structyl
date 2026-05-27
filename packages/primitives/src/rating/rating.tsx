'use client';

import * as React from 'react';
import { Primitive } from '@aura-ui/core';
import { useControllableState, useId } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';

export interface RatingProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue = 0,
    onChange,
    max = 5,
    step = 1,
    disabled = false,
    readOnly = false,
    required,
    name,
    id: idProp,
    onKeyDown,
    ...rest
  } = props;

  const id = useId(idProp);
  const [value = 0, setValue] = useControllableState<number>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange,
  });
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const items = Array.from({ length: Math.ceil(max / step) }, (_, i) => (i + 1) * step);
  const displayValue = hoverValue ?? value;

  const handleKeyDown = composeEventHandlers(onKeyDown, (e: React.KeyboardEvent) => {
    if (disabled || readOnly) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setValue(Math.min(value + step, max));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setValue(Math.max(value - step, 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setValue(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setValue(max);
    }
  });

  return (
    <Primitive.div
      ref={forwardedRef}
      role="slider"
      id={id}
      aria-label="Rating"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${value} out of ${max}`}
      aria-disabled={disabled}
      aria-readonly={readOnly}
      aria-required={required}
      tabIndex={disabled ? -1 : 0}
      data-disabled={disabled ? '' : undefined}
      data-readonly={readOnly ? '' : undefined}
      onKeyDown={handleKeyDown}
      onMouseLeave={() => !readOnly && setHoverValue(null)}
      {...rest}
    >
      {items.map((itemValue) => (
        <span
          key={itemValue}
          data-value={itemValue}
          data-active={displayValue >= itemValue ? '' : undefined}
          data-hover={hoverValue !== null && hoverValue >= itemValue ? '' : undefined}
          onMouseEnter={() => !disabled && !readOnly && setHoverValue(itemValue)}
          onClick={() => !disabled && !readOnly && setValue(itemValue === value ? 0 : itemValue)}
          style={{ cursor: disabled || readOnly ? 'default' : 'pointer' }}
        />
      ))}
      {name && (
        <input type="hidden" name={name} value={value} />
      )}
    </Primitive.div>
  );
});

Rating.displayName = 'Rating';

export { Rating };
