import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as Select from './index';

describe('Select (styled)', () => {
  it('renders searchable virtualized options', () => {
    const options = Array.from({ length: 1000 }, (_, index) => ({
      value: `option-${index}`,
      label: `Option ${index}`,
    }));

    render(
      <Select.Root defaultOpen searchable>
        <Select.Trigger aria-label="Options">
          <Select.Value placeholder="Pick an option" />
        </Select.Trigger>
        <Select.Content options={options} optionHeight={32} optionOverscan={2} />
      </Select.Root>,
    );

    expect(screen.getByRole('searchbox', { name: 'Search options' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Option 0' })).toBeTruthy();
    expect(screen.queryByRole('option', { name: 'Option 999' })).toBeNull();
  });
});
