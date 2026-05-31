import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, List, Item, Link, Page, Separator, Ellipsis } from './index';

const meta: Meta = {
  title: 'Styled/Breadcrumb',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Root>
      <List>
        <Item>
          <Link href="#">Home</Link>
        </Item>
        <Separator />
        <Item>
          <Link href="#">Docs</Link>
        </Item>
        <Separator />
        <Item>
          <Page>Components</Page>
        </Item>
      </List>
    </Root>
  ),
};

export const DeepNavigation: Story = {
  name: 'Deep navigation path',
  render: () => (
    <Root>
      <List>
        <Item>
          <Link href="#">Home</Link>
        </Item>
        <Separator />
        <Item>
          <Link href="#">Settings</Link>
        </Item>
        <Separator />
        <Item>
          <Link href="#">Workspace</Link>
        </Item>
        <Separator />
        <Item>
          <Link href="#">Members</Link>
        </Item>
        <Separator />
        <Item>
          <Page>Invite</Page>
        </Item>
      </List>
    </Root>
  ),
};

export const WithEllipsis: Story = {
  name: 'With ellipsis (truncated middle)',
  render: () => (
    <Root>
      <List>
        <Item>
          <Link href="#">Home</Link>
        </Item>
        <Separator />
        <Item>
          <Ellipsis />
        </Item>
        <Separator />
        <Item>
          <Link href="#">Packages</Link>
        </Item>
        <Separator />
        <Item>
          <Page>accordion</Page>
        </Item>
      </List>
    </Root>
  ),
};

export const CustomSeparator: Story = {
  name: 'Custom separator (slash)',
  render: () => (
    <Root>
      <List>
        <Item>
          <Link href="#">structyl</Link>
        </Item>
        <Separator>
          <span className="text-muted-foreground">/</span>
        </Separator>
        <Item>
          <Link href="#">packages</Link>
        </Item>
        <Separator>
          <span className="text-muted-foreground">/</span>
        </Separator>
        <Item>
          <Page>styled</Page>
        </Item>
      </List>
    </Root>
  ),
};
