import type { Preview } from '@storybook/react';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'hd2d',
      values: [
        { name: 'hd2d', value: '#2a1810' },
        { name: 'light', value: '#f5e6c8' },
        { name: 'dark', value: '#1a120b' },
      ],
    },
  },
};

export default preview;
