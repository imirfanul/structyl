import * as React from 'react';
import { useControllableState } from '@aura-ui/hooks';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  defaultValue?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value: valueProp, defaultValue, onChange, ...rest } = props;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: (v) => {
      if (onChange) {
        const synthetic = {
          target: { value: v },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        // call original onChange with synthetic event when possible
        // If caller expects event, they will receive one; otherwise their handler can accept the value via v
        // This keeps API compatible with controlled/uncontrolled patterns.
        try {
          (onChange as any)(synthetic);
        } catch {
          // ignore
        }
      }
    },
  });

  return (
    <input ref={ref} value={value ?? ''} onChange={(e) => setValue(e.target.value)} {...rest} />
  );
});

Input.displayName = 'Input';

export { Input };
