import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbStory } from './story-fixtures';

const meta: Meta = { title: 'Disclosure/Breadcrumb', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <BreadcrumbStory /> };
