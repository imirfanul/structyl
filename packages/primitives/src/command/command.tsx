'use client';

import * as React from 'react';
import { createContext, Primitive } from '@aura-ui/core';
import { useControllableState, useId, useComposedRefs } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';

type Score = (value: string, search: string, keywords?: string[]) => number;

interface CommandContextValue {
  value: string;
  setValue: (value: string, opts?: { fromInput?: boolean }) => void;
  search: string;
  setSearch: (search: string) => void;
  filter: Score;
  shouldFilter: boolean;
  registerItem: (id: string, value: string, keywords?: string[]) => () => void;
  registerGroup: (id: string, heading?: string) => () => void;
  getItemScore: (id: string) => number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  listRef: React.RefObject<HTMLDivElement | null>;
}

const [CommandProvider, useCommandContext] = createContext<CommandContextValue>('Command');

const defaultFilter: Score = (value, search) => {
  if (!search) return 1;
  const v = value.toLowerCase();
  const s = search.toLowerCase();
  if (v.startsWith(s)) return 1;
  if (v.includes(s)) return 0.5;
  return 0;
};

export interface CommandRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  filter?: Score;
  shouldFilter?: boolean;
  label?: string;
  loop?: boolean;
}

const Root = React.forwardRef<HTMLDivElement, CommandRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange,
      filter = defaultFilter,
      shouldFilter = true,
      label = 'Command Menu',
      loop = false,
      ...rest
    } = props;

    const [value = '', setValueState] = useControllableState<string>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    const [search, setSearch] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    const itemsRef = React.useRef(
      new Map<string, { value: string; keywords?: string[] }>(),
    );

    const registerItem = React.useCallback(
      (id: string, v: string, keywords?: string[]) => {
        itemsRef.current.set(id, { value: v, keywords });
        return () => {
          itemsRef.current.delete(id);
        };
      },
      [],
    );

    const registerGroup = React.useCallback((id: string, heading?: string) => {
      return () => {
        void id;
        void heading;
      };
    }, []);

    const getItemScore = React.useCallback(
      (id: string) => {
        if (!shouldFilter) return 1;
        const item = itemsRef.current.get(id);
        if (!item) return search ? 0 : 1;
        return filter(item.value, search, item.keywords);
      },
      [filter, search, shouldFilter],
    );

    const setValue = React.useCallback(
      (v: string) => {
        setValueState(v);
      },
      [setValueState],
    );

    return (
      <CommandProvider
        value={value}
        setValue={setValue}
        search={search}
        setSearch={setSearch}
        filter={filter}
        shouldFilter={shouldFilter}
        registerItem={registerItem}
        registerGroup={registerGroup}
        getItemScore={getItemScore}
        inputRef={inputRef}
        listRef={listRef}
      >
        <Primitive.div
          aria-label={label}
          role="application"
          {...rest}
          ref={forwardedRef}
          onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              const items = listRef.current?.querySelectorAll<HTMLElement>(
                '[role="option"][data-visible="true"]:not([data-disabled])',
              );
              if (!items || items.length === 0) return;
              const arr = Array.from(items);
              const currentIdx = arr.findIndex((el) => el.getAttribute('data-value') === value);
              let next: HTMLElement | undefined;
              if (event.key === 'ArrowDown') {
                next = arr[(currentIdx + 1) % arr.length] || arr[0];
                if (!loop && currentIdx === arr.length - 1) next = arr[arr.length - 1];
              } else {
                next = arr[(currentIdx - 1 + arr.length) % arr.length] || arr[arr.length - 1];
                if (!loop && currentIdx === 0) next = arr[0];
              }
              if (next) {
                setValue(next.getAttribute('data-value') || '');
                next.scrollIntoView({ block: 'nearest' });
              }
            } else if (event.key === 'Enter') {
              const items = listRef.current?.querySelectorAll<HTMLElement>(
                `[role="option"][data-value="${value}"]`,
              );
              items?.[0]?.click();
            }
          })}
        />
      </CommandProvider>
    );
  },
);
Root.displayName = 'Command.Root';

