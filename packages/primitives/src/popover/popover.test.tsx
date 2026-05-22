import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as Popover from './';
import { renderPopoverAxeFixture } from '../../test/axe-fixtures';

describe('Popover (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(Popover);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderPopoverAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
