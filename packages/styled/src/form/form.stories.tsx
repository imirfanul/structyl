import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Field, Label, Control, Message, Submit } from './index';

const meta: Meta = {
  title: 'Styled/Form',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Root>
        <Field name="email">
          <Label>Email address</Label>
          <Control type="email" placeholder="you@example.com" required />
          <Message match="valueMissing" />
          <Message match="typeMismatch">Please enter a valid email address.</Message>
        </Field>
        <Submit className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
          Submit
        </Submit>
      </Root>
    </div>
  ),
};

export const LoginForm: Story = {
  name: 'Login form',
  render: () => (
    <div className="w-[400px] rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Sign in</h2>
      <Root className="gap-5">
        <Field name="email">
          <Label>Email</Label>
          <Control type="email" placeholder="you@example.com" required />
          <Message match="valueMissing">Email is required.</Message>
          <Message match="typeMismatch">Please enter a valid email.</Message>
        </Field>
        <Field name="password">
          <Label>Password</Label>
          <Control type="password" placeholder="••••••••" required minLength={8} />
          <Message match="valueMissing">Password is required.</Message>
          <Message match="tooShort">Password must be at least 8 characters.</Message>
        </Field>
        <Submit className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
          Sign in
        </Submit>
      </Root>
    </div>
  ),
};

export const WithValidation: Story = {
  name: 'With validation messages',
  render: () => (
    <div className="w-[400px]">
      <Root>
        <Field name="username">
          <Label>Username</Label>
          <Control
            type="text"
            placeholder="johndoe"
            required
            minLength={3}
            maxLength={20}
            pattern="[a-zA-Z0-9_]+"
          />
          <Message match="valueMissing">Username is required.</Message>
          <Message match="tooShort">Username must be at least 3 characters.</Message>
          <Message match="tooLong">Username cannot exceed 20 characters.</Message>
          <Message match="patternMismatch">
            Only letters, numbers, and underscores are allowed.
          </Message>
        </Field>
        <Field name="age">
          <Label>Age</Label>
          <Control type="number" placeholder="25" required min={18} max={120} />
          <Message match="valueMissing">Age is required.</Message>
          <Message match="rangeUnderflow">You must be at least 18 years old.</Message>
          <Message match="rangeOverflow">Please enter a valid age.</Message>
        </Field>
        <Submit className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
          Register
        </Submit>
      </Root>
    </div>
  ),
};

export const ServerError: Story = {
  name: 'With server error',
  render: () => (
    <div className="w-[400px]">
      <Root>
        <Field name="email" serverInvalid>
          <Label>Email</Label>
          <Control type="email" defaultValue="taken@example.com" />
          <Message forceMatch>
            This email is already registered. Please use a different address.
          </Message>
        </Field>
        <Submit className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
          Continue
        </Submit>
      </Root>
    </div>
  ),
};

export const Disabled: Story = {
  name: 'Disabled fields',
  render: () => (
    <div className="w-[400px]">
      <Root>
        <Field name="name">
          <Label>Full name</Label>
          <Control type="text" defaultValue="Jane Doe" disabled />
        </Field>
        <Field name="email">
          <Label>Email</Label>
          <Control type="email" defaultValue="jane@example.com" disabled />
        </Field>
        <Submit
          disabled
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground opacity-50 shadow"
        >
          Save changes
        </Submit>
      </Root>
    </div>
  ),
};
