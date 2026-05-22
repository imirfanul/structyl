import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as FormModule from './';
import { renderFormAxeFixture } from '../../test/axe-fixtures';

describe('Form (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(FormModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderFormAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
