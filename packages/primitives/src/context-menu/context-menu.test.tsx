import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as ContextMenuModule from './';
import { renderContextMenuAxeFixture } from '../../test/axe-fixtures';

describe('ContextMenu (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(ContextMenuModule).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderContextMenuAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
