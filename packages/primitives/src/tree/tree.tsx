'use client';

import * as React from 'react';
import { createContext, Primitive } from '@your-lib/core';
import { useControllableState } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';

interface TreeContextValue {
  expanded: Set<string>;
  setExpanded: (next: Set<string>) => void;
  selected?: string;
  setSelected: (id?: string) => void;
  focused?: string;
  setFocused: (id?: string) => void;
}

const [TreeProvider, useTreeContext] = createContext<TreeContextValue>('Tree');

export interface TreeRootProps extends React.ComponentPropsWithoutRef<'ul'> {
  asChild?: boolean;
  defaultExpanded?: string[];
  expanded?: string[];
  onExpandedChange?: (expanded: string[]) => void;
  defaultSelected?: string;
  selected?: string;
  onSelectedChange?: (id: string | undefined) => void;
}

const Root = React.forwardRef<HTMLUListElement, TreeRootProps>(
  (props, forwardedRef) => {
    const {
      defaultExpanded = [],
      expanded: expandedProp,
      onExpandedChange,
      defaultSelected,
      selected: selectedProp,
      onSelectedChange,
      ...rest
    } = props;
    const [expandedArr = [], setExpandedArr] = useControllableState<string[]>({
      prop: expandedProp,
      defaultProp: defaultExpanded,
      onChange: onExpandedChange,
    });
    const [selected, setSelected] = useControllableState<string | undefined>({
      prop: selectedProp,
      defaultProp: defaultSelected,
      onChange: onSelectedChange,
    });
    const [focused, setFocused] = React.useState<string | undefined>();
    const expanded = React.useMemo(() => new Set(expandedArr), [expandedArr]);
    return (
      <TreeProvider
        expanded={expanded}
        setExpanded={(next) => setExpandedArr(Array.from(next))}
        selected={selected}
        setSelected={setSelected}
        focused={focused}
        setFocused={setFocused}
      >
        <Primitive.ul role="tree" {...rest} ref={forwardedRef as React.Ref<HTMLUListElement>} />
      </TreeProvider>
    );
  },
);
Root.displayName = 'Tree.Root';

interface TreeItemContextValue {
  id: string;
  level: number;
  hasChildren: boolean;
}
const [TreeItemProvider, useTreeItemContext] = createContext<TreeItemContextValue>('TreeItem');

export interface TreeItemProps extends React.ComponentPropsWithoutRef<'li'> {
  asChild?: boolean;
  id: string;
  hasChildren?: boolean;
  level?: number;
}

const Item = React.forwardRef<HTMLLIElement, TreeItemProps>(
  (props, forwardedRef) => {
    const { id, hasChildren = false, level = 1, ...rest } = props;
    const ctx = useTreeContext('Tree.Item');
    const expanded = ctx.expanded.has(id);
    const selected = ctx.selected === id;
    return (
      <TreeItemProvider id={id} level={level} hasChildren={hasChildren}>
        <Primitive.li
          role="treeitem"
          aria-level={level}
          aria-expanded={hasChildren ? expanded : undefined}
          aria-selected={selected}
          data-state={expanded ? 'open' : 'closed'}
          data-selected={selected ? '' : undefined}
          {...rest}
          ref={forwardedRef as React.Ref<HTMLLIElement>}
        />
      </TreeItemProvider>
    );
  },
);
Item.displayName = 'Tree.Item';

const Trigger = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const ctx = useTreeContext('Tree.Trigger');
    const item = useTreeItemContext('Tree.Trigger');
    const expanded = ctx.expanded.has(item.id);
    return (
      <Primitive.div
        tabIndex={ctx.focused === item.id || (ctx.focused === undefined && item.level === 1) ? 0 : -1}
        {...props}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, () => {
          ctx.setSelected(item.id);
          if (item.hasChildren) {
            const next = new Set(ctx.expanded);
            if (next.has(item.id)) next.delete(item.id);
            else next.add(item.id);
            ctx.setExpanded(next);
          }
        })}
        onFocus={composeEventHandlers(props.onFocus, () => ctx.setFocused(item.id))}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            if (item.hasChildren && !expanded) {
              const next = new Set(ctx.expanded);
              next.add(item.id);
              ctx.setExpanded(next);
            }
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            if (item.hasChildren && expanded) {
              const next = new Set(ctx.expanded);
              next.delete(item.id);
              ctx.setExpanded(next);
            }
          } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            ctx.setSelected(item.id);
          }
        })}
      />
    );
  },
);
Trigger.displayName = 'Tree.Trigger';

const Group = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<'ul'>>(
  (props, forwardedRef) => {
    const item = useTreeItemContext('Tree.Group');
    const ctx = useTreeContext('Tree.Group');
    const expanded = ctx.expanded.has(item.id);
    if (!expanded) return null;
    return <Primitive.ul role="group" {...props} ref={forwardedRef as React.Ref<HTMLUListElement>} />;
  },
);
Group.displayName = 'Tree.Group';

export { Root, Item, Trigger, Group };
