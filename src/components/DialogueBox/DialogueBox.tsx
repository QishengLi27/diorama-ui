import React, { useCallback } from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import '../../styles/index.css';

export interface DialogueMessage {
  speaker?: string;
  text: string;
  portrait?: React.ReactNode;
}

export interface DialogueBoxProps {
  messages: DialogueMessage[];
  currentIndex?: number;
  onAdvance?: (nextIndex: number) => void;
  onComplete?: () => void;
  typingSpeed?: number;
  className?: string;
  skipOnClick?: boolean;
  showContinueIndicator?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  messages,
  currentIndex = 0,
  onAdvance,
  onComplete,
  typingSpeed = 28,
  className = '',
  skipOnClick = true,
  showContinueIndicator = true,
}) => {
  const message = messages[currentIndex];
  const isLast = currentIndex >= messages.length - 1;

  const handleComplete = useCallback(() => {
    if (isLast) {
      onComplete?.();
    }
  }, [isLast, onComplete]);

  const { displayed, isComplete, skip } = useTypewriter({
    text: message?.text ?? '',
    speed: typingSpeed,
    enabled: true,
    onComplete: handleComplete,
  });

  const handleClick = useCallback(() => {
    if (!isComplete) {
      skip();
      return;
    }

    if (isLast) {
      onComplete?.();
    } else {
      onAdvance?.(currentIndex + 1);
    }
  }, [isComplete, skip, isLast, onComplete, onAdvance, currentIndex]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  if (!message) return null;

  return (
    <div
      role="dialog"
      aria-label={message.speaker ? `${message.speaker}: ${message.text}` : message.text}
      aria-live="polite"
      tabIndex={0}
      onClick={skipOnClick ? handleClick : undefined}
      onKeyDown={handleKeyDown}
      className={`
        diorama-frame diorama-scanlines
        flex gap-4 rounded-diorama p-5 outline-none
        ${className}
      `}
    >
      {message.portrait && (
        <div className="diorama-inset flex h-20 w-20 shrink-0 items-center justify-center rounded-sm border-2 border-diorama-ink">
          {message.portrait}
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {message.speaker && (
          <div className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-diorama-gold-dark">
            {message.speaker}
          </div>
        )}

        <div className="min-h-[3.5rem] font-pixel text-xs leading-6 text-diorama-ink">
          {displayed}
          {!isComplete && (
            <span className="ml-1 inline-block h-3 w-2 animate-pulse bg-diorama-ink" />
          )}
        </div>

        <div className="mt-3 flex h-4 items-end justify-end">
          {showContinueIndicator && isComplete && !isLast && (
            <span className="animate-cursor-bounce text-xs text-diorama-gold-dark">▼</span>
          )}
          {showContinueIndicator && isComplete && isLast && (
            <span className="text-xs text-diorama-ink-light">End</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
