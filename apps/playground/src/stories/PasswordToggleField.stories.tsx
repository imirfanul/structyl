import type { Meta, StoryObj } from '@storybook/react';
import { PasswordToggleFieldStory } from './story-fixtures';

const meta: Meta = { title: 'Specialty/PasswordToggleField', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <PasswordToggleFieldStory /> };
