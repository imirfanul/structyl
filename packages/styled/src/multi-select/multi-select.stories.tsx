import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import * as MultiSelect from './index';
import { Typography } from '../typography';

const meta: Meta = {
  title: 'Components/MultiSelect',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <MultiSelect.Root>
        <MultiSelect.Trigger>
          <MultiSelect.Value placeholder="Select technologies..." />
        </MultiSelect.Trigger>
        <MultiSelect.Content showCreateItem={false}>
          <MultiSelect.Item value="react">⚛️ React</MultiSelect.Item>
          <MultiSelect.Item value="typescript">🔷 TypeScript</MultiSelect.Item>
          <MultiSelect.Item value="tailwind">🎨 Tailwind CSS</MultiSelect.Item>
          <MultiSelect.Item value="nextjs">▲ Next.js</MultiSelect.Item>
          <MultiSelect.Item value="vite">⚡ Vite</MultiSelect.Item>
          <MultiSelect.Item value="playwright">🎭 Playwright</MultiSelect.Item>
          <MultiSelect.Item value="storybook">📖 Storybook</MultiSelect.Item>
        </MultiSelect.Content>
      </MultiSelect.Root>
    </div>
  ),
};

export const WithDefaultValues: Story = {
  render: () => (
    <div className="w-72">
      <MultiSelect.Root defaultValue={['react', 'typescript']}>
        <MultiSelect.Trigger>
          <MultiSelect.Value placeholder="Select technologies..." />
        </MultiSelect.Trigger>
        <MultiSelect.Content showCreateItem={false}>
          <MultiSelect.Item value="react">⚛️ React</MultiSelect.Item>
          <MultiSelect.Item value="typescript">🔷 TypeScript</MultiSelect.Item>
          <MultiSelect.Item value="tailwind">🎨 Tailwind CSS</MultiSelect.Item>
          <MultiSelect.Item value="nextjs">▲ Next.js</MultiSelect.Item>
          <MultiSelect.Item value="vite">⚡ Vite</MultiSelect.Item>
        </MultiSelect.Content>
      </MultiSelect.Root>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [values, setValues] = React.useState<string[]>(['design', 'frontend']);

    return (
      <div className="flex w-72 flex-col gap-3">
        <MultiSelect.Root value={values} onValueChange={setValues}>
          <MultiSelect.Trigger>
            <MultiSelect.Value placeholder="Select skills..." />
          </MultiSelect.Trigger>
          <MultiSelect.Content showCreateItem={false}>
            <MultiSelect.Item value="design">🎨 Design</MultiSelect.Item>
            <MultiSelect.Item value="frontend">💻 Frontend</MultiSelect.Item>
            <MultiSelect.Item value="backend">🔧 Backend</MultiSelect.Item>
            <MultiSelect.Item value="devops">⚙️ DevOps</MultiSelect.Item>
            <MultiSelect.Item value="mobile">📱 Mobile</MultiSelect.Item>
            <MultiSelect.Item value="ml">🤖 Machine Learning</MultiSelect.Item>
          </MultiSelect.Content>
        </MultiSelect.Root>
        <Typography variant="muted">
          Selected: {values.length > 0 ? values.join(', ') : 'none'}
        </Typography>
      </div>
    );
  },
};

export const WithGroupsAndLabels: Story = {
  render: () => (
    <div className="w-72">
      <MultiSelect.Root>
        <MultiSelect.Trigger>
          <MultiSelect.Value placeholder="Select team members..." />
        </MultiSelect.Trigger>
        <MultiSelect.Content showCreateItem={false}>
          <MultiSelect.Group>
            <MultiSelect.Label>Engineering</MultiSelect.Label>
            <MultiSelect.Item value="alice">👩‍💻 Alice Chen</MultiSelect.Item>
            <MultiSelect.Item value="bob">👨‍💻 Bob Smith</MultiSelect.Item>
            <MultiSelect.Item value="carol">👩‍💻 Carol Davis</MultiSelect.Item>
          </MultiSelect.Group>
          <MultiSelect.Separator />
          <MultiSelect.Group>
            <MultiSelect.Label>Design</MultiSelect.Label>
            <MultiSelect.Item value="diana">🎨 Diana Kim</MultiSelect.Item>
            <MultiSelect.Item value="evan">🎨 Evan Park</MultiSelect.Item>
          </MultiSelect.Group>
          <MultiSelect.Separator />
          <MultiSelect.Group>
            <MultiSelect.Label>Product</MultiSelect.Label>
            <MultiSelect.Item value="fiona">📋 Fiona Wu</MultiSelect.Item>
            <MultiSelect.Item value="george">📋 George Lee</MultiSelect.Item>
          </MultiSelect.Group>
        </MultiSelect.Content>
      </MultiSelect.Root>
    </div>
  ),
};

export const WithMaxVisible: Story = {
  render: () => (
    <div className="w-72">
      <MultiSelect.Root defaultValue={['react', 'typescript', 'tailwind', 'nextjs', 'vite']}>
        <MultiSelect.Trigger>
          <MultiSelect.Value placeholder="Select technologies..." maxVisible={2} />
        </MultiSelect.Trigger>
        <MultiSelect.Content showCreateItem={false}>
          <MultiSelect.Item value="react">⚛️ React</MultiSelect.Item>
          <MultiSelect.Item value="typescript">🔷 TypeScript</MultiSelect.Item>
          <MultiSelect.Item value="tailwind">🎨 Tailwind CSS</MultiSelect.Item>
          <MultiSelect.Item value="nextjs">▲ Next.js</MultiSelect.Item>
          <MultiSelect.Item value="vite">⚡ Vite</MultiSelect.Item>
        </MultiSelect.Content>
      </MultiSelect.Root>
    </div>
  ),
};

export const WithVirtualizedOptions: Story = {
  render: () => {
    const options = Array.from({ length: 100 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
    }));

    return (
      <div className="w-72">
        <MultiSelect.Root>
          <MultiSelect.Trigger>
            <MultiSelect.Value placeholder="Select from 100 options..." />
          </MultiSelect.Trigger>
          <MultiSelect.Content options={options} showCreateItem={false} />
        </MultiSelect.Root>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <MultiSelect.Root disabled>
        <MultiSelect.Trigger>
          <MultiSelect.Value placeholder="Select options..." />
        </MultiSelect.Trigger>
        <MultiSelect.Content showCreateItem={false}>
          <MultiSelect.Item value="a">Option A</MultiSelect.Item>
          <MultiSelect.Item value="b">Option B</MultiSelect.Item>
        </MultiSelect.Content>
      </MultiSelect.Root>
    </div>
  ),
};
