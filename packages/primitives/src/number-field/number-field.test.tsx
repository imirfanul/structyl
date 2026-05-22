import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as NumberFieldModule from './';
import { renderNumberFieldAxeFixture } from '../../test/axe-fixtures';

describe('NumberField (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(NumberFieldModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderNumberFieldAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
