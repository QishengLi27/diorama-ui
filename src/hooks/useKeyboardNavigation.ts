import { useState, useEffect, useCallback } from 'react';

export interface UseKeyboardNavigationOptions {
  itemCount: number;
  initialIndex?: number;
  onSelect?: (index: number) => void;
  onCancel?: () => void;
  loop?: boolean;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  itemCount,
  initialIndex = 0,
  onSelect,
  onCancel,
  loop = true,
  enabled = true,
}: UseKeyboardNavigationOptions) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const move = useCallback(
    (direction: -1 | 1) => {
      setSelectedIndex((prev) => {
        const next = prev + direction;
        if (loop) {
          return (next + itemCount) % itemCount;
        }
        return Math.max(0, Math.min(itemCount - 1, next));
      });
    },
    [itemCount, loop]
  );

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault();
          move(-1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault();
          move(1);
          break;
        case 'Enter':
        case ' ': {
          event.preventDefault();
          onSelect?.(selectedIndex);
          break;
        }
        case 'Escape':
        case 'Backspace':
          event.preventDefault();
          onCancel?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, move, onSelect, onCancel, selectedIndex]);

  return { selectedIndex, setSelectedIndex };
}
