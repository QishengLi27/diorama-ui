import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CommandMenu } from '../src';

const meta: Meta<typeof CommandMenu> = {
  title: 'JRPG/CommandMenu',
  component: CommandMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const battleItems = [
  { id: 'attack', label: 'Attack' },
  { id: 'skill', label: 'Skill' },
  { id: 'item', label: 'Item' },
  { id: 'flee', label: 'Flee', disabled: true },
];

export const BattleMenu: Story = {
  args: {
    title: 'Command',
    items: battleItems,
  },
  render: (args) => {
    const [selected, setSelected] = useState<string | undefined>();
    return (
      <CommandMenu
        {...args}
        selectedId={selected}
        onSelect={(item) => setSelected(item.id)}
      />
    );
  },
};

export const MainMenu: Story = {
  args: {
    title: 'Menu',
    items: [
      { id: 'items', label: 'Items' },
      { id: 'equip', label: 'Equip' },
      { id: 'status', label: 'Status' },
      { id: 'journal', label: 'Journal' },
      { id: 'config', label: 'Config' },
      { id: 'save', label: 'Save' },
    ],
  },
};
