import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group, Panel, Handle } from './index';
import { Typography } from '../typography';

const meta: Meta = {
  title: 'Styled/Resizable',
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const TwoPanelsHorizontal: Story = {
  name: 'Two Panels (horizontal)',
  render: () => (
    <Group className="h-64 w-[600px] rounded-md border border-border">
      <Panel id="left" defaultSize={50} minSize={20}>
        <div className="flex h-full items-center justify-center bg-muted/20 text-sm text-muted-foreground">
          Left panel
        </div>
      </Panel>
      <Handle between={['left', 'right']} withHandle />
      <Panel id="right" defaultSize={50} minSize={20}>
        <div className="flex h-full items-center justify-center bg-muted/20 text-sm text-muted-foreground">
          Right panel
        </div>
      </Panel>
    </Group>
  ),
};

export const TwoPanelsVertical: Story = {
  name: 'Two Panels (vertical)',
  render: () => (
    <Group direction="vertical" className="h-64 w-[400px] rounded-md border border-border">
      <Panel id="top" defaultSize={50} minSize={20}>
        <div className="flex h-full items-center justify-center bg-muted/20 text-sm text-muted-foreground">
          Top panel
        </div>
      </Panel>
      <Handle between={['top', 'bottom']} withHandle />
      <Panel id="bottom" defaultSize={50} minSize={20}>
        <div className="flex h-full items-center justify-center bg-muted/20 text-sm text-muted-foreground">
          Bottom panel
        </div>
      </Panel>
    </Group>
  ),
};

export const ThreePanels: Story = {
  name: 'Three Panels',
  render: () => (
    <Group className="h-64 w-[700px] rounded-md border border-border">
      <Panel id="sidebar" defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center bg-muted/20 text-xs text-muted-foreground">
          Sidebar
        </div>
      </Panel>
      <Handle between={['sidebar', 'main']} withHandle />
      <Panel id="main" defaultSize={50} minSize={20}>
        <div className="flex h-full items-center justify-center bg-muted/20 text-sm text-muted-foreground">
          Main content
        </div>
      </Panel>
      <Handle between={['main', 'inspector']} withHandle />
      <Panel id="inspector" defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center bg-muted/20 text-xs text-muted-foreground">
          Inspector
        </div>
      </Panel>
    </Group>
  ),
};

export const CodeEditorLayout: Story = {
  name: 'Code Editor Layout',
  render: () => (
    <Group direction="vertical" className="h-96 w-[600px] rounded-md border border-border">
      <Panel id="editor" defaultSize={70} minSize={30}>
        <div className="flex h-full flex-col bg-muted/10 p-4">
          <Typography variant="muted" className="mb-2 font-semibold">EDITOR</Typography>
          <pre className="text-xs text-fg/70">{'function hello() {\n  console.log("world");\n}'}</pre>
        </div>
      </Panel>
      <Handle between={['editor', 'terminal']} withHandle />
      <Panel id="terminal" defaultSize={30} minSize={15}>
        <div className="flex h-full flex-col bg-zinc-900 p-3">
          <Typography variant="muted" className="mb-1 font-semibold text-zinc-400">TERMINAL</Typography>
          <Typography variant="muted" className="text-green-400">{'> hello()'}</Typography>
          <Typography variant="muted" className="text-zinc-300">world</Typography>
        </div>
      </Panel>
    </Group>
  ),
};

export const NoHandle: Story = {
  name: 'Without Handle Icon',
  render: () => (
    <Group className="h-48 w-[500px] rounded-md border border-border">
      <Panel id="panelA" defaultSize={40} minSize={20}>
        <div className="flex h-full items-center justify-center bg-muted/20 text-sm text-muted-foreground">
          Panel A
        </div>
      </Panel>
      <Handle between={['panelA', 'panelB']} />
      <Panel id="panelB" defaultSize={60} minSize={20}>
        <div className="flex h-full items-center justify-center bg-muted/20 text-sm text-muted-foreground">
          Panel B
        </div>
      </Panel>
    </Group>
  ),
};
