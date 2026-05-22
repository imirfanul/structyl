import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as ScrollAreaModule from './';
import { renderScrollAreaAxeFixture } from '../../test/axe-fixtures';

describe('ScrollArea (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(ScrollAreaModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderScrollAreaAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
