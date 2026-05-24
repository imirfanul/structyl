import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Textarea } from './textarea';

describe('Textarea (primitive)', () => {
  it('renders and supports uncontrolled textarea', () => {
    const { getByRole } = render(<Textarea defaultValue="hello" />);
    const el = getByRole('textbox') as HTMLTextAreaElement;
    expect(el.value).toBe('hello');
    fireEvent.change(el, { target: { value: 'world' } });
    expect(el.value).toBe('world');
  });

  it('supports controlled textarea', () => {
    let value = 'a';
    const handleChange = (e: any) => {
      value = e.target.value;
    };
    const { getByRole, rerender } = render(<Textarea value={value} onChange={handleChange} />);
    const el = getByRole('textbox') as HTMLTextAreaElement;
    expect(el.value).toBe('a');
    // simulate parent updating value
    value = 'b';
    rerender(<Textarea value={value} onChange={handleChange} />);
    expect(getByRole('textbox')).toHaveValue('b');
  });
});
