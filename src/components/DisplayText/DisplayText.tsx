import React from 'react';
import '../../styles/index.css';

export type DisplayLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type DisplayColor = 'ink' | 'ink-light' | 'gold' | 'gold-light' | 'gold-dark' | 'ruby' | 'sapphire' | 'emerald';

export interface DisplayTextProps {
  /** Heading level — maps to h1–h6 semantics and sizing */
  level?: DisplayLevel;
  /** Text color from diorama palette */
  color?: DisplayColor;
  /** Show a gold accent underline beneath the text */
  accent?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Text content */
  children?: React.ReactNode;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

const levelStyles: Record<DisplayLevel, string> = {
  1: 'text-3xl leading-tight tracking-wide',
  2: 'text-2xl leading-tight tracking-wide',
  3: 'text-xl leading-snug tracking-normal',
  4: 'text-lg leading-snug',
  5: 'text-base leading-normal',
  6: 'text-sm leading-normal',
};

const levelTags: Record<DisplayLevel, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

const colorStyles: Record<DisplayColor, string> = {
  ink: 'text-diorama-ink',
  'ink-light': 'text-diorama-ink-light',
  gold: 'text-diorama-gold',
  'gold-light': 'text-diorama-gold-light',
  'gold-dark': 'text-diorama-gold-dark',
  ruby: 'text-diorama-ruby',
  sapphire: 'text-diorama-sapphire',
  emerald: 'text-diorama-emerald',
};

const alignStyles: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const DisplayText: React.FC<DisplayTextProps> = ({
  level = 3,
  color = 'ink',
  accent = false,
  className = '',
  children,
  align = 'left',
}) => {
  const Tag = levelTags[level];

  return (
    <div className={`inline-block ${alignStyles[align]} ${className}`}>
      <Tag
        className={`
          font-display font-bold
          ${levelStyles[level]}
          ${colorStyles[color]}
          diorama-text-shadow
        `}
      >
        {children}
      </Tag>
      {accent && (
        <div className="mt-1 h-[2px] w-full bg-gradient-to-r from-transparent via-diorama-gold to-transparent" />
      )}
    </div>
  );
};

export default DisplayText;
