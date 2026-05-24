import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Root, Image, Fallback } from './index';

describe('Avatar (styled)', () => {
  it('renders image child without accessibility violations', async () => {
    const { container } = render(
      <Root>
        <Image src="https://placekitten.com/200/200" alt="Kitten" />
      </Root>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders fallback child without accessibility violations', async () => {
    const { container } = render(
      <Root>
        <Fallback>TK</Fallback>
      </Root>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
