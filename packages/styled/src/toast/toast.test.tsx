import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import * as Toast from './index';

describe('Toast (styled)', () => {
  it('renders viewport and toast content with no accessibility violations', async () => {
    const { container } = render(
      <Toast.Provider>
        <Toast.Viewport />
        <Toast.Root forceMount>
          <Toast.Title>Notice</Toast.Title>
          <Toast.Description>Toast message</Toast.Description>
          <Toast.Close />
        </Toast.Root>
      </Toast.Provider>,
    );

    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
