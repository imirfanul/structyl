import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import * as NavigationMenu from './index';
import { Typography } from '../typography';

const meta: Meta = {
  title: 'Components/NavigationMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

const ListItem = ({
  title,
  children,
  href = '#',
}: {
  title: string;
  children: React.ReactNode;
  href?: string;
}) => (
  <li>
    <NavigationMenu.Link
      href={href}
      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      <Typography variant="body2" className="line-clamp-2 leading-snug text-muted-foreground">{children}</Typography>
    </NavigationMenu.Link>
  </li>
);

export const Default: Story = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Getting Started</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenu.Link
                  href="#"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                >
                  <div className="mb-2 mt-4 text-lg font-medium">aura-ui</div>
                  <Typography variant="body2" className="leading-tight text-muted-foreground">
                    Beautifully designed components built with Radix UI and Tailwind CSS.
                  </Typography>
                </NavigationMenu.Link>
              </li>
              <ListItem title="Installation">Install and configure aura-ui in your project.</ListItem>
              <ListItem title="Typography">Styles for headings, paragraphs, lists, and more.</ListItem>
              <ListItem title="Components">Browse all available components and their usage.</ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem title="Button">A versatile button component with multiple variants.</ListItem>
              <ListItem title="Dialog">A modal dialog for displaying content above the page.</ListItem>
              <ListItem title="Dropdown Menu">A floating menu triggered by a button.</ListItem>
              <ListItem title="Select">A control for selecting from a list of options.</ListItem>
              <ListItem title="Combobox">A searchable dropdown with autocomplete.</ListItem>
              <ListItem title="Data Table">A full-featured table with sorting and filtering.</ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-bg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Documentation
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  ),
};

export const SimpleLinks: Story = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-bg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none"
          >
            Home
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-bg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none"
          >
            About
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-bg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none"
          >
            Blog
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-bg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none"
          >
            Contact
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  ),
};

export const WithIndicator: Story = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Indicator />
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid w-[300px] gap-2 p-4">
              <ListItem title="Analytics">Track and analyze your app metrics.</ListItem>
              <ListItem title="Automation">Automate your workflows and processes.</ListItem>
              <ListItem title="Security">Keep your data safe and compliant.</ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid w-[300px] gap-2 p-4">
              <ListItem title="Blog">Read our latest articles and updates.</ListItem>
              <ListItem title="Guides">Step-by-step guides to get you started.</ListItem>
              <ListItem title="API Reference">Full API documentation for developers.</ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  ),
};
