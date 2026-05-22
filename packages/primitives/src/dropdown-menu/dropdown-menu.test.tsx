import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as DropdownMenuModule from './';
import { renderDropdownMenuAxeFixture } from '../../test/axe-fixtures';

describe('DropdownMenu (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(DropdownMenuModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderDropdownMenuAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
