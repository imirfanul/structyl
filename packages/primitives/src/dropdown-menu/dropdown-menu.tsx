'use client';

import * as React from 'react';
import { createContext, Primitive } from '@structyl/core';
import { useControllableState, useId, useComposedRefs } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';
import * as MenuPrimitive from '../menu';

interface DropdownMenuContextValue {
  triggerId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenToggle: () => void;
  modal: boolean;
}

const [DropdownMenuProvider, useDropdownMenuContext] =
  createContext<DropdownMenuContextValue>('DropdownMenu');

export interface DropdownMenuRootProps {
  children?: React.ReactNode;
  dir?: 'ltr' | 'rtl';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

const Root: React.FC<DropdownMenuRootProps> = ({
  children,
  dir,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  modal = true,
}) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  return (
    <DropdownMenuProvider
      triggerId={useId('dropdown-trigger')}
      triggerRef={triggerRef}
      contentId={useId('dropdown-content')}
      open={open}
      onOpenChange={setOpen as (v: boolean) => void}
      onOpenToggle={React.useCallback(() => setOpen((p) => !p), [setOpen])}
      modal={modal}
    >
      <MenuPrimitive.Root open={open} onOpenChange={setOpen as (v: boolean) => void} dir={dir} modal={modal}>
        {children}
      </MenuPrimitive.Root>
    </DropdownMenuProvider>
  );
};
Root.displayName = 'DropdownMenu.Root';

export interface DropdownMenuTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

const Trigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  (props, forwardedRef) => {
    const ctx = useDropdownMenuContext('DropdownMenu.Trigger');
    const composedRef = useComposedRefs(forwardedRef, ctx.triggerRef);
    return (
      <MenuPrimitive.Anchor asChild>
        <Primitive.button
          type="button"
          id={ctx.triggerId}
          aria-haspopup="menu"
          aria-expanded={ctx.open}
          aria-controls={ctx.contentId}
          data-state={ctx.open ? 'open' : 'closed'}
          {...props}
          ref={composedRef}
          onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
            if (!props.disabled && event.button === 0 && event.ctrlKey === false) {
              ctx.onOpenToggle();
              if (!ctx.open) event.preventDefault();
            }
          })}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            if (props.disabled) return;
            if (['Enter', ' '].includes(event.key)) ctx.onOpenToggle();
            if (event.key === 'ArrowDown') ctx.onOpenChange(true);
            if (['Enter', ' ', 'ArrowDown'].includes(event.key)) event.preventDefault();
          })}
        />
      </MenuPrimitive.Anchor>
    );
  },
);
Trigger.displayName = 'DropdownMenu.Trigger';

const Portal = MenuPrimitive.Portal;

const Content = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(({ ...props }, ref) => {
  const ctx = useDropdownMenuContext('DropdownMenu.Content');
  return (
    <MenuPrimitive.Content
      id={ctx.contentId}
      aria-labelledby={ctx.triggerId}
      {...props}
      ref={ref}
      onCloseAutoFocus={composeEventHandlers(props.onCloseAutoFocus, (event) => {
        if (!event.defaultPrevented) ctx.triggerRef.current?.focus();
        event.preventDefault();
      })}
    />
  );
});
Content.displayName = 'DropdownMenu.Content';

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
