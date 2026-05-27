import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Image, Fallback } from './index';

const meta: Meta = {
  title: 'Styled/Avatar',
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
      <Image
        src="https://i.pravatar.cc/150?img=1"
        alt="Jane Smith"
      />
      <Fallback>JS</Fallback>
    </Root>
  ),
};

export const WithFallback: Story = {
  name: 'Fallback (broken image)',
  render: () => (
    <Root>
      <Image src="https://broken.url/avatar.png" alt="John Doe" />
      <Fallback>JD</Fallback>
    </Root>
  ),
};

export const Sizes: Story = {
  name: 'Size variants',
  render: () => (
    <div className="flex items-end gap-4">
      <Root className="h-6 w-6 text-xs">
        <Image src="https://i.pravatar.cc/150?img=3" alt="User" />
        <Fallback>U</Fallback>
      </Root>
      <Root className="h-8 w-8 text-xs">
        <Image src="https://i.pravatar.cc/150?img=4" alt="User" />
        <Fallback>U</Fallback>
      </Root>
      <Root>
        <Image src="https://i.pravatar.cc/150?img=5" alt="User" />
        <Fallback>U</Fallback>
      </Root>
      <Root className="h-14 w-14">
        <Image src="https://i.pravatar.cc/150?img=6" alt="User" />
        <Fallback>U</Fallback>
      </Root>
      <Root className="h-20 w-20 text-xl">
        <Image src="https://i.pravatar.cc/150?img=7" alt="User" />
        <Fallback>U</Fallback>
      </Root>
    </div>
  ),
};

export const AvatarGroup: Story = {
  name: 'Avatar group',
  render: () => (
    <div className="flex -space-x-3">
      {[
        { src: 'https://i.pravatar.cc/150?img=10', initials: 'AM', alt: 'Alice M.' },
        { src: 'https://i.pravatar.cc/150?img=11', initials: 'BR', alt: 'Bob R.' },
        { src: 'https://i.pravatar.cc/150?img=12', initials: 'CP', alt: 'Carol P.' },
        { src: 'https://broken.url/x.png', initials: 'DK', alt: 'Dan K.' },
        { src: 'https://broken.url/y.png', initials: '+4', alt: '4 more' },
      ].map(({ src, initials, alt }) => (
        <Root key={alt} className="ring-2 ring-background">
          <Image src={src} alt={alt} />
          <Fallback>{initials}</Fallback>
        </Root>
      ))}
    </div>
  ),
};

export const FallbackOnly: Story = {
  name: 'Fallback only (no image)',
  render: () => (
    <div className="flex gap-3">
      {['AB', 'CD', 'EF', 'GH'].map((initials) => (
        <Root key={initials}>
          <Fallback>{initials}</Fallback>
        </Root>
      ))}
    </div>
  ),
};
