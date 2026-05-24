import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Root as Pagination } from './index';

describe('Pagination (primitive)', () => {
  test('renders pages and navigates', () => {
    const onChange = vi.fn();
    const { getByText } = render(<Pagination current={2} total={5} onChange={onChange} />);
    expect(getByText('2')).toBeTruthy();
    fireEvent.click(getByText('3'));
    expect(onChange).toHaveBeenCalledWith(3);
    fireEvent.click(getByText('Prev'));
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
