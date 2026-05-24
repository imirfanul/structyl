import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Alert } from './alert';

describe('Alert (primitive)', () => {
  it('renders with role alert and variant', () => {
    const { getByRole } = render(<Alert variant="warning">Be careful</Alert>);
    const el = getByRole('alert');
    expect(el).toBeTruthy();
    expect(el.getAttribute('data-variant')).toBe('warning');
  });
});
