import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as TreeModule from './';
import { renderTreeAxeFixture } from '../../test/axe-fixtures';

describe('Tree (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(TreeModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderTreeAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
