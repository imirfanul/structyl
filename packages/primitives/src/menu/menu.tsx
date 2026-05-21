'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  Portal as PortalPrimitive,
  Presence,
  FocusScope,
  FocusGuards,
  DismissableLayer,
  RovingFocusGroup,
  RovingFocusItem,
  useScrollLock,
  Popper,
  useDirection,
} from '@your-lib/core';
import { useId, useComposedRefs, useControllableState } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';
import type {
  MenuRootProps,
  MenuAnchorProps,
  MenuPortalProps,
  MenuContentProps,
  MenuItemProps,
  MenuGroupProps,
  MenuLabelProps,
  MenuCheckboxItemProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuItemIndicatorProps,
  MenuSeparatorProps,
} from './menu.types';

const SELECTION_KEYS = ['Enter', ' '];
const FIRST_KEYS = ['ArrowDown', 'PageUp', 'Home'];
const LAST_KEYS = ['ArrowUp', 'PageDown', 'End'];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const SUB_OPEN_KEYS: Record<'ltr' | 'rtl', string[]> = {
  ltr: [...SELECTION_KEYS, 'ArrowRight'],
  rtl: [...SELECTION_KEYS, 'ArrowLeft'],
};
const SUB_CLOSE_KEYS: Record<'ltr' | 'rtl', string[]> = {
  ltr: ['ArrowLeft'],
  rtl: ['ArrowRight'],
};

interface MenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: HTMLDivElement | null;
  onContentChange: (content: HTMLDivElement | null) => void;
}

const [MenuProvider, useMenuContext] = createContext<MenuContextValue>('Menu');

interface MenuRootContextValue {
  onClose: () => void;
  isUsingKeyboardRef: React.RefObject<boolean>;
  dir: 'ltr' | 'rtl';
  modal: boolean;
}

const [MenuRootContextProvider, useMenuRootContext] =
  createContext<MenuRootContextValue>('MenuRoot');

/* ─── Root ─────────────────────────────────────────────────────────── */

const Root: React.FC<MenuRootProps> = ({
  open: openProp = false,
  onOpenChange,
  modal = true,
  dir,
  children,
}) => {
  const direction = useDirection(dir);
  const [content, setContent] = React.useState<HTMLDivElement | null>(null);
  const isUsingKeyboardRef = React.useRef(false);

  React.useEffect(() => {
    const handleKeyDown = () => {
      isUsingKeyboardRef.current = true;
      document.addEventListener('pointerdown', handlePointer, { capture: true, once: true });
      document.addEventListener('pointermove', handlePointer, { capture: true, once: true });
    };
    const handlePointer = () => (isUsingKeyboardRef.current = false);
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('pointerdown', handlePointer, { capture: true });
      document.removeEventListener('pointermove', handlePointer, { capture: true });
    };
  }, []);

  return (
    <Popper.Root>
      <MenuProvider
        open={openProp}
        onOpenChange={(v) => onOpenChange?.(v)}
        content={content}
        onContentChange={setContent}
      >
        <MenuRootContextProvider
          onClose={React.useCallback(() => onOpenChange?.(false), [onOpenChange])}
          isUsingKeyboardRef={isUsingKeyboardRef}
          dir={direction}
          modal={modal}
        >
          {children}
        </MenuRootContextProvider>
      </MenuProvider>
    </Popper.Root>
  );
};
Root.displayName = 'Menu.Root';

/* ─── Anchor ──────────────────────────────────────────────────────── */

const Anchor = React.forwardRef<HTMLDivElement, MenuAnchorProps>(
  (props, forwardedRef) => <Popper.Anchor {...props} ref={forwardedRef} />,
);
Anchor.displayName = 'Menu.Anchor';

/* ─── Portal ──────────────────────────────────────────────────────── */

const PortalContext = React.createContext<{ forceMount?: boolean }>({});

const Portal: React.FC<MenuPortalProps> = ({ children, container, forceMount }) => {
  const ctx = useMenuContext('Menu.Portal');
  return (
    <PortalContext.Provider value={{ forceMount }}>
      <Presence present={forceMount || ctx.open}>
        <PortalPrimitive container={container ?? undefined}>{children}</PortalPrimitive>
      </Presence>
    </PortalContext.Provider>
  );
};
Portal.displayName = 'Menu.Portal';

