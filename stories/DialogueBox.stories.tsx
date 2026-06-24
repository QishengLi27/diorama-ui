import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DialogueBox } from '../src';

const meta: Meta<typeof DialogueBox> = {
  title: 'JRPG/DialogueBox',
  component: DialogueBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const messages = [
  {
    speaker: 'Olberic',
    text: 'The path of a warrior is paved with trials. Yet it is through these trials that we discover our true strength.',
    portrait: <span className="text-2xl">🛡️</span>,
  },
  {
    speaker: 'Tressa',
    text: 'Every town has a story, and every merchant has a deal. Let us see what fortunes today brings!',
    portrait: <span className="text-2xl">💰</span>,
  },
  {
    speaker: 'Cyrus',
    text: 'Knowledge is the greatest treasure of all. Now, where did I place that tome...',
    portrait: <span className="text-2xl">📖</span>,
  },
];

export const Default: Story = {
  args: {
    messages,
    currentIndex: 0,
    typingSpeed: 28,
  },
  render: (args) => {
    const [index, setIndex] = useState(args.currentIndex);
    return (
      <div className="w-[480px]">
        <DialogueBox
          {...args}
          currentIndex={index}
          onAdvance={setIndex}
          onComplete={() => alert('Dialogue complete!')}
        />
      </div>
    );
  },
};

export const WithoutPortrait: Story = {
  args: {
    messages: messages.map(({ speaker, text }) => ({ speaker, text })),
    currentIndex: 0,
  },
  render: (args) => {
    const [index, setIndex] = useState(args.currentIndex);
    return (
      <div className="w-[480px]">
        <DialogueBox {...args} currentIndex={index} onAdvance={setIndex} />
      </div>
    );
  },
};
