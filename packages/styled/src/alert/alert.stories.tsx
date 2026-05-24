import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Root, Description } from './index';

const meta: Meta<typeof Root> = {
  title: 'Feedback/Alert',
  component: Root,
};

export default meta;

type Story = StoryObj<typeof Root>;

export const Default: Story = {
  render: () => (
    <Root>
      <Description>This is an alert message</Description>
    </Root>
  ),
};
