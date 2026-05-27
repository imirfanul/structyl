import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Content, Item, Link, Previous, Next, Ellipsis } from './index';

const meta: Meta = {
  title: 'Styled/Pagination',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Root>
      <Content>
        <Item>
          <Previous href="#" />
        </Item>
        {[1, 2, 3, 4, 5].map((page) => (
          <Item key={page}>
            <Link href="#" isActive={page === 1}>
              {page}
            </Link>
          </Item>
        ))}
        <Item>
          <Next href="#" />
        </Item>
      </Content>
    </Root>
  ),
};

export const MiddlePage: Story = {
  name: 'Active middle page',
  render: () => (
    <Root>
      <Content>
        <Item>
          <Previous href="#" />
        </Item>
        {[1, 2, 3, 4, 5].map((page) => (
          <Item key={page}>
            <Link href="#" isActive={page === 3}>
              {page}
            </Link>
          </Item>
        ))}
        <Item>
          <Next href="#" />
        </Item>
      </Content>
    </Root>
  ),
};

export const WithEllipsis: Story = {
  name: 'With ellipsis (many pages)',
  render: () => (
    <Root>
      <Content>
        <Item>
          <Previous href="#" />
        </Item>
        <Item>
          <Link href="#" isActive>
            1
          </Link>
        </Item>
        <Item>
          <Link href="#">2</Link>
        </Item>
        <Item>
          <Link href="#">3</Link>
        </Item>
        <Item>
          <Ellipsis />
        </Item>
        <Item>
          <Link href="#">18</Link>
        </Item>
        <Item>
          <Link href="#">19</Link>
        </Item>
        <Item>
          <Link href="#">20</Link>
        </Item>
        <Item>
          <Next href="#" />
        </Item>
      </Content>
    </Root>
  ),
};

export const EllipsisBothSides: Story = {
  name: 'Ellipsis on both sides',
  render: () => (
    <Root>
      <Content>
        <Item>
          <Previous href="#" />
        </Item>
        <Item>
          <Link href="#">1</Link>
        </Item>
        <Item>
          <Ellipsis />
        </Item>
        <Item>
          <Link href="#">9</Link>
        </Item>
        <Item>
          <Link href="#" isActive>
            10
          </Link>
        </Item>
        <Item>
          <Link href="#">11</Link>
        </Item>
        <Item>
          <Ellipsis />
        </Item>
        <Item>
          <Link href="#">20</Link>
        </Item>
        <Item>
          <Next href="#" />
        </Item>
      </Content>
    </Root>
  ),
};

export const Interactive: Story = {
  name: 'Interactive pagination',
  render: function InteractivePagination() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = 10;

    const getPageNumbers = () => {
      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
      }
      if (currentPage >= totalPages - 3) {
        return [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      }
      return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis2', totalPages];
    };

    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          Page <span className="font-medium text-fg">{currentPage}</span> of {totalPages}
        </p>
        <Root>
          <Content>
            <Item>
              <Previous
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.max(1, p - 1));
                }}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </Item>
            {getPageNumbers().map((page, idx) =>
              typeof page === 'number' ? (
                <Item key={idx}>
                  <Link
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </Link>
                </Item>
              ) : (
                <Item key={idx}>
                  <Ellipsis />
                </Item>
              ),
            )}
            <Item>
              <Next
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                }}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </Item>
          </Content>
        </Root>
      </div>
    );
  },
};
