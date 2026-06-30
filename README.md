# 🎭 Diorama UI

A React UI library inspired by the **HD-2D JRPG aesthetic** — think ornate gold frames, parchment panels, gem buttons, and pixel-perfect borders.

Built for game developers, narrative web experiences, and anyone who wants their UI to feel like a Square Enix menu.

> 🚧 **Project Status: Work in Progress**
>
> This library is currently under active development and **has not been published to npm yet**. The API, component set, and theming system may change as the project evolves.
>
> You can already build it from source and try the components locally. See the [Development](#-development) section below.

## ✨ Features

- **64 planned components** across 10 categories: atoms, layout, forms, data display, feedback, and game-specific systems
- **9 implemented** — see [ROADMAP.md](./ROADMAP.md) for status
- **HD-2D visual system**: parchment, gold trim, gem accents, subtle scanlines
- **Keyboard-driven menus**: Arrow keys, Enter, Escape — just like the classics
- **Accessible**: semantic roles, keyboard navigation, focus management, automated a11y audits
- **TypeScript-first**: fully typed components and hooks
- **Tested**: 82 tests covering hooks, components, and accessibility

## 🚀 Installation

> **Note:** `diorama-ui` is not yet available on npm. The instructions below will work once the package is published.

```bash
npm install diorama-ui
# or
pnpm add diorama-ui
# or
yarn add diorama-ui
```

Import the styles once in your app entry:

```tsx
import 'diorama-ui/styles.css';
```

## 🧩 Usage

```tsx
import { DialogueBox, CommandMenu, StatusPanel } from 'diorama-ui';

function App() {
  return (
    <div className="p-8">
      <StatusPanel
        name="Olberic"
        level={32}
        hp={{ current: 2400, max: 3200 }}
        mp={{ current: 120, max: 180 }}
        portrait={<span>🛡️</span>}
      />

      <CommandMenu
        title="Command"
        items={[
          { id: 'attack', label: 'Attack' },
          { id: 'skill', label: 'Skill' },
          { id: 'item', label: 'Item' },
        ]}
        onSelect={(item) => console.log(item.label)}
      />

      <DialogueBox
        messages={[
          { speaker: 'Olberic', text: 'The path of a warrior is paved with trials.' },
        ]}
      />
    </div>
  );
}
```

## 🛠 Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/QishengLi27/diorama-ui.git
cd diorama-ui
npm install
```

Run Storybook to explore the components:

```bash
npm run storybook
```

Build the library locally:

```bash
npm run build
```

To use your local build in another project:

```bash
cd /path/to/diorama-ui
npm link

cd /path/to/your-project
npm link diorama-ui
```

Then import from `diorama-ui` as shown in the [Usage](#-usage) section.

## 🧪 Storybook

```bash
pnpm install
pnpm storybook
```

## 📦 Components

### ✅ Implemented (9/64)

| Component | Category | Description |
|---|---|---|
| `DialogueBox` | Game Systems | Typewriter dialogue with speaker, portrait, and continue prompts |
| `CommandMenu` | Navigation | Vertical JRPG menu with full keyboard navigation |
| `StatusPanel` | Data Display | Character status card with HP/MP/XP bars |
| `GemButton` | Atoms | Gem-styled button with press animation, 4 accent variants |
| `PixelText` | Atoms | Pixel-font text with configurable variant and color |
| `DisplayText` | Atoms | Serif display font for titles with gold accent underline |
| `OrnateDivider` | Atoms | Decorated horizontal rule with gem/rune ornament |
| `RuneIcon` | Atoms | 28 inline rune/glyph icons with gem-glow styling |
| `PortraitAvatar` | Atoms | Character portrait with rarity-glow border |

### 🔜 Next Up (Phase 2 — Layout)

| Component | Description |
|---|---|
| `FramePanel` | Base parchment container with gold double-border |
| `SlotGrid` | CSS Grid wrapper for inventory/item slots |
| `SplitPanel` | Resizable two-pane layout |
| `TabSelector` | JRPG-style tabs with slide animation |
| `ScrollPanel` | Scrollable panel with faded edge indicators |
| `AccordionTome` | Expandable sections styled as a tome/book |

## 🧪 Testing

```bash
npm test              # run all tests (CI mode)
npm run test:watch    # watch mode for development
npm run test:ui       # visual test runner UI
npm run test:coverage # run with coverage report
```

### Test Stack

| Tool | Purpose |
|---|---|
| [Vitest](https://vitest.dev) | Test runner — fast, Vite-native, same transform pipeline as the build |
| [React Testing Library](https://testing-library.com/react) | Component tests from the user's perspective |
| [jest-axe](https://github.com/nickcolley/jest-axe) | Automated accessibility audits per component |
| [jsdom](https://github.com/jsdom/jsdom) | Browser-like DOM environment |

### Test Pattern

Every component follows this structure and testing pattern:

```
src/components/ComponentName/
├── ComponentName.tsx          # Component source
└── __tests__/
    └── ComponentName.test.tsx # Tests
```

Each test file covers four areas:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { YourComponent } from '../YourComponent';

describe('YourComponent', () => {
  // 1. Rendering — does it render all expected elements?
  describe('rendering', () => {
    it('renders children', () => { /* ... */ });
    it('renders with different variants', () => { /* ... */ });
  });

  // 2. Interaction — do clicks/keyboard work correctly?
  describe('interaction', () => {
    it('calls onClick when clicked', async () => { /* ... */ });
    it('responds to keyboard input', async () => { /* ... */ });
  });

  // 3. States — are loading, disabled, empty, error states correct?
  describe('states', () => {
    it('shows loading state', () => { /* ... */ });
    it('disables interaction when disabled', () => { /* ... */ });
  });

  // 4. Accessibility — does it pass automated audit?
  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<YourComponent />);
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });
});
```

### Hooks

Pure logic hooks are tested with `renderHook` and fake timers:

```
src/hooks/
├── useTypewriter.ts
├── useKeyboardNavigation.ts
└── __tests__/
    ├── useTypewriter.test.ts
    └── useKeyboardNavigation.test.ts
```

### Current Coverage

- **82 tests** across 5 test files
- 2 hooks tested (timing, edge cases, cleanup)
- 3 interactive components tested (rendering, interaction, states, a11y)
- Every component must pass `jest-axe` audit

## 🛣 Roadmap

See [ROADMAP.md](./ROADMAP.md) for the full 64-component plan across 10 phases:

| Phase | Focus | Components |
|---|---|---|
| 0 | Foundation | Tests, CI, a11y audits |
| 1 | Atoms | GemButton, PixelText, DisplayText, OrnateDivider, RuneIcon, PortraitAvatar |
| 2 | Layout | FramePanel, SlotGrid, SplitPanel, TabSelector, ScrollPanel, AccordionTome |
| 3 | Forms | DioramaInput, DioramaSelect, ToggleGem, CheckboxRune, RadioRune, GemSlider, StatStepper, DioramaForm, SearchRune |
| 4 | Data Display | ItemCard, InventoryGrid, RarityBadge, TooltipRune, ScrollList, SkillTree, DataTable, and more |
| 5 | Feedback | ModalPanel, ConfirmDialog, ToastRune, AlertBanner, LoadingCrystal, SkeletonRune, and more |
| 6 | Game Systems | ShopPanel, BattleMenu, TargetSelector, DamageNumber, DialogTree, QuestLog, BestiaryEntry, and more |
| 7 | Theming | DioramaProvider, CSS variables, dark/light modes, component variants |
| 8 | Interactions | Animations, sound hooks, transitions |
| 9 | Advanced | CutsceneTimeline, MiniMap, CraftingPanel, TitleScreen, CodexBrowser |
| 10 | Ecosystem | Vue/Svelte wrappers, Figma kit, community examples |

## 📄 License

MIT
