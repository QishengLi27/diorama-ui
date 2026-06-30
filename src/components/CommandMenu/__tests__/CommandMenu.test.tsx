import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { CommandMenu, type CommandItem } from '../CommandMenu';

const items: CommandItem[] = [
  { id: 'attack', label: 'Attack' },
  { id: 'skill', label: 'Skill' },
  { id: 'item', label: 'Item' },
  { id: 'flee', label: 'Flee', disabled: true },
];

function renderMenu(props = {}) {
  return render(
    <CommandMenu items={items} {...props} />
  );
}

describe('CommandMenu', () => {
  describe('rendering', () => {
    it('renders all items', () => {
      renderMenu();
      expect(screen.getByText('Attack')).toBeInTheDocument();
      expect(screen.getByText('Skill')).toBeInTheDocument();
      expect(screen.getByText('Item')).toBeInTheDocument();
      expect(screen.getByText('Flee')).toBeInTheDocument();
    });

    it('renders a title when provided', () => {
      renderMenu({ title: 'Battle' });
      expect(screen.getByText('Battle')).toBeInTheDocument();
    });

    it('does not render a title when omitted', () => {
      renderMenu();
      const menu = screen.getByRole('menu');
      // Title div has distinctive styling; verify it's absent
      expect(within(menu).queryByText('Battle')).not.toBeInTheDocument();
    });

    it('renders shortcuts when provided', () => {
      const withShortcuts: CommandItem[] = [
        { id: 'attack', label: 'Attack', shortcut: 'A' },
      ];
      render(<CommandMenu items={withShortcuts} />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('shows the selection cursor on the first item by default', () => {
      renderMenu({ showCursor: true });
      // The cursor ▶ should appear next to the first (selected) item
      const buttons = screen.getAllByRole('menuitem');
      expect(buttons[0]).toHaveTextContent('▶');
    });
  });

  describe('keyboard navigation', () => {
    it('selects the first item on Enter press', async () => {
      const onSelect = vi.fn();
      renderMenu({ onSelect });
      const user = userEvent.setup();

      await user.keyboard('{Enter}');

      expect(onSelect).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'attack' }),
        0
      );
    });

    it('navigates down with ArrowDown and selects', async () => {
      const onSelect = vi.fn();
      renderMenu({ onSelect });
      const user = userEvent.setup();

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(onSelect).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'skill' }),
        1
      );
    });

    it('skips disabled items on selection', async () => {
      const onSelect = vi.fn();
      renderMenu({ onSelect });
      const user = userEvent.setup();

      // Navigate to the last item (flee, disabled) and try to select
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
      await user.keyboard('{Enter}');

      // Should not be called for disabled items
      const fleeCalls = onSelect.mock.calls.filter(
        (call) => call[0].id === 'flee'
      );
      expect(fleeCalls).toHaveLength(0);
    });

    it('calls onCancel on Escape', async () => {
      const onCancel = vi.fn();
      renderMenu({ onCancel });
      const user = userEvent.setup();

      await user.keyboard('{Escape}');

      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('highlights the item matching selectedId prop', () => {
      renderMenu({ selectedId: 'skill' });
      const buttons = screen.getAllByRole('menuitem');

      // The skill button (index 1) should be focused/tabbable
      expect(buttons[1]).toHaveAttribute('tabindex', '0');
    });
  });

  describe('mouse interaction', () => {
    it('selects an item on click', async () => {
      const onSelect = vi.fn();
      renderMenu({ onSelect });
      const user = userEvent.setup();

      await user.click(screen.getByText('Item'));

      expect(onSelect).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'item' }),
        2
      );
    });

    it('does not select disabled items on click', async () => {
      const onSelect = vi.fn();
      renderMenu({ onSelect });
      const user = userEvent.setup();

      await user.click(screen.getByText('Flee'));

      expect(onSelect).not.toHaveBeenCalled();
    });

    it('highlights item on hover', async () => {
      renderMenu();
      const user = userEvent.setup();

      await user.hover(screen.getByText('Skill'));

      const buttons = screen.getAllByRole('menuitem');
      expect(buttons[1]).toHaveAttribute('tabindex', '0');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = renderMenu({ title: 'Battle' });
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });

    it('has role="menu" on the container', () => {
      renderMenu();
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('has role="menuitem" on each item', () => {
      renderMenu();
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(4);
    });

    it('sets aria-orientation to vertical', () => {
      renderMenu();
      expect(screen.getByRole('menu')).toHaveAttribute(
        'aria-orientation',
        'vertical'
      );
    });
  });
});
