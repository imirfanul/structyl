import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import {
  Root as HoverCard,
  Trigger as HoverCardTrigger,
  Content as HoverCardContent,
} from './index';

describe('HoverCard (styled)', () => {
  it('renders content without accessibility violations', async () => {
    const { container } = render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent forceMount>Hover content</HoverCardContent>
      </HoverCard>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
