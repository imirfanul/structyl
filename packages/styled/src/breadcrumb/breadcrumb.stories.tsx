import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Root, List, Item, Link, Separator, Page } from './index';

const meta: Meta<typeof Root> = {
  title: 'Navigation/Breadcrumb',
  component: Root,
};

export default meta;

type Story = StoryObj<typeof Root>;

export const Default: Story = {
  render: () => (
    <Root>
      <List>
        <Item>
          <Link href="#">Home</Link>
        </Item>
        <Separator />
        <Item>
          <Page>Docs</Page>
        </Item>
      </List>
    </Root>
  ),
};
