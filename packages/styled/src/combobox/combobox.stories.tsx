import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import * as Combobox from './index';

const meta: Meta = {
  title: 'Components/Combobox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

const frameworks = [
  { value: 'react', label: '⚛️ React' },
  { value: 'vue', label: '💚 Vue' },
  { value: 'svelte', label: '🧡 Svelte' },
  { value: 'angular', label: '🔺 Angular' },
  { value: 'solid', label: '🟦 Solid' },
  { value: 'qwik', label: '⚡ Qwik' },
  { value: 'astro', label: '🚀 Astro' },
];

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <Combobox.Root>
        <Combobox.Input placeholder="Search frameworks..." />
        <Combobox.Content>
          <Combobox.Empty>No framework found.</Combobox.Empty>
          {frameworks.map((fw) => (
            <Combobox.Item key={fw.value} value={fw.value}>
              {fw.label}
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Root>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <div className="w-64">
      <Combobox.Root>
        <Combobox.Input placeholder="Search languages..." />
        <Combobox.Content>
          <Combobox.Empty>No language found.</Combobox.Empty>
          <Combobox.Group heading="Frontend">
            <Combobox.Item value="javascript">🟨 JavaScript</Combobox.Item>
            <Combobox.Item value="typescript">🔷 TypeScript</Combobox.Item>
            <Combobox.Item value="elm">🌳 Elm</Combobox.Item>
          </Combobox.Group>
          <Combobox.Group heading="Backend">
            <Combobox.Item value="python">🐍 Python</Combobox.Item>
            <Combobox.Item value="rust">🦀 Rust</Combobox.Item>
            <Combobox.Item value="go">🐹 Go</Combobox.Item>
            <Combobox.Item value="elixir">💜 Elixir</Combobox.Item>
          </Combobox.Group>
        </Combobox.Content>
      </Combobox.Root>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [inputValue, setInputValue] = React.useState('');
    const [selectedValue, setSelectedValue] = React.useState('');

    const cities = [
      { value: 'nyc', label: '🗽 New York City' },
      { value: 'london', label: '🎡 London' },
      { value: 'tokyo', label: '🗼 Tokyo' },
      { value: 'paris', label: '🗼 Paris' },
      { value: 'sydney', label: '🦘 Sydney' },
      { value: 'dubai', label: '🌆 Dubai' },
    ];

    const filtered = cities.filter((c) =>
      c.label.toLowerCase().includes(inputValue.toLowerCase()),
    );

    return (
      <div className="flex w-64 flex-col gap-3">
        <Combobox.Root
          inputValue={inputValue}
          onInputValueChange={setInputValue}
          onSelect={(value) => setSelectedValue(value)}
        >
          <Combobox.Input placeholder="Search cities..." />
          <Combobox.Content>
            {filtered.length === 0 ? (
              <Combobox.Empty>No city found.</Combobox.Empty>
            ) : (
              filtered.map((city) => (
                <Combobox.Item key={city.value} value={city.value}>
                  {city.label}
                </Combobox.Item>
              ))
            )}
          </Combobox.Content>
        </Combobox.Root>
        {selectedValue && (
          <p className="text-sm text-muted-foreground">
            Selected: <strong>{selectedValue}</strong>
          </p>
        )}
      </div>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => (
    <div className="w-64">
      <Combobox.Root>
        <Combobox.Input placeholder="Select a plan..." />
        <Combobox.Content>
          <Combobox.Empty>No plan found.</Combobox.Empty>
          <Combobox.Item value="free">🆓 Free</Combobox.Item>
          <Combobox.Item value="pro">⭐ Pro</Combobox.Item>
          <Combobox.Item value="enterprise" disabled>
            🏢 Enterprise (Contact Sales)
          </Combobox.Item>
          <Combobox.Item value="startup">🚀 Startup</Combobox.Item>
        </Combobox.Content>
      </Combobox.Root>
    </div>
  ),
};
