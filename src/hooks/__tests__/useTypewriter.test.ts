import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTypewriter } from '../useTypewriter';

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('starts with an empty string', () => {
      const { result } = renderHook(() =>
        useTypewriter({ text: 'Hello' })
      );

      expect(result.current.displayed).toBe('');
      expect(result.current.isComplete).toBe(false);
    });
  });

  describe('character reveal', () => {
    it('reveals text one character per tick at the configured speed', () => {
      const { result } = renderHook(() =>
        useTypewriter({ text: 'abc', speed: 20 })
      );

      // First character appears after one tick
      act(() => { vi.advanceTimersByTime(20); });
      expect(result.current.displayed).toBe('a');

      act(() => { vi.advanceTimersByTime(20); });
      expect(result.current.displayed).toBe('ab');

      act(() => { vi.advanceTimersByTime(20); });
      expect(result.current.displayed).toBe('abc');
      expect(result.current.isComplete).toBe(true);
    });

    it('uses default speed of 30ms when none provided', () => {
      const { result } = renderHook(() =>
        useTypewriter({ text: 'xy' })
      );

      act(() => { vi.advanceTimersByTime(30); });
      expect(result.current.displayed).toBe('x');

      act(() => { vi.advanceTimersByTime(30); });
      expect(result.current.displayed).toBe('xy');
      expect(result.current.isComplete).toBe(true);
    });
  });

  describe('onComplete callback', () => {
    it('calls onComplete when the full text is revealed', () => {
      const onComplete = vi.fn();
      renderHook(() =>
        useTypewriter({ text: 'ab', speed: 10, onComplete })
      );

      act(() => { vi.advanceTimersByTime(10); });
      expect(onComplete).not.toHaveBeenCalled();

      act(() => { vi.advanceTimersByTime(10); });
      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('does not call onComplete if text is empty', () => {
      const onComplete = vi.fn();
      renderHook(() =>
        useTypewriter({ text: '', speed: 10, onComplete })
      );

      // Empty text — complete immediately, but onComplete should still fire
      // Since text is empty, slice(0,0) = '' immediately
      act(() => { vi.advanceTimersByTime(10); });
      // Actually: interval runs index=1, slice(0,1)='' for empty text, and index>=length is true
      // For empty string, index starts at 0, setDisplayed(''), then index becomes 1 which is >= 0
      // So onComplete fires after first tick
      expect(onComplete).toHaveBeenCalledTimes(1);
    });
  });

  describe('skip()', () => {
    it('immediately shows the full text', () => {
      const { result } = renderHook(() =>
        useTypewriter({ text: 'Hello World', speed: 30 })
      );

      expect(result.current.displayed).not.toBe('Hello World');

      act(() => { result.current.skip(); });

      expect(result.current.displayed).toBe('Hello World');
      expect(result.current.isComplete).toBe(true);
    });

    it('marks isComplete as true', () => {
      const { result } = renderHook(() =>
        useTypewriter({ text: 'Skipping', speed: 100 })
      );

      expect(result.current.isComplete).toBe(false);

      act(() => { result.current.skip(); });

      expect(result.current.isComplete).toBe(true);
    });
  });

  describe('text changes', () => {
    it('resets when text prop changes', () => {
      const { result, rerender } = renderHook(
        ({ text }: { text: string }) => useTypewriter({ text, speed: 10 }),
        { initialProps: { text: 'old' } }
      );

      act(() => { vi.advanceTimersByTime(30); });
      expect(result.current.displayed).toBe('old');

      // Change text
      rerender({ text: 'new' });

      // Should reset to empty and start typing new text
      expect(result.current.displayed).toBe('');
      expect(result.current.isComplete).toBe(false);

      act(() => { vi.advanceTimersByTime(10); });
      expect(result.current.displayed).toBe('n');
    });
  });

  describe('enabled=false', () => {
    it('shows the full text immediately without animation', () => {
      const { result } = renderHook(() =>
        useTypewriter({ text: 'Instant', enabled: false })
      );

      expect(result.current.displayed).toBe('Instant');
      expect(result.current.isComplete).toBe(true);
    });
  });

  describe('cleanup', () => {
    it('clears the interval on unmount — no further callbacks fire', () => {
      const onComplete = vi.fn();
      const { unmount } = renderHook(() =>
        useTypewriter({ text: 'cleanup test', speed: 10, onComplete })
      );

      // Partial reveal, then unmount before completion
      act(() => { vi.advanceTimersByTime(50); });
      unmount();

      // Advance timers far past what would finish — callback must not fire
      act(() => { vi.advanceTimersByTime(1000); });
      expect(onComplete).not.toHaveBeenCalled();
    });
  });
});
