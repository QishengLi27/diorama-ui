import type { Meta, StoryObj } from '@storybook/react';
import { OrnateDivider } from '../src';

const meta: Meta<typeof OrnateDivider> = {
  title: 'Atoms/OrnateDivider',
  component: OrnateDivider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accent: {
      control: 'select',
      options: ['gold', 'ruby', 'sapphire', 'emerald'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Gold: Story = {
  args: {
    accent: 'gold',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const WithLabel: Story = {
  args: {
    accent: 'gold',
    label: 'Chapter End',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const WithRune: Story = {
  args: {
    accent: 'gold',
    rune: 'star',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const RubyRune: Story = {
  args: {
    accent: 'ruby',
    rune: 'skull',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const AllAccents: Story = {
  name: 'All Accents',
  render: () => (
    <div className="diorama-frame flex w-96 flex-col gap-6 rounded-diorama p-8">
      <OrnateDivider accent="gold" label="Gold" />
      <OrnateDivider accent="ruby" label="Ruby" />
      <OrnateDivider accent="sapphire" label="Sapphire" />
      <OrnateDivider accent="emerald" label="Emerald" />
    </div>
  ),
};

export const WithRunes: Story = {
  name: 'With Runes',
  render: () => (
    <div className="diorama-frame flex w-96 flex-col gap-6 rounded-diorama p-8">
      <OrnateDivider accent="gold" rune="star" />
      <OrnateDivider accent="gold" rune="diamond" />
      <OrnateDivider accent="ruby" rune="skull" />
      <OrnateDivider accent="sapphire" rune="magic" />
      <OrnateDivider accent="emerald" rune="heart" />
      <OrnateDivider accent="gold" rune="sword" />
    </div>
  ),
};