/* ─── Content ─────────────────────────────────────────────────────── */

interface MenuContentContextValue {
  onItemEnter: (event: React.PointerEvent) => void;
  onItemLeave: (event: React.PointerEvent) => void;
  onTriggerLeave: (event: React.PointerEvent) => void;
  searchRef: React.RefObject<string>;
  pointerGraceTimerRef: React.RefObject<number>;
  onPointerGraceIntentChange: (intent: GraceIntent | null) => void;
}

const [MenuContentContextProvider, useMenuContentContext] =
  createContext<MenuContentContextValue>('MenuContent');

type GraceIntent = { area: Point[]; side: 'top' | 'right' | 'bottom' | 'left' };
type Point = { x: number; y: number };

const Content = React.forwardRef<HTMLDivElement, MenuContentProps>(
  (props, forwardedRef) => {
    const portalCtx = React.useContext(PortalContext);
    const ctx = useMenuContext('Menu.Content');
    const rootCtx = useMenuRootContext('Menu.Content');
    const {
      forceMount = portalCtx.forceMount,
      loop = false,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      side,
      sideOffset,
      align,
      alignOffset,
      avoidCollisions,
      collisionPadding,
      ...contentProps
    } = props;

    const composedRefs = useComposedRefs(forwardedRef, ctx.onContentChange);
    const [currentItemId, setCurrentItemId] = React.useState<string | null>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedAllRefs = useComposedRefs(forwardedRef, contentRef, ctx.onContentChange);
    const searchRef = React.useRef('');
    const timerRef = React.useRef(0);
    const pointerDirRef = React.useRef<'right' | 'left'>('right');
    const lastPointerXRef = React.useRef(0);
    const pointerGraceTimerRef = React.useRef(0);
    const pointerGraceIntentRef = React.useRef<GraceIntent | null>(null);

    useScrollLock(rootCtx.modal && ctx.open);

    const handleTypeaheadSearch = (key: string) => {
      const search = searchRef.current + key;
      const items = getOpenItems(contentRef.current);
      const focusedItem = document.activeElement as HTMLElement | null;
      const currentMatch = items.find((i) => i === focusedItem)?.textContent ?? '';
      const values = items.map((i) => i.textContent || '');
      const nextMatch = getNextMatch(values, search, currentMatch);
      const newItem = items.find((i) => i.textContent === nextMatch);
      function updateSearch(s: string) {
        searchRef.current = s;
        window.clearTimeout(timerRef.current);
        if (s !== '') timerRef.current = window.setTimeout(() => updateSearch(''), 1000);
      }
      if (newItem) newItem.focus();
      updateSearch(search);
    };

    React.useEffect(() => () => window.clearTimeout(timerRef.current), []);

    return (
      <MenuContentContextProvider
        searchRef={searchRef}
        onItemEnter={React.useCallback((event) => {
          if (isPointerMovingToSubmenu(event, pointerGraceIntentRef.current)) {
            event.preventDefault();
          }
        }, [])}
        onItemLeave={React.useCallback((event) => {
          if (isPointerMovingToSubmenu(event, pointerGraceIntentRef.current)) return;
          contentRef.current?.focus();
          setCurrentItemId(null);
        }, [])}
        onTriggerLeave={React.useCallback((event) => {
          if (isPointerMovingToSubmenu(event, pointerGraceIntentRef.current)) {
            event.preventDefault();
          }
        }, [])}
        pointerGraceTimerRef={pointerGraceTimerRef}
        onPointerGraceIntentChange={React.useCallback((intent) => {
          pointerGraceIntentRef.current = intent;
        }, [])}
      >
        <Presence present={forceMount || ctx.open}>
          <Popper.Content
            data-state={ctx.open ? 'open' : 'closed'}
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
            avoidCollisions={avoidCollisions}
            collisionPadding={collisionPadding}
          >
            <FocusGuards />
            <DismissableLayer
              asChild
              disableOutsidePointerEvents={rootCtx.modal && ctx.open}
              onEscapeKeyDown={onEscapeKeyDown}
              onPointerDownOutside={onPointerDownOutside}
              onFocusOutside={onFocusOutside}
              onInteractOutside={onInteractOutside}
              onDismiss={() => rootCtx.onClose()}
            >
              <FocusScope
                loop
                trapped={rootCtx.modal}
                onMountAutoFocus={(event) => {
                  event.preventDefault();
                  contentRef.current?.focus({ preventScroll: true });
                }}
                onUnmountAutoFocus={onCloseAutoFocus}
                style={{ display: 'contents' }}
              >
                <RovingFocusGroup
                  asChild
                  dir={rootCtx.dir}
                  orientation="vertical"
                  loop={loop}
                  currentTabStopId={currentItemId}
                  onCurrentTabStopIdChange={setCurrentItemId}
                >
                  <Primitive.div
                    role="menu"
                    aria-orientation="vertical"
                    data-state={ctx.open ? 'open' : 'closed'}
                    dir={rootCtx.dir}
                    tabIndex={-1}
                    {...contentProps}
                    ref={composedAllRefs}
                    onKeyDown={composeEventHandlers(contentProps.onKeyDown, (event) => {
                      const target = event.target as HTMLElement;
                      const isKeyDownInside =
                        target.closest('[role="menu"]') === event.currentTarget;
                      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                      const isCharacterKey = event.key.length === 1;
                      if (isKeyDownInside) {
                        if (event.key === 'Tab') event.preventDefault();
                        if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
                      }
                      if (event.target !== event.currentTarget) return;
                      if (!FIRST_LAST_KEYS.includes(event.key)) return;
                      event.preventDefault();
                      const items = getOpenItems(event.currentTarget);
                      if (LAST_KEYS.includes(event.key)) items.reverse();
                      focusFirst(items);
                    })}
                    onBlur={composeEventHandlers(contentProps.onBlur, (event) => {
                      if (!event.currentTarget.contains(event.target)) {
                        window.clearTimeout(timerRef.current);
                        searchRef.current = '';
                      }
                    })}
                    onPointerMove={composeEventHandlers(
                      contentProps.onPointerMove,
                      whenMouse((event) => {
                        const target = event.target as HTMLElement;
                        const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
                        if (event.currentTarget.contains(target) && pointerXHasChanged) {
                          const newDir = event.clientX > lastPointerXRef.current ? 'right' : 'left';
                          pointerDirRef.current = newDir;
                          lastPointerXRef.current = event.clientX;
                        }
                      }),
                    )}
                  />
                </RovingFocusGroup>
              </FocusScope>
            </DismissableLayer>
          </Popper.Content>
        </Presence>
      </MenuContentContextProvider>
    );
  },
);
Content.displayName = 'Menu.Content';

