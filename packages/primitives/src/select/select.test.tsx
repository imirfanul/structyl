import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import * as Select from './';
import { renderSelectAxeFixture } from '../../test/axe-fixtures';

describe('Select (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(Select).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderSelectAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });

  it('filters child items when searchable', async () => {
    const user = userEvent.setup();

    render(
      <Select.Root searchable>
        <Select.Trigger>
          <Select.Value placeholder="Pick a fruit" />
        </Select.Trigger>
        <Select.Content>
          <Select.SearchInput aria-label="Search fruits" />
          <Select.Viewport>
            <Select.Item value="apple">
              <Select.ItemText>Apple</Select.ItemText>
            </Select.Item>
            <Select.Item value="banana">
              <Select.ItemText>Banana</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>,
    );

    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByRole('searchbox', { name: 'Search fruits' }), 'ban');

    expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
  });

  it('calls onCreateOption from the create item', async () => {
    const user = userEvent.setup();
    const onCreateOption = vi.fn();
    const onValueChange = vi.fn();

    render(
      <Select.Root searchable onCreateOption={onCreateOption} onValueChange={onValueChange}>
        <Select.Trigger>
          <Select.Value placeholder="Pick a fruit" />
        </Select.Trigger>
        <Select.Content>
          <Select.SearchInput aria-label="Search fruits" />
          <Select.Viewport>
            <Select.Item value="apple">
              <Select.ItemText>Apple</Select.ItemText>
            </Select.Item>
            <Select.CreateItem>{(value) => `Create ${value}`}</Select.CreateItem>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>,
    );

    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByRole('searchbox', { name: 'Search fruits' }), 'Mango');
    await user.click(screen.getByRole('option', { name: 'Create Mango' }));

    expect(onCreateOption).toHaveBeenCalledWith('Mango');
    expect(onValueChange).toHaveBeenCalledWith('Mango');
    await waitFor(() => {
      expect(screen.queryByRole('searchbox', { name: 'Search fruits' })).not.toBeInTheDocument();
    });
  });

  it('renders only the visible slice of large option lists', () => {
    const options = Array.from({ length: 10000 }, (_, index) => ({
      value: `option-${index}`,
      label: `Option ${index}`,
    }));

    render(
      <Select.Root defaultOpen>
        <Select.Trigger>
          <Select.Value placeholder="Pick an option" />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Options options={options} itemHeight={32} visibleItemCount={6} overscan={2} />
          </Select.Viewport>
        </Select.Content>
      </Select.Root>,
    );

    expect(screen.getByRole('option', { name: 'Option 0' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Option 9999' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBeLessThan(20);
  });
});
