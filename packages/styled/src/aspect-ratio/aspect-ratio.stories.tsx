import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { AspectRatio } from './index';

const meta: Meta<typeof AspectRatio> = {
  title: 'Styled/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[480px]">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1612865547334-09cb8cb455da?w=800&auto=format&fit=crop"
          alt="Mountain landscape"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  name: '1:1 square',
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop"
          alt="Mountain peak"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  name: '4:5 portrait',
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={4 / 5}>
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop"
          alt="Starry night"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Widescreen: Story = {
  name: '21:9 widescreen',
  render: () => (
    <div className="w-[560px]">
      <AspectRatio ratio={21 / 9}>
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop"
          alt="Forest panorama"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const VideoPlaceholder: Story = {
  name: '16:9 video placeholder',
  render: () => (
    <div className="w-[480px]">
      <AspectRatio ratio={16 / 9} className="bg-muted flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="opacity-50"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-sm">Video placeholder</span>
        </div>
      </AspectRatio>
    </div>
  ),
};
