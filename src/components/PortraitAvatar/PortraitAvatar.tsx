import React from 'react';
import '../../styles/index.css';

export type PortraitRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type PortraitSize = 'sm' | 'md' | 'lg';

export interface PortraitAvatarProps {
  /** Portrait content — image element, emoji, or any React node */
  children?: React.ReactNode;
  /** Rarity tier — determines border glow color and intensity */
  rarity?: PortraitRarity;
  /** Size variant */
  size?: PortraitSize;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

const rarityColors: Record<PortraitRarity, string> = {
  common: 'border-diorama-ink/40 shadow-none',
  uncommon: 'border-diorama-emerald/60 shadow-[0_0_8px_rgba(76,175,124,0.3)]',
  rare: 'border-diorama-sapphire/70 shadow-[0_0_12px_rgba(76,124,201,0.4)]',
  epic: 'border-diorama-ruby/80 shadow-[0_0_16px_rgba(201,76,76,0.5)]',
  legendary: 'border-diorama-gold shadow-[0_0_20px_rgba(212,168,67,0.6)]',
};

const rarityLabel: Record<PortraitRarity, string> = {
  common: '',
  uncommon: '◆',
  rare: '◆◆',
  epic: '◆◆◆',
  legendary: '★',
};

const sizeStyles: Record<PortraitSize, string> = {
  sm: 'h-10 w-10 text-xs',
  md: 'h-16 w-16 text-base',
  lg: 'h-24 w-24 text-2xl',
};

const rarityBadgeColors: Record<PortraitRarity, string> = {
  common: 'hidden',
  uncommon: 'text-diorama-emerald',
  rare: 'text-diorama-sapphire',
  epic: 'text-diorama-ruby',
  legendary: 'text-diorama-gold',
};

export const PortraitAvatar: React.FC<PortraitAvatarProps> = ({
  children,
  rarity = 'common',
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
}) => {
  return (
    <div className={`relative inline-flex shrink-0 flex-col items-center gap-1 ${className}`}>
      <div
        role="img"
        aria-label={ariaLabel}
        className={`
          diorama-inset flex items-center justify-center overflow-hidden
          rounded-sm border-2
          ${sizeStyles[size]}
          ${rarityColors[rarity]}
          transition-shadow duration-300
        `}
      >
        {children || (
          <span className="font-pixel text-diorama-ink-light opacity-40" aria-hidden="true">
            ?
          </span>
        )}
      </div>

      {/* Rarity indicator */}
      {rarity !== 'common' && (
        <span
          aria-hidden="true"
          className={`font-pixel text-[8px] leading-none ${rarityBadgeColors[rarity]}`}
        >
          {rarityLabel[rarity]}
        </span>
      )}
    </div>
  );
};

export default PortraitAvatar;
