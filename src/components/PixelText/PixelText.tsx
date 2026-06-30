import React from 'react';
import '../../styles/index.css';

export type PixelTextVariant = 'body' | 'caption' | 'label' | 'heading';
export type PixelColor = 'ink' | 'ink-light' | 'gold' | 'gold-light' | 'gold-dark' | 'ruby' | 'sapphire' | 'emerald' | 'parchment';

export interface PixelTextProps {
  /** Text style variant */
  variant?: PixelTextVariant;
  /** Text color from diorama palette */
  color?: PixelColor;
  /** Additional CSS classes */
  className?: string;
  /** HTML element to render */
  as?: 'span' | 'p' | 'div' | 'label';
  /** Text content */
  children?: React.ReactNode;
  /** Apply diorama text-shadow */
  shadow?: boolean;
  /** Uppercase transform (useful for labels) */
  uppercase?: boolean;
}

const variantStyles: Record<PixelTextVariant, string> = {
  body: 'text-xs leading-6',
  caption: 'text-[10px] leading-4',
  label: 'text-[10px] leading-4 tracking-wider font-bold',
  heading: 'text-sm leading-7 font-bold tracking-widest',
};

const colorStyles: Record<PixelColor, string> = {
  ink: 'text-diorama-ink',
  'ink-light': 'text-diorama-ink-light',
  gold: 'text-diorama-gold',
  'gold-light': 'text-diorama-gold-light',
  'gold-dark': 'text-diorama-gold-dark',
  ruby: 'text-diorama-ruby',
  sapphire: 'text-diorama-sapphire',
  emerald: 'text-diorama-emerald',
  parchment: 'text-diorama-parchment',
};

export const PixelText: React.FC<PixelTextProps> = ({
  variant = 'body',
  color = 'ink',
  className = '',
  as: Tag = 'span',
  children,
  shadow = false,
  uppercase = false,
}) => {
  return (
    <Tag
      className={`
        font-pixel
        ${variantStyles[variant]}
        ${colorStyles[color]}
        ${shadow ? 'diorama-text-shadow' : ''}
        ${uppercase ? 'uppercase' : ''}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
};

export default PixelText;
