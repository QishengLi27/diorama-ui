# 🎭 Diorama UI

A React UI library inspired by the **HD-2D JRPG aesthetic** — think ornate gold frames, parchment panels, gem buttons, and pixel-perfect borders.

Built for game developers, narrative web experiences, and anyone who wants their UI to feel like a Square Enix menu.

> 🚧 **Project Status: Work in Progress**
>
> This library is currently under active development and **has not been published to npm yet**. The API, component set, and theming system may change as the project evolves.
>
> You can already build it from source and try the components locally. See the [Development](#-development) section below.

## ✨ Features

- **JRPG-first components**: `DialogueBox`, `CommandMenu`, `StatusPanel`
- **HD-2D visual system**: parchment, gold trim, gem accents, subtle scanlines
- **Keyboard-driven menus**: Arrow keys, Enter, Escape — just like the classics
- **Accessible**: semantic roles, keyboard navigation, focus management
- **TypeScript-first**: fully typed components and hooks

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

| Component | Description | Status |
|---|---|---|
| `DialogueBox` | Typewriter dialogue with speaker, portrait, and continue prompts | ✅ Implemented |
| `CommandMenu` | Vertical JRPG menu with keyboard navigation | ✅ Implemented |
| `StatusPanel` | Character status card with HP/MP/XP bars | ✅ Implemented |

## 🛣 Roadmap

See [ROADMAP.md](./ROADMAP.md) for the full development plan.

High-level upcoming work:

- [ ] `InventoryGrid` with rarity glow
- [ ] `ShopPanel` buy/sell interface
- [ ] `SaveFileCard` save slot UI
- [ ] `WorldMapMarker` animated quest markers
- [ ] Vue / Svelte wrappers

## 📄 License

MIT
