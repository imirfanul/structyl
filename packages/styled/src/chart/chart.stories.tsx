import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Root,
  PieRoot,
  RadarRoot,
  Bar,
  Line,
  Area,
  Pie,
  Radar,
  XAxis,
  YAxis,
  Grid,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
  Legend,
} from './index';

const meta: Meta = {
  title: 'Styled/Chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

/* ─── Shared data ───────────────────────────────────────────────── */

const monthlyRevenue = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 3800, expenses: 2200 },
  { month: 'Mar', revenue: 5100, expenses: 3100 },
  { month: 'Apr', revenue: 4700, expenses: 2900 },
  { month: 'May', revenue: 6300, expenses: 3500 },
  { month: 'Jun', revenue: 5900, expenses: 3200 },
  { month: 'Jul', revenue: 7200, expenses: 4100 },
  { month: 'Aug', revenue: 6800, expenses: 3800 },
];

const pieData = [
  { name: 'Direct', value: 4200 },
  { name: 'Organic', value: 3100 },
  { name: 'Referral', value: 1900 },
  { name: 'Social', value: 1200 },
  { name: 'Email', value: 800 },
];

const radarData = [
  { subject: 'TypeScript', score: 90 },
  { subject: 'React', score: 85 },
  { subject: 'CSS', score: 70 },
  { subject: 'Testing', score: 75 },
  { subject: 'A11y', score: 80 },
  { subject: 'Performance', score: 65 },
];

/* ─── Stories ───────────────────────────────────────────────────── */

export const BarChart: Story = {
  render: () => (
    <Root data={monthlyRevenue} height={320} margin={{ top: 16, right: 24, bottom: 32, left: 48 }}>
      <Grid />
      <XAxis dataKey="month" />
      <YAxis />
      <Bar dataKey="revenue" name="Revenue" color="var(--chart-1, #6366f1)" />
      <Tooltip />
      <Legend />
    </Root>
  ),
};

export const GroupedBar: Story = {
  name: 'Grouped Bar Chart',
  render: () => (
    <Root data={monthlyRevenue} height={320} margin={{ top: 16, right: 24, bottom: 32, left: 48 }}>
      <Grid />
      <XAxis dataKey="month" />
      <YAxis />
      <Bar dataKey="revenue" name="Revenue" color="var(--chart-1, #6366f1)" />
      <Bar dataKey="expenses" name="Expenses" color="var(--chart-2, #f59e0b)" />
      <Tooltip />
      <Legend />
    </Root>
  ),
};

export const LineChart: Story = {
  render: () => (
    <Root data={monthlyRevenue} height={320} margin={{ top: 16, right: 24, bottom: 32, left: 48 }}>
      <Grid />
      <XAxis dataKey="month" />
      <YAxis />
      <Line dataKey="revenue" name="Revenue" color="var(--chart-1, #6366f1)" showDots />
      <Line dataKey="expenses" name="Expenses" color="var(--chart-2, #f59e0b)" showDots />
      <Tooltip />
      <Legend />
    </Root>
  ),
};

export const AreaChart: Story = {
  render: () => (
    <Root data={monthlyRevenue} height={320} margin={{ top: 16, right: 24, bottom: 32, left: 48 }}>
      <Grid />
      <XAxis dataKey="month" />
      <YAxis />
      <Area
        dataKey="revenue"
        name="Revenue"
        color="var(--chart-1, #6366f1)"
        fillOpacity={0.2}
      />
      <Area
        dataKey="expenses"
        name="Expenses"
        color="var(--chart-2, #f59e0b)"
        fillOpacity={0.2}
      />
      <Tooltip />
      <Legend />
    </Root>
  ),
};

export const PieChart: Story = {
  render: () => (
    <PieRoot data={pieData} height={320} width={420}>
      <Pie
        dataKey="value"
        nameKey="name"
        colors={[
          'var(--chart-1, #6366f1)',
          'var(--chart-2, #f59e0b)',
          'var(--chart-3, #10b981)',
          'var(--chart-4, #f43f5e)',
          'var(--chart-5, #8b5cf6)',
        ]}
      />
      <Tooltip />
      <Legend />
    </PieRoot>
  ),
};

export const RadarChart: Story = {
  render: () => (
    <RadarRoot data={radarData} height={360} width={420}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Radar dataKey="score" name="Skill Level" color="var(--chart-1, #6366f1)" fillOpacity={0.3} />
      <Tooltip />
    </RadarRoot>
  ),
};

export const MinimalBar: Story = {
  name: 'Minimal (no grid, no axes)',
  render: () => (
    <Root
      data={[
        { label: 'Mon', views: 120 },
        { label: 'Tue', views: 90 },
        { label: 'Wed', views: 150 },
        { label: 'Thu', views: 200 },
        { label: 'Fri', views: 175 },
        { label: 'Sat', views: 80 },
        { label: 'Sun', views: 60 },
      ]}
      height={200}
      margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
    >
      <Bar dataKey="views" name="Views" color="var(--chart-1, #6366f1)" />
    </Root>
  ),
};
