import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Card } from '@aura-ui/styled';

const meta: Meta = {
  title: 'Styled/Card',
  component: Card.Root as any,
};

export default meta;

export const Default = () => (
  <Card.Root>
    <Card.Header>
      <Card.Title>Card title</Card.Title>
      <Card.Description>Card description text.</Card.Description>
    </Card.Header>
    <Card.Content>
      <p className="text-sm">This is an example card content area.</p>
    </Card.Content>
    <Card.Footer>
      <button className="bg-primary text-primary-fg rounded px-3 py-1">Action</button>
    </Card.Footer>
  </Card.Root>
);
