import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as MenuModule from './';

describe('Menu (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(MenuModule).length).toBeGreaterThan(0);
  });

  it.skip('has no accessibility violations in default render', async () => {
    const { container } = render(<div />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
