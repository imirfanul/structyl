import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root as Table, Header, Body, Footer, Row, Head, Cell, Caption } from './index';

const meta = {
  title: 'Styled/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const INVOICES = [
  { id: 'INV-001', status: 'Paid',    method: 'Credit card', amount: '$240.00' },
  { id: 'INV-002', status: 'Pending', method: 'Bank transfer', amount: '$120.50' },
  { id: 'INV-003', status: 'Draft',   method: 'PayPal',       amount: '$380.00' },
  { id: 'INV-004', status: 'Paid',    method: 'Credit card', amount: '$95.00'  },
];

export const Default: Story = {
  render: () => (
    <Table>
      <Caption>Invoice list</Caption>
      <Header>
        <Row>
          <Head>Invoice</Head>
          <Head>Status</Head>
          <Head>Method</Head>
          <Head className="text-right">Amount</Head>
        </Row>
      </Header>
      <Body>
        {INVOICES.map(inv => (
          <Row key={inv.id}>
            <Cell className="font-mono text-xs">{inv.id}</Cell>
            <Cell>{inv.status}</Cell>
            <Cell className="text-muted-foreground">{inv.method}</Cell>
            <Cell className="text-right tabular-nums">{inv.amount}</Cell>
          </Row>
        ))}
      </Body>
      <Footer>
        <Row>
          <Cell colSpan={3} className="text-muted-foreground">Total</Cell>
          <Cell className="text-right font-semibold tabular-nums">$835.50</Cell>
        </Row>
      </Footer>
    </Table>
  ),
};

export const Compact: Story = {
  render: () => (
    <Table compact>
      <Header>
        <Row><Head>Name</Head><Head>Role</Head><Head>Status</Head></Row>
      </Header>
      <Body>
        {[['Alice Chen', 'Admin', 'Active'], ['Bob Smith', 'Editor', 'Away'], ['Carol Wu', 'Viewer', 'Active']].map(([n, r, s]) => (
          <Row key={n}><Cell>{n}</Cell><Cell className="text-muted-foreground">{r}</Cell><Cell>{s}</Cell></Row>
        ))}
      </Body>
    </Table>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <div style={{ maxHeight: 200, overflow: 'auto' }}>
      <Table stickyHeader>
        <Header>
          <Row><Head>Item</Head><Head className="text-right">Price</Head></Row>
        </Header>
        <Body>
          {Array.from({ length: 12 }, (_, i) => (
            <Row key={i}><Cell>Product {i + 1}</Cell><Cell className="text-right">${(i + 1) * 10}.00</Cell></Row>
          ))}
        </Body>
      </Table>
    </div>
  ),
};

export const SortableHeaders: Story = {
  render: () => (
    <Table>
      <Header>
        <Row>
          <Head sortable sortDirection="asc">Name ↑</Head>
          <Head sortable>Date</Head>
          <Head>Amount</Head>
        </Row>
      </Header>
      <Body>
        <Row><Cell>Alice</Cell><Cell>2026-05-01</Cell><Cell>$100</Cell></Row>
        <Row><Cell>Bob</Cell><Cell>2026-05-03</Cell><Cell>$200</Cell></Row>
      </Body>
    </Table>
  ),
};
