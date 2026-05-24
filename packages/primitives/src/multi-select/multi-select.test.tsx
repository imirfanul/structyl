import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import * as MultiSelect from './';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

describe('MultiSelect (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(MultiSelect).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(
      <MultiSelect.Root>
        <MultiSelect.Trigger aria-label="Frameworks">
          <MultiSelect.Value placeholder="Select frameworks" options={options} />
        </MultiSelect.Trigger>
      </MultiSelect.Root>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('toggles multiple selected values and shows them in the trigger', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <MultiSelect.Root defaultValue={['react']} onValueChange={onValueChange}>
        <MultiSelect.Trigger>
          <MultiSelect.Value placeholder="Select frameworks" options={options} />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <MultiSelect.Viewport>
            {options.map((option) => (
              <MultiSelect.Item key={option.value} value={option.value}>
                <MultiSelect.ItemText>{option.label}</MultiSelect.ItemText>
              </MultiSelect.Item>
            ))}
          </MultiSelect.Viewport>
        </MultiSelect.Content>
      </MultiSelect.Root>,
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Vue' }));

    await waitFor(() => expect(onValueChange).toHaveBeenCalledWith(['react', 'vue']));
    expect(screen.getByRole('combobox')).toHaveTextContent('React');
    expect(screen.getByRole('combobox')).toHaveTextContent('Vue');
    expect(screen.getByRole('option', { name: 'Vue' })).toHaveAttribute('aria-selected', 'true');
  });

  it('filters and creates options while keeping the popup open', async () => {
    const user = userEvent.setup();
    const onCreateOption = vi.fn();
    const onValueChange = vi.fn();

    render(
      <MultiSelect.Root searchable onCreateOption={onCreateOption} onValueChange={onValueChange}>
        <MultiSelect.Trigger>
          <MultiSelect.Value placeholder="Select frameworks" />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <MultiSelect.SearchInput aria-label="Search frameworks" />
          <MultiSelect.Viewport>
            <MultiSelect.Item value="react">
              <MultiSelect.ItemText>React</MultiSelect.ItemText>
            </MultiSelect.Item>
            <MultiSelect.Item value="vue">
              <MultiSelect.ItemText>Vue</MultiSelect.ItemText>
            </MultiSelect.Item>
            <MultiSelect.CreateItem>{(value) => `Create ${value}`}</MultiSelect.CreateItem>
          </MultiSelect.Viewport>
        </MultiSelect.Content>
      </MultiSelect.Root>,
    );

    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByRole('searchbox', { name: 'Search frameworks' }), 'Svelte');

    expect(screen.queryByRole('option', { name: 'React' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: 'Create Svelte' }));

    expect(onCreateOption).toHaveBeenCalledWith('Svelte');
    await waitFor(() => expect(onValueChange).toHaveBeenCalledWith(['Svelte']));
    expect(screen.getByRole('searchbox', { name: 'Search frameworks' })).toBeInTheDocument();
  });

  it('renders only the visible slice of large option lists', () => {
    const largeOptions = Array.from({ length: 10000 }, (_, index) => ({
      value: `option-${index}`,
      label: `Option ${index}`,
    }));

    render(
      <MultiSelect.Root defaultOpen>
        <MultiSelect.Trigger>
          <MultiSelect.Value placeholder="Pick options" options={largeOptions} />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <MultiSelect.Viewport>
            <MultiSelect.Options
              options={largeOptions}
              itemHeight={32}
              visibleItemCount={6}
              overscan={2}
            />
          </MultiSelect.Viewport>
        </MultiSelect.Content>
      </MultiSelect.Root>,
    );

    expect(screen.getByRole('option', { name: 'Option 0' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Option 9999' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBeLessThan(20);
  });
});
