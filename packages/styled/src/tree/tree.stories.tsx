import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Root, Item, Trigger, Group } from './index';

const meta: Meta = {
  title: 'Styled/Tree',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const FileTree: Story = {
  render: () => (
    <Root className="w-64 rounded-md border border-border p-2">
      <Item value="src">
        <Trigger hasChildren>src/</Trigger>
        <Group>
          <Item value="components">
            <Trigger hasChildren>components/</Trigger>
            <Group>
              <Item value="button">
                <Trigger hasChildren={false}>Button.tsx</Trigger>
              </Item>
              <Item value="input">
                <Trigger hasChildren={false}>Input.tsx</Trigger>
              </Item>
              <Item value="dialog">
                <Trigger hasChildren={false}>Dialog.tsx</Trigger>
              </Item>
            </Group>
          </Item>
          <Item value="hooks">
            <Trigger hasChildren>hooks/</Trigger>
            <Group>
              <Item value="usecontrollable">
                <Trigger hasChildren={false}>use-controllable-state.ts</Trigger>
              </Item>
              <Item value="useescapekey">
                <Trigger hasChildren={false}>use-escape-key.ts</Trigger>
              </Item>
            </Group>
          </Item>
          <Item value="utils">
            <Trigger hasChildren>utils/</Trigger>
            <Group>
              <Item value="cn">
                <Trigger hasChildren={false}>cn.ts</Trigger>
              </Item>
            </Group>
          </Item>
          <Item value="appfile">
            <Trigger hasChildren={false}>App.tsx</Trigger>
          </Item>
        </Group>
      </Item>
      <Item value="public">
        <Trigger hasChildren>public/</Trigger>
        <Group>
          <Item value="favicon">
            <Trigger hasChildren={false}>favicon.ico</Trigger>
          </Item>
        </Group>
      </Item>
      <Item value="pkgjson">
        <Trigger hasChildren={false}>package.json</Trigger>
      </Item>
    </Root>
  ),
};

export const OrgChart: Story = {
  render: () => (
    <Root className="w-72 rounded-md border border-border p-2">
      <Item value="ceo">
        <Trigger hasChildren>CEO — Alice Johnson</Trigger>
        <Group>
          <Item value="cto">
            <Trigger hasChildren>CTO — Bob Smith</Trigger>
            <Group>
              <Item value="fe-lead">
                <Trigger hasChildren>Frontend Lead — Carol White</Trigger>
                <Group>
                  <Item value="fe1">
                    <Trigger hasChildren={false}>Dev — Dan Brown</Trigger>
                  </Item>
                  <Item value="fe2">
                    <Trigger hasChildren={false}>Dev — Eve Davis</Trigger>
                  </Item>
                </Group>
              </Item>
              <Item value="be-lead">
                <Trigger hasChildren={false}>Backend Lead — Frank Lee</Trigger>
              </Item>
            </Group>
          </Item>
          <Item value="cmo">
            <Trigger hasChildren={false}>CMO — Grace Kim</Trigger>
          </Item>
        </Group>
      </Item>
    </Root>
  ),
};

export const ShallowTree: Story = {
  name: 'Flat / Shallow Tree',
  render: () => (
    <Root className="w-48 rounded-md border border-border p-2">
      {['Dashboard', 'Analytics', 'Users', 'Settings', 'Billing'].map((page) => (
        <Item key={page} value={page.toLowerCase()}>
          <Trigger hasChildren={false}>{page}</Trigger>
        </Item>
      ))}
    </Root>
  ),
};

export const DeepNesting: Story = {
  render: () => (
    <Root className="w-64 rounded-md border border-border p-2">
      <Item value="level1">
        <Trigger hasChildren>Level 1</Trigger>
        <Group>
          <Item value="level2">
            <Trigger hasChildren>Level 2</Trigger>
            <Group>
              <Item value="level3">
                <Trigger hasChildren>Level 3</Trigger>
                <Group>
                  <Item value="level4">
                    <Trigger hasChildren>Level 4</Trigger>
                    <Group>
                      <Item value="leaf">
                        <Trigger hasChildren={false}>Leaf node</Trigger>
                      </Item>
                    </Group>
                  </Item>
                </Group>
              </Item>
            </Group>
          </Item>
        </Group>
      </Item>
    </Root>
  ),
};
