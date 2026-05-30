import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Textarea, Suggestions, Items, Item } from './index';
import type { MentionSuggestion } from '@aura-ui/primitives';
import { Button } from '../button';
import { Typography } from '../typography';

const TEAM_MEMBERS: MentionSuggestion[] = [
  { id: '1', label: 'alice' },
  { id: '2', label: 'bob' },
  { id: '3', label: 'carol' },
  { id: '4', label: 'dave' },
  { id: '5', label: 'eve' },
  { id: '6', label: 'frank' },
];

const suggestionsListCls =
  'z-50 min-w-[160px] overflow-hidden rounded-md border border-border bg-popover shadow-md';
const suggestionItemCls =
  'cursor-pointer px-3 py-1.5 text-sm data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground';

const meta: Meta = {
  title: 'Styled/Mentions',
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
        <Textarea placeholder="Type @ to mention someone…" />
        <Suggestions items={TEAM_MEMBERS}>
          <div className={suggestionsListCls}>
            <Items>
              {(item, index, highlighted) => (
                <Item key={item.id} suggestion={item} index={index}>
                  <div
                    className={suggestionItemCls}
                    data-highlighted={highlighted ? '' : undefined}
                  >
                    @{item.label}
                  </div>
                </Item>
              )}
            </Items>
          </div>
        </Suggestions>
      </Root>
    </div>
  ),
};

export const WithAvatars: Story = {
  name: 'With avatars in suggestions',
  render: () => {
    const avatarColors: Record<string, string> = {
      '1': 'bg-red-400',
      '2': 'bg-blue-400',
      '3': 'bg-green-400',
      '4': 'bg-yellow-400',
      '5': 'bg-purple-400',
      '6': 'bg-pink-400',
    };
    return (
      <div className="w-[480px]">
        <Root>
          <Textarea placeholder="Write a comment… use @ to mention" />
          <Suggestions items={TEAM_MEMBERS}>
            <div className={suggestionsListCls}>
              <Items>
                {(item, index, highlighted) => (
                  <Item key={item.id} suggestion={item} index={index}>
                    <div
                      className={`flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm ${highlighted ? 'bg-accent text-accent-foreground' : ''}`}
                    >
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white ${avatarColors[item.id] ?? 'bg-muted'}`}
                      >
                        {item.label[0]?.toUpperCase()}
                      </span>
                      <Typography as="span">@{item.label}</Typography>
                    </div>
                  </Item>
                )}
              </Items>
            </div>
          </Suggestions>
        </Root>
      </div>
    );
  },
};

export const Controlled: Story = {
  name: 'Controlled value',
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div className="flex w-[480px] flex-col gap-3">
        <Root value={value} onValueChange={setValue}>
          <Textarea placeholder="Type @ to mention someone…" />
          <Suggestions items={TEAM_MEMBERS}>
            <div className={suggestionsListCls}>
              <Items>
                {(item, index, highlighted) => (
                  <Item key={item.id} suggestion={item} index={index}>
                    <div
                      className={suggestionItemCls}
                      data-highlighted={highlighted ? '' : undefined}
                    >
                      @{item.label}
                    </div>
                  </Item>
                )}
              </Items>
            </div>
          </Suggestions>
        </Root>
        <Typography variant="muted">
          Value: <Typography as="span" className="font-mono">{value || '(empty)'}</Typography>
        </Typography>
      </div>
    );
  },
};

export const CustomTrigger: Story = {
  name: 'Custom trigger character (#)',
  render: () => {
    const TAGS: MentionSuggestion[] = [
      { id: 't1', label: 'bug' },
      { id: 't2', label: 'feature' },
      { id: 't3', label: 'documentation' },
      { id: 't4', label: 'enhancement' },
      { id: 't5', label: 'help-wanted' },
    ];
    return (
      <div className="w-[480px]">
        <Root triggerChar="#">
          <Textarea placeholder="Type # to add a label…" />
          <Suggestions items={TAGS}>
            <div className={suggestionsListCls}>
              <Items>
                {(item, index, highlighted) => (
                  <Item key={item.id} suggestion={item} index={index}>
                    <div
                      className={suggestionItemCls}
                      data-highlighted={highlighted ? '' : undefined}
                    >
                      #{item.label}
                    </div>
                  </Item>
                )}
              </Items>
            </div>
          </Suggestions>
        </Root>
      </div>
    );
  },
};

export const LargeTeam: Story = {
  name: 'Large team (filtered suggestions)',
  render: () => {
    const LARGE_TEAM: MentionSuggestion[] = [
      { id: '1', label: 'alice_dev' },
      { id: '2', label: 'alice_design' },
      { id: '3', label: 'bob_frontend' },
      { id: '4', label: 'bob_backend' },
      { id: '5', label: 'carol' },
      { id: '6', label: 'charlie' },
      { id: '7', label: 'diana' },
      { id: '8', label: 'edward' },
      { id: '9', label: 'fiona' },
      { id: '10', label: 'george' },
    ];
    return (
      <div className="w-[480px]">
        <Root>
          <Textarea placeholder="Type @a to filter by name…" />
          <Suggestions items={LARGE_TEAM}>
            <div className={`${suggestionsListCls} max-h-48 overflow-y-auto`}>
              <Items>
                {(item, index, highlighted) => (
                  <Item key={item.id} suggestion={item} index={index}>
                    <div
                      className={suggestionItemCls}
                      data-highlighted={highlighted ? '' : undefined}
                    >
                      @{item.label}
                    </div>
                  </Item>
                )}
              </Items>
            </div>
          </Suggestions>
        </Root>
      </div>
    );
  },
};

export const InCommentBox: Story = {
  name: 'Comment box UI',
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div className="w-[480px] rounded-lg border border-border bg-card p-4 shadow-sm">
        <Typography variant="h3" className="mb-3 text-sm font-medium">Add a comment</Typography>
        <Root value={value} onValueChange={setValue}>
          <Textarea
            placeholder="Leave a comment… use @ to notify a team member"
            className="resize-none"
            rows={4}
          />
          <Suggestions items={TEAM_MEMBERS}>
            <div className={suggestionsListCls}>
              <Items>
                {(item, index, highlighted) => (
                  <Item key={item.id} suggestion={item} index={index}>
                    <div
                      className={suggestionItemCls}
                      data-highlighted={highlighted ? '' : undefined}
                    >
                      @{item.label}
                    </div>
                  </Item>
                )}
              </Items>
            </div>
          </Suggestions>
        </Root>
        <div className="mt-3 flex justify-end">
          <Button
            type="button"
            disabled={!value.trim()}
            size="sm"
          >
            Post comment
          </Button>
        </div>
      </div>
    );
  },
};
