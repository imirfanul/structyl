import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as Collapsible from './';
import { renderCollapsibleAxeFixture } from '../../test/axe-fixtures';

describe('Collapsible (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(Collapsible);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderCollapsibleAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
