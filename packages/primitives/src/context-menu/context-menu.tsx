'use client';

import * as React from 'react';
import { createContext, Primitive } from '@your-lib/core';
import { useControllableState, useComposedRefs } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';
import * as MenuPrimitive from '../menu';

interface ContextMenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modal: boolean;
}

const [ContextMenuProvider, useContextMenuContext] =
  createContext<ContextMenuContextValue>('ContextMenu');

export interface ContextMenuRootProps {
  children?: React.ReactNode;
  dir?: 'ltr' | 'rtl';
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

const Root: React.FC<ContextMenuRootProps> = ({
  children,
  dir,
  onOpenChange,
  modal = true,
}) => {
  const [open, setOpen] = useControllableState<boolean>({
    defaultProp: false,
    onChange: onOpenChange,
  });
  return (
    <ContextMenuProvider
      open={open ?? false}
      onOpenChange={setOpen as (v: boolean) => void}
      modal={modal}
    >
      <MenuPrimitive.Root
        dir={dir}
        modal={modal}
        open={open ?? false}
        onOpenChange={setOpen as (v: boolean) => void}
      >
        {children}
      </MenuPrimitive.Root>
    </ContextMenuProvider>
  );
};
Root.displayName = 'ContextMenu.Root';

export interface ContextMenuTriggerProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
  disabled?: boolean;
}

const Trigger = React.forwardRef<HTMLSpanElement, ContextMenuTriggerProps>(
  (props, forwardedRef) => {
    const { disabled, ...rest } = props;
    const ctx = useContextMenuContext('ContextMenu.Trigger');
    const pointRef = React.useRef({ x: 0, y: 0 });
    const virtualRef = React.useRef({
      getBoundingClientRect: () =>
        new DOMRect(pointRef.current.x, pointRef.current.y, 0, 0),
    });
    const longPressTimerRef = React.useRef(0);
    const clearLongPress = () => window.clearTimeout(longPressTimerRef.current);
    const handleOpen = (event: { clientX: number; clientY: number }) => {
      pointRef.current = { x: event.clientX, y: event.clientY };
      ctx.onOpenChange(true);
    };
    return (
      <>
        <MenuPrimitive.Anchor virtualRef={virtualRef as never} />
        <Primitive.span
          data-state={ctx.open ? 'open' : 'closed'}
          data-disabled={disabled ? '' : undefined}
          {...rest}
          ref={forwardedRef}
          style={{ WebkitTouchCallout: 'none', ...rest.style }}
          onContextMenu={composeEventHandlers(rest.onContextMenu, (event) => {
            clearLongPress();
            handleOpen(event);
            event.preventDefault();
          })}
          onPointerDown={composeEventHandlers(rest.onPointerDown, whenTouchOrPen((event) => {
            clearLongPress();
            longPressTimerRef.current = window.setTimeout(() => handleOpen(event), 700);
          }))}
          onPointerMove={composeEventHandlers(rest.onPointerMove, whenTouchOrPen(() => clearLongPress()))}
          onPointerCancel={composeEventHandlers(rest.onPointerCancel, whenTouchOrPen(() => clearLongPress()))}
          onPointerUp={composeEventHandlers(rest.onPointerUp, whenTouchOrPen(() => clearLongPress()))}
        />
      </>
    );
  },
);
Trigger.displayName = 'ContextMenu.Trigger';

function whenTouchOrPen<E extends React.PointerEvent>(handler: (e: E) => void) {
  return (e: E) => (e.pointerType !== 'mouse' ? handler(e) : undefined);
}

const Portal = MenuPrimitive.Portal;

const Content = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Content>,
  Omit<React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>, 'side' | 'sideOffset' | 'align'>
>((props, ref) => (
  <MenuPrimitive.Content
    {...props}
    ref={ref}
    side="bottom"
    align="start"
    sideOffset={2}
  />
));
Content.displayName = 'ContextMenu.Content';

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
