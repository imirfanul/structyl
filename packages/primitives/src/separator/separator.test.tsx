import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as SeparatorModule from './';
import { renderSeparatorAxeFixture } from '../../test/axe-fixtures';

describe('Separator (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(SeparatorModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderSeparatorAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
