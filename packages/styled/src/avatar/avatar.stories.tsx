import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Root, Image, Fallback } from './index';

const meta: Meta<typeof Root> = {
  title: 'Media/Avatar',
  component: Root,
};

export default meta;

type Story = StoryObj<typeof Root>;

export const Default: Story = {
  args: {
    children: <Image src="https://placekitten.com/200/200" alt="Kitten" />,
  },
};

export const WithFallback: Story = {
  args: {
    children: <Fallback>TK</Fallback>,
  },
};
