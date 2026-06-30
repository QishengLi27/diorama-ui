import type { Meta, StoryObj } from '@storybook/react';
import { GemButton } from '../src';

const meta: Meta<typeof GemButton> = {
  title: 'Atoms/GemButton',
  component: GemButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accent: {
      control: 'select',
      options: ['gold', 'ruby', 'sapphire', 'emerald'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Gold: Story = {
  args: {
    accent: 'gold',
    children: 'Attack',
  },
};

export const Ruby: Story = {
  args: {
    accent: 'ruby',
    children: 'Delete',
  },
};

export const Sapphire: Story = {
  args: {
    accent: 'sapphire',
    children: 'Magic',
  },
};

export const Emerald: Story = {
  args: {
    accent: 'emerald',
    children: 'Heal',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Saving...',
  },
};

export const AllAccents: Story = {
  name: 'All Accents',
  render: () => (
    <div className="flex gap-4">
      <GemButton accent="gold">Gold</GemButton>
      <GemButton accent="ruby">Ruby</GemButton>
      <GemButton accent="sapphire">Sapphire</GemButton>
      <GemButton accent="emerald">Emerald</GemButton>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-center gap-4">
      <GemButton size="sm">Small</GemButton>
      <GemButton size="md">Medium</GemButton>
      <GemButton size="lg">Large</GemButton>
    </div>
  ),
};
