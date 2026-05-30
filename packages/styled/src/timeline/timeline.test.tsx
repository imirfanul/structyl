import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Root as Timeline, Item, Dot, Content, ItemTitle, ItemDescription, ItemTime } from './index';

describe('Timeline (styled)', () => {
  function SimpleTimeline() {
    return (
      <Timeline>
        <Item>
          <Dot />
          <Content>
            <ItemTitle>Deployed</ItemTitle>
            <ItemDescription>v2.8.0 is live.</ItemDescription>
            <ItemTime>2m ago</ItemTime>
          </Content>
        </Item>
        <Item last>
          <Dot color="success" />
          <Content>
            <ItemTitle>Tests passed</ItemTitle>
          </Content>
        </Item>
      </Timeline>
    );
  }

  it('renders timeline items', () => {
    render(<SimpleTimeline />);
    expect(screen.getByText('Deployed')).toBeDefined();
    expect(screen.getByText('Tests passed')).toBeDefined();
  });

  it('renders description and time', () => {
    render(<SimpleTimeline />);
    expect(screen.getByText('v2.8.0 is live.')).toBeDefined();
    expect(screen.getByText('2m ago')).toBeDefined();
  });

  it('renders alternate side layout', () => {
    render(
      <Timeline side="alternate">
        <Item><Dot /><Content><ItemTitle>Event</ItemTitle></Content></Item>
      </Timeline>,
    );
    expect(screen.getByText('Event')).toBeDefined();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SimpleTimeline />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
