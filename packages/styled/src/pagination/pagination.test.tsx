import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Root as Pagination, Content, Item, Link, Previous, Next } from './index';

describe('Pagination (styled)', () => {
  it('renders links and previous/next without accessibility violations', async () => {
    const { container } = render(
      <Pagination>
        <Content>
          <Item>
            <Previous href="#" />
          </Item>
          <Item>
            <Link href="#" isActive>
              1
            </Link>
          </Item>
          <Item>
            <Link href="#">2</Link>
          </Item>
          <Item>
            <Next href="#" />
          </Item>
        </Content>
      </Pagination>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
