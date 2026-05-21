'use client';

import * as React from 'react';
import { createContext, Primitive } from '@aura-ui/core';
import { useControllableState } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';

interface TagsInputContextValue {
  tags: string[];
  addTag: (tag: string) => boolean;
  removeTag: (index: number) => void;
  removeLast: () => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  delimiters: string[];
  disabled?: boolean;
  maxTags?: number;
  duplicateTags: boolean;
}

const [TagsInputProvider, useTagsInputContext] = createContext<TagsInputContextValue>('TagsInput');

export interface TagsInputRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (tags: string[]) => void;
  delimiters?: string[];
  maxTags?: number;
  duplicateTags?: boolean;
  disabled?: boolean;
}

const Root = React.forwardRef<HTMLDivElement, TagsInputRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue = [],
      onValueChange,
      delimiters = [',', 'Enter'],
      maxTags,
      duplicateTags = false,
      disabled,
      ...rest
    } = props;
    const [tags = [], setTags] = useControllableState<string[]>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    const [inputValue, setInputValue] = React.useState('');
    const addTag = (raw: string): boolean => {
      const trimmed = raw.trim();
      if (!trimmed) return false;
      if (!duplicateTags && tags.includes(trimmed)) return false;
      if (maxTags && tags.length >= maxTags) return false;
      setTags([...tags, trimmed]);
      return true;
    };
    const removeTag = (i: number) => setTags(tags.filter((_, idx) => idx !== i));
    const removeLast = () => setTags(tags.slice(0, -1));
    return (
      <TagsInputProvider
        tags={tags}
        addTag={addTag}
        removeTag={removeTag}
        removeLast={removeLast}
        inputValue={inputValue}
        setInputValue={setInputValue}
        delimiters={delimiters}
        disabled={disabled}
        maxTags={maxTags}
        duplicateTags={duplicateTags}
      >
        <Primitive.div role="group" {...rest} ref={forwardedRef} />
      </TagsInputProvider>
    );
  },
);
Root.displayName = 'TagsInput.Root';

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  (props, forwardedRef) => {
    const ctx = useTagsInputContext('TagsInput.Input');
    return (
      <Primitive.input
        value={ctx.inputValue}
        disabled={ctx.disabled}
        {...props}
        ref={forwardedRef}
        onChange={composeEventHandlers(props.onChange, (event) => ctx.setInputValue(event.currentTarget.value))}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (ctx.delimiters.includes(event.key)) {
            if (ctx.addTag(ctx.inputValue)) {
              ctx.setInputValue('');
              event.preventDefault();
            }
          } else if (event.key === 'Backspace' && ctx.inputValue === '') {
            ctx.removeLast();
          }
        })}
        onPaste={composeEventHandlers(props.onPaste, (event) => {
          const text = event.clipboardData.getData('text');
          const parts = text.split(new RegExp(ctx.delimiters.filter((d) => d !== 'Enter').join('|') || ','));
          if (parts.length > 1) {
            event.preventDefault();
            parts.forEach((p) => ctx.addTag(p));
            ctx.setInputValue('');
          }
        })}
      />
    );
  },
);
Input.displayName = 'TagsInput.Input';

const Tag: React.FC<{ index: number; children?: React.ReactNode }> = ({ index, children }) => {
  const ctx = useTagsInputContext('TagsInput.Tag');
  const tag = ctx.tags[index];
  if (tag === undefined) return null;
  return (
    <Primitive.span data-tag-index={index}>
      {children ?? (
        <>
          {tag}{' '}
          <button type="button" onClick={() => ctx.removeTag(index)} aria-label={`Remove ${tag}`}>
            ×
          </button>
        </>
      )}
    </Primitive.span>
  );
};
Tag.displayName = 'TagsInput.Tag';

const Items: React.FC<{
  children: (tag: string, index: number) => React.ReactNode;
}> = ({ children }) => {
  const ctx = useTagsInputContext('TagsInput.Items');
  return <>{ctx.tags.map(children)}</>;
};
Items.displayName = 'TagsInput.Items';

export { Root, Input, Tag, Items };
