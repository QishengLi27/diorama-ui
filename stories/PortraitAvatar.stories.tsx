import type { Meta, StoryObj } from '@storybook/react';
import { PortraitAvatar } from '../src';

const meta: Meta<typeof PortraitAvatar> = {
  title: 'Atoms/PortraitAvatar',
  component: PortraitAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rarity: {
      control: 'select',
      options: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Common: Story = {
  args: {
    rarity: 'common',
    children: <span className="text-2xl">🛡️</span>,
  },
};

export const Uncommon: Story = {
  args: {
    rarity: 'uncommon',
    children: <span className="text-2xl">⚔️</span>,
  },
};

export const Rare: Story = {
  args: {
    rarity: 'rare',
    children: <span className="text-2xl">🧙</span>,
  },
};

export const Epic: Story = {
  args: {
    rarity: 'epic',
    children: <span className="text-2xl">🐉</span>,
  },
};

export const Legendary: Story = {
  args: {
    rarity: 'legendary',
    children: <span className="text-2xl">👑</span>,
  },
};

export const Empty: Story = {
  args: {
    rarity: 'common',
  },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-end gap-6">
      <PortraitAvatar size="sm" rarity="rare">
        <span>⚔️</span>
      </PortraitAvatar>
      <PortraitAvatar size="md" rarity="rare">
        <span className="text-2xl">⚔️</span>
      </PortraitAvatar>
      <PortraitAvatar size="lg" rarity="rare">
        <span className="text-4xl">⚔️</span>
      </PortraitAvatar>
    </div>
  ),
};

export const AllRarities: Story = {
  name: 'All Rarities',
  render: () => (
    <div className="diorama-frame flex items-end gap-6 rounded-diorama p-6">
      <PortraitAvatar rarity="common">
        <span className="text-2xl">🛡️</span>
      </PortraitAvatar>
      <PortraitAvatar rarity="uncommon">
        <span className="text-2xl">⚔️</span>
      </PortraitAvatar>
      <PortraitAvatar rarity="rare">
        <span className="text-2xl">🧙</span>
      </PortraitAvatar>
      <PortraitAvatar rarity="epic">
        <span className="text-2xl">🐉</span>
      </PortraitAvatar>
      <PortraitAvatar rarity="legendary">
        <span className="text-2xl">👑</span>
      </PortraitAvatar>
    </div>
  ),
};
