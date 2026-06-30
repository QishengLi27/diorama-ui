import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { axe } from 'jest-axe';
import { DialogueBox, type DialogueMessage } from '../DialogueBox';

const singleMessage: DialogueMessage[] = [
  { speaker: 'Olberic', text: 'I am a warrior.' },
];

const multipleMessages: DialogueMessage[] = [
  { speaker: 'Olberic', text: 'Hello.' },
  { speaker: 'Primrose', text: 'Goodbye.' },
];

const messageWithPortrait: DialogueMessage[] = [
  {
    speaker: 'Olberic',
    text: 'Stand ready.',
    portrait: <span data-testid="portrait">🛡️</span>,
  },
];

function renderDialogue(props = {}) {
  return render(
    <DialogueBox messages={singleMessage} {...props} />
  );
}

/** Advance fake timers past any typewriter animation */
function completeTypewriter() {
  act(() => {
    vi.advanceTimersByTime(10000);
  });
}

describe('DialogueBox', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('renders the speaker name', () => {
      renderDialogue();
      completeTypewriter();
      expect(screen.getByText('Olberic')).toBeInTheDocument();
    });

    it('renders the full dialogue text after typewriter completes', () => {
      renderDialogue();
      completeTypewriter();
      expect(screen.getByText('I am a warrior.')).toBeInTheDocument();
    });

    it('renders a portrait when provided', () => {
      render(
        <DialogueBox messages={messageWithPortrait} />
      );
      completeTypewriter();
      expect(screen.getByTestId('portrait')).toBeInTheDocument();
    });

    it('does not render speaker element when speaker is omitted', () => {
      const noSpeaker: DialogueMessage[] = [
        { text: 'A mysterious voice...' },
      ];
      render(<DialogueBox messages={noSpeaker} />);
      completeTypewriter();
      // Verify the text is shown but no speaker name with tracking-wider class
      expect(
        screen.getByText('A mysterious voice...')
      ).toBeInTheDocument();
      // The speaker area uses uppercase + tracking-wider — should not exist
      const speakerAreas = document.querySelectorAll('.tracking-widest');
      expect(speakerAreas).toHaveLength(0);
    });

    it('renders nothing when messages array is empty', () => {
      const { container } = render(<DialogueBox messages={[]} />);
      expect(
        container.querySelector('[role="dialog"]')
      ).not.toBeInTheDocument();
    });

    it('shows a cursor blink while typing is in progress', () => {
      renderDialogue();
      // Should have a pulsing cursor element (the inline-block animate-pulse span)
      const cursor = document.querySelector('.animate-pulse');
      expect(cursor).toBeInTheDocument();
    });
  });

  describe('message advancing', () => {
    it('shows the continue indicator when text is complete and there are more messages', () => {
      render(<DialogueBox messages={multipleMessages} />);
      completeTypewriter();
      expect(screen.getByText('▼')).toBeInTheDocument();
    });

    it('shows "End" indicator on the last message', () => {
      renderDialogue();
      completeTypewriter();
      expect(screen.getByText('End')).toBeInTheDocument();
    });

    it('hides continue indicator when showContinueIndicator is false', () => {
      render(
        <DialogueBox
          messages={multipleMessages}
          showContinueIndicator={false}
        />
      );
      completeTypewriter();
      expect(screen.queryByText('▼')).not.toBeInTheDocument();
      expect(screen.queryByText('End')).not.toBeInTheDocument();
    });

    it('calls onAdvance when clicking after text completes', () => {
      const onAdvance = vi.fn();
      render(
        <DialogueBox messages={multipleMessages} onAdvance={onAdvance} />
      );
      completeTypewriter();

      fireEvent.click(screen.getByRole('dialog'));

      expect(onAdvance).toHaveBeenCalledWith(1);
    });

    it('calls onComplete when clicking on the last message', () => {
      const onComplete = vi.fn();
      renderDialogue({ onComplete });
      completeTypewriter();

      // onComplete fires once from typewriter finishing (isLast + isComplete),
      // then again from the click on the last message
      fireEvent.click(screen.getByRole('dialog'));

      expect(onComplete).toHaveBeenCalledTimes(2);
    });
  });

  describe('skip behavior', () => {
    it('skips typing animation on click before completion', () => {
      renderDialogue();

      // Only partially through typing
      act(() => {
        vi.advanceTimersByTime(100);
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog.textContent).not.toContain('End');

      // Click to skip
      fireEvent.click(dialog);

      // Text should now be complete
      expect(screen.getByText('I am a warrior.')).toBeInTheDocument();
      expect(screen.getByText('End')).toBeInTheDocument();
    });

    it('does not skip on click when skipOnClick is false', () => {
      render(
        <DialogueBox messages={singleMessage} skipOnClick={false} />
      );

      act(() => {
        vi.advanceTimersByTime(100);
      });

      // Clicking should do nothing — skip is disabled
      fireEvent.click(screen.getByRole('dialog'));

      // Text should still be incomplete (no End indicator)
      const dialog = screen.getByRole('dialog');
      expect(dialog.textContent).not.toContain('End');
    });
  });

  describe('keyboard interaction', () => {
    it('advances on Enter key', () => {
      const onAdvance = vi.fn();
      render(
        <DialogueBox messages={multipleMessages} onAdvance={onAdvance} />
      );
      completeTypewriter();

      fireEvent.keyDown(screen.getByRole('dialog'), {
        key: 'Enter',
        code: 'Enter',
      });

      expect(onAdvance).toHaveBeenCalledWith(1);
    });

    it('advances on Space key', () => {
      const onAdvance = vi.fn();
      render(
        <DialogueBox messages={multipleMessages} onAdvance={onAdvance} />
      );
      completeTypewriter();

      fireEvent.keyDown(screen.getByRole('dialog'), {
        key: ' ',
        code: 'Space',
      });

      expect(onAdvance).toHaveBeenCalledWith(1);
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      // axe-core needs real timers for internal scheduling;
      // temporarily restore them for this test only
      vi.useRealTimers();

      const { container } = render(
        <DialogueBox messages={singleMessage} />
      );

      // Let typewriter complete with real timers
      await new Promise((r) => setTimeout(r, 500));

      const results = await axe(container);
      expect(results.violations).toHaveLength(0);

      // Clean up — restore fake timers for remaining tests
      vi.useFakeTimers();
    }, 10000);

    it('has role="dialog"', () => {
      renderDialogue();
      completeTypewriter();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-live="polite" for screen reader announcements', () => {
      renderDialogue();
      completeTypewriter();
      expect(screen.getByRole('dialog')).toHaveAttribute(
        'aria-live',
        'polite'
      );
    });

    it('is keyboard focusable', () => {
      renderDialogue();
      completeTypewriter();
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('tabindex', '0');
    });
  });
});
