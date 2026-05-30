import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Area, HueSlider, AlphaSlider, Swatch } from './index';
import { Typography } from '../typography';

const meta = {
  title: 'Styled/ColorPicker',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface HsvaColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

function hsvaToHex({ h, s, v }: HsvaColor): string {
  const c = v * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0, g = 0, b = 0;
  if (hp >= 0 && hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = v - c;
  return (
    '#' +
    [r, g, b]
      .map((ch) => Math.round((ch + m) * 255).toString(16).padStart(2, '0'))
      .join('')
  );
}

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<HsvaColor>({ h: 220, s: 0.8, v: 0.9, a: 1 });
    return (
      <div className="flex flex-col gap-4">
        <Root value={value} onValueChange={setValue}>
          <Area />
          <HueSlider />
          <AlphaSlider />
        </Root>
        <Typography variant="muted">
          Hex: {hsvaToHex(value)} &mdash; Alpha: {Math.round(value.a * 100)}%
        </Typography>
      </div>
    );
  },
};

export const WithSwatches: Story = {
  render: () => {
    const presets: HsvaColor[] = [
      { h: 0, s: 0.8, v: 0.9, a: 1 },
      { h: 30, s: 0.9, v: 0.95, a: 1 },
      { h: 60, s: 0.9, v: 0.95, a: 1 },
      { h: 120, s: 0.7, v: 0.8, a: 1 },
      { h: 200, s: 0.8, v: 0.85, a: 1 },
      { h: 260, s: 0.75, v: 0.85, a: 1 },
    ];
    const [value, setValue] = React.useState<HsvaColor>(presets[0]!);
    return (
      <div className="flex flex-col gap-4">
        <Root value={value} onValueChange={setValue}>
          <Area />
          <HueSlider />
          <AlphaSlider />
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, index) => (
              <Swatch key={index} value={preset} />
            ))}
          </div>
        </Root>
        <Typography variant="muted">Hex: {hsvaToHex(value)}</Typography>
      </div>
    );
  },
};

export const WithoutAlpha: Story = {
  render: () => {
    const [value, setValue] = React.useState<HsvaColor>({ h: 160, s: 0.7, v: 0.85, a: 1 });
    return (
      <div className="flex flex-col gap-4">
        <Root value={value} onValueChange={setValue}>
          <Area />
          <HueSlider />
        </Root>
        <Typography variant="muted">Hex: {hsvaToHex(value)}</Typography>
      </div>
    );
  },
};

export const AreaOnly: Story = {
  render: () => {
    const [value, setValue] = React.useState<HsvaColor>({ h: 280, s: 0.85, v: 0.9, a: 1 });
    return (
      <Root value={value} onValueChange={setValue}>
        <Area />
      </Root>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <Root defaultValue={{ h: 45, s: 0.9, v: 0.95, a: 1 }}>
      <Area />
      <HueSlider />
      <AlphaSlider />
    </Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Root defaultValue={{ h: 220, s: 0.8, v: 0.9, a: 1 }} disabled>
      <Area />
      <HueSlider />
      <AlphaSlider />
    </Root>
  ),
};

export const SwatchesGrid: Story = {
  render: () => {
    const palette: HsvaColor[] = [
      { h: 0, s: 0, v: 1, a: 1 },
      { h: 0, s: 0, v: 0.85, a: 1 },
      { h: 0, s: 0, v: 0.6, a: 1 },
      { h: 0, s: 0, v: 0.3, a: 1 },
      { h: 0, s: 0, v: 0, a: 1 },
      { h: 0, s: 0.8, v: 0.9, a: 1 },
      { h: 30, s: 0.9, v: 0.95, a: 1 },
      { h: 60, s: 0.85, v: 0.95, a: 1 },
      { h: 120, s: 0.7, v: 0.8, a: 1 },
      { h: 200, s: 0.8, v: 0.85, a: 1 },
      { h: 240, s: 0.75, v: 0.85, a: 1 },
      { h: 280, s: 0.8, v: 0.8, a: 1 },
    ];
    const [value, setValue] = React.useState<HsvaColor>(palette[5]!);
    return (
      <div className="flex flex-col gap-4">
        <Root value={value} onValueChange={setValue}>
          <div className="flex flex-wrap gap-2">
            {palette.map((color, index) => (
              <Swatch key={index} value={color} />
            ))}
          </div>
        </Root>
        <Typography variant="muted">
          Hex: {hsvaToHex(value)}
        </Typography>
      </div>
    );
  },
};
