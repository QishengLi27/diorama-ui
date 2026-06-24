import React, { useCallback } from 'react';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import '../../styles/index.css';

export interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  disabled?: boolean;
}

export interface CommandMenuProps {
  title?: string;
  items: CommandItem[];
  selectedId?: string;
  onSelect?: (item: CommandItem, index: number) => void;
  onCancel?: () => void;
  className?: string;
  showCursor?: boolean;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  title,
  items,
  selectedId,
  onSelect,
  onCancel,
  className = '',
  showCursor = true,
}) => {
  const initialIndex = selectedId
    ? Math.max(0, items.findIndex((item) => item.id === selectedId))
    : 0;

  const handleSelect = useCallback(
    (index: number) => {
      const item = items[index];
      if (item && !item.disabled) {
        onSelect?.(item, index);
      }
    },
    [items, onSelect]
  );

  const { selectedIndex, setSelectedIndex } = useKeyboardNavigation({
    itemCount: items.length,
    initialIndex,
    onSelect: handleSelect,
    onCancel,
    loop: true,
    enabled: true,
  });

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      className={`
        diorama-frame diorama-scanlines
        inline-flex min-w-[12rem] flex-col rounded-diorama p-1
        ${className}
      `}
    >
      {title && (
        <div className="diorama-inset mb-1 rounded-sm px-3 py-2 text-center font-display text-xs font-bold uppercase tracking-widest text-diorama-ink-light">
          {title}
        </div>
      )}

      <ul className="flex flex-col gap-1">
        {items.map((item, index) => {
          const isSelected = index === selectedIndex;
          const cursor = showCursor && isSelected ? '▶' : '\u00A0';

          return (
            <li key={item.id} role="none">
              <button
                role="menuitem"
                tabIndex={isSelected ? 0 : -1}
                disabled={item.disabled}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`
                  flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left
                  font-pixel text-xs transition-colors
                  ${
                    isSelected
                      ? 'bg-diorama-gold text-diorama-shadow shadow-diorama-glow'
                      : 'bg-transparent text-diorama-ink hover:bg-diorama-parchment-dark'
                  }
                  ${item.disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
                `}
              >
                <span className="w-3 text-center">{cursor}</span>
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="text-[10px] opacity-70">{item.shortcut}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommandMenu;
