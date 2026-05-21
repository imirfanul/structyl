import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '@your-lib/styled';

const meta: Meta = { title: 'Disclosure/Accordion', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <div>Accordion story — see playground for full demo</div> };
