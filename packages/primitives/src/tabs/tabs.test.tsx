import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as Tabs from './';
import { renderTabsAxeFixture } from '../../test/axe-fixtures';

describe('Tabs (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(Tabs);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderTabsAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
