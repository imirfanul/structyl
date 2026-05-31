'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  RovingFocusGroup,
  RovingFocusItem,
} from '@structyl/core';
import { useControllableState } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';
import { Toggle as TogglePrimitive } from '../toggle';
import type {
  ToggleGroupRootProps,
  ToggleGroupSingleProps,
  ToggleGroupMultipleProps,
  ToggleGroupItemProps,
} from './toggle-group.types';

/* ─── Root ─────────────────────────────────────────────────────────── */

interface ToggleGroupContextValue {
  rovingFocus: boolean;
  disabled: boolean;
}

const [ToggleGroupProvider, useToggleGroupContext] =
  createContext<ToggleGroupContextValue>('ToggleGroup');

interface ValueContextValue {
  type: 'single' | 'multiple';
  value: string[];
  onItemActivate: (value: string) => void;
  onItemDeactivate: (value: string) => void;
}

const [ToggleGroupValueProvider, useToggleGroupValueContext] =
  createContext<ValueContextValue>('ToggleGroup');

const Root = React.forwardRef<HTMLDivElement, ToggleGroupRootProps>(
  (props, forwardedRef) => {
    const { type, ...rest } = props;
    if (type === 'single') {
      return <ToggleGroupImplSingle {...(rest as ToggleGroupSingleProps)} ref={forwardedRef} />;
    }
    return <ToggleGroupImplMultiple {...(rest as ToggleGroupMultipleProps)} ref={forwardedRef} />;
  },
) as React.ForwardRefExoticComponent<ToggleGroupRootProps & React.RefAttributes<HTMLDivElement>>;
Root.displayName = 'ToggleGroup.Root';

const ToggleGroupImplSingle = React.forwardRef<HTMLDivElement, Omit<ToggleGroupSingleProps, 'type'>>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange,
      ...rootProps
    } = props;

    const [value, setValue] = useControllableState<string | undefined>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: (v) => onValueChange?.(v as string),
    });

    return (
      <ToggleGroupValueProvider
        type="single"
        value={value ? [value] : []}
        onItemActivate={(v) => setValue(v)}
        onItemDeactivate={() => setValue('')}
      >
        <ToggleGroupImpl {...rootProps} ref={forwardedRef} />
      </ToggleGroupValueProvider>
    );
  },
);
ToggleGroupImplSingle.displayName = 'ToggleGroup.ImplSingle';

const ToggleGroupImplMultiple = React.forwardRef<
  HTMLDivElement,
  Omit<ToggleGroupMultipleProps, 'type'>
>((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange,
    ...rootProps
  } = props;

  const [value = [], setValue] = useControllableState<string[]>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const handleActivate = React.useCallback(
    (v: string) => setValue((prev = []) => [...prev, v]),
    [setValue],
  );
  const handleDeactivate = React.useCallback(
    (v: string) => setValue((prev = []) => prev.filter((x) => x !== v)),
    [setValue],
  );

  return (
    <ToggleGroupValueProvider
      type="multiple"
      value={value}
      onItemActivate={handleActivate}
      onItemDeactivate={handleDeactivate}
    >
      <ToggleGroupImpl {...rootProps} ref={forwardedRef} />
    </ToggleGroupValueProvider>
  );
});
ToggleGroupImplMultiple.displayName = 'ToggleGroup.ImplMultiple';

interface ToggleGroupImplProps extends React.ComponentPropsWithoutRef<'div'> {
  rovingFocus?: boolean;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  loop?: boolean;
}

const ToggleGroupImpl = React.forwardRef<HTMLDivElement, ToggleGroupImplProps>(
  (props, forwardedRef) => {
    const {
      rovingFocus = true,
      disabled = false,
      orientation,
      dir,
      loop = true,
      ...rest
    } = props;

    const commonProps = {
      role: 'group',
      dir,
      ...rest,
      ref: forwardedRef,
    };

    return (
      <ToggleGroupProvider rovingFocus={rovingFocus} disabled={disabled}>
        {rovingFocus ? (
          <RovingFocusGroup asChild orientation={orientation} dir={dir} loop={loop}>
            <Primitive.div {...commonProps} />
          </RovingFocusGroup>
        ) : (
          <Primitive.div {...commonProps} />
        )}
      </ToggleGroupProvider>
    );
  },
);
ToggleGroupImpl.displayName = 'ToggleGroup.Impl';

/* ─── Item ──────────────────────────────────────────────────────────── */

const Item = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  (props, forwardedRef) => {
    const { value, disabled, ...rest } = props;
    const groupCtx = useToggleGroupContext('ToggleGroup.Item');
    const valueCtx = useToggleGroupValueContext('ToggleGroup.Item');
    const pressed = valueCtx.value.includes(value);
    const isDisabled = groupCtx.disabled || disabled;

    const handlePressedChange = (next: boolean) => {
      if (next) valueCtx.onItemActivate(value);
      else valueCtx.onItemDeactivate(value);
    };

    const commonProps = {
      pressed,
      disabled: isDisabled,
      ...rest,
    } as React.ComponentPropsWithoutRef<typeof TogglePrimitive>;

    return groupCtx.rovingFocus ? (
      <RovingFocusItem asChild focusable={!isDisabled} active={pressed}>
        <TogglePrimitive
          {...commonProps}
          ref={forwardedRef}
          onPressedChange={composeEventHandlers(
            commonProps.onPressedChange,
            handlePressedChange,
          )}
        />
      </RovingFocusItem>
    ) : (
      <TogglePrimitive
        {...commonProps}
        ref={forwardedRef}
        onPressedChange={composeEventHandlers(
          commonProps.onPressedChange,
          handlePressedChange,
        )}
      />
    );
  },
);
Item.displayName = 'ToggleGroup.Item';

export { Root, Item };
