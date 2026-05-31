'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  RovingFocusGroup,
  RovingFocusItem,
  Presence,
} from '@structyl/core';
import { useControllableState, useId } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';
import type {
  TabsRootProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './tabs.types';

interface TabsContextValue {
  baseId: string;
  value?: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  activationMode: 'automatic' | 'manual';
}

const [TabsProvider, useTabsContext] = createContext<TabsContextValue>('Tabs');

/* ─── Root ─────────────────────────────────────────────────────────── */

const Root = React.forwardRef<HTMLDivElement, TabsRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange,
      orientation = 'horizontal',
      dir,
      activationMode = 'automatic',
      ...rest
    } = props;
    const [value, setValue] = useControllableState<string | undefined>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: (v) => onValueChange?.(v as string),
    });

    return (
      <TabsProvider
        baseId={useId('tabs')}
        value={value}
        onValueChange={(v) => setValue(v)}
        orientation={orientation}
        dir={dir}
        activationMode={activationMode}
      >
        <Primitive.div
          dir={dir}
          data-orientation={orientation}
          {...rest}
          ref={forwardedRef}
        />
      </TabsProvider>
    );
  },
);
Root.displayName = 'Tabs.Root';

/* ─── List ─────────────────────────────────────────────────────────── */

const List = React.forwardRef<HTMLDivElement, TabsListProps>(
  (props, forwardedRef) => {
    const { loop = true, ...rest } = props;
    const ctx = useTabsContext('Tabs.List');
    return (
      <RovingFocusGroup
        asChild
        orientation={ctx.orientation}
        dir={ctx.dir}
        loop={loop}
      >
        <Primitive.div
          role="tablist"
          aria-orientation={ctx.orientation}
          {...rest}
          ref={forwardedRef}
        />
      </RovingFocusGroup>
    );
  },
);
List.displayName = 'Tabs.List';

/* ─── Trigger ──────────────────────────────────────────────────────── */

const Trigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (props, forwardedRef) => {
    const { value, disabled, ...rest } = props;
    const ctx = useTabsContext('Tabs.Trigger');
    const triggerId = makeTriggerId(ctx.baseId, value);
    const contentId = makeContentId(ctx.baseId, value);
    const isSelected = ctx.value === value;

    return (
      <RovingFocusItem asChild focusable={!disabled} active={isSelected}>
        <Primitive.button
          type="button"
          role="tab"
          aria-selected={isSelected}
          aria-controls={contentId}
          data-state={isSelected ? 'active' : 'inactive'}
          data-disabled={disabled ? '' : undefined}
          disabled={disabled}
          id={triggerId}
          {...rest}
          ref={forwardedRef}
          onMouseDown={composeEventHandlers(rest.onMouseDown, (event) => {
            if (!disabled && event.button === 0 && event.ctrlKey === false) {
              ctx.onValueChange(value);
            } else {
              event.preventDefault();
            }
          })}
          onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
            if ([' ', 'Enter'].includes(event.key)) ctx.onValueChange(value);
          })}
          onFocus={composeEventHandlers(rest.onFocus, () => {
            const isAutomatic = ctx.activationMode !== 'manual';
            if (!isSelected && !disabled && isAutomatic) {
              ctx.onValueChange(value);
            }
          })}
        />
      </RovingFocusItem>
    );
  },
);
Trigger.displayName = 'Tabs.Trigger';

/* ─── Content ──────────────────────────────────────────────────────── */

const Content = React.forwardRef<HTMLDivElement, TabsContentProps>(
  (props, forwardedRef) => {
    const { value, forceMount, children, ...rest } = props;
    const ctx = useTabsContext('Tabs.Content');
    const triggerId = makeTriggerId(ctx.baseId, value);
    const contentId = makeContentId(ctx.baseId, value);
    const isSelected = ctx.value === value;
    return (
      <Presence present={forceMount || isSelected}>
        {({ present }) => (
          <Primitive.div
            data-state={isSelected ? 'active' : 'inactive'}
            data-orientation={ctx.orientation}
            role="tabpanel"
            aria-labelledby={triggerId}
            hidden={!present}
            id={contentId}
            tabIndex={0}
            {...rest}
            ref={forwardedRef}
          >
            {present ? children : null}
          </Primitive.div>
        )}
      </Presence>
    );
  },
);
Content.displayName = 'Tabs.Content';

function makeTriggerId(baseId: string, value: string) {
  return `${baseId}-trigger-${value}`;
}

function makeContentId(baseId: string, value: string) {
  return `${baseId}-content-${value}`;
}

export { Root, List, Trigger, Content };
