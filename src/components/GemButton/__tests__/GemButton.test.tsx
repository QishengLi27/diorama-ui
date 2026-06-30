import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { GemButton } from '../GemButton';

describe('GemButton', () => {
  describe('rendering', () => {
    it('renders children as button text', () => {
      render(<GemButton>Attack</GemButton>);
      expect(
        screen.getByRole('button', { name: 'Attack' })
      ).toBeInTheDocument();
    });

    it('renders with default gold accent', () => {
      render(<GemButton>Test</GemButton>);
      const btn = screen.getByRole('button');
      // The gold accent gradient class
      expect(btn.className).toContain('from-diorama-gold-light');
    });

    it('applies ruby accent styles', () => {
      render(<GemButton accent="ruby">Danger</GemButton>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('from-red-400');
    });

    it('applies sapphire accent styles', () => {
      render(<GemButton accent="sapphire">Magic</GemButton>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('from-blue-400');
    });

    it('applies emerald accent styles', () => {
      render(<GemButton accent="emerald">Heal</GemButton>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('from-green-400');
    });

    it('renders size variants', () => {
      const { rerender } = render(<GemButton size="sm">Small</GemButton>);
      expect(screen.getByRole('button').className).toContain('py-1');

      rerender(<GemButton size="lg">Large</GemButton>);
      expect(screen.getByRole('button').className).toContain('py-3');
    });

    it('supports aria-label for icon-only buttons', () => {
      render(<GemButton aria-label="Close dialog">×</GemButton>);
      expect(
        screen.getByRole('button', { name: 'Close dialog' })
      ).toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<GemButton onClick={onClick}>Click me</GemButton>);

      await user.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(
        <GemButton disabled onClick={onClick}>
          Disabled
        </GemButton>
      );

      await user.click(screen.getByRole('button'));

      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(
        <GemButton loading onClick={onClick}>
          Loading
        </GemButton>
      );

      await user.click(screen.getByRole('button'));

      expect(onClick).not.toHaveBeenCalled();
    });

    it('sets type="submit" when specified', () => {
      render(<GemButton type="submit">Submit</GemButton>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('defaults to type="button"', () => {
      render(<GemButton>Click</GemButton>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });
  });

  describe('states', () => {
    it('shows loading spinner when loading', () => {
      render(<GemButton loading>Saving</GemButton>);
      // The spinner is an animated span inside the button
      const btn = screen.getByRole('button');
      expect(btn.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('sets aria-busy when loading', () => {
      render(<GemButton loading>Saving</GemButton>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('applies disabled styles when disabled', () => {
      render(<GemButton disabled>Nope</GemButton>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('cursor-not-allowed');
      expect(btn.className).toContain('opacity-50');
    });

    it('applies disabled styles when loading', () => {
      render(<GemButton loading>Wait</GemButton>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('cursor-not-allowed');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<GemButton>Accessible Button</GemButton>);
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });

    it('is keyboard focusable', async () => {
      const user = userEvent.setup();
      render(<GemButton>Focus me</GemButton>);

      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });

    it('has focus-visible ring styles', () => {
      render(<GemButton>Focus</GemButton>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('focus-visible:ring-2');
    });
  });
});
