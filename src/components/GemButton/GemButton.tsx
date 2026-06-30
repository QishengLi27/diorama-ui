import React from 'react';
import '../../styles/index.css';

export type GemAccent = 'gold' | 'ruby' | 'sapphire' | 'emerald';
export type GemSize = 'sm' | 'md' | 'lg';

export interface GemButtonProps {
  /** Visual accent color — gold (default), ruby, sapphire, or emerald */
  accent?: GemAccent;
  /** Button size */
  size?: GemSize;
  /** Disabled state — dims the gem and prevents clicks */
  disabled?: boolean;
  /** Loading state — shows crystal spinner and disables interaction */
  loading?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Additional CSS classes */
  className?: string;
  /** Button content */
  children?: React.ReactNode;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Accessible label (required when icon-only) */
  'aria-label'?: string;
}

const accentMap: Record<GemAccent, string> = {
  gold: 'from-diorama-gold-light to-diorama-gold-dark shadow-diorama-gold-dark',
  ruby: 'from-red-400 to-diorama-ruby shadow-red-800',
  sapphire: 'from-blue-400 to-diorama-sapphire shadow-blue-800',
  emerald: 'from-green-400 to-diorama-emerald shadow-green-800',
};

const accentText: Record<GemAccent, string> = {
  gold: 'text-diorama-ink',
  ruby: 'text-white',
  sapphire: 'text-white',
  emerald: 'text-white',
};

const accentGlow: Record<GemAccent, string> = {
  gold: 'shadow-[0_0_12px_rgba(212,168,67,0.5)]',
  ruby: 'shadow-[0_0_12px_rgba(201,76,76,0.5)]',
  sapphire: 'shadow-[0_0_12px_rgba(76,124,201,0.5)]',
  emerald: 'shadow-[0_0_12px_rgba(76,175,124,0.5)]',
};

const sizeMap: Record<GemSize, string> = {
  sm: 'px-3 py-1 text-[10px]',
  md: 'px-5 py-2 text-xs',
  lg: 'px-7 py-3 text-sm',
};

export const GemButton: React.FC<GemButtonProps> = ({
  accent = 'gold',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  children,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={`
        diorama-gem relative inline-flex items-center justify-center gap-2
        rounded-diorama font-pixel font-bold uppercase tracking-wider
        select-none outline-none
        bg-gradient-to-b
        ${accentMap[accent]}
        ${accentText[accent]}
        ${sizeMap[size]}
        ${isDisabled ? 'cursor-not-allowed opacity-50 saturate-[0.3]' : 'cursor-pointer'}
        focus-visible:ring-2 focus-visible:ring-diorama-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-diorama-shadow
        transition-all duration-150
        ${!isDisabled ? accentGlow[accent] : ''}
        ${className}
      `}
    >
      {loading && (
        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80" />
      )}
      {children}
    </button>
  );
};

export default GemButton;
