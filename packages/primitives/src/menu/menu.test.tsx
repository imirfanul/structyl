import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as MenuModule from './';
import { renderMenuAxeFixture } from '../../test/axe-fixtures';

describe('Menu (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(MenuModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderMenuAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
