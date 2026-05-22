import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as SelectModule from './';
import { renderSelectAxeFixture } from '../../test/axe-fixtures';

describe('Select (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(SelectModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderSelectAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
