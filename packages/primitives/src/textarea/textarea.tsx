import * as React from 'react';
import { useControllableState } from '@structyl/hooks';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  defaultValue?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { value: valueProp, defaultValue, onChange, ...rest } = props;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: (v) => {
      if (onChange) {
        const synthetic = {
          target: { value: v },
        } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
        try {
          onChange(synthetic);
        } catch {
          // ignore
        }
      }
    },
  });

  return (
    <textarea ref={ref} value={value ?? ''} onChange={(e) => setValue(e.target.value)} {...rest} />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
