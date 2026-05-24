import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './skeleton';

describe('Skeleton (primitive)', () => {
  it('renders without crashing', () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    expect(container.querySelector('[data-testid="skeleton"]')).toBeTruthy();
  });
});
