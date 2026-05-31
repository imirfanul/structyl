'use client';

import * as React from 'react';
import { Primitive } from '@structyl/core';
import { useControllableState } from '@structyl/hooks';
import type { StepperProps } from './stepper.types';

const Root = React.forwardRef<HTMLDivElement, StepperProps>((props, ref) => {
  const {
    value: valueProp,
    defaultValue = 0,
    onChange,
    min = 0,
    max = Infinity,
    step = 1,
    ...rest
  } = props;
  const [value, setValue] = useControllableState<number>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange,
  });
  const increment = () => setValue((v = 0) => Math.min(max, v + step));
  const decrement = () => setValue((v = 0) => Math.max(min, v - step));

  return (
    <Primitive.div ref={ref} role="group" aria-label="Stepper" {...rest}>
      <button type="button" aria-label="Decrement" onClick={decrement}>
        -
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" aria-label="Increment" onClick={increment}>
        +
      </button>
    </Primitive.div>
  );
});
Root.displayName = 'Stepper.Root';

export { Root };
