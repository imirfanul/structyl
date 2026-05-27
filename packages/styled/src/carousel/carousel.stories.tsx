import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Root, Content, Item, Previous, Next } from './index';

const meta: Meta = {
  title: 'Styled/Carousel',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

const slides = [
  { id: 1, title: 'Slide One', bg: 'bg-blue-100 text-blue-800' },
  { id: 2, title: 'Slide Two', bg: 'bg-purple-100 text-purple-800' },
  { id: 3, title: 'Slide Three', bg: 'bg-emerald-100 text-emerald-800' },
  { id: 4, title: 'Slide Four', bg: 'bg-rose-100 text-rose-800' },
  { id: 5, title: 'Slide Five', bg: 'bg-amber-100 text-amber-800' },
];

export const Default: Story = {
  render: () => (
    <div className="w-[400px] px-12">
      <Root>
        <Content>
          {slides.map((slide) => (
            <Item key={slide.id}>
              <div
                className={`flex h-48 items-center justify-center rounded-lg text-xl font-semibold ${slide.bg}`}
              >
                {slide.title}
              </div>
            </Item>
          ))}
        </Content>
        <Previous />
        <Next />
      </Root>
    </div>
  ),
};

export const ImageCarousel: Story = {
  name: 'Image Carousel',
  render: () => (
    <div className="w-[500px] px-12">
      <Root>
        <Content>
          {Array.from({ length: 6 }, (_, i) => (
            <Item key={i}>
              <div className="relative flex h-64 items-end justify-start overflow-hidden rounded-lg bg-gradient-to-br from-slate-400 to-slate-700 p-4">
                <div className="text-white">
                  <p className="text-xs text-white/70">Photo {i + 1} of 6</p>
                  <p className="text-base font-semibold">Landscape {i + 1}</p>
                </div>
              </div>
            </Item>
          ))}
        </Content>
        <Previous />
        <Next />
      </Root>
    </div>
  ),
};

export const ProductCards: Story = {
  name: 'Product Cards',
  render: () => (
    <div className="w-[600px] px-12">
      <Root>
        <Content className="-ml-4">
          {[
            { name: 'Wireless Headphones', price: '$79', color: 'bg-indigo-50' },
            { name: 'Mechanical Keyboard', price: '$129', color: 'bg-pink-50' },
            { name: 'USB-C Hub', price: '$49', color: 'bg-teal-50' },
            { name: 'Monitor Stand', price: '$39', color: 'bg-yellow-50' },
          ].map((product) => (
            <Item key={product.name} className="basis-1/2 pl-4">
              <div
                className={`flex h-48 flex-col items-center justify-center rounded-xl border border-border ${product.color} gap-2 p-6`}
              >
                <div className="h-16 w-16 rounded-lg bg-white/60" />
                <p className="text-sm font-semibold">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.price}</p>
              </div>
            </Item>
          ))}
        </Content>
        <Previous />
        <Next />
      </Root>
    </div>
  ),
};

export const SingleSlide: Story = {
  name: 'Single Slide',
  render: () => (
    <div className="w-[400px] px-12">
      <Root>
        <Content>
          <Item>
            <div className="flex h-40 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-semibold">
              Only one slide
            </div>
          </Item>
        </Content>
        <Previous />
        <Next />
      </Root>
    </div>
  ),
};
