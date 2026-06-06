import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { DescriptionList } from './index';

describe('DescriptionList (styled)', () => {
  it('renders terms and details', () => {
    render(
      <DescriptionList>
        <DescriptionList.Term>Name</DescriptionList.Term>
        <DescriptionList.Details>Ada Lovelace</DescriptionList.Details>
      </DescriptionList>,
    );
    expect(screen.getByText('Name')).toBeDefined();
    expect(screen.getByText('Ada Lovelace')).toBeDefined();
  });

  it('renders both orientations without error', () => {
    for (const orientation of ['vertical', 'horizontal'] as const) {
      const { unmount } = render(
        <DescriptionList orientation={orientation}>
          <DescriptionList.Term>Key</DescriptionList.Term>
          <DescriptionList.Details>Value</DescriptionList.Details>
        </DescriptionList>,
      );
      unmount();
    }
  });

  it('uses semantic dl/dt/dd elements', () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionList.Term>Role</DescriptionList.Term>
        <DescriptionList.Details>Engineer</DescriptionList.Details>
      </DescriptionList>,
    );
    expect(container.querySelector('dl')).not.toBeNull();
    expect(container.querySelector('dt')).not.toBeNull();
    expect(container.querySelector('dd')).not.toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionList.Term>Status</DescriptionList.Term>
        <DescriptionList.Details>Active</DescriptionList.Details>
      </DescriptionList>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
