import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
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
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Jane Smith"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="jane@example.com"
            />
          </div>
        </div>
      </Content>
      <Footer>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Create account
        </button>
        <button className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
          Cancel
        </button>
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
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Content>
      <Footer>
        <button className="text-sm text-muted-foreground hover:text-fg transition-colors ml-auto">
          Mark all as read
        </button>
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
        <p className="text-sm text-muted-foreground">
          This guide walks you through scaffolding a headless primitive, wrapping it in a styled
          layer, and writing tests and docs.
        </p>
      </Content>
      <Footer>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Read guide
        </button>
      </Footer>
    </Root>
  ),
};
