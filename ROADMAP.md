# 🗺️ Diorama UI Roadmap & Plan

> A living plan for turning **Diorama UI** from a small side project into a polished, publishable React component library for HD-2D / JRPG-style interfaces.

---

## 1. Vision

**Diorama UI** is a React UI library that captures the aesthetic of modern HD-2D JRPGs — ornate gold frames, parchment panels, glowing gem accents, pixel fonts, and keyboard-driven menus.

**Target users:**
- Indie game developers building web-based RPGs, visual novels, or menu systems
- Narrative web experiences that want a fantasy / retro UI feel
- Designers and prototypers looking for Square-Enix-inspired components

**Success looks like:**
- A stable `v1.0` on npm with 60+ high-quality components across all UI categories
- Full TypeScript support and accessible keyboard navigation
- Storybook documentation with interactive examples
- A small but clear visual identity and theming system

---

## 2. Current State

| Area | Status | Notes |
|------|--------|-------|
| Components | 3 shipped | `DialogueBox`, `CommandMenu`, `StatusPanel` |
| Hooks | 2 shipped | `useTypewriter`, `useKeyboardNavigation` |
| Build | Working | Vite lib mode, ESM + UMD, d.ts generation |
| Styling | Good start | Tailwind theme with custom colors, fonts, shadows |
| Docs | Minimal | README + Storybook stories |
| Tests | None | No unit or visual tests yet |
| CI/CD | None | Manual build/publish only |
| Accessibility | Partial | Keyboard nav present, needs audit |

---

## 3. Phased Roadmap

### Phase 0 — Foundation (~1–2 weeks)
*Goal: Make the existing library robust and professional enough to ship patch releases.*

- [ ] Add automated tests
  - Unit tests for hooks (`useTypewriter`, `useKeyboardNavigation`) with Vitest
  - Component tests with React Testing Library
  - Accessibility checks with Storybook a11y addon or jest-axe
- [ ] Set up CI/CD
  - GitHub Actions: lint, typecheck, test, build on PR
  - Automated release workflow (optional but recommended)
- [ ] Improve accessibility
  - Audit `DialogueBox` (`aria-live`, focus trapping, announced progress)
  - Audit `CommandMenu` (roving tabindex, `aria-activedescendant`, screen reader behavior)
  - Audit `StatusPanel` (`role="progressbar"`, color contrast)
- [ ] Polish existing components
  - Consistent prop naming and behavior
  - Better empty / loading / error states
  - Standardize `className` override behavior
- [ ] Documentation
  - Expand Storybook with all prop variations
  - Add usage examples for each component
  - Write a short "Theming" guide

**Deliverable:** `v0.2.0` — stable, tested, documented foundation.

---

### Phase 1 — General / Atoms (~2–3 weeks)
*Goal: Build the foundational primitives every other component depends on.*

- [ ] `GemButton`
  - Gem-styled button with press animation (reuses `diorama-gem` CSS)
  - Variants: `gold`, `ruby`, `sapphire`, `emerald`
  - Sizes: `sm`, `md`, `lg`
  - Loading state with crystal spinner
  - Disabled state (dimmed gem)
- [ ] `PixelText`
  - Text with pixel font (`Press Start 2P`)
  - Configurable size, color, weight
  - Optional typewriter child animation
  - Props: `variant` (`body`, `caption`, `label`, `heading`)
- [ ] `DisplayText`
  - Display serif font (`Cinzel`) for titles/headings
  - Gold accent underline option
  - Sizes: `h1` through `h6`
- [ ] `OrnateDivider`
  - Decorated horizontal rule with gem/rune ornament in center
  - Variants: `gold` (default), `ruby`, `sapphire`, `emerald`
  - Optional label text centered on the divider
- [ ] `RuneIcon`
  - Small inline rune/glyph icons (CSS/unicode, no icon lib dependency)
  - Built-in rune set: sword, shield, potion, star, heart, arrow-up/down, etc.
  - Color tinting via `accent` prop