export interface CommandInputProps extends React.ComponentPropsWithoutRef<'input'> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, CommandInputProps>(
  (props, forwardedRef) => {
    const ctx = useCommandContext('Command.Input');
    const composedRef = useComposedRefs(forwardedRef, ctx.inputRef);
    return (
      <Primitive.input
        type="text"
        autoComplete="off"
        spellCheck={false}
        value={ctx.search}
        {...props}
        ref={composedRef}
        onChange={composeEventHandlers(props.onChange, (event) => {
          ctx.setSearch(event.currentTarget.value);
        })}
      />
    );
  },
);
Input.displayName = 'Command.Input';

const List = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => {
  const ctx = useCommandContext('Command.List');
  const composedRef = useComposedRefs(forwardedRef, ctx.listRef);
  return (
    <Primitive.div
      role="listbox"
      {...props}
      aria-label={props['aria-label'] ?? 'Command results'}
      ref={composedRef}
    />
  );
});
List.displayName = 'Command.List';

export interface CommandItemProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  asChild?: boolean;
  value?: string;
  keywords?: string[];
  disabled?: boolean;
  onSelect?: (value: string) => void;
}

const Item = React.forwardRef<HTMLDivElement, CommandItemProps>(
  (props, forwardedRef) => {
    const { value: valueProp, keywords, disabled, onSelect, children, ...rest } = props;
    const ctx = useCommandContext('Command.Item');
    const id = useId('cmd-item');
    const fallback = React.useRef('');
    const textRef = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(forwardedRef, textRef);
    const value = valueProp ?? fallback.current ?? id;

    React.useEffect(() => {
      const text = textRef.current?.textContent ?? '';
      fallback.current = text;
      return ctx.registerItem(id, valueProp ?? text, keywords);
    }, [ctx, id, valueProp, keywords]);

    const score = ctx.getItemScore(id);
    const visible = score > 0;
    const isSelected = ctx.value === value;

    if (!visible) return null;

    return (
      <Primitive.div
        id={id}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled || undefined}
        data-value={value}
        data-visible="true"
        data-selected={isSelected ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        {...rest}
        ref={composedRef}
        onPointerMove={composeEventHandlers(rest.onPointerMove, () => {
          if (!disabled) ctx.setValue(value);
        })}
        onClick={composeEventHandlers(rest.onClick, () => {
          if (!disabled) {
            ctx.setValue(value);
            onSelect?.(value);
          }
        })}
      >
        {children}
      </Primitive.div>
    );
  },
);
Item.displayName = 'Command.Item';

export interface CommandGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  heading?: React.ReactNode;
  value?: string;
}

const Group = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  (props, forwardedRef) => {
    const { heading, value, children, ...rest } = props;
    return (
      <Primitive.div role="group" {...rest} ref={forwardedRef}>
        {heading ? <div role="presentation" cmdk-group-heading="">{heading}</div> : null}
        {children}
      </Primitive.div>
    );
  },
);
Group.displayName = 'Command.Group';

const Empty = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const ctx = useCommandContext('Command.Empty');
    const hasVisibleItems = React.useRef(false);
    const [, force] = React.useState(0);
    React.useEffect(() => {
      const observer = new MutationObserver(() => {
        const items = ctx.listRef.current?.querySelectorAll('[role="option"][data-visible="true"]');
        hasVisibleItems.current = (items?.length ?? 0) > 0;
        force((n) => n + 1);
      });
      if (ctx.listRef.current) {
        observer.observe(ctx.listRef.current, { childList: true, subtree: true, attributes: true });
      }
      return () => observer.disconnect();
    }, [ctx]);
    if (hasVisibleItems.current || !ctx.search) return null;
    return <Primitive.div role="presentation" {...props} ref={forwardedRef} />;
  },
);
Empty.displayName = 'Command.Empty';

const Separator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>((props, forwardedRef) => (
  <Primitive.div role="presentation" aria-hidden="true" {...props} ref={forwardedRef} />
));
Separator.displayName = 'Command.Separator';

const Loading = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { progress?: number }
>(({ progress, ...rest }, forwardedRef) => (
  <Primitive.div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Loading…" {...rest} ref={forwardedRef} />
));
Loading.displayName = 'Command.Loading';

export { Root, Input, List, Item, Group, Empty, Separator, Loading };
