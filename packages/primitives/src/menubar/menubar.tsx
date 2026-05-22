'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  RovingFocusGroup,
  RovingFocusItem,
  useDirection,
} from '@aura-ui/core';
import { useControllableState, useId, useComposedRefs } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';
import * as MenuPrimitive from '../menu';

interface MenubarContextValue {
  value: string;
  dir: 'ltr' | 'rtl';
  loop: boolean;
  onMenuOpen: (value: string) => void;
  onMenuClose: () => void;
  onMenuToggle: (value: string) => void;
}

const [MenubarProvider, useMenubarContext] = createContext<MenubarContextValue>('Menubar');

export interface MenubarRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  dir?: 'ltr' | 'rtl';
  loop?: boolean;
}

const Root = React.forwardRef<HTMLDivElement, MenubarRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange,
      dir: dirProp,
      loop = true,
      ...rootProps
    } = props;
    const dir = useDirection(dirProp);
    const [value = '', setValue] = useControllableState<string>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    const [currentTabStopId, setCurrentTabStopId] = React.useState<string | null>(null);
    return (
      <MenubarProvider
        value={value}
        dir={dir}
        loop={loop}
        onMenuOpen={React.useCallback(
          (v: string) => {
            setValue(v);
            setCurrentTabStopId(v);
          },
          [setValue],
        )}
        onMenuClose={React.useCallback(() => setValue(''), [setValue])}
        onMenuToggle={React.useCallback(
          (v: string) => setValue((prev) => (prev ? '' : v)),
          [setValue],
        )}
      >
        <RovingFocusGroup
          asChild
          orientation="horizontal"
          dir={dir}
          loop={loop}
          currentTabStopId={currentTabStopId}
          onCurrentTabStopIdChange={setCurrentTabStopId}
        >
          <Primitive.div role="menubar" {...rootProps} ref={forwardedRef} />
        </RovingFocusGroup>
      </MenubarProvider>
    );
  },
);
Root.displayName = 'Menubar.Root';

interface MenubarMenuContextValue {
  value: string;
  triggerId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentId: string;
  wasKeyboardTriggerOpenRef: React.RefObject<boolean>;
}

const [MenubarMenuProvider, useMenubarMenuContext] =
  createContext<MenubarMenuContextValue>('MenubarMenu');

const Menu: React.FC<{ children?: React.ReactNode; value?: string }> = ({ children, value: valueProp }) => {
  const autoValue = useId('menubar-menu');
  const value = valueProp || autoValue;
  const ctx = useMenubarContext('Menubar.Menu');
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const wasKeyboardTriggerOpenRef = React.useRef(false);
  const open = ctx.value === value;
  return (
    <MenubarMenuProvider
      value={value}
      triggerId={useId('menubar-menu-trigger')}
      triggerRef={triggerRef}
      contentId={useId('menubar-menu-content')}
      wasKeyboardTriggerOpenRef={wasKeyboardTriggerOpenRef}
    >
      <MenuPrimitive.Root
        open={open}
        onOpenChange={(o) => {
          if (!o) ctx.onMenuClose();
        }}
        modal={false}
        dir={ctx.dir}
      >
        {children}
      </MenuPrimitive.Root>
    </MenubarMenuProvider>
  );
};
Menu.displayName = 'Menubar.Menu';

export interface MenubarTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  disabled?: boolean;
}

const Trigger = React.forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  (props, forwardedRef) => {
    const ctx = useMenubarContext('Menubar.Trigger');
    const menuCtx = useMenubarMenuContext('Menubar.Trigger');
    const composedRef = useComposedRefs(forwardedRef, menuCtx.triggerRef);
    const open = ctx.value === menuCtx.value;
    return (
      <MenuPrimitive.Anchor asChild>
        <RovingFocusItem
          asChild
          focusable={!props.disabled}
          tabStopId={menuCtx.value}
        >
          <Primitive.button
            type="button"
            role="menuitem"
            id={menuCtx.triggerId}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={open ? menuCtx.contentId : undefined}
            data-highlighted={undefined}
            data-state={open ? 'open' : 'closed'}
            data-disabled={props.disabled ? '' : undefined}
            disabled={props.disabled}
            {...props}
            ref={composedRef}
            onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
              if (!props.disabled && event.button === 0 && event.ctrlKey === false) {
                ctx.onMenuOpen(menuCtx.value);
                if (!open) event.preventDefault();
              }
            })}
            onPointerEnter={composeEventHandlers(props.onPointerEnter, () => {
              const menubarOpen = Boolean(ctx.value);
              if (menubarOpen && !open) ctx.onMenuOpen(menuCtx.value);
            })}
            onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
              if (props.disabled) return;
              if (['Enter', ' '].includes(event.key)) ctx.onMenuToggle(menuCtx.value);
              if (event.key === 'ArrowDown') ctx.onMenuOpen(menuCtx.value);
              if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
                menuCtx.wasKeyboardTriggerOpenRef.current = true;
                event.preventDefault();
              }
            })}
          />
        </RovingFocusItem>
      </MenuPrimitive.Anchor>
    );
  },
);
Trigger.displayName = 'Menubar.Trigger';

const Portal = MenuPrimitive.Portal;

const Content = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(({ ...props }, ref) => {
  const ctx = useMenubarContext('Menubar.Content');
  const menuCtx = useMenubarMenuContext('Menubar.Content');
  return (
    <MenuPrimitive.Content
      id={menuCtx.contentId}
      aria-labelledby={menuCtx.triggerId}
      align="start"
      {...props}
      ref={ref}
      onCloseAutoFocus={composeEventHandlers(props.onCloseAutoFocus, (event) => {
        const isKeyboard = menuCtx.wasKeyboardTriggerOpenRef.current;
        if (!isKeyboard) event.preventDefault();
        menuCtx.wasKeyboardTriggerOpenRef.current = false;
      })}
      onFocusOutside={composeEventHandlers(props.onFocusOutside, (event) => {
        const content = event.target as HTMLElement;
        const hasInteractedOutsideMenubar = !content.closest('[role="menubar"]');
        if (hasInteractedOutsideMenubar) ctx.onMenuClose();
      })}
    />
  );
});
Content.displayName = 'Menubar.Content';

const Item = MenuPrimitive.Item;
const Group = MenuPrimitive.Group;
const Label = MenuPrimitive.Label;
const CheckboxItem = MenuPrimitive.CheckboxItem;
const RadioGroup = MenuPrimitive.RadioGroup;
const RadioItem = MenuPrimitive.RadioItem;
const ItemIndicator = MenuPrimitive.ItemIndicator;
const Separator = MenuPrimitive.Separator;
const Sub = MenuPrimitive.Sub;
const SubTrigger = MenuPrimitive.SubTrigger;
const SubContent = MenuPrimitive.SubContent;

export {
  Root,
  Menu,
  Trigger,
  Portal,
  Content,
  Item,
  Group,
  Label,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  ItemIndicator,
  Separator,
  Sub,
  SubTrigger,
  SubContent,
};