- [ ] `PortraitAvatar`
  - Character portrait in a framed inset with border glow by rarity
  - Sizes: `sm`, `md`, `lg`
  - Rarity glow: `common`, `rare`, `epic`, `legendary`
  - Fallback placeholder when no portrait provided

**Deliverable:** `v0.3.0` — atomic primitives ready.

---

### Phase 2 — Layout & Containers (~2–3 weeks)
*Goal: Provide structural components for composing game screens.*

- [ ] `FramePanel`
  - Base container: parchment background, gold double-border, scanlines
  - Extends the existing `diorama-frame` CSS class
  - Props: `padding`, `accent`, `noScanlines`
- [ ] `SlotGrid`
  - CSS Grid wrapper for inventory/item slots
  - Props: `columns`, `gap`, `slotSize`
  - Responsive column count
- [ ] `SplitPanel`
  - Resizable two-pane layout (e.g., equipment left, stats right)
  - Drag handle styled as gem or rune
  - Props: `direction` (`horizontal` | `vertical`), `initialRatio`, `minSize`
- [ ] `TabSelector`
  - JRPG-style tabs with slide animation on selection change
  - Tabs styled as parchment flaps or gem-nubs
  - Props: `items`, `activeTab`, `onChange`
- [ ] `ScrollPanel`
  - Scrollable parchment panel with faded top/bottom edges indicating more content
  - Custom scrollbar styled as gold trim
  - Props: `maxHeight`, `fadeEdges`
- [ ] `AccordionTome`
  - Expandable sections styled like a tome/book with page-flip indicator
  - Single or multi-expand modes
  - Props: `items` (title + content), `variant` (`book` | `scroll`)

**Deliverable:** `v0.4.0` — layout primitives ready.

---

### Phase 3 — Data Entry / Forms (~3–4 weeks)
*Goal: Form controls styled for JRPG menus and settings screens.*

- [ ] `DioramaInput`
  - Text input with parchment bg, gold focus ring, pixel font cursor
  - Props: `prefix`, `suffix`, `error`, `placeholder`
  - Variants: `default`, `filled`, `underlined`
- [ ] `DioramaSelect`
  - Dropdown select with gem-toggle open, parchment option list
  - Keyboard navigable (uses `useKeyboardNavigation`)
  - Props: `options`, `value`, `onChange`, `placeholder`
- [ ] `ToggleGem`
  - Toggle switch styled as glowing gem (on) / dim gem (off)
  - Animated gem glow transition
  - Props: `checked`, `onChange`, `accent`, `disabled`
- [ ] `CheckboxRune`
  - Checkbox marked with a glowing rune when checked
  - Props: `checked`, `onChange`, `label`, `indeterminate`
- [ ] `RadioRune`
  - Radio group with rune-selection indicator
  - Props: `options`, `value`, `onChange`, `direction` (`horizontal` | `vertical`)
- [ ] `GemSlider`
  - Range slider with gem thumb, gold track
  - Props: `min`, `max`, `value`, `onChange`, `step`, `showValue`
- [ ] `StatStepper`
  - +/- stepper for stat allocation, with gem buttons
  - Props: `value`, `onChange`, `min`, `max`, `step`
- [ ] `DioramaForm`
  - Form wrapper with validation errors styled as torn-parchment alerts
  - Props: `layout` (`vertical` | `horizontal`), `labelWidth`
  - `DioramaForm.Item` sub-component for field wrappers
- [ ] `SearchRune`
  - Search input with glowing-rune clear/reset button
  - Props: `onSearch`, `placeholder`, `loading`
  - Debounced search support

**Deliverable:** `v0.5.0` — full form system.

---

### Phase 4 — Data Display (~3–4 weeks)
*Goal: Display components for inventory, stats, lists, and item presentation.*

- [ ] `ItemCard`
  - Single item display: icon, name, rarity glow, stack count
  - Props: `item` (icon, name, rarity, count), `size`, `onClick`
