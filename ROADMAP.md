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
- A stable `v1.0` on npm with 8–10 high-quality components
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

### Phase 0 — Foundation (now, ~1–2 weeks)
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
  - Write a short “Theming” guide

**Deliverable:** `v0.2.0` — stable, tested, documented foundation.

---

### Phase 1 — Core JRPG Components (~2–4 weeks)
*Goal: Cover the most common JRPG UI patterns.*

- [ ] `InventoryGrid`
  - Slot-based item grid
  - Rarity glow / border colors
  - Selection cursor, hover state
  - Stack counts and item icons
- [ ] `ShopPanel`
  - Buy / sell tabs
  - Item list with prices
  - Player currency display
  - Quantity stepper
- [ ] `SaveFileCard`
  - Save slot card with preview (chapter, play time, level)
  - Empty / new slot state
  - Selected / hover states
- [ ] `WorldMapMarker`
  - Animated quest / objective marker
  - Configurable icon, color, pulse
  - Tooltip on focus/hover

**Deliverable:** `v0.3.0` — four new components, all with stories and tests.

---

### Phase 2 — Theming & Customization (~2–3 weeks)
*Goal: Let users make Diorama UI feel like *their* game, not just the default style.*

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

**Deliverable:** `v0.4.0` — fully themeable library.

---

### Phase 3 — Advanced Interactions (~3–4 weeks)
*Goal: Add motion, sound, and deeper game-like behavior.*

- [ ] Animation primitives
  - Panel open/close transitions
  - Page/slide transitions
  - Number tick animations for HP/MP changes
- [ ] Sound hook (`useSound`)
  - Optional audio feedback on menu navigation, select, cancel
  - No audio assets bundled; users provide their own
- [ ] Dialog sequence system
  - Branching dialogue trees
  - Choice prompts inside `DialogueBox`
  - Auto-advance and timing controls
- [ ] Form elements with JRPG styling
  - `DioramaInput`, `DioramaButton`, `DioramaSelect`, `DioramaSlider`

**Deliverable:** `v0.5.0` — rich interactions and animation layer.

---

### Phase 4 — Framework Expansion & Ecosystem (~future)
*Goal: Meet developers where they are.*

- [ ] Vue wrapper package (`diorama-ui-vue`)
- [ ] Svelte wrapper package (`diorama-ui-svelte`)
- [ ] Figma / design asset kit
- [ ] Community examples (RPG inventory, dialogue system, battle UI)

**Deliverable:** `v1.0.0` — mature, multi-platform UI ecosystem.

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
│   ├── DialogueBox/
│   ├── CommandMenu/
│   ├── StatusPanel/
│   ├── InventoryGrid/
│   ├── ShopPanel/
│   ├── SaveFileCard/
│   └── WorldMapMarker/
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
| `v0.3.0` | Core JRPG UI | Inventory, Shop, Save, MapMarker |
| `v0.4.0` | Theming | Theme provider, CSS variables, variants |
| `v0.5.0` | Rich interactions | Animations, sound hook, forms, dialogue trees |
| `v1.0.0` | Ecosystem | Vue/Svelte wrappers, design kit, examples |

---

*Last updated: 2026-06-24*
