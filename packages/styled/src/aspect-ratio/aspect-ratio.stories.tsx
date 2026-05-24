import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './index';

const meta: Meta<typeof AspectRatio> = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const SixteenByNine: Story = {
  args: {
    ratio: 16 / 9,
    children: <div style={{ background: 'linear-gradient(90deg,#e2e8f0,#cbd5e1)' }} />,
  },
};