/* ─── Item ────────────────────────────────────────────────────────── */

interface MenuItemContextValue {
  disabled: boolean;
  textValue?: string;
}

const Item = React.forwardRef<HTMLDivElement, MenuItemProps>((props, forwardedRef) => {
  const { disabled = false, onSelect, ...rest } = props;
  const itemRef = React.useRef<HTMLDivElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, itemRef);
  const rootCtx = useMenuRootContext('Menu.Item');
  const contentCtx = useMenuContentContext('Menu.Item');
  const isFocused = React.useRef(false);
  const handleSelect = () => {
    const menuItem = itemRef.current;
    if (!disabled && menuItem) {
      const itemSelectEvent = new CustomEvent('menu.itemSelect', { bubbles: true, cancelable: true });
      menuItem.addEventListener('menu.itemSelect', (e) => onSelect?.(e as unknown as Event), {
        once: true,
      });
      menuItem.dispatchEvent(itemSelectEvent);
      if (!itemSelectEvent.defaultPrevented) rootCtx.onClose();
    }
  };
  return (
    <RovingFocusItem asChild focusable={!disabled}>
      <Primitive.div
        role="menuitem"
        data-highlighted={undefined}
        data-disabled={disabled ? '' : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? undefined : -1}
        {...rest}
        ref={composedRefs}
        onPointerMove={composeEventHandlers(
          rest.onPointerMove,
          whenMouse((event) => {
            if (disabled) contentCtx.onItemLeave(event);
            else {
              contentCtx.onItemEnter(event);
              if (!event.defaultPrevented) {
                const target = event.currentTarget as HTMLElement;
                target.focus({ preventScroll: true });
              }
            }
          }),
        )}
        onPointerLeave={composeEventHandlers(
          rest.onPointerLeave,
          whenMouse((event) => contentCtx.onItemLeave(event)),
        )}
        onClick={composeEventHandlers(rest.onClick, () => {
          if (!disabled) handleSelect();
        })}
        onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
          if (disabled) return;
          if (SELECTION_KEYS.includes(event.key)) {
            event.preventDefault();
            handleSelect();
          }
        })}
        onFocus={composeEventHandlers(rest.onFocus, () => {
          isFocused.current = true;
        })}
        onBlur={composeEventHandlers(rest.onBlur, () => {
          isFocused.current = false;
        })}
      />
    </RovingFocusItem>
  );
});
Item.displayName = 'Menu.Item';

