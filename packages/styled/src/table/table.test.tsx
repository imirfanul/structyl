import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Root as Table, Header, Body, Footer, Row, Head, Cell, Caption } from './index';

describe('Table (styled)', () => {
  function SimpleTable() {
    return (
      <Table>
        <Caption>Users</Caption>
        <Header>
          <Row>
            <Head>Name</Head>
            <Head>Role</Head>
          </Row>
        </Header>
        <Body>
          <Row>
            <Cell>Alice</Cell>
            <Cell>Admin</Cell>
          </Row>
          <Row>
            <Cell>Bob</Cell>
            <Cell>Viewer</Cell>
          </Row>
        </Body>
        <Footer>
          <Row>
            <Cell colSpan={2}>2 users</Cell>
          </Row>
        </Footer>
      </Table>
    );
  }

  it('renders table structure', () => {
    render(<SimpleTable />);
    expect(screen.getByRole('table')).toBeDefined();
    expect(screen.getByText('Alice')).toBeDefined();
    expect(screen.getByText('Bob')).toBeDefined();
  });

  it('renders caption', () => {
    render(<SimpleTable />);
    expect(screen.getByText('Users')).toBeDefined();
  });

  it('renders column headers', () => {
    render(<SimpleTable />);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeDefined();
    expect(screen.getByRole('columnheader', { name: 'Role' })).toBeDefined();
  });

  it('renders compact variant', () => {
    const { container } = render(
      <Table compact>
        <Body><Row><Cell>Cell</Cell></Row></Body>
      </Table>,
    );
    expect(container.querySelector('table')).toBeDefined();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SimpleTable />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
