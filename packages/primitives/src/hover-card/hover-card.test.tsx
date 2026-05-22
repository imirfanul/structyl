import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as HoverCard from './';
import { renderHoverCardAxeFixture } from '../../test/axe-fixtures';

describe('HoverCard (primitive)', () => {
  it('exports a Root or named member', () => {
    const keys = Object.keys(HoverCard);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderHoverCardAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