/* ─── Group / Label / Separator ────────────────────────────────────── */

const Group = React.forwardRef<HTMLDivElement, MenuGroupProps>((props, forwardedRef) => (
  <Primitive.div role="group" {...props} ref={forwardedRef} />
));
Group.displayName = 'Menu.Group';

const Label = React.forwardRef<HTMLDivElement, MenuLabelProps>((props, forwardedRef) => (
  <Primitive.div {...props} ref={forwardedRef} />
));
Label.displayName = 'Menu.Label';

const Separator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  (props, forwardedRef) => (
    <Primitive.div role="separator" aria-orientation="horizontal" {...props} ref={forwardedRef} />
  ),
);
Separator.displayName = 'Menu.Separator';

/* ─── CheckboxItem / RadioGroup / RadioItem / ItemIndicator ─────────── */

interface ItemIndicatorContextValue {
  checked: boolean | 'indeterminate';
}

const [ItemIndicatorContextProvider, useItemIndicatorContext] =
  createContext<ItemIndicatorContextValue>('MenuItemIndicator', { checked: false });

const CheckboxItem = React.forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  (props, forwardedRef) => {
    const { checked = false, onCheckedChange, onSelect, ...itemProps } = props;
    return (
      <ItemIndicatorContextProvider checked={checked}>
        <Item
          role="menuitemcheckbox"
          aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
          data-state={getCheckedState(checked)}
          {...itemProps}
          ref={forwardedRef}
          onSelect={composeEventHandlers(
            onSelect,
            () => onCheckedChange?.(checked === 'indeterminate' ? true : !checked),
            { checkForDefaultPrevented: false },
          )}
        />
      </ItemIndicatorContextProvider>
    );
  },
);
CheckboxItem.displayName = 'Menu.CheckboxItem';

interface RadioGroupContextValue {
  value?: string;
  onValueChange: (v: string) => void;
}

const [MenuRadioGroupContextProvider, useMenuRadioGroupContext] =
  createContext<RadioGroupContextValue>('MenuRadioGroup', {
    value: undefined,
    onValueChange: () => {},
  });

const RadioGroup = React.forwardRef<HTMLDivElement, MenuRadioGroupProps>(
  (props, forwardedRef) => {
    const { value, onValueChange = () => {}, ...rest } = props;
    return (
      <MenuRadioGroupContextProvider value={value} onValueChange={onValueChange}>
        <Group {...rest} ref={forwardedRef} />
      </MenuRadioGroupContextProvider>
    );
  },
);
RadioGroup.displayName = 'Menu.RadioGroup';

const RadioItem = React.forwardRef<HTMLDivElement, MenuRadioItemProps>(
  (props, forwardedRef) => {
    const { value, onSelect, ...rest } = props;
    const rg = useMenuRadioGroupContext('Menu.RadioItem');
    const checked = value === rg.value;
    return (
      <ItemIndicatorContextProvider checked={checked}>
        <Item
          role="menuitemradio"
          aria-checked={checked}
          data-state={getCheckedState(checked)}
          {...rest}
          ref={forwardedRef}
          onSelect={composeEventHandlers(
            onSelect,
            () => rg.onValueChange(value),
            { checkForDefaultPrevented: false },
          )}
        />
      </ItemIndicatorContextProvider>
    );
  },
);
RadioItem.displayName = 'Menu.RadioItem';

