import React from 'react';
import '../../styles/index.css';

export interface StatusBarProps {
  current: number;
  max: number;
  variant?: 'hp' | 'mp' | 'xp';
  label?: string;
  className?: string;
}

export interface StatusPanelProps {
  name: string;
  level?: number;
  hp?: { current: number; max: number };
  mp?: { current: number; max: number };
  xp?: { current: number; max: number };
  portrait?: React.ReactNode;
  className?: string;
}

const variantColors = {
  hp: 'bg-diorama-ruby',
  mp: 'bg-diorama-sapphire',
  xp: 'bg-diorama-emerald',
};

const variantGlows = {
  hp: 'shadow-[0_0_8px_rgba(201,76,76,0.5)]',
  mp: 'shadow-[0_0_8px_rgba(76,124,201,0.5)]',
  xp: 'shadow-[0_0_8px_rgba(76,175,124,0.5)]',
};

export const StatusBar: React.FC<StatusBarProps> = ({
  current,
  max,
  variant = 'hp',
  label,
  className = '',
}) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between font-pixel text-[10px] text-diorama-ink-light">
        {label && <span>{label}</span>}
        <span>
          {current}/{max}
        </span>
      </div>
      <div className="diorama-inset h-3 w-full rounded-full border border-diorama-ink/20">
        <div
          className={`
            h-full rounded-full transition-all duration-500
            ${variantColors[variant]}
            ${variantGlows[variant]}
          `}
          style={{ width: `${percentage}%` }}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={current}
          role="progressbar"
        />
      </div>
    </div>
  );
};

export const StatusPanel: React.FC<StatusPanelProps> = ({
  name,
  level,
  hp,
  mp,
  xp,
  portrait,
  className = '',
}) => {
  return (
    <div
      className={`
        diorama-frame diorama-scanlines
        flex items-center gap-4 rounded-diorama p-4
        ${className}
      `}
    >
      {portrait && (
        <div className="diorama-inset flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-diorama-gold">
          {portrait}
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="truncate font-display text-base font-bold text-diorama-ink">
            {name}
          </span>
          {typeof level === 'number' && (
            <span className="font-pixel text-[10px] text-diorama-gold-dark">
              Lv.{level}
            </span>
          )}
        </div>

        {hp && <StatusBar current={hp.current} max={hp.max} variant="hp" label="HP" />}
        {mp && <StatusBar current={mp.current} max={mp.max} variant="mp" label="MP" />}
        {xp && <StatusBar current={xp.current} max={xp.max} variant="xp" label="XP" />}
      </div>
    </div>
  );
};

export default StatusPanel;
