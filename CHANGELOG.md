# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Publishing guide (`PUBLISHING.md`).
- `prepublishOnly` script to ensure lint, typecheck, and build run before publishing.

### Fixed
- Added `react/jsx-runtime` to Rollup `globals` in `vite.config.ts` to remove the UMD build warning.

## [0.1.0] - 2026-06-23

### Added
- Initial release of Diorama UI.
- Components: `DialogueBox`, `CommandMenu`, `StatusPanel`.
- Hooks: `useTypewriter`, `useKeyboardNavigation`.
- Tailwind-based HD-2D theme with custom colors, shadows, and animations.
- Storybook stories for all components.
- Vite library build setup with ESM + UMD outputs and TypeScript declarations.
