import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as CheckboxModule from './';
import { renderCheckboxAxeFixture } from '../../test/axe-fixtures';

describe('Checkbox (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(CheckboxModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderCheckboxAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
