import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import * as AlertDialog from './index';
import { renderAlertDialogAxeFixture } from '../../test/axe-fixtures';

describe('AlertDialog', () => {
  it('Cancel button closes the dialog', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <AlertDialog.Root onOpenChange={onOpenChange}>
        <AlertDialog.Trigger>Open</AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Are you sure?</AlertDialog.Title>
            <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Delete</AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    onOpenChange.mockClear();
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('Action button closes the dialog', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <AlertDialog.Root onOpenChange={onOpenChange}>
        <AlertDialog.Trigger>Open</AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Are you sure?</AlertDialog.Title>
            <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Delete</AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));

    await waitFor(() => {
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    onOpenChange.mockClear();
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('Escape key closes the dialog', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <AlertDialog.Root onOpenChange={onOpenChange}>
        <AlertDialog.Trigger>Open</AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Are you sure?</AlertDialog.Title>
            <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Delete</AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));

    await waitFor(() => {
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    onOpenChange.mockClear();
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('dialog content has pointer-events auto when open', async () => {
    render(
      <AlertDialog.Root defaultOpen>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Are you sure?</AlertDialog.Title>
            <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Delete</AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    );

    await waitFor(() => {
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    // After all effects have run, check pointer-events
    const dialog = screen.getByRole('alertdialog');

    // Wait for the forceRender to settle
    await waitFor(() => {
      expect(dialog.style.pointerEvents).toBe('auto');
    }, { timeout: 1000 });

    // Body should be pointer-events: none
    expect(document.body.style.pointerEvents).toBe('none');
  });

  it('has no accessibility violations in default render', async () => {
    const { container } = render(renderAlertDialogAxeFixture());
    expect(await axe(container)).toHaveNoViolations();
  });
});
