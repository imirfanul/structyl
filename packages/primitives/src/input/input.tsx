'use client';

import * as React from 'react';
import { useControllableState } from '@aura-ui/hooks';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string;
  defaultValue?: string;
  /** Visual size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Marks the input as invalid for ARIA */
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value: valueProp, defaultValue, onChange, invalid, size: _size, ...rest } = props;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: (v) => {
      if (onChange) {
        const synthetic = { target: { value: v } } as unknown as React.ChangeEvent<HTMLInputElement>;
        try { onChange(synthetic); } catch { /* ignore */ }
      }
    },
  });

  return (
    <input
      ref={ref}
      value={value ?? ''}
      aria-invalid={invalid || undefined}
      onChange={(e) => setValue(e.target.value)}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export { Input };
