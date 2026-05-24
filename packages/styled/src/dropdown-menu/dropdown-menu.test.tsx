import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import {
  Root as DropdownMenu,
  Trigger as DropdownTrigger,
  Content as DropdownContent,
  Item as DropdownItem,
} from './index';

describe('DropdownMenu (styled)', () => {
  it('renders content with forceMount and has no accessibility violations', async () => {
    const { container } = render(
      <DropdownMenu>
        <DropdownTrigger>Open</DropdownTrigger>
        <DropdownContent forceMount>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownContent>
      </DropdownMenu>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
