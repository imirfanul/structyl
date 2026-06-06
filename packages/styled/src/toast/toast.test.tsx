import * as React from 'react';
import { act, render, renderHook } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect, afterEach } from 'vitest';
import * as Toast from './index';
import { splitPosition } from './use-toast';

describe('Toast (styled)', () => {
  it('renders viewport and toast content with no accessibility violations', async () => {
    const { container } = render(
      <Toast.Provider>
        <Toast.Viewport />
        <Toast.Root forceMount>
          <Toast.Title>Notice</Toast.Title>
          <Toast.Description>Toast message</Toast.Description>
          <Toast.Close />
        </Toast.Root>
      </Toast.Provider>,
    );

    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

describe('splitPosition', () => {
  it('decomposes unified positions', () => {
    expect(splitPosition('bottom-right')).toEqual({ horizontal: 'right', vertical: 'bottom' });
    expect(splitPosition('top-center')).toEqual({ horizontal: 'center', vertical: 'top' });
    expect(splitPosition('top-left')).toEqual({ horizontal: 'left', vertical: 'top' });
  });
});

describe('toast store (useSyncExternalStore)', () => {
  afterEach(() => {
    // Clear any toasts left between tests.
    act(() => Toast.toast.dismiss());
  });

  it('exposes the live list via useToast and reacts to imperative calls', () => {
    const { result } = renderHook(() => Toast.useToast());
    expect(result.current.toasts).toHaveLength(0);

    let id = '';
    act(() => {
      id = result.current.toast.success('Saved!');
    });
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({ id, variant: 'success', title: 'Saved!' });
  });

  it('resolves a unified position into horizontal/vertical on the item', () => {
    const { result } = renderHook(() => Toast.useToast());
    act(() => {
      result.current.toast.error('Nope', { position: 'top-center' });
    });
    const item = result.current.toasts.at(-1);
    expect(item).toMatchObject({ horizontal: 'center', vertical: 'top' });
  });

  it('reuses an id to update an existing toast in place', () => {
    const { result } = renderHook(() => Toast.useToast());
    act(() => {
      result.current.toast.show({ id: 'fixed', title: 'Loading' });
    });
    act(() => {
      result.current.toast.show({ id: 'fixed', title: 'Done', variant: 'success' });
    });
    const matching = result.current.toasts.filter((t) => t.id === 'fixed');
    expect(matching).toHaveLength(1);
    expect(matching[0]).toMatchObject({ title: 'Done', variant: 'success' });
  });
});
