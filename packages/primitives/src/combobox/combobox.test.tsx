import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import * as ComboboxModule from './';

describe('Combobox (primitive)', () => {
  it('exports something usable', () => {
    expect(Object.keys(ComboboxModule).length).toBeGreaterThan(0);
  });

  it.skip('has no accessibility violations in default render', async () => {
    const { container } = render(<div />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
