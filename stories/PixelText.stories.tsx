import type { Meta, StoryObj } from '@storybook/react';
import { PixelText } from '../src';

const meta: Meta<typeof PixelText> = {
  title: 'Atoms/PixelText',
  component: PixelText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'caption', 'label', 'heading'],
    },
    color: {
      control: 'select',
      options: ['ink', 'ink-light', 'gold', 'gold-light', 'gold-dark', 'ruby', 'sapphire', 'emerald', 'parchment'],
    },
    shadow: { control: 'boolean' },
    uppercase: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'The warrior draws her blade, ready for the trials ahead.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Press any key to continue...',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Current HP',
    color: 'ruby',
  },
};

export const Heading: Story = {
  args: {
    variant: 'heading',
    children: 'Battle Menu',
    color: 'gold',
  },
};

export const WithShadow: Story = {
  args: {
    variant: 'body',
    shadow: true,
    children: 'This text has a subtle text shadow for depth.',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="diorama-frame flex flex-col gap-3 rounded-diorama p-6">
      <PixelText variant="heading" color="gold">Heading — Battle Results</PixelText>
      <PixelText variant="body">Body — The hero strikes true, dealing 240 damage.</PixelText>
      <PixelText variant="label" color="ruby">Label — HP: 1200 / 3200</PixelText>
      <PixelText variant="caption" color="ink-light">Caption — Press Enter to continue...</PixelText>
    </div>
  ),
};

export const AllColors: Story = {
  name: 'All Colors (on parchment)',
  render: () => (
    <div className="diorama-frame flex flex-col gap-2 rounded-diorama p-6">
      <PixelText variant="body" color="ink">ink — The standard text color</PixelText>
      <PixelText variant="body" color="ink-light">ink-light — Secondary text</PixelText>
      <PixelText variant="body" color="gold">gold — Treasure and value</PixelText>
      <PixelText variant="body" color="ruby">ruby — Damage and danger</PixelText>
      <PixelText variant="body" color="sapphire">sapphire — Magic and mana</PixelText>
      <PixelText variant="body" color="emerald">emerald — Healing and nature</PixelText>
    </div>
  ),
};
