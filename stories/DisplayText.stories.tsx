import type { Meta, StoryObj } from '@storybook/react';
import { DisplayText } from '../src';

const meta: Meta<typeof DisplayText> = {
  title: 'Atoms/DisplayText',
  component: DisplayText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    color: {
      control: 'select',
      options: ['ink', 'ink-light', 'gold', 'gold-light', 'gold-dark', 'ruby', 'sapphire', 'emerald'],
    },
    accent: { control: 'boolean' },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    level: 1,
    children: 'The Chronicle of Orsterra',
  },
};

export const Heading2: Story = {
  args: {
    level: 2,
    children: 'Chapter IV: The Fallen Kingdom',
  },
};

export const Heading3: Story = {
  args: {
    level: 3,
    children: 'Quest: The Dragon\'s Lair',
  },
};

export const WithGoldAccent: Story = {
  args: {
    level: 2,
    accent: true,
    children: 'Main Menu',
  },
};

export const GoldTitle: Story = {
  args: {
    level: 1,
    color: 'gold',
    accent: true,
    align: 'center',
    children: 'Diorama UI',
  },
};

export const AllLevels: Story = {
  name: 'All Levels',
  render: () => (
    <div className="diorama-frame flex flex-col gap-4 rounded-diorama p-8">
      <DisplayText level={1}>Level 1 — The Grand Title</DisplayText>
      <DisplayText level={2}>Level 2 — Chapter Heading</DisplayText>
      <DisplayText level={3}>Level 3 — Section Title</DisplayText>
      <DisplayText level={4}>Level 4 — Subsection</DisplayText>
      <DisplayText level={5}>Level 5 — Minor Heading</DisplayText>
      <DisplayText level={6}>Level 6 — Small Heading</DisplayText>
    </div>
  ),
};

export const AllColors: Story = {
  name: 'All Colors',
  render: () => (
    <div className="diorama-frame flex flex-col gap-4 rounded-diorama p-8">
      <DisplayText level={4} color="ink">ink — Standard headings</DisplayText>
      <DisplayText level={4} color="ink-light">ink-light — Subtle headings</DisplayText>
      <DisplayText level={4} color="gold">gold — Treasure and glory</DisplayText>
      <DisplayText level={4} color="ruby">ruby — Danger and urgency</DisplayText>
      <DisplayText level={4} color="sapphire">sapphire — Wisdom and magic</DisplayText>
      <DisplayText level={4} color="emerald">emerald — Nature and healing</DisplayText>
    </div>
  ),
};
