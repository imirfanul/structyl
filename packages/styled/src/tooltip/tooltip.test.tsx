import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import * as Tooltip from './index';

describe('Tooltip (styled)', () => {
  it('renders content with forceMount and has no accessibility violations', async () => {
    const { container } = render(
      <Tooltip.Root>
        <Tooltip.Trigger>Hover</Tooltip.Trigger>
        <Tooltip.Portal forceMount>
          <Tooltip.Content forceMount>Tooltip text</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
