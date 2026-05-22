import type { Meta, StoryObj } from '@storybook/react';
import { PaginationStory } from './story-fixtures';

const meta: Meta = { title: 'Disclosure/Pagination', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <PaginationStory /> };
