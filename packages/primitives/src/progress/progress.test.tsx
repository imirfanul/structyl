import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as Progress from './';
import { renderProgressAxeFixture } from '../../test/axe-fixtures';

describe('Progress (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(Progress);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderProgressAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