- [ ] `InventoryGrid`
  - Slot-based item grid with selection cursor, hover glow, rarity borders
  - Props: `items`, `columns`, `selectedId`, `onSelect`, `onUse`
  - Empty slot states with `EmptySlot` placeholder
- [ ] `RarityBadge`
  - Small pill showing item rarity (`Common` → `Legendary`) with color coding
  - Props: `rarity`, `size`
  - Rarity scale: `junk`, `common`, `uncommon`, `rare`, `epic`, `legendary`
- [ ] `TooltipRune`
  - Hover tooltip styled as a floating parchment scrap
  - Props: `title`, `placement`, `trigger` (`hover` | `focus` | `click`)
  - Animated fade-in/out
- [ ] `PopoverPanel`
  - Click-triggered popup panel with ornate frame
  - Props: `content`, `title`, `placement`, `onClose`
- [ ] `ScrollList`
  - Vertical scrolling list with keyboard nav, selection highlight, scroll fade
  - Props: `items`, `renderItem`, `selectedId`, `onSelect`
  - Built-in `useKeyboardNavigation` integration
- [ ] `SkillTree`
  - Radial or left-to-right skill tree with connected nodes
  - Props: `tree` (nodes + edges), `unlockedIds`, `onNodeClick`
  - Connector lines styled as glowing rune-threads
- [ ] `DataTable`
  - Parchment table with sortable columns, striped rows
  - Props: `columns`, `data`, `sortable`, `rowSelection`
- [ ] `EmptySlot`
  - Placeholder for empty inventory slot, empty save file, etc.
  - Props: `label`, `icon`, `size`
- [ ] `StatSheet`
  - Label-value pairs for detailed stats (e.g., "ATK: 240", "DEF: 180")
  - Props: `stats` (array of `{ label, value }`), `columns`
- [ ] `FramedImage`
  - Image wrapped in ornate frame, with loading skeleton
  - Props: `src`, `alt`, `frameStyle` (`gold` | `silver` | `parchment`)
- [ ] `GalleryCarousel`
  - Horizontal item carousel with gem page indicators
  - Props: `items`, `autoplay`, `interval`
- [ ] `CalendarPanel`
  - In-game calendar styled as an aged tome page
  - Props: `date`, `events`, `onSelectDate`
  - Custom era/month/day naming (e.g., "Year of the Dragon, Harvest Moon, Day 14")

**Deliverable:** `v0.6.0` — rich data display system.

---

### Phase 5 — Feedback & Overlays (~2–3 weeks)
*Goal: Notifications, modals, loading states, and user feedback.*

- [ ] `ModalPanel`
  - Centered parchment modal with gold frame, backdrop blur, Escape to close
  - Props: `open`, `onClose`, `title`, `footer`, `width`
  - Focus trap, `aria-modal`
- [ ] `ConfirmDialog`
  - "Are you sure?" dialog with `GemButton` confirm/cancel
  - Props: `open`, `title`, `message`, `onConfirm`, `onCancel`, `confirmText`, `danger`
- [ ] `ToastRune`
  - Brief corner notification (e.g., "Item obtained!") with auto-dismiss
  - Props: `message`, `type` (`info` | `success` | `warning` | `error`), `duration`
  - Stacking toasts, dismissible
  - Static method: `ToastRune.show({ message, type })`
- [ ] `NoticeBoard`
  - Persistent notification panel (e.g., quest updates, system messages)
  - Props: `notices`, `onDismiss`, `maxItems`
- [ ] `AlertBanner`
  - Full-width banner for warnings/errors, styled as torn scroll
  - Props: `type` (`info` | `warning` | `error` | `success`), `message`, `closable`
- [ ] `ResultPanel`
  - Success/failure/level-up screen with icon, title, description, action slot
  - Props: `status` (`success` | `error` | `info` | `levelUp`), `title`, `description`, `extra`
- [ ] `LoadingCrystal`
  - Spinning crystal loading indicator (replaces boring spinner)
  - Props: `size`, `tip` (loading text)
  - Variants: `fullscreen`, `inline`, `overlay`
