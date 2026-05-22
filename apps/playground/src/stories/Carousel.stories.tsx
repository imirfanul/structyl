import type { Meta, StoryObj } from '@storybook/react';
import { CarouselStory } from './story-fixtures';

const meta: Meta = { title: 'Feedback/Carousel', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <CarouselStory /> };
