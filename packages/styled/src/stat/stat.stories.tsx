import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Users } from '@aura-ui/icons';
import { Stat, StatGroup, TrendBadge } from './index';

const meta = {
  title: 'Styled/Stat',
  component: Stat,
  tags: ['autodocs'],
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Total users', value: '2,491' },
};

export const WithTrend: Story = {
  args: {
    label: 'Monthly revenue',
    value: '$48,295',
    trend: '+12%',
    trendDirection: 'up',
    description: 'vs last month',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Active sessions',
    value: '148',
    icon: <Users className="h-5 w-5" />,
    trend: '+3%',
    trendDirection: 'up',
  },
};

export const NegativeTrend: Story = {
  args: {
    label: 'Churn rate',
    value: '4.2%',
    trend: '+0.8%',
    trendDirection: 'down',
    description: 'vs last quarter',
  },
};

export const Dashboard: Story = {
  render: () => (
    <StatGroup columns={3} className="p-4">
      <Stat label="Total users" value="2,491" trend="+12%" trendDirection="up" description="All time" />
      <Stat label="Active sessions" value="148" trend="+3%" trendDirection="up" description="Right now" />
      <Stat label="Open issues" value="3" trend="-62%" trendDirection="up" description="This week" />
    </StatGroup>
  ),
};

export const TrendBadgeStory: Story = {
  name: 'TrendBadge',
  render: () => (
    <div className="flex gap-4 p-4">
      <TrendBadge value="+8%" direction="up" />
      <TrendBadge value="-3.2%" direction="down" />
      <TrendBadge value="0%" direction="neutral" />
    </div>
  ),
};
