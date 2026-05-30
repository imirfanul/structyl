import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Input, Tag, Items } from './index';
import { Button } from '../button';
import { Typography } from '../typography';

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
      <Typography as="label" variant="body2" className="font-medium leading-none">Tech stack</Typography>
      <Root defaultValue={['Next.js', 'Prisma', 'PostgreSQL']}>
        <Items>{(tag, index) => <Tag key={tag} index={index} tag={tag} />}</Items>
        <Input placeholder="Add technology…" />
      </Root>
      <Typography variant="muted">
        Press Enter or comma to add a tag. Backspace removes the last tag.
      </Typography>
    </div>
  ),
};

export const MaxTags: Story = {
  name: 'With max tags limit',
  render: () => (
    <div className="flex w-[480px] flex-col gap-1.5">
      <Typography as="label" variant="body2" className="font-medium leading-none">Labels (max 3)</Typography>
      <Root defaultValue={['bug', 'frontend']} maxTags={3}>
        <Items>{(tag, index) => <Tag key={tag} index={index} tag={tag} />}</Items>
        <Input placeholder="Add label…" />
      </Root>
      <Typography variant="muted">Maximum 3 labels allowed.</Typography>
    </div>
  ),
};

export const AllowDuplicates: Story = {
  name: 'Allow duplicate tags',
  render: () => (
    <div className="flex w-[480px] flex-col gap-1.5">
      <Typography as="label" variant="body2" className="font-medium leading-none">Keywords (duplicates allowed)</Typography>
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
        <Typography variant="muted">
          Tags: {tags.join(', ') || '(none)'}
        </Typography>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="self-start"
          onClick={() => setTags([])}
        >
          Clear all
        </Button>
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
      <Typography as="label" variant="body2" className="font-medium leading-none">Email recipients</Typography>
      <Root delimiters={[' ', ';', 'Enter']}>
        <Items>{(tag, index) => <Tag key={tag} index={index} tag={tag} />}</Items>
        <Input placeholder="Type an address and press Space or semicolon…" />
      </Root>
      <Typography variant="muted">
        Use Space or semicolon as delimiters.
      </Typography>
    </div>
  ),
};
