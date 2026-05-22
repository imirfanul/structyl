import type { Meta, StoryObj } from '@storybook/react';
import { StepperStory } from './story-fixtures';

const meta: Meta = { title: 'Disclosure/Stepper', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <StepperStory /> };
