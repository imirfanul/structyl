import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogStory } from './story-fixtures';

const meta: Meta = { title: 'Overlays/AlertDialog', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <AlertDialogStory /> };
