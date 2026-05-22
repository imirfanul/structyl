import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as TooltipModule from './';
import { renderTooltipAxeFixture } from '../../test/axe-fixtures';

describe('Tooltip (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(TooltipModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderTooltipAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
