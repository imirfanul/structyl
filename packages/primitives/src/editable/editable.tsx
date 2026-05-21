'use client';

import * as React from 'react';
import { createContext, Primitive } from '@your-lib/core';
import { useControllableState, useComposedRefs } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';

interface EditableContextValue {
  value: string;
  setValue: (v: string) => void;
  editing: boolean;
  setEditing: (b: boolean) => void;
  submitMode: 'enter' | 'blur' | 'both';
  inputRef: React.RefObject<HTMLInputElement | null>;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  disabled?: boolean;
}

const [EditableProvider, useEditableContext] = createContext<EditableContextValue>('Editable');

export interface EditableRootProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSubmit'> {
  asChild?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  editing?: boolean;
  defaultEditing?: boolean;
  onEditingChange?: (b: boolean) => void;
  submitMode?: 'enter' | 'blur' | 'both';
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  disabled?: boolean;
}

const Root = React.forwardRef<HTMLDivElement, EditableRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue = '',
      onValueChange,
      editing: editingProp,
      defaultEditing = false,
      onEditingChange,
      submitMode = 'both',
      onSubmit,
      onCancel,
      disabled,
      ...rest
    } = props;
    const [value = '', setValue] = useControllableState<string>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    const [editing = false, setEditing] = useControllableState<boolean>({
      prop: editingProp,
      defaultProp: defaultEditing,
      onChange: onEditingChange,
    });
    const inputRef = React.useRef<HTMLInputElement>(null);
    return (
      <EditableProvider
        value={value}
        setValue={(v) => setValue(v)}
        editing={editing}
        setEditing={(b) => setEditing(b)}
        submitMode={submitMode}
        inputRef={inputRef}
        onSubmit={onSubmit}
        onCancel={onCancel}
        disabled={disabled}
      >
        <Primitive.div data-editing={editing ? '' : undefined} {...rest} ref={forwardedRef} />
      </EditableProvider>
    );
  },
);
Root.displayName = 'Editable.Root';

const Preview = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  (props, forwardedRef) => {
    const ctx = useEditableContext('Editable.Preview');
    if (ctx.editing) return null;
    return (
      <Primitive.span
        tabIndex={0}
        {...props}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, () => {
          if (!ctx.disabled) {
            ctx.setEditing(true);
            queueMicrotask(() => ctx.inputRef.current?.focus());
          }
        })}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            ctx.setEditing(true);
          }
        })}
      >
        {ctx.value || props.children}
      </Primitive.span>
    );
  },
);
Preview.displayName = 'Editable.Preview';

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  (props, forwardedRef) => {
    const ctx = useEditableContext('Editable.Input');
    const composedRef = useComposedRefs(forwardedRef, ctx.inputRef);
    const [local, setLocal] = React.useState(ctx.value);
    React.useEffect(() => {
      if (ctx.editing) setLocal(ctx.value);
    }, [ctx.editing, ctx.value]);
    if (!ctx.editing) return null;
    const submit = () => {
      ctx.setValue(local);
      ctx.onSubmit?.(local);
      ctx.setEditing(false);
    };
    const cancel = () => {
      setLocal(ctx.value);
      ctx.onCancel?.();
      ctx.setEditing(false);
    };
    return (
      <Primitive.input
        value={local}
        disabled={ctx.disabled}
        {...props}
        ref={composedRef}
        onChange={composeEventHandlers(props.onChange, (event) => setLocal(event.currentTarget.value))}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (event.key === 'Enter' && (ctx.submitMode === 'enter' || ctx.submitMode === 'both')) {
            submit();
          } else if (event.key === 'Escape') cancel();
        })}
        onBlur={composeEventHandlers(props.onBlur, () => {
          if (ctx.submitMode === 'blur' || ctx.submitMode === 'both') submit();
        })}
      />
    );
  },
);
Input.displayName = 'Editable.Input';

export { Root, Preview, Input };
