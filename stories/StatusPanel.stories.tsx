import type { Meta, StoryObj } from '@storybook/react';
import { StatusPanel } from '../src';

const meta: Meta<typeof StatusPanel> = {
  title: 'JRPG/StatusPanel',
  component: StatusPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Therion',
    level: 24,
    hp: { current: 1240, max: 1800 },
    mp: { current: 86, max: 120 },
    xp: { current: 4500, max: 8000 },
    portrait: <span className="text-3xl">🗡️</span>,
  },
};

export const LowHealth: Story = {
  args: {
    name: 'H\'aanit',
    level: 18,
    hp: { current: 180, max: 1400 },
    mp: { current: 34, max: 80 },
    portrait: <span className="text-3xl">🏹</span>,
  },
};