const ItemIndicator = React.forwardRef<HTMLSpanElement, MenuItemIndicatorProps>(
  (props, forwardedRef) => {
    const { forceMount, ...rest } = props;
    const ctx = useItemIndicatorContext('Menu.ItemIndicator');
    return (
      <Presence present={forceMount || ctx.checked === 'indeterminate' || ctx.checked === true}>
        <Primitive.span
          data-state={getCheckedState(ctx.checked)}
          {...rest}
          ref={forwardedRef}
        />
      </Presence>
    );
  },
);
ItemIndicator.displayName = 'Menu.ItemIndicator';

/* ─── Sub / SubTrigger / SubContent ─────────────────────────────────── */

interface MenuSubContextValue {
  triggerId: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  contentId: string;
  parentMenuContent: HTMLDivElement | null;
}

const [MenuSubProvider, useMenuSubContext] = createContext<MenuSubContextValue>('MenuSub');

const Sub: React.FC<{
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}> = ({ children, open: openProp, defaultOpen, onOpenChange }) => {
  const parentMenu = useMenuContext('Menu.Sub');
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [content, setContent] = React.useState<HTMLDivElement | null>(null);
  const [open = false, setOpen] = useControllableState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  return (
    <Popper.Root>
      <MenuProvider
        open={open}
        onOpenChange={(v) => setOpen(v)}
        content={content}
        onContentChange={setContent}
      >
        <MenuSubProvider
          triggerId={useId('menu-sub-trigger')}
          triggerRef={triggerRef}
          contentId={useId('menu-sub-content')}
          parentMenuContent={parentMenu.content}
        >
          {children}
        </MenuSubProvider>
      </MenuProvider>
    </Popper.Root>
  );
};
Sub.displayName = 'Menu.Sub';

const SubTrigger = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (props, forwardedRef) => {
    const ctx = useMenuContext('Menu.SubTrigger');
    const rootCtx = useMenuRootContext('Menu.SubTrigger');
    const subCtx = useMenuSubContext('Menu.SubTrigger');
    const contentCtx = useMenuContentContext('Menu.SubTrigger');
    const composedRef = useComposedRefs(forwardedRef, subCtx.triggerRef);
    const openTimerRef = React.useRef(0);
    const clearOpenTimer = () => {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = 0;
    };
    React.useEffect(() => clearOpenTimer, []);
    return (
      <Popper.Anchor asChild>
        <Item
          id={subCtx.triggerId}
          aria-haspopup="menu"
          aria-expanded={ctx.open}
          aria-controls={subCtx.contentId}
          data-state={ctx.open ? 'open' : 'closed'}
          {...props}
          ref={composedRef}
          onClick={(event) => {
            props.onClick?.(event);
            if (props.disabled || event.defaultPrevented) return;
            event.currentTarget.focus();
            if (!ctx.open) ctx.onOpenChange(true);
          }}
          onPointerMove={composeEventHandlers(
            props.onPointerMove,
            whenMouse((event) => {
              contentCtx.onItemEnter(event);
              if (event.defaultPrevented) return;
              if (!props.disabled && !ctx.open && !openTimerRef.current) {
                openTimerRef.current = window.setTimeout(() => {
                  ctx.onOpenChange(true);
                  clearOpenTimer();
                }, 100);
              }
            }),
          )}
          onPointerLeave={composeEventHandlers(
            props.onPointerLeave,
            whenMouse((event) => {
              clearOpenTimer();
              const contentRect = ctx.content?.getBoundingClientRect();
              if (contentRect) {
                const side = ctx.content!.dataset.side as 'top' | 'right' | 'bottom' | 'left';
                contentCtx.onPointerGraceIntentChange({
                  area: [
                    { x: event.clientX + 1, y: event.clientY },
                    { x: contentRect.left, y: contentRect.top },
                    { x: contentRect.right, y: contentRect.top },
                    { x: contentRect.right, y: contentRect.bottom },
                    { x: contentRect.left, y: contentRect.bottom },
                  ],
                  side: side ?? 'right',
                });
                window.clearTimeout(contentCtx.pointerGraceTimerRef.current as unknown as number);
              } else {
                contentCtx.onTriggerLeave(event);
                if (event.defaultPrevented) return;
                contentCtx.onPointerGraceIntentChange(null);
              }
            }),
          )}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            const isTypingAhead = contentCtx.searchRef.current !== '';
            if (props.disabled || (isTypingAhead && event.key === ' ')) return;
            if (SUB_OPEN_KEYS[rootCtx.dir].includes(event.key)) {
              ctx.onOpenChange(true);
              ctx.content?.focus();
              event.preventDefault();
            }
          })}
        />
      </Popper.Anchor>
    );
  },
);
SubTrigger.displayName = 'Menu.SubTrigger';

