import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Pagination } from './index';

const meta: Meta<typeof Pagination> = {
  title: 'Styled/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  name: 'Default (page 1 of 10)',
  render: function DefaultPagination() {
    const [page, setPage] = React.useState(1);
    return (
      <Pagination
        page={page}
        pageCount={10}
        pageSize={10}
        totalRows={97}
        onPageChange={setPage}
        onPageSizeChange={() => {}}
      />
    );
  },
};

export const MiddlePage: Story = {
  name: 'Middle page (page 5 of 10)',
  render: function MiddlePagePagination() {
    const [page, setPage] = React.useState(5);
    return (
      <Pagination
        page={page}
        pageCount={10}
        pageSize={10}
        totalRows={97}
        onPageChange={setPage}
        onPageSizeChange={() => {}}
      />
    );
  },
};

export const LastPage: Story = {
  name: 'Last page (disabled next/last)',
  render: function LastPagePagination() {
    const [page, setPage] = React.useState(10);
    return (
      <Pagination
        page={page}
        pageCount={10}
        pageSize={10}
        totalRows={97}
        onPageChange={setPage}
        onPageSizeChange={() => {}}
      />
    );
  },
};

export const WithPageSizeChange: Story = {
  name: 'With rows-per-page selector',
  render: function PageSizePagination() {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(25);
    const totalRows = 500;
    const pageCount = Math.ceil(totalRows / pageSize);
    return (
      <Pagination
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={setPage}
        onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
        pageSizeOptions={[10, 25, 50, 100]}
      />
    );
  },
};

export const NoTotalRows: Story = {
  name: 'Without total rows label',
  render: function NoTotalRowsPagination() {
    const [page, setPage] = React.useState(3);
    return (
      <Pagination
        page={page}
        pageCount={20}
        pageSize={10}
        onPageChange={setPage}
        onPageSizeChange={() => {}}
        showTotalRows={false}
      />
    );
  },
};

export const NavigationOnly: Story = {
  name: 'Navigation only (no selectors)',
  render: function NavigationOnlyPagination() {
    const [page, setPage] = React.useState(2);
    return (
      <Pagination
        page={page}
        pageCount={8}
        onPageChange={setPage}
      />
    );
  },
};

export const SinglePage: Story = {
  name: 'Single page (all buttons disabled)',
  render: function SinglePagePagination() {
    return (
      <Pagination
        page={1}
        pageCount={1}
        totalRows={5}
        onPageChange={() => {}}
      />
    );
  },
};
