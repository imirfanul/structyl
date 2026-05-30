import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root as Timeline, Item, Dot, Content, ItemTitle, ItemDescription, ItemTime } from './index';

const meta = {
  title: 'Styled/Timeline',
  component: Timeline,
  tags: ['autodocs'],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const EVENTS = [
  { title: 'Deployed to production', desc: 'v2.8.0 is now live.', time: '2 min ago', color: 'success' },
  { title: 'All tests passed',        desc: '212 tests in 4.3s.',   time: '8 min ago', color: 'success' },
  { title: 'PR #241 merged',          desc: 'feat: add dark mode.',  time: '15 min ago', color: 'primary' },
  { title: 'Review requested',        desc: 'Waiting for approval.', time: '1 hour ago', color: undefined },
] as const;

export const Default: Story = {
  render: () => (
    <div className="max-w-sm p-6">
      <Timeline>
        {EVENTS.map((ev, i) => (
          <Item key={ev.title} last={i === EVENTS.length - 1}>
            <Dot color={ev.color} />
            <Content>
              <ItemTitle>{ev.title}</ItemTitle>
              <ItemDescription>{ev.desc}</ItemDescription>
              <ItemTime>{ev.time}</ItemTime>
            </Content>
          </Item>
        ))}
      </Timeline>
    </div>
  ),
};

export const AlternateSides: Story = {
  render: () => (
    <div className="max-w-lg p-6">
      <Timeline side="alternate">
        {EVENTS.map((ev, i) => (
          <Item key={ev.title} last={i === EVENTS.length - 1}>
            <Dot color={ev.color} />
            <Content>
              <ItemTitle>{ev.title}</ItemTitle>
              <ItemTime>{ev.time}</ItemTime>
            </Content>
          </Item>
        ))}
      </Timeline>
    </div>
  ),
};

export const OutlinedDots: Story = {
  render: () => (
    <div className="max-w-sm p-6">
      <Timeline>
        {EVENTS.map((ev, i) => (
          <Item key={ev.title} last={i === EVENTS.length - 1}>
            <Dot color={ev.color} variant="outlined" />
            <Content>
              <ItemTitle>{ev.title}</ItemTitle>
              <ItemTime>{ev.time}</ItemTime>
            </Content>
          </Item>
        ))}
      </Timeline>
    </div>
  ),
};
