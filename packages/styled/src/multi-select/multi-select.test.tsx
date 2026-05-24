import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as MultiSelect from './index';

describe('MultiSelect (styled)', () => {
  it('renders selected items and virtualized searchable options', () => {
    const options = Array.from({ length: 1000 }, (_, index) => ({
      value: `option-${index}`,
      label: `Option ${index}`,
    }));

    render(
      <MultiSelect.Root defaultOpen defaultValue={['option-0', 'option-2']} searchable>
        <MultiSelect.Trigger aria-label="Options">
          <MultiSelect.Value placeholder="Pick options" options={options} />
        </MultiSelect.Trigger>
        <MultiSelect.Content options={options} optionHeight={32} optionOverscan={2} />
      </MultiSelect.Root>,
    );

    expect(screen.getByRole('combobox', { name: 'Options' }).textContent).toContain('Option 0');
    expect(screen.getByRole('combobox', { name: 'Options' }).textContent).toContain('Option 2');
    expect(screen.getByRole('searchbox', { name: 'Search options' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Option 0' })).toBeTruthy();
    expect(screen.queryByRole('option', { name: 'Option 999' })).toBeNull();
  });
});
