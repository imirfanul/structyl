import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as ToggleGroup from './';
import { renderToggleGroupAxeFixture } from '../../test/axe-fixtures';

describe('ToggleGroup (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(ToggleGroup);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderToggleGroupAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
