import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Root as Stepper } from './index';

describe('Stepper (primitive)', () => {
  test('increments and decrements', () => {
    const onChange = vi.fn();
    const { getByLabelText, getByText } = render(<Stepper defaultValue={2} onChange={onChange} />);
    const inc = getByLabelText('Increment');
    const dec = getByLabelText('Decrement');
    fireEvent.click(inc);
    expect(onChange).toHaveBeenCalled();
    fireEvent.click(dec);
    expect(onChange).toHaveBeenCalled();
    expect(getByText('2')).toBeTruthy();
  });
});
