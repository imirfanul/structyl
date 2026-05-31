'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  Presence,
  DismissableLayer,
  useDirection,
} from '@structyl/core';
import { useControllableState, useId, useComposedRefs } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';

interface NavigationMenuContextValue {
  isRootMenu: boolean;
  value: string;
  baseId: string;
  dir: 'ltr' | 'rtl';
  orientation: 'horizontal' | 'vertical';
  rootNavigationMenu: HTMLElement | null;
  indicatorTrack: HTMLElement | null;
  onIndicatorTrackChange: (track: HTMLElement | null) => void;
  onTriggerEnter: (value: string) => void;
  onTriggerLeave: () => void;
  onContentEnter: () => void;
  onContentLeave: () => void;
  onItemSelect: (value: string) => void;
  onItemDismiss: () => void;
}

const [NavigationMenuProvider, useNavigationMenuContext] =
  createContext<NavigationMenuContextValue>('NavigationMenu');

export interface NavigationMenuRootProps extends React.ComponentPropsWithoutRef<'nav'> {
  asChild?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  delayDuration?: number;
  skipDelayDuration?: number;
  dir?: 'ltr' | 'rtl';
  orientation?: 'horizontal' | 'vertical';
}

const Root = React.forwardRef<HTMLElement, NavigationMenuRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange,
      delayDuration = 200,
      skipDelayDuration = 300,
      dir,
      orientation = 'horizontal',
      ...rootProps
    } = props;
    const [navigationMenu, setNavigationMenu] = React.useState<HTMLElement | null>(null);
    const composedRef = useComposedRefs(forwardedRef, setNavigationMenu);
    const direction = useDirection(dir);
    const openTimerRef = React.useRef(0);
    const closeTimerRef = React.useRef(0);
    const skipDelayTimerRef = React.useRef(0);
    const [isOpenDelayed, setIsOpenDelayed] = React.useState(true);
    const [value = '', setValue] = useControllableState<string>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: (v) => {
        const isClose = v === '';
        if (isClose) {
          window.clearTimeout(skipDelayTimerRef.current);
          if (skipDelayDuration > 0)
            skipDelayTimerRef.current = window.setTimeout(
              () => setIsOpenDelayed(true),
              skipDelayDuration,
            );
        } else {
          window.clearTimeout(skipDelayTimerRef.current);
          setIsOpenDelayed(false);
        }
        onValueChange?.(v);
      },
    });
    const startCloseTimer = React.useCallback(() => {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = window.setTimeout(() => setValue(''), 150);
    }, [setValue]);
    const handleOpen = React.useCallback((v: string) => {
      window.clearTimeout(closeTimerRef.current);
      setValue(v);
    }, [setValue]);
    const handleDelayedOpen = React.useCallback((v: string) => {
      const isOpenValue = value === v;
      if (isOpenValue) {
        window.clearTimeout(closeTimerRef.current);
      } else {
        openTimerRef.current = window.setTimeout(() => {
          window.clearTimeout(closeTimerRef.current);
          setValue(v);
        }, delayDuration);
      }
    }, [value, setValue, delayDuration]);
    React.useEffect(() => () => {
      window.clearTimeout(openTimerRef.current);
      window.clearTimeout(closeTimerRef.current);
      window.clearTimeout(skipDelayTimerRef.current);
    }, []);
    return (
      <NavigationMenuProvider
        isRootMenu
        value={value}
        baseId={useId('navigation-menu')}
        dir={direction}
        orientation={orientation}
        rootNavigationMenu={navigationMenu}
        indicatorTrack={null}
        onIndicatorTrackChange={() => {}}
        onTriggerEnter={React.useCallback(
          (v: string) => {
            window.clearTimeout(openTimerRef.current);
            if (isOpenDelayed) handleDelayedOpen(v);
            else handleOpen(v);
          },
          [isOpenDelayed, handleDelayedOpen, handleOpen],
        )}
        onTriggerLeave={React.useCallback(() => {
          window.clearTimeout(openTimerRef.current);
          startCloseTimer();
        }, [startCloseTimer])}
        onContentEnter={React.useCallback(() => window.clearTimeout(closeTimerRef.current), [])}
        onContentLeave={React.useCallback(() => startCloseTimer(), [startCloseTimer])}
        onItemSelect={React.useCallback((v: string) => setValue(v), [setValue])}
        onItemDismiss={React.useCallback(() => setValue(''), [setValue])}
      >
        <Primitive.nav
          aria-label="Main"
          data-orientation={orientation}
          dir={direction}
          {...rootProps}
          ref={composedRef as React.Ref<HTMLElement>}
        />
      </NavigationMenuProvider>
    );
  },
);
Root.displayName = 'NavigationMenu.Root';

const List = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<'ul'>>(
  (props, forwardedRef) => {
    const ctx = useNavigationMenuContext('NavigationMenu.List');
    return (
      <Primitive.ul
        data-orientation={ctx.orientation}
        {...props}
        ref={forwardedRef as React.Ref<HTMLUListElement>}
      />
    );
  },
);
List.displayName = 'NavigationMenu.List';

interface NavigationMenuItemContextValue {
  value: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  focusProxyRef: React.RefObject<HTMLSpanElement | null>;
  wasEscapeCloseRef: React.RefObject<boolean>;
  onEntryKeyDown: () => void;
  onRootContentClose: () => void;
}

const [NavigationMenuItemProvider, useNavigationMenuItemContext] =
  createContext<NavigationMenuItemContextValue>('NavigationMenuItem');

export interface NavigationMenuItemProps extends React.ComponentPropsWithoutRef<'li'> {
  asChild?: boolean;
  value?: string;
}

