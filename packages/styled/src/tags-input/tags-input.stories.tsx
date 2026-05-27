import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Input, Tag, Items } from './index';

const meta: Meta = {
  title: 'Styled/TagsInput',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-[480px]">
      <Root>
        <Items>{(tag, index) => <Tag key={tag} index={index} tag={tag} />}</Items>
        <Input placeholder="Add a tag…" />
      </Root>
    </div>
  ),
};

export const WithPredefinedTags: Story = {
  name: 'With predefined tags',
  render: () => (
    <div className="w-[480px]">
      <Root defaultValue={['React', 'TypeScript', 'Tailwind']}>
        <Items>{(tag, index) => <Tag key={tag} index={index} tag={tag} />}</Items>
        <Input placeholder="Add a tag…" />
      </Root>
    </div>
  ),
};

export const TechStack: Story = {
  name: 'Tech stack selector',
  render: () => (
    <div className="flex w-[480px] flex-col gap-1.5">
      <label className="text-sm font-medium leading-none">Tech stack</label>
      <Root defaultValue={['Next.js', 'Prisma', 'PostgreSQL']}>
        <Items>{(tag, index) => <Tag key={tag} index={index} tag={tag} />}</Items>
        <Input placeholder="Add technology…" />
      </Root>
      <p className="text-xs text-muted-foreground">
        Press Enter or comma to add a tag. Backspace removes the last tag.
      </p>
    </div>
  ),
};

export const MaxTags: Story = {
  name: 'With max tags limit',
  render: () => (
    <div className="flex w-[480px] flex-col gap-1.5">
      <label className="text-sm font-medium leading-none">Labels (max 3)</label>
      <Root defaultValue={['bug', 'frontend']} maxTags={3}>
        <Items>{(tag, index) => <Tag key={tag} index={index} tag={tag} />}</Items>
        <Input placeholder="Add label…" />
      </Root>
      <p className="text-xs text-muted-foreground">Maximum 3 labels allowed.</p>
    </div>
  ),
};

export const AllowDuplicates: Story = {
  name: 'Allow duplicate tags',
  render: () => (
    <div className="flex w-[480px] flex-col gap-1.5">
      <label className="text-sm font-medium leading-none">Keywords (duplicates allowed)</label>
      <Root defaultValue={['sale']} duplicateTags>
        <Items>{(tag, index) => <Tag key={`${tag}-${index}`} index={index} tag={tag} />}</Items>
        <Input placeholder="Add keyword…" />
      </Root>
    </div>
  ),
};

export const Controlled: Story = {
  name: 'Controlled',
  render: () => {
    const [tags, setTags] = React.useState<string[]>(['React', 'CSS']);
    return (
      <div className="flex w-[480px] flex-col gap-3">
        <Root value={tags} onValueChange={setTags}>
          <Items>{(tag, index) => <Tag key={tag} index={index} tag={tag} />}</Items>
          <Input placeholder="Add a tag…" />
        </Root>
        <p className="text-xs text-muted-foreground">
          Tags: {tags.join(', ') || '(none)'}
        </p>
        <button
          type="button"
          className="self-start text-xs underline"
          onClick={() => setTags([])}
        >
          Clear all
        </button>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[480px]">
      <Root defaultValue={['React', 'TypeScript']} disabled>
        <Items>{(tag, index) => <Tag key={tag} index={index} tag={tag} />}</Items>
        <Input placeholder="Disabled…" />
      </Root>
    </div>
  ),
};

export const CustomDelimiters: Story = {
  name: 'Custom delimiters (space + semicolon)',
  render: () => (
    <div className="flex w-[480px] flex-col gap-1.5">
      <label className="text-sm font-medium leading-none">Email recipients</label>
      <Root delimiters={[' ', ';', 'Enter']}>
        <Items>{(tag, index) => <Tag key={tag} index={index} tag={tag} />}</Items>
        <Input placeholder="Type an address and press Space or semicolon…" />
      </Root>
      <p className="text-xs text-muted-foreground">
        Use Space or semicolon as delimiters.
      </p>
    </div>
  ),
};
