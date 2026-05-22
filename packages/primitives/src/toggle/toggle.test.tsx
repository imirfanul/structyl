import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as ToggleModule from './';
import { renderToggleAxeFixture } from '../../test/axe-fixtures';

describe('Toggle (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(ToggleModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderToggleAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
