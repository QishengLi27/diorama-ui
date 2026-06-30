import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useKeyboardNavigation } from '../useKeyboardNavigation';

function fireKey(key: string) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

describe('useKeyboardNavigation', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('starts at initialIndex', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 5, initialIndex: 2 })
      );

      expect(result.current.selectedIndex).toBe(2);
    });

    it('defaults to index 0', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 5 })
      );

      expect(result.current.selectedIndex).toBe(0);
    });
  });

  describe('ArrowDown / S key', () => {
    it('moves selection down one', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 5 })
      );

      act(() => { fireKey('ArrowDown'); });
      expect(result.current.selectedIndex).toBe(1);
    });

    it('moves selection down with lowercase s', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 5 })
      );

      act(() => { fireKey('s'); });
      expect(result.current.selectedIndex).toBe(1);
    });

    it('moves selection down with uppercase S', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 5 })
      );

      act(() => { fireKey('S'); });
      expect(result.current.selectedIndex).toBe(1);
    });
  });

  describe('ArrowUp / W key', () => {
    it('moves selection up one', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 5, initialIndex: 3 })
      );

      act(() => { fireKey('ArrowUp'); });
      expect(result.current.selectedIndex).toBe(2);
    });

    it('moves selection up with lowercase w', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 5, initialIndex: 3 })
      );

      act(() => { fireKey('w'); });
      expect(result.current.selectedIndex).toBe(2);
    });
  });

  describe('loop behavior', () => {
    it('loops from last to first on ArrowDown when loop=true', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 3, loop: true, initialIndex: 2 })
      );

      act(() => { fireKey('ArrowDown'); });
      expect(result.current.selectedIndex).toBe(0);
    });

    it('loops from first to last on ArrowUp when loop=true', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 3, loop: true, initialIndex: 0 })
      );

      act(() => { fireKey('ArrowUp'); });
      expect(result.current.selectedIndex).toBe(2);
    });

    it('clamps at last item on ArrowDown when loop=false', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 3, loop: false, initialIndex: 2 })
      );

      act(() => { fireKey('ArrowDown'); });
      expect(result.current.selectedIndex).toBe(2);
    });

    it('clamps at first item on ArrowUp when loop=false', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 3, loop: false, initialIndex: 0 })
      );

      act(() => { fireKey('ArrowUp'); });
      expect(result.current.selectedIndex).toBe(0);
    });
  });

  describe('Enter / Space', () => {
    it('calls onSelect with current index on Enter', () => {
      const onSelect = vi.fn();
      renderHook(() =>
        useKeyboardNavigation({ itemCount: 5, initialIndex: 2, onSelect })
      );

      act(() => { fireKey('Enter'); });
      expect(onSelect).toHaveBeenCalledWith(2);
    });

    it('calls onSelect with current index on Space', () => {
      const onSelect = vi.fn();
      renderHook(() =>
        useKeyboardNavigation({ itemCount: 5, initialIndex: 1, onSelect })
      );

      act(() => { fireKey(' '); });
      expect(onSelect).toHaveBeenCalledWith(1);
    });
  });

  describe('Escape / Backspace', () => {
    it('calls onCancel on Escape', () => {
      const onCancel = vi.fn();
      renderHook(() =>
        useKeyboardNavigation({ itemCount: 5, onCancel })
      );

      act(() => { fireKey('Escape'); });
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel on Backspace', () => {
      const onCancel = vi.fn();
      renderHook(() =>
        useKeyboardNavigation({ itemCount: 5, onCancel })
      );

      act(() => { fireKey('Backspace'); });
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('enabled=false', () => {
    it('ignores all key events when disabled', () => {
      const onSelect = vi.fn();
      const onCancel = vi.fn();
      const { result } = renderHook(() =>
        useKeyboardNavigation({
          itemCount: 5,
          enabled: false,
          onSelect,
          onCancel,
        })
      );

      act(() => { fireKey('ArrowDown'); });
      act(() => { fireKey('ArrowUp'); });
      act(() => { fireKey('Enter'); });
      act(() => { fireKey('Escape'); });

      expect(result.current.selectedIndex).toBe(0);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onCancel).not.toHaveBeenCalled();
    });
  });

  describe('setSelectedIndex', () => {
    it('allows manual override of selected index', () => {
      const { result } = renderHook(() =>
        useKeyboardNavigation({ itemCount: 5 })
      );

      act(() => { result.current.setSelectedIndex(3); });
      expect(result.current.selectedIndex).toBe(3);
    });
  });
});
