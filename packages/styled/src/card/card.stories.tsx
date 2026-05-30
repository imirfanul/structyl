import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Typography } from '../typography';
import { Root, Header, Title, Description, Content, Footer } from './index';

const meta: Meta = {
  title: 'Styled/Card',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Root className="w-[380px]">
      <Header>
        <Title>Create an account</Title>
        <Description>Enter your details below to create your account and get started.</Description>
      </Header>
      <Content>
        <div className="space-y-3">
          <div className="space-y-1">
            <Typography as="label" variant="body2" className="font-medium" htmlFor="name">
              Name
            </Typography>
            <Input
              id="name"
              placeholder="Jane Smith"
            />
          </div>
          <div className="space-y-1">
            <Typography as="label" variant="body2" className="font-medium" htmlFor="email">
              Email
            </Typography>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
            />
          </div>
        </div>
      </Content>
      <Footer>
        <Button>Create account</Button>
        <Button variant="outline">Cancel</Button>
      </Footer>
    </Root>
  ),
};

export const Notification: Story = {
  name: 'Notification card',
  render: () => (
    <Root className="w-[380px]">
      <Header>
        <Title>Push Notifications</Title>
        <Description>You have 3 unread notifications.</Description>
      </Header>
      <Content>
        <div className="space-y-3">
          {[
            { title: 'Your PR was merged', time: '2 min ago', unread: true },
            { title: 'New comment on issue #42', time: '1 hr ago', unread: true },
            { title: 'Weekly build passed', time: '3 hrs ago', unread: false },
          ].map((n) => (
            <div key={n.title} className="flex items-start gap-3">
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? 'bg-primary' : 'bg-transparent'}`}
              />
              <div>
                <Typography variant="body2" className="font-medium">{n.title}</Typography>
                <Typography variant="muted" className="text-xs">{n.time}</Typography>
              </div>
            </div>
          ))}
        </div>
      </Content>
      <Footer>
        <Button variant="ghost" className="ml-auto text-muted-foreground hover:text-fg">
          Mark all as read
        </Button>
      </Footer>
    </Root>
  ),
};

export const Minimal: Story = {
  name: 'Minimal (no footer)',
  render: () => (
    <Root className="w-[340px]">
      <Header>
        <Title>Project Summary</Title>
        <Description>A high-level overview of the current sprint.</Description>
      </Header>
      <Content>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          {[
            ['Open tasks', '12'],
            ['In review', '4'],
            ['Completed', '28'],
            ['Blocked', '2'],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="font-semibold text-lg">{value}</dd>
            </div>
          ))}
        </dl>
      </Content>
    </Root>
  ),
};

export const ImageCard: Story = {
  name: 'Card with image area',
  render: () => (
    <Root className="w-[340px] overflow-hidden">
      <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <span className="text-4xl">🌅</span>
      </div>
      <Header>
        <Title>Getting Started Guide</Title>
        <Description>Everything you need to know to ship your first component.</Description>
      </Header>
      <Content>
        <Typography variant="muted">
          This guide walks you through scaffolding a headless primitive, wrapping it in a styled
          layer, and writing tests and docs.
        </Typography>
      </Content>
      <Footer>
        <Button>Read guide</Button>
      </Footer>
    </Root>
  ),
};
