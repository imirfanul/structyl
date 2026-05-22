import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as PasswordToggleFieldModule from './';
import { renderPasswordToggleFieldAxeFixture } from '../../test/axe-fixtures';

describe('PasswordToggleField (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(PasswordToggleFieldModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderPasswordToggleFieldAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
