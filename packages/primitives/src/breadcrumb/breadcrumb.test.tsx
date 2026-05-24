import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from './breadcrumb';

describe('Breadcrumb (primitive)', () => {
  it('renders nav with list structure', () => {
    const { getByLabelText, container } = render(
      <Breadcrumb label="site">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Docs</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>,
    );

    const nav = getByLabelText('site');
    expect(nav.tagName.toLowerCase()).toBe('nav');
    const ol = container.querySelector('ol');
    expect(ol).toBeTruthy();
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(2);
  });
});
