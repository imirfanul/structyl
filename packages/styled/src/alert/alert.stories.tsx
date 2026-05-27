import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Title, Description } from './index';

const meta: Meta = {
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-[480px]">
      <Root>
        <Title>Heads up!</Title>
        <Description>
          You can add components to your app using the CLI.
        </Description>
      </Root>
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex w-[480px] flex-col gap-4">
      <Root variant="default">
        <Title>Default</Title>
        <Description>This is a default informational alert message.</Description>
      </Root>

      <Root variant="info">
        <Title>Info</Title>
        <Description>Your session will expire in 30 minutes. Save your work.</Description>
      </Root>

      <Root variant="success">
        <Title>Success</Title>
        <Description>Your changes have been saved successfully.</Description>
      </Root>

      <Root variant="warning">
        <Title>Warning</Title>
        <Description>This action cannot be undone. Please review before proceeding.</Description>
      </Root>

      <Root variant="destructive">
        <Title>Error</Title>
        <Description>
          Your payment could not be processed. Please check your card details and try again.
        </Description>
      </Root>
    </div>
  ),
};

export const Destructive: Story = {
  render: () => (
    <div className="w-[480px]">
      <Root variant="destructive">
        <Title>Destructive alert</Title>
        <Description>
          Your account has been permanently deleted. This action cannot be reversed.
        </Description>
      </Root>
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div className="w-[480px]">
      <Root variant="success">
        <Title>Payment confirmed</Title>
        <Description>
          Your subscription has been activated. You now have access to all premium features.
        </Description>
      </Root>
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div className="w-[480px]">
      <Root variant="warning">
        <Title>Deprecation notice</Title>
        <Description>
          The v1 API will be sunset on January 1, 2026. Please migrate to v2 before that date.
        </Description>
      </Root>
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <div className="w-[480px]">
      <Root variant="info">
        <Title>Scheduled maintenance</Title>
        <Description>
          The service will be unavailable on Sunday, June 1 from 02:00–04:00 UTC.
        </Description>
      </Root>
    </div>
  ),
};

export const TitleOnly: Story = {
  name: 'Title only',
  render: () => (
    <div className="flex w-[480px] flex-col gap-4">
      <Root variant="default">
        <Title>Default alert with no description</Title>
      </Root>
      <Root variant="destructive">
        <Title>Error — something went wrong</Title>
      </Root>
    </div>
  ),
};

export const WithIcon: Story = {
  name: 'With SVG icon',
  render: () => (
    <div className="flex w-[480px] flex-col gap-4">
      <Root variant="destructive">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <Title>Destructive with icon</Title>
        <Description>
          We detected suspicious activity on your account. Please reset your password immediately.
        </Description>
      </Root>

      <Root variant="success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <Title>Success with icon</Title>
        <Description>Your profile has been updated successfully.</Description>
      </Root>
    </div>
  ),
};
