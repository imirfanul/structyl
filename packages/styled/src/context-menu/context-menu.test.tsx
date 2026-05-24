import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import {
  Root as ContextMenu,
  Trigger as ContextTrigger,
  Content as ContextContent,
  Item as ContextItem,
} from './index';

describe('ContextMenu (styled)', () => {
  it('renders content with forceMount and has no accessibility violations', async () => {
    const { container } = render(
      <ContextMenu>
        <ContextTrigger>Right click</ContextTrigger>
        <ContextContent forceMount>
          <ContextItem>Action 1</ContextItem>
          <ContextItem>Action 2</ContextItem>
        </ContextContent>
      </ContextMenu>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
