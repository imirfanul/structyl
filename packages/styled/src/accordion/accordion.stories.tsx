import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Item, Trigger, Content } from './index';

const meta: Meta = {
  title: 'Styled/Accordion',
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
      <Root type="single" collapsible>
        <Item value="item-1">
          <Trigger>What is structyl?</Trigger>
          <Content>
            structyl is an open-source React component library that provides accessible behavior
            primitives, Tailwind-styled components, and a first-class DataTable.
          </Content>
        </Item>
        <Item value="item-2">
          <Trigger>Is it accessible?</Trigger>
          <Content>
            Yes. Every component follows WAI-ARIA authoring practices and is tested with axe-core
            on every CI run. Keyboard navigation and screen reader support are first-class
            requirements.
          </Content>
        </Item>
        <Item value="item-3">
          <Trigger>Can I customise the styles?</Trigger>
          <Content>
            Absolutely. All components accept a <code>className</code> prop and are built on top of
            Tailwind CSS v4. You can also override design tokens via the ThemeProvider.
          </Content>
        </Item>
      </Root>
    </div>
  ),
};

export const MultipleOpen: Story = {
  name: 'Multiple items open',
  render: () => (
    <div className="w-[480px]">
      <Root type="multiple">
        <Item value="q1">
          <Trigger>How do I install structyl?</Trigger>
          <Content>
            Run <code>pnpm add @structyl/styled</code> then wrap your app with{' '}
            <code>ThemeProvider</code> from <code>@structyl/themes</code>.
          </Content>
        </Item>
        <Item value="q2">
          <Trigger>Does it support SSR?</Trigger>
          <Content>
            Yes. Every component is SSR-safe. Server components are supported via the{' '}
            <code>&apos;use client&apos;</code> boundary placed at the package entry point.
          </Content>
        </Item>
        <Item value="q3">
          <Trigger>What is the bundle size?</Trigger>
          <Content>
            Each component is tree-shakeable. You only pay for what you import. Individual
            component budgets are tracked in <code>BUDGETS.md</code>.
          </Content>
        </Item>
      </Root>
    </div>
  ),
};

export const DefaultOpen: Story = {
  name: 'Default open item',
  render: () => (
    <div className="w-[480px]">
      <Root type="single" defaultValue="answer-1" collapsible>
        <Item value="answer-1">
          <Trigger>Who maintains this library?</Trigger>
          <Content>
            structyl is maintained by a team of open-source contributors. Contributions are welcome
            — please read the contributing guide before opening a pull request.
          </Content>
        </Item>
        <Item value="answer-2">
          <Trigger>Where can I find the docs?</Trigger>
          <Content>
            The docs site is a Next.js 15 application powered by Fumadocs. Run{' '}
            <code>pnpm docs</code> locally or visit the hosted URL in the README.
          </Content>
        </Item>
      </Root>
    </div>
  ),
};

export const Disabled: Story = {
  name: 'With a disabled item',
  render: () => (
    <div className="w-[480px]">
      <Root type="single" collapsible>
        <Item value="enabled-1">
          <Trigger>Available feature</Trigger>
          <Content>This item is enabled and fully interactive.</Content>
        </Item>
        <Item value="disabled-1" disabled>
          <Trigger>Coming soon</Trigger>
          <Content>This content is not yet accessible.</Content>
        </Item>
        <Item value="enabled-2">
          <Trigger>Another available feature</Trigger>
          <Content>This item is also enabled and fully interactive.</Content>
        </Item>
      </Root>
    </div>
  ),
};
