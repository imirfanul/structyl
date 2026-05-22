import type { Meta, StoryObj } from '@storybook/react';
import { AccordionStory } from './story-fixtures';

const meta: Meta = { title: 'Disclosure/Accordion', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <AccordionStory /> };