- [ ] `SkeletonRune`
  - Placeholder shimmer for loading content
  - Props: `variant` (`text` | `rect` | `circle` | `card`), `width`, `height`
- [ ] `ProgressTrack`
  - Multi-segment progress bar (quest progress, download progress)
  - Props: `percent`, `segments`, `showLabel`, `accent`
  - Distinct visual from HP/MP bars (more ornate, segmented)

**Deliverable:** `v0.7.0` — full feedback system.

---

### Phase 6 — Game-Specific Systems (~4–6 weeks)
*Goal: Components built specifically for JRPG game interfaces.*

- [ ] `ShopPanel`
  - Buy/sell interface with tabs, item list, prices, currency display
  - Props: `shopItems`, `playerGold`, `onBuy`, `onSell`
  - Quantity stepper, confirm dialog
- [ ] `SaveFileCard`
  - Save slot card: chapter, playtime, level, screenshot preview
  - Props: `saveData`, `selected`, `empty`, `onSelect`, `onDelete`
  - Empty/new slot state
- [ ] `WorldMapMarker`
  - Animated map marker with pulse, tooltip, configurable icon
  - Props: `position`, `icon`, `label`, `pulsing`, `onClick`
- [ ] `BattleMenu`
  - Fight / Magic / Item / Flee command ring, distinct from `CommandMenu`
  - Props: `commands`, `onSelect`, `variant` (`ring` | `list`)
  - Supports sub-menus (e.g., Magic → Fire / Ice / Heal)
- [ ] `TargetSelector`
  - Cursor-based enemy/ally selection with arrow indicator
  - Props: `targets`, `selectedId`, `onSelect`, `mode` (`enemy` | `ally`)
- [ ] `DamageNumber`
  - Floating damage/heal numbers, pop up and fade, configurable color
  - Props: `value`, `type` (`damage` | `heal` | `crit` | `miss`), `duration`
- [ ] `TurnOrder`
  - Horizontal row of character icons showing turn sequence with "current" highlight
  - Props: `units`, `currentIndex`
- [ ] `PartyPanel`
  - Vertical party member list with HP/MP compact bars and status icons
  - Props: `members`, `onSelect`
- [ ] `EquipmentSlot`
  - Single equipment slot with item icon, empty state, drag target
  - Props: `slotType` (`weapon` | `armor` | `accessory`), `equippedItem`, `onUnequip`
- [ ] `EquipmentPanel`
  - Full equipment screen: weapon/armor/accessory slots around a portrait
  - Props: `portrait`, `slots`, `stats`, `onUnequip`
- [ ] `DialogTree`
  - Branching dialogue system (extends `DialogueBox`) with choice injection
  - Props: `tree`, `onChoice`, `onEnd`
  - Supports conditions, flags, and branching
- [ ] `QuestLog`
  - Quest journal styled as a book with flipping pages
  - Props: `quests`, `activeQuestId`, `onSelect`
  - Complete/incomplete markers, progress indicators
- [ ] `BestiaryEntry`
  - Single monster entry: sprite, stats, flavor text, drops list
  - Props: `monster`, `encountered` (boolean)

**Deliverable:** `v0.8.0` — full game UI system.

---

### Phase 7 — Theming & Customization (~2–3 weeks)
*Goal: Let users make Diorama UI feel like **their** game, not just the default style.*

- [ ] Theme provider (`DioramaProvider`)
  - Override colors, fonts, border radius, shadows
  - Support light/dark/auto modes
- [ ] CSS variables architecture
  - Move hard-coded Tailwind values to CSS custom properties
  - Allow runtime theme switching without rebuilding
- [ ] Component-level variants
  - e.g. `CommandMenu` themes: `default`, `minimal`, `gem`, `dark`
- [ ] Better font loading story
  - Document Google Fonts setup
  - Provide font-free fallback styles

**Deliverable:** `v0.9.0` — fully themeable library.

---

### Phase 8 — Advanced Interactions (~3–4 weeks)
*Goal: Add motion, sound, and deeper game-like behavior.*

