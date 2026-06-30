import React from 'react';
import '../../styles/index.css';
import { RuneIcon, type RuneName } from '../RuneIcon/RuneIcon';

export type OrnateAccent = 'gold' | 'ruby' | 'sapphire' | 'emerald';

export interface OrnateDividerProps {
  /** Accent color for the ornament and line */
  accent?: OrnateAccent;
  /** Optional label text displayed in the center */
  label?: string;
  /** Rune icon to display instead of the default gem ornament */
  rune?: RuneName;
  /** Additional CSS classes */
  className?: string;
}

const lineColors: Record<OrnateAccent, string> = {
  gold: 'from-transparent via-diorama-gold to-transparent',
  ruby: 'from-transparent via-diorama-ruby to-transparent',
  sapphire: 'from-transparent via-diorama-sapphire to-transparent',
  emerald: 'from-transparent via-diorama-emerald to-transparent',
};

const ornamentColors: Record<OrnateAccent, string> = {
  gold: 'text-diorama-gold',
  ruby: 'text-diorama-ruby',
  sapphire: 'text-diorama-sapphire',
  emerald: 'text-diorama-emerald',
};

export const OrnateDivider: React.FC<OrnateDividerProps> = ({
  accent = 'gold',
  label,
  rune,
  className = '',
}) => {
  const lineGradient = `bg-gradient-to-r ${lineColors[accent]}`;
  const ornamentColor = ornamentColors[accent];

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`flex items-center gap-3 ${className}`}
    >
      {/* Left line */}
      <div className={`h-px flex-1 ${lineGradient}`} />

      {/* Ornament */}
      <div className={`flex shrink-0 items-center gap-2 ${ornamentColor}`}>
        {!label && !rune && (
          <span className="text-xs" aria-hidden="true">◆</span>
        )}
        {!label && rune && (
          <RuneIcon name={rune} size="xs" accent={accent} />
        )}
        {label && (
          <span className="font-display text-xs font-bold uppercase tracking-widest text-diorama-ink-light">
            {label}
          </span>
        )}
      </div>

      {/* Right line */}
      <div className={`h-px flex-1 ${lineGradient}`} />
    </div>
  );
};

export default OrnateDivider;
