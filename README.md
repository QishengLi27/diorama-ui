# 🎭 Diorama UI

A React UI library inspired by the **HD-2D JRPG aesthetic** — think ornate gold frames, parchment panels, gem buttons, and pixel-perfect borders.

Built for game developers, narrative web experiences, and anyone who wants their UI to feel like a Square Enix menu.

## ✨ Features

- **JRPG-first components**: `DialogueBox`, `CommandMenu`, `StatusPanel`
- **HD-2D visual system**: parchment, gold trim, gem accents, subtle scanlines
- **Keyboard-driven menus**: Arrow keys, Enter, Escape — just like the classics
- **Accessible**: semantic roles, keyboard navigation, focus management
- **TypeScript-first**: fully typed components and hooks

## 🚀 Installation

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

## 🧪 Storybook

```bash
pnpm install
pnpm storybook
```

## 📦 Components

| Component | Description |
|---|---|
| `DialogueBox` | Typewriter dialogue with speaker, portrait, and continue prompts |
| `CommandMenu` | Vertical JRPG menu with keyboard navigation |
| `StatusPanel` | Character status card with HP/MP/XP bars |

## 🛣 Roadmap

- [ ] `InventoryGrid` with rarity glow
- [ ] `ShopPanel` buy/sell interface
- [ ] `SaveFileCard` save slot UI
- [ ] `WorldMapMarker` animated quest markers
- [ ] Vue / Svelte wrappers

## 📄 License

MIT
