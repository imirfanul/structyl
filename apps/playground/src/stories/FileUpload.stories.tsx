import type { Meta, StoryObj } from '@storybook/react';
import { FileUploadStory } from './story-fixtures';

const meta: Meta = { title: 'Specialty/FileUpload', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;

export const Default: Story = { render: () => <FileUploadStory /> };
