'use client';

import * as React from 'react';
import { createContext, Primitive } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';

interface PtfContextValue {
  visible: boolean;
  onToggle: () => void;
}

const [PtfProvider, usePtfContext] = createContext<PtfContextValue>('PasswordToggleField');

export interface PasswordToggleFieldRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const Root = React.forwardRef<HTMLDivElement, PasswordToggleFieldRootProps>(
  (props, forwardedRef) => {
    const {
      visible: visibleProp,
      defaultVisible = false,
      onVisibleChange,
      ...rest
    } = props;
    const [visible = false, setVisible] = useControllableState<boolean>({
      prop: visibleProp,
      defaultProp: defaultVisible,
      onChange: onVisibleChange,
    });
    return (
      <PtfProvider visible={visible} onToggle={React.useCallback(() => setVisible((v) => !v), [setVisible])}>
        <Primitive.div {...rest} ref={forwardedRef} />
      </PtfProvider>
    );
  },
);
Root.displayName = 'PasswordToggleField.Root';

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  (props, forwardedRef) => {
    const ctx = usePtfContext('PasswordToggleField.Input');
    return (
      <Primitive.input
        type={ctx.visible ? 'text' : 'password'}
        autoComplete="current-password"
        {...props}
        ref={forwardedRef}
      />
    );
  },
);
Input.displayName = 'PasswordToggleField.Input';

const Toggle = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>(
  (props, forwardedRef) => {
    const ctx = usePtfContext('PasswordToggleField.Toggle');
    return (
      <Primitive.button
        type="button"
        aria-pressed={ctx.visible}
        aria-label={ctx.visible ? 'Hide password' : 'Show password'}
        data-state={ctx.visible ? 'visible' : 'hidden'}
        {...props}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, ctx.onToggle)}
      />
    );
  },
);
Toggle.displayName = 'PasswordToggleField.Toggle';

const Icon: React.FC<{
  visible?: React.ReactNode;
  hidden?: React.ReactNode;
}> = ({ visible, hidden }) => {
  const ctx = usePtfContext('PasswordToggleField.Icon');
  return <>{ctx.visible ? visible : hidden}</>;
};
Icon.displayName = 'PasswordToggleField.Icon';

export { Root, Input, Toggle, Icon };