- [ ] Animation primitives
  - Panel open/close transitions
  - Page/slide transitions
  - Number tick animations for HP/MP changes
- [ ] Sound hook (`useSound`)
  - Optional audio feedback on menu navigation, select, cancel
  - No audio assets bundled; users provide their own
- [ ] Form elements with JRPG styling (already covered in Phase 3, enhance here)
  - Animation polish on inputs, selects, toggles

**Deliverable:** `v0.10.0` — rich interactions and animation layer.

---

### Phase 9 — Advanced Components (~future)
*Goal: Large, complex components for ambitious game projects.*

- [ ] `CutsceneTimeline`
  - Timeline sequencer for scripted dialog + animation events
- [ ] `MiniMap`
  - Corner minimap with player indicator, fog of war overlay
- [ ] `CraftingPanel`
  - Recipe list + ingredient slots + craft button + result animation
- [ ] `AuctionHouse`
  - Browse/search/bid interface for player marketplace
- [ ] `LeaderboardTable`
  - Ranked list with player name, score, ornate crown for #1
- [ ] `TitleScreen`
  - Full-screen title with animated logo, "Press Start" blink, menu options
- [ ] `SettingsPanel`
  - Settings with `GemSlider` (volume), `ToggleGem` (fullscreen), etc.
- [ ] `CodexBrowser`
  - Categorized encyclopedia with search, cross-references

**Deliverable:** `v1.0.0` — mature, comprehensive UI ecosystem.

---

### Phase 10 — Framework Expansion & Ecosystem (~future)
*Goal: Meet developers where they are.*

- [ ] Vue wrapper package (`diorama-ui-vue`)
- [ ] Svelte wrapper package (`diorama-ui-svelte`)
- [ ] Figma / design asset kit
- [ ] Community examples (RPG inventory, dialogue system, battle UI)

---

## 4. Immediate Action Plan (Next 2 Weeks)

If you only have a few hours per week, focus here:

### Week 1: Test & Harden
1. **Install Vitest + React Testing Library**
2. **Write tests for hooks**
   - `useTypewriter`: starts empty, reveals text, completes, skip works
   - `useKeyboardNavigation`: arrow keys, wrap/loop, select, cancel
3. **Write tests for components**
   - `CommandMenu` renders items, selects via keyboard, calls callbacks
   - `DialogueBox` advances messages, calls `onComplete`
   - `StatusPanel` clamps percentage, renders bars
4. **Add GitHub Action**
   - Run lint → typecheck → test → build on every PR

### Week 2: Accessibility & Polish
1. **Accessibility audit**
   - Run Storybook with a11y addon
   - Fix contrast and focus issues
2. **Polish existing components**
   - Ensure consistent focus rings
   - Add `data-testid` / ref forwarding where needed
   - Review prop interfaces for consistency
3. **Ship `v0.2.0`**
   - Update changelog
   - Bump version
   - Build and publish to npm

---

## 5. Technical Principles

To keep the project maintainable as it grows:

1. **Composition over configuration** — components should be composable, not bloated with props.
2. **Headless hooks where possible** — logic lives in hooks; presentation in components.
3. **Tailwind + CSS variables** — use Tailwind for structure, CSS vars for themeable values.
4. **Accessibility by default** — keyboard nav, ARIA roles, focus management are not optional.
5. **Test every component** — every new component needs at least one RTL test and a Storybook story.
6. **Stable public API** — avoid breaking prop changes after `v0.3.0`.

---

## 6. Suggested File Structure (Future)

