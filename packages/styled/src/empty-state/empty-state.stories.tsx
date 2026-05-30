import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Inbox, Search, FolderOpen } from '@aura-ui/icons';
import { Button } from '../button';
import { EmptyState } from './index';

const meta = {
  title: 'Styled/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'No results found' },
};

export const WithDescription: Story = {
  args: {
    title: 'Your inbox is empty',
    icon: <Inbox className="h-10 w-10" />,
    description: 'When you receive messages they will appear here.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No files uploaded',
    icon: <FolderOpen className="h-10 w-10" />,
    description: 'Upload your first file to get started.',
    action: (
      <Button>
        Upload file
      </Button>
    ),
  },
};

export const SearchEmpty: Story = {
  args: {
    title: 'No matches for "dark mode"',
    icon: <Search className="h-10 w-10" />,
    description: 'Try searching with different keywords or check for typos.',
    action: (
      <Button variant="outline">
        Clear search
      </Button>
    ),
  },
};

export const PageSize: Story = {
  args: {
    title: 'Nothing here yet',
    description: 'Get started by creating your first project.',
    size: 'page',
    action: (
      <Button>
        New project
      </Button>
    ),
  },
};
