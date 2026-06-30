import React from 'react';
import '../../styles/index.css';

export type RuneAccent = 'gold' | 'ruby' | 'sapphire' | 'emerald' | 'ink' | 'ink-light';
export type RuneSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Available rune names.
 * Each maps to a simple geometric/pictorial unicode glyph styled as a diorama rune.
 */
export type RuneName =
  | 'sword'
  | 'shield'
  | 'potion'
  | 'star'
  | 'star-outline'
  | 'heart'
  | 'diamond'
  | 'diamond-outline'
  | 'triangle-up'
  | 'triangle-down'
  | 'circle'
  | 'circle-outline'
  | 'cross'
  | 'check'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'gem'
  | 'skull'
  | 'key'
  | 'magic'
  | 'fire'
  | 'ice'
  | 'bolt'
  | 'rune-a'
  | 'rune-b'
  | 'rune-c';

export interface RuneIconProps {
  /** Which rune glyph to display */
  name: RuneName;
  /** Size variant */
  size?: RuneSize;
  /** Accent color */
  accent?: RuneAccent;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

const runeGlyphs: Record<RuneName, string> = {
  sword: '⚔',
  shield: '🛡',
  potion: '⚗',
  star: '★',
  'star-outline': '☆',
  heart: '♥',
  diamond: '◆',
  'diamond-outline': '◇',
  'triangle-up': '▲',
  'triangle-down': '▼',
  circle: '●',
  'circle-outline': '○',
  cross: '✚',
  check: '✔',
  'arrow-up': '▲',
  'arrow-down': '▼',
  'arrow-left': '◀',
  'arrow-right': '▶',
  gem: '⬥',
  skull: '☠',
  key: '⚿',
  magic: '✧',
  fire: '❖',
  ice: '❄',
  bolt: '↯',
  'rune-a': 'ᚠ',
  'rune-b': 'ᚢ',
  'rune-c': 'ᚦ',
};

const sizeStyles: Record<RuneSize, string> = {
  xs: 'text-[10px]',
  sm: 'text-xs',
  md: 'text-base',
  lg: 'text-xl',
};

const accentStyles: Record<RuneAccent, string> = {
  gold: 'text-diorama-gold drop-shadow-[0_0_3px_rgba(212,168,67,0.6)]',
  ruby: 'text-diorama-ruby drop-shadow-[0_0_3px_rgba(201,76,76,0.6)]',
  sapphire: 'text-diorama-sapphire drop-shadow-[0_0_3px_rgba(76,124,201,0.6)]',
  emerald: 'text-diorama-emerald drop-shadow-[0_0_3px_rgba(76,175,124,0.6)]',
  ink: 'text-diorama-ink',
  'ink-light': 'text-diorama-ink-light',
};

export const RuneIcon: React.FC<RuneIconProps> = ({
  name,
  size = 'md',
  accent = 'gold',
  className = '',
  'aria-label': ariaLabel,
}) => {
  const glyph = runeGlyphs[name];

  return (
    <span
      role="img"
      aria-label={ariaLabel ?? name}
      aria-hidden={!ariaLabel && undefined}
      className={`
        inline-block select-none leading-none
        font-pixel
        ${sizeStyles[size]}
        ${accentStyles[accent]}
        ${className}
      `}
    >
      {glyph}
    </span>
  );
};

export default RuneIcon;