```
src/
├── components/
│   ├── GemButton/
│   ├── PixelText/
│   ├── DisplayText/
│   ├── OrnateDivider/
│   ├── RuneIcon/
│   ├── PortraitAvatar/
│   ├── FramePanel/
│   ├── SlotGrid/
│   ├── SplitPanel/
│   ├── TabSelector/
│   ├── ScrollPanel/
│   ├── AccordionTome/
│   ├── DioramaInput/
│   ├── DioramaSelect/
│   ├── ToggleGem/
│   ├── CheckboxRune/
│   ├── RadioRune/
│   ├── GemSlider/
│   ├── StatStepper/
│   ├── DioramaForm/
│   ├── SearchRune/
│   ├── ItemCard/
│   ├── InventoryGrid/
│   ├── RarityBadge/
│   ├── TooltipRune/
│   ├── PopoverPanel/
│   ├── ScrollList/
│   ├── SkillTree/
│   ├── DataTable/
│   ├── EmptySlot/
│   ├── StatSheet/
│   ├── FramedImage/
│   ├── GalleryCarousel/
│   ├── CalendarPanel/
│   ├── ModalPanel/
│   ├── ConfirmDialog/
│   ├── ToastRune/
│   ├── NoticeBoard/
│   ├── AlertBanner/
│   ├── ResultPanel/
│   ├── LoadingCrystal/
│   ├── SkeletonRune/
│   ├── ProgressTrack/
│   ├── ShopPanel/
│   ├── SaveFileCard/
│   ├── WorldMapMarker/
│   ├── BattleMenu/
│   ├── TargetSelector/
│   ├── DamageNumber/
│   ├── TurnOrder/
│   ├── PartyPanel/
│   ├── EquipmentSlot/
│   ├── EquipmentPanel/
│   ├── DialogTree/
│   ├── QuestLog/
│   ├── BestiaryEntry/
│   ├── DialogueBox/
│   ├── CommandMenu/
│   └── StatusPanel/
├── hooks/
│   ├── useTypewriter.ts
│   ├── useKeyboardNavigation.ts
│   ├── useSound.ts
│   └── useAnimation.ts
├── theme/
│   ├── DioramaProvider.tsx
│   ├── defaultTheme.ts
│   └── types.ts
├── styles/
│   ├── index.css
│   └── tokens.css
├── utils/
│   └── clamp.ts
└── index.ts
```

---

## 7. Open Questions

- Do you want to prioritize **more components** or **polish + publish** first?
- Should the library bundle its own pixel font, or leave font loading to the user?
- Do you want to target **web games** specifically, or general-purpose fantasy dashboards too?
- Is there a target npm publishing cadence (e.g. every 2 weeks)?

---

## 8. Milestones at a Glance

| Version | Focus | Key Additions |
|---------|-------|---------------|
| `v0.2.0` | Foundation | Tests, CI, accessibility fixes |
| `v0.3.0` | Atoms | GemButton, PixelText, DisplayText, OrnateDivider, RuneIcon, PortraitAvatar |
| `v0.4.0` | Layout | FramePanel, SlotGrid, SplitPanel, TabSelector, ScrollPanel, AccordionTome |
| `v0.5.0` | Forms | DioramaInput/Select/Form, ToggleGem, CheckboxRune, RadioRune, GemSlider, StatStepper, SearchRune |
| `v0.6.0` | Data Display | ItemCard, InventoryGrid, RarityBadge, TooltipRune, PopoverPanel, ScrollList, SkillTree, DataTable, EmptySlot, StatSheet, FramedImage, GalleryCarousel, CalendarPanel |
| `v0.7.0` | Feedback | ModalPanel, ConfirmDialog, ToastRune, NoticeBoard, AlertBanner, ResultPanel, LoadingCrystal, SkeletonRune, ProgressTrack |
| `v0.8.0` | Game Systems | ShopPanel, SaveFileCard, WorldMapMarker, BattleMenu, TargetSelector, DamageNumber, TurnOrder, PartyPanel, EquipmentSlot/Panel, DialogTree, QuestLog, BestiaryEntry |
| `v0.9.0` | Theming | Theme provider, CSS variables, dark/light modes, component variants |
| `v0.10.0` | Interactions | Animations, sound hook, transitions, number tick effects |
| `v1.0.0` | Ecosystem | Advanced components (8), Vue/Svelte wrappers, Figma kit, community examples |

---

*Last updated: 2026-06-30*