const SubContent = React.forwardRef<HTMLDivElement, Omit<MenuContentProps, 'side' | 'align'>>(
  (props, forwardedRef) => {
    const portalCtx = React.useContext(PortalContext);
    const ctx = useMenuContext('Menu.SubContent');
    const rootCtx = useMenuRootContext('Menu.SubContent');
    const subCtx = useMenuSubContext('Menu.SubContent');
    const { forceMount = portalCtx.forceMount, ...rest } = props;
    return (
      <Content
        id={subCtx.contentId}
        aria-labelledby={subCtx.triggerId}
        align="start"
        side={rootCtx.dir === 'rtl' ? 'left' : 'right'}
        forceMount={forceMount}
        {...rest}
        ref={forwardedRef}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
        }}
        onFocusOutside={composeEventHandlers(rest.onFocusOutside, (event) => {
          const target = event.target as HTMLElement;
          if (target !== subCtx.triggerRef.current) ctx.onOpenChange(false);
        })}
        onEscapeKeyDown={composeEventHandlers(rest.onEscapeKeyDown, (event) => {
          rootCtx.onClose();
          event.preventDefault();
        })}
        onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
          const isKeyDownInside = event.currentTarget.contains(event.target as HTMLElement);
          const isCloseKey = SUB_CLOSE_KEYS[rootCtx.dir].includes(event.key);
          if (isKeyDownInside && isCloseKey) {
            ctx.onOpenChange(false);
            subCtx.triggerRef.current?.focus();
            event.preventDefault();
          }
        })}
      />
    );
  },
);
SubContent.displayName = 'Menu.SubContent';

/* ─── helpers ─────────────────────────────────────────────────────────── */

function getCheckedState(checked: boolean | 'indeterminate') {
  return checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked';
}

function getOpenItems(content: HTMLDivElement | null): HTMLElement[] {
  if (!content) return [];
  return Array.from(
    content.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([data-disabled]), [role="menuitemcheckbox"]:not([data-disabled]), [role="menuitemradio"]:not([data-disabled])',
    ),
  );
}

function focusFirst(items: HTMLElement[]) {
  const prev = document.activeElement;
  for (const item of items) {
    if (item === prev) return;
    item.focus();
    if (document.activeElement !== prev) return;
  }
}

function getNextMatch(values: string[], search: string, currentMatch?: string) {
  const isRepeated = search.length > 1 && Array.from(search).every((c) => c === search[0]);
  const normalized = isRepeated ? search[0] ?? '' : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrapped = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalized.length === 1;
  if (excludeCurrentMatch) wrapped = wrapped.filter((v) => v !== currentMatch);
  const nextMatch = wrapped.find((v) => v.toLowerCase().startsWith(normalized.toLowerCase()));
  return nextMatch !== currentMatch ? nextMatch : undefined;
}

function wrapArray<T>(arr: T[], startIdx: number): T[] {
  return arr.map((_, i) => arr[(startIdx + i) % arr.length] as T);
}

function whenMouse<E extends React.PointerEvent>(handler: (e: E) => void) {
  return (event: E) => (event.pointerType === 'mouse' ? handler(event) : undefined);
}

function isPointerMovingToSubmenu(
  event: React.PointerEvent,
  intent: GraceIntent | null,
): boolean {
  if (!intent) return false;
  const cursor = { x: event.clientX, y: event.clientY };
  return isPointInPolygon(cursor, intent.area);
}

function isPointInPolygon(point: Point, polygon: Point[]) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i]?.x ?? 0;
    const yi = polygon[i]?.y ?? 0;
    const xj = polygon[j]?.x ?? 0;
    const yj = polygon[j]?.y ?? 0;
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export {
  Root,
  Anchor,
  Portal,
  Content,
  Item,
  Group,
  Label,
  Separator,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  ItemIndicator,
  Sub,
  SubTrigger,
  SubContent,
};
