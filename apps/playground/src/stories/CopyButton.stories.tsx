import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from '@your-lib/styled';

const meta: Meta<typeof CopyButton> = { title: 'Feedback/CopyButton', component: CopyButton, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof CopyButton>;
export const Default: Story = {};
