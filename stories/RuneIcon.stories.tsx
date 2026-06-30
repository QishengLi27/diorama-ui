import type { Meta, StoryObj } from '@storybook/react';
import { RuneIcon } from '../src';

const meta: Meta<typeof RuneIcon> = {
  title: 'Atoms/RuneIcon',
  component: RuneIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'sword', 'shield', 'potion', 'star', 'star-outline', 'heart',
        'diamond', 'diamond-outline', 'triangle-up', 'triangle-down',
        'circle', 'circle-outline', 'cross', 'check',
        'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right',
        'gem', 'skull', 'key', 'magic', 'fire', 'ice', 'bolt',
        'rune-a', 'rune-b', 'rune-c',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    accent: {
      control: 'select',
      options: ['gold', 'ruby', 'sapphire', 'emerald', 'ink', 'ink-light'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Star: Story = {
  args: {
    name: 'star',
    size: 'md',
    accent: 'gold',
  },
};

export const Sword: Story = {
  args: {
    name: 'sword',
    size: 'md',
    accent: 'ruby',
  },
};

export const Magic: Story = {
  args: {
    name: 'magic',
    size: 'md',
    accent: 'sapphire',
  },
};

export const Heart: Story = {
  args: {
    name: 'heart',
    size: 'md',
    accent: 'emerald',
  },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-center gap-4">
      <RuneIcon name="star" size="xs" accent="gold" />
      <RuneIcon name="star" size="sm" accent="gold" />
      <RuneIcon name="star" size="md" accent="gold" />
      <RuneIcon name="star" size="lg" accent="gold" />
    </div>
  ),
};

export const AllAccents: Story = {
  name: 'All Accents',
  render: () => (
    <div className="flex items-center gap-4">
      <RuneIcon name="gem" accent="gold" />
      <RuneIcon name="gem" accent="ruby" />
      <RuneIcon name="gem" accent="sapphire" />
      <RuneIcon name="gem" accent="emerald" />
      <RuneIcon name="gem" accent="ink" />
      <RuneIcon name="gem" accent="ink-light" />
    </div>
  ),
};

export const RuneGallery: Story = {
  name: 'Rune Gallery',
  render: () => {
    const runes: Array<{ name: Parameters<typeof RuneIcon>[0]['name']; label: string }> = [
      { name: 'sword', label: 'sword' },
      { name: 'shield', label: 'shield' },
      { name: 'potion', label: 'potion' },
      { name: 'star', label: 'star' },
      { name: 'heart', label: 'heart' },
      { name: 'diamond', label: 'diamond' },
      { name: 'triangle-up', label: 'tri-up' },
      { name: 'triangle-down', label: 'tri-down' },
      { name: 'circle', label: 'circle' },
      { name: 'cross', label: 'cross' },
      { name: 'check', label: 'check' },
      { name: 'arrow-up', label: 'arr-up' },
      { name: 'arrow-down', label: 'arr-down' },
      { name: 'arrow-left', label: 'arr-left' },
      { name: 'arrow-right', label: 'arr-right' },
      { name: 'gem', label: 'gem' },
      { name: 'skull', label: 'skull' },
      { name: 'key', label: 'key' },
      { name: 'magic', label: 'magic' },
      { name: 'fire', label: 'fire' },
      { name: 'ice', label: 'ice' },
      { name: 'bolt', label: 'bolt' },
      { name: 'rune-a', label: 'rune-a' },
      { name: 'rune-b', label: 'rune-b' },
      { name: 'rune-c', label: 'rune-c' },
    ];

    return (
      <div className="diorama-frame grid grid-cols-5 gap-4 rounded-diorama p-6">
        {runes.map(({ name, label }) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <RuneIcon name={name} size="lg" accent="gold" />
            <span className="font-pixel text-[8px] text-diorama-ink-light">{label}</span>
          </div>
        ))}
      </div>
    );
  },
};
