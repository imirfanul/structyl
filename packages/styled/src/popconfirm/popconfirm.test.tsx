import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Popconfirm } from './index';

describe('Popconfirm (styled)', () => {
  it('renders the trigger', () => {
    render(
      <Popconfirm title="Delete item?" onConfirm={() => {}}>
        <button>Delete</button>
      </Popconfirm>,
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDefined();
  });

  it('shows confirm/cancel buttons when open', () => {
    render(
      <Popconfirm title="Delete item?" open onConfirm={() => {}}>
        <button>Delete</button>
      </Popconfirm>,
    );
    // content is in a portal — search document.body
    expect(document.body.querySelector('button[type="button"]:nth-of-type(1)')).toBeDefined();
    expect(screen.getByText('Confirm')).toBeDefined();
    expect(screen.getByText('Cancel')).toBeDefined();
  });

  it('calls onConfirm when confirm is clicked', async () => {
    const onConfirm = vi.fn();
    render(
      <Popconfirm title="Sure?" open onConfirm={onConfirm}>
        <button>Action</button>
      </Popconfirm>,
    );
    await userEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel is clicked', async () => {
    const onCancel = vi.fn();
    render(
      <Popconfirm title="Sure?" open onConfirm={() => {}} onCancel={onCancel}>
        <button>Action</button>
      </Popconfirm>,
    );
    await userEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations when open', async () => {
    render(
      <Popconfirm title="Are you sure?" description="This cannot be undone." open onConfirm={() => {}}>
        <button>Delete</button>
      </Popconfirm>,
    );
    // axe the full document since content renders in a portal
    const results = await axe(document.body);
    expect(results.violations).toHaveLength(0);
  });
});
