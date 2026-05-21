import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '@your-lib/styled';

const meta: Meta = { title: 'Feedback/Carousel', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Carousel story — see playground for full demo</div> };
