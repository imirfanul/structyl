import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './input';

describe('Input (primitive)', () => {
  it('renders and supports uncontrolled input', () => {
    const { getByRole } = render(<Input defaultValue="hello" />);
    const el = getByRole('textbox') as HTMLInputElement;
    expect(el.value).toBe('hello');
    fireEvent.change(el, { target: { value: 'world' } });
    expect(el.value).toBe('world');
  });

  it('supports controlled input', () => {
    let value = 'a';
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value = e.target.value;
    };
    const { getByRole, rerender } = render(<Input value={value} onChange={handleChange} />);
    const el = getByRole('textbox') as HTMLInputElement;
    expect(el.value).toBe('a');
    // simulate parent updating value
    value = 'b';
    rerender(<Input value={value} onChange={handleChange} />);
    expect(getByRole('textbox')).toHaveValue('b');
  });
});
