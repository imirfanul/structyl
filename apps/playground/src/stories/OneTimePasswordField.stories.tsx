import type { Meta, StoryObj } from '@storybook/react';
import { OneTimePasswordFieldStory } from './story-fixtures';

const meta: Meta = { title: 'Specialty/OneTimePasswordField', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <OneTimePasswordFieldStory /> };
