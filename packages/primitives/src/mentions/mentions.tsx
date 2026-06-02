'use client';

import * as React from 'react';
import { createContext, Primitive, Portal as PortalPrimitive, Presence } from '@structyl/core';
import { useControllableState, useComposedRefs } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';

export interface MentionSuggestion {
  id: string;
  label: string;
}

interface MentionsContextValue {
  value: string;
  setValue: (v: string) => void;
  triggerChar: string;
  query: string;
  setQuery: (q: string) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  insertAt: number;
  setInsertAt: (n: number) => void;
  selectSuggestion: (s: MentionSuggestion) => void;
  highlighted: number;
  setHighlighted: (n: number) => void;
}

const [MentionsProvider, useMentionsContext] = createContext<MentionsContextValue>('Mentions');

export interface MentionsRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  triggerChar?: string;
}

const Root = React.forwardRef<HTMLDivElement, MentionsRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue = '',
      onValueChange,
      triggerChar = '@',
      ...rest
    } = props;
    const [value = '', setValue] = useControllableState<string>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    const [query, setQuery] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [insertAt, setInsertAt] = React.useState(0);
    const [highlighted, setHighlighted] = React.useState(0);
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const selectSuggestion = (s: MentionSuggestion) => {
      const before = value.slice(0, insertAt);
      const queryEnd = insertAt + 1 + query.length;
      const after = value.slice(queryEnd);
      setValue(`${before}${triggerChar}${s.label} ${after}`);
      setOpen(false);
      setQuery('');
    };
    return (
      <MentionsProvider
        value={value}
        setValue={(v) => setValue(v)}
        triggerChar={triggerChar}
        query={query}
        setQuery={setQuery}
        open={open}
        setOpen={setOpen}
        inputRef={inputRef}
        insertAt={insertAt}
        setInsertAt={setInsertAt}
        selectSuggestion={selectSuggestion}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      >
        <Primitive.div {...rest} ref={forwardedRef} />
      </MentionsProvider>
    );
  },
);
Root.displayName = 'Mentions.Root';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentPropsWithoutRef<'textarea'>>(
  (props, forwardedRef) => {
    const ctx = useMentionsContext('Mentions.Textarea');
    const composedRef = useComposedRefs(forwardedRef, ctx.inputRef);
    return (
      <textarea
        value={ctx.value}
        {...props}
        ref={composedRef as React.Ref<HTMLTextAreaElement>}
        onChange={composeEventHandlers(props.onChange, (event) => {
          const v = event.currentTarget.value;
          ctx.setValue(v);
          const caret = event.currentTarget.selectionStart;
          // Look back for triggerChar
          const before = v.slice(0, caret);
          const lastTrigger = before.lastIndexOf(ctx.triggerChar);
          if (lastTrigger >= 0) {
            const after = before.slice(lastTrigger + 1);
            if (!after.includes(' ') && !after.includes('\n')) {
              ctx.setQuery(after);
              ctx.setInsertAt(lastTrigger);
              ctx.setOpen(true);
              ctx.setHighlighted(0);
              return;
            }
          }
          ctx.setOpen(false);
          ctx.setQuery('');
        })}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (!ctx.open) return;
          if (event.key === 'Escape') ctx.setOpen(false);
          else if (event.key === 'ArrowDown') {
            event.preventDefault();
            ctx.setHighlighted(ctx.highlighted + 1);
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            ctx.setHighlighted(Math.max(0, ctx.highlighted - 1));
          }
        })}
      />
    );
  },
);
Textarea.displayName = 'Mentions.Textarea';

const SuggestionsContext = React.createContext<{ items: MentionSuggestion[] } | null>(null);

export interface SuggestionsProps {
  items: MentionSuggestion[];
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
  /** Render inline (no Portal). Use this when the parent is position:relative. */
  disablePortal?: boolean;
}

const Suggestions: React.FC<SuggestionsProps> = ({ items, children, container, disablePortal = false }) => {
  const ctx = useMentionsContext('Mentions.Suggestions');
  const filtered = items.filter((i) => i.label.toLowerCase().startsWith(ctx.query.toLowerCase()));
  return (
    <SuggestionsContext.Provider value={{ items: filtered }}>
      <Presence present={ctx.open && filtered.length > 0}>
        {disablePortal ? (
          children as React.ReactElement
        ) : (
          <PortalPrimitive container={container ?? undefined}>{children}</PortalPrimitive>
        )}
      </Presence>
    </SuggestionsContext.Provider>
  );
};
Suggestions.displayName = 'Mentions.Suggestions';

const Items: React.FC<{
  children: (item: MentionSuggestion, index: number, highlighted: boolean) => React.ReactNode;
}> = ({ children }) => {
  const ctx = useMentionsContext('Mentions.Items');
  const items = React.useContext(SuggestionsContext)?.items ?? [];
  return <>{items.map((item, i) => children(item, i, ctx.highlighted === i))}</>;
};
Items.displayName = 'Mentions.Items';

export interface MentionsItemProps extends React.ComponentPropsWithoutRef<'div'> {
  suggestion: MentionSuggestion;
  index: number;
}

const Item: React.FC<MentionsItemProps> = ({ suggestion, index, children, ...rest }) => {
  const ctx = useMentionsContext('Mentions.Item');
  return (
    <Primitive.div
      role="option"
      data-highlighted={ctx.highlighted === index ? '' : undefined}
      {...rest}
      onPointerMove={composeEventHandlers(rest.onPointerMove, () => ctx.setHighlighted(index))}
      onClick={composeEventHandlers(rest.onClick, () => ctx.selectSuggestion(suggestion))}
    >
      {children ?? suggestion.label}
    </Primitive.div>
  );
};
Item.displayName = 'Mentions.Item';

export { Root, Textarea, Suggestions, Items, Item };
