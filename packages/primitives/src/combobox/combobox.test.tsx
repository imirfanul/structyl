import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as ComboboxModule from './';
import { renderComboboxAxeFixture } from '../../test/axe-fixtures';

describe('Combobox (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(ComboboxModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderComboboxAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
