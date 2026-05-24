import * as React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Spinner (primitive)', () => {
  it('renders with role=status', () => {
    const { getByRole } = render(<Spinner data-testid="s" />);
    const el = getByRole('status');
    expect(el).toBeInTheDocument();
  });
});
