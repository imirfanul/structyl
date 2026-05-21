import type { Meta, StoryObj } from '@storybook/react';
import { Button, Form, Input, Label, Switch } from '@your-lib/styled';

const meta: Meta = { title: 'Form/Form', tags: ['autodocs'] };
export default meta;

type Story = StoryObj;
export const Default: Story = {
  render: () => (
    <Form.Root className="max-w-md space-y-4" onSubmit={(e) => e.preventDefault()}>
      <Form.Field name="email" className="grid gap-1">
        <Form.Label asChild><Label>Email</Label></Form.Label>
        <Form.Control asChild><Input type="email" required placeholder="you@example.com" /></Form.Control>
        <Form.Message match="valueMissing" className="text-xs text-destructive">Required</Form.Message>
        <Form.Message match="typeMismatch" className="text-xs text-destructive">Must be a valid email</Form.Message>
      </Form.Field>
      <div className="flex items-center gap-2">
        <Switch id="notify" />
        <Label htmlFor="notify">Email me updates</Label>
      </div>
      <Form.Submit asChild><Button>Submit</Button></Form.Submit>
    </Form.Root>
  ),
};
