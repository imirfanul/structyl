import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  BottomNavigation,
  Box,
  ChipDelete,
  ChipLabel,
  ChipRoot,
  List,
  Modal,
  Rating,
  Snackbar,
  SpeedDial,
  Table,
  TransferList,
} from './index';

describe('Material parity primitives', () => {
  it('renders simple building blocks', () => {
    render(
      <Box>
        <ChipRoot>
          <ChipLabel>Status</ChipLabel>
          <ChipDelete aria-label="Remove">x</ChipDelete>
        </ChipRoot>
        <List.Root>
          <List.Item>
            <List.ItemText>Item</List.ItemText>
          </List.Item>
        </List.Root>
        <Table.Root>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>,
    );

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.getByText('Cell')).toBeInTheDocument();
  });

  it('supports controlled-style interactions', async () => {
    const user = userEvent.setup();
    const onRatingChange = vi.fn();
    const onNavigationChange = vi.fn();
    const onTransferChange = vi.fn();
    const onModalClose = vi.fn();

    render(
      <>
        <Rating onValueChange={onRatingChange} />
        <BottomNavigation.Root onValueChange={onNavigationChange} showLabels>
          <BottomNavigation.Item value="home" label="Home" />
          <BottomNavigation.Item value="search" label="Search" icon={<span aria-hidden>?</span>} />
        </BottomNavigation.Root>
        <TransferList
          options={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
          ]}
          onValueChange={onTransferChange}
        />
        <Snackbar
          defaultOpen
          message="Saved"
          action={<button type="button">Undo</button>}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
        <Modal defaultOpen onClose={onModalClose}>
          <div>Modal body</div>
        </Modal>
        <SpeedDial.Root defaultOpen direction="left">
          <SpeedDial.Content>
            <SpeedDial.Action aria-label="Add">+</SpeedDial.Action>
          </SpeedDial.Content>
          <SpeedDial.Trigger aria-label="Actions" icon="+" openIcon="x" />
        </SpeedDial.Root>
      </>,
    );

    await user.click(screen.getByRole('radio', { name: '3 stars' }));
    await user.click(screen.getByRole('tab', { name: 'Search' }));
    await user.click(screen.getByLabelText('React'));
    await user.click(screen.getByRole('button', { name: '>' }));

    expect(onRatingChange).toHaveBeenCalledWith(3);
    expect(onNavigationChange).toHaveBeenCalledWith('search');
    expect(onTransferChange).toHaveBeenCalledWith(['react']);
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
    expect(screen.getByRole('status')).toHaveTextContent('Undo');
    expect(screen.getByRole('status')).toHaveAttribute('data-anchor-vertical', 'top');
    expect(screen.getByRole('status')).toHaveAttribute('data-anchor-horizontal', 'right');
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    await user.keyboard('{Escape}');
    expect(onModalClose).toHaveBeenCalledWith(expect.any(KeyboardEvent), 'escapeKeyDown');
  });
});
