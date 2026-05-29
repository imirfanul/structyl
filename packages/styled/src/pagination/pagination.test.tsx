import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './index';

describe('Pagination (styled)', () => {
  it('renders page info and navigation buttons', () => {
    render(<Pagination page={3} pageCount={10} onPageChange={() => {}} />);
    expect(screen.getByText('Page 3 of 10')).toBeTruthy();
    expect(screen.getByLabelText('First page')).toBeTruthy();
    expect(screen.getByLabelText('Previous page')).toBeTruthy();
    expect(screen.getByLabelText('Next page')).toBeTruthy();
    expect(screen.getByLabelText('Last page')).toBeTruthy();
  });

  it('disables prev/first buttons on first page', () => {
    render(<Pagination page={1} pageCount={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText('First page')).toBeDisabled();
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();
    expect(screen.getByLabelText('Last page')).not.toBeDisabled();
  });

  it('disables next/last buttons on last page', () => {
    render(<Pagination page={5} pageCount={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Last page')).toBeDisabled();
    expect(screen.getByLabelText('First page')).not.toBeDisabled();
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
  });

  it('calls onPageChange with correct page on button click', () => {
    const handlePageChange = vi.fn();
    render(<Pagination page={3} pageCount={10} onPageChange={handlePageChange} />);
    fireEvent.click(screen.getByLabelText('First page'));
    expect(handlePageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(handlePageChange).toHaveBeenCalledWith(2);
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(handlePageChange).toHaveBeenCalledWith(4);
    fireEvent.click(screen.getByLabelText('Last page'));
    expect(handlePageChange).toHaveBeenCalledWith(10);
  });

  it('shows total rows when provided', () => {
    render(<Pagination page={1} pageCount={5} totalRows={243} onPageChange={() => {}} />);
    expect(screen.getByText('243 total rows')).toBeTruthy();
  });

  it('hides total rows when showTotalRows=false', () => {
    render(<Pagination page={1} pageCount={5} totalRows={243} showTotalRows={false} onPageChange={() => {}} />);
    expect(screen.queryByText('243 total rows')).toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Pagination page={3} pageCount={10} totalRows={97} onPageChange={() => {}} />,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
