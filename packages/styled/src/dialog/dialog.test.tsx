import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import * as Dialog from './index';

describe('Dialog (styled)', () => {
  it('renders content and is accessible when forced open', async () => {
    render(
      <Dialog.Root>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Portal forceMount>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>My dialog</Dialog.Title>
            <Dialog.Description>desc</Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );
    expect(screen.getByText('My dialog')).toBeTruthy();
    const results = await axe(document.body);
    expect(results.violations).toHaveLength(0);
  });

  it('closes when close button clicked', () => {
    render(
      <Dialog.Root defaultOpen>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>My dialog</Dialog.Title>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );

    const buttons = screen.getAllByRole('button', { name: /close/i });
    const btn = buttons[0];
    fireEvent.click(btn);
  });
});