const Item = React.forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  (props, forwardedRef) => {
    const { value: valueProp, ...itemProps } = props;
    const autoValue = useId('nav-item');
    const value = valueProp ?? autoValue;
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const focusProxyRef = React.useRef<HTMLSpanElement>(null);
    const wasEscapeCloseRef = React.useRef(false);
    return (
      <NavigationMenuItemProvider
        value={value}
        triggerRef={triggerRef}
        contentRef={contentRef}
        focusProxyRef={focusProxyRef}
        wasEscapeCloseRef={wasEscapeCloseRef}
        onEntryKeyDown={React.useCallback(() => {
          contentRef.current?.focus();
        }, [])}
        onRootContentClose={React.useCallback(() => {
          /* placeholder */
        }, [])}
      >
        <Primitive.li {...itemProps} ref={forwardedRef as React.Ref<HTMLLIElement>} />
      </NavigationMenuItemProvider>
    );
  },
);
Item.displayName = 'NavigationMenu.Item';

const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'> & { asChild?: boolean }
>((props, forwardedRef) => {
  const ctx = useNavigationMenuContext('NavigationMenu.Trigger');
  const item = useNavigationMenuItemContext('NavigationMenu.Trigger');
  const open = ctx.value === item.value;
  const composedRef = useComposedRefs(forwardedRef, item.triggerRef);
  return (
    <Primitive.button
      type="button"
      data-state={open ? 'open' : 'closed'}
      aria-expanded={open}
      aria-controls={`${ctx.baseId}-content-${item.value}`}
      id={`${ctx.baseId}-trigger-${item.value}`}
      {...props}
      ref={composedRef}
      onPointerEnter={composeEventHandlers(props.onPointerEnter, () => ctx.onTriggerEnter(item.value))}
      onPointerLeave={composeEventHandlers(props.onPointerLeave, () => ctx.onTriggerLeave())}
      onPointerMove={composeEventHandlers(props.onPointerMove, () => ctx.onTriggerEnter(item.value))}
      onClick={composeEventHandlers(props.onClick, () => {
        if (open) ctx.onItemDismiss();
        else ctx.onItemSelect(item.value);
      })}
      onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
        if (['Enter', ' '].includes(event.key)) {
          event.preventDefault();
          if (open) ctx.onItemDismiss();
          else ctx.onItemSelect(item.value);
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          ctx.onItemSelect(item.value);
        }
      })}
    />
  );
});
Trigger.displayName = 'NavigationMenu.Trigger';

export interface NavigationMenuLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  asChild?: boolean;
  active?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  (props, forwardedRef) => {
    const { active, ...rest } = props;
    return (
      <Primitive.a
        data-active={active ? '' : undefined}
        aria-current={active ? 'page' : undefined}
        {...rest}
        ref={forwardedRef as React.Ref<HTMLAnchorElement>}
      />
    );
  },
);
Link.displayName = 'NavigationMenu.Link';

const Content = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean; forceMount?: boolean }
>((props, forwardedRef) => {
  const { forceMount, ...rest } = props;
  const ctx = useNavigationMenuContext('NavigationMenu.Content');
  const item = useNavigationMenuItemContext('NavigationMenu.Content');
  const composedRef = useComposedRefs(forwardedRef, item.contentRef);
  const open = ctx.value === item.value;
  return (
    <Presence present={forceMount || open}>
      <DismissableLayer
        asChild
        onEscapeKeyDown={() => ctx.onItemDismiss()}
        onPointerDownOutside={() => ctx.onItemDismiss()}
        onFocusOutside={(event) => {
          const target = event.target as HTMLElement;
          const isInside = ctx.rootNavigationMenu?.contains(target);
          if (!isInside) ctx.onItemDismiss();
        }}
        onDismiss={() => ctx.onItemDismiss()}
      >
        <Primitive.div
          data-state={open ? 'open' : 'closed'}
          data-orientation={ctx.orientation}
          id={`${ctx.baseId}-content-${item.value}`}
          aria-labelledby={`${ctx.baseId}-trigger-${item.value}`}
          {...rest}
          ref={composedRef as React.Ref<HTMLDivElement>}
          onPointerEnter={composeEventHandlers(rest.onPointerEnter, () => ctx.onContentEnter())}
          onPointerLeave={composeEventHandlers(rest.onPointerLeave, () => ctx.onContentLeave())}
        />
      </DismissableLayer>
    </Presence>
  );
});
Content.displayName = 'NavigationMenu.Content';

const Indicator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { forceMount?: boolean }
>((props, forwardedRef) => {
  const { forceMount, ...rest } = props;
  const ctx = useNavigationMenuContext('NavigationMenu.Indicator');
  const isVisible = Boolean(ctx.value);
  return (
    <Presence present={forceMount || isVisible}>
      <Primitive.div
        data-state={isVisible ? 'visible' : 'hidden'}
        data-orientation={ctx.orientation}
        {...rest}
        ref={forwardedRef as React.Ref<HTMLDivElement>}
      />
    </Presence>
  );
});
Indicator.displayName = 'NavigationMenu.Indicator';

const Viewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { forceMount?: boolean }
>((props, forwardedRef) => {
  const { forceMount, ...rest } = props;
  const ctx = useNavigationMenuContext('NavigationMenu.Viewport');
  const open = Boolean(ctx.value);
  return (
    <Presence present={forceMount || open}>
      <Primitive.div data-state={open ? 'open' : 'closed'} {...rest} ref={forwardedRef as React.Ref<HTMLDivElement>} />
    </Presence>
  );
});
Viewport.displayName = 'NavigationMenu.Viewport';

export { Root, List, Item, Trigger, Link, Content, Indicator, Viewport };
