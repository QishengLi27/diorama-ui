# 📦 Publishing Diorama UI to npm

This project is already configured as a publishable React library. This guide covers how to build, test locally, and publish it to npm so other projects can install it.

---

## 1. What’s already set up

`package.json` is configured with:

```json
{
  "name": "diorama-ui",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/diorama-ui.umd.cjs",
  "module": "./dist/diorama-ui.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/diorama-ui.js",
      "require": "./dist/diorama-ui.umd.cjs"
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": ["dist"]
}
```

This means consumers can use it in both ESM and CJS projects, and import the stylesheet separately.

---

## 2. Build the package

```bash
npm install
npm run build
```

This runs:
- `tsc` — type-checks the source
- `vite build` — bundles `dist/diorama-ui.js`, `dist/diorama-ui.umd.cjs`, `dist/styles.css`, and TypeScript declarations

You should see output in `dist/`.

---

## 3. Preview what will be published

```bash
npm pack --dry-run
```

This lists all files that npm will include without creating a tarball. Only `dist/` and the files defined in `package.json` should appear because of `"files": ["dist"]`.

To create an actual tarball for testing:

```bash
npm pack
```

This produces `diorama-ui-0.1.0.tgz`.

---

## 4. Test the package locally before publishing

### Option A: `npm link` (good for iterative testing)

In the library folder:

```bash
cd /Users/qishengli/Desktop/git/diorama-ui
npm link
```

In a test project:

```bash
cd ~/my-test-app
npm link diorama-ui
```

Then import it:

```tsx
import { CommandMenu, DialogueBox, StatusPanel } from 'diorama-ui';
import 'diorama-ui/styles.css';
```

To unlink later:

```bash
cd ~/my-test-app
npm unlink diorama-ui
```

### Option B: Install from the tarball

```bash
cd ~/my-test-app
npm install /Users/qishengli/Desktop/git/diorama-ui/diorama-ui-0.1.0.tgz
```

This is the most realistic test before publishing.

---

## 5. Publish to npm

### Prerequisites

- You need an [npm account](https://www.npmjs.com/signup).
- The package name `diorama-ui` must be available. Check with:

```bash
npm view diorama-ui
```

If it’s already taken, choose a scoped name like `@yourname/diorama-ui` and update `package.json` accordingly.

### Login

```bash
npm login
```

Follow the prompts to authenticate.

### Publish

```bash
npm publish
```

For the first publish, this is enough. For subsequent publishes, update the version first (see below).

### Publish a pre-release

If you want to test the publish flow without making it the default install:

```bash
npm version 0.2.0-beta.0
npm publish --tag beta
```

Users can then install it with:

```bash
npm install diorama-ui@beta
```

---

## 6. Versioning

Use [Semantic Versioning](https://semver.org/):

- `0.2.0` — new features, backwards-compatible
- `0.2.1` — bug fixes
- `0.3.0` — breaking changes or major new components

Update the version with:

```bash
npm version patch   # 0.1.0 -> 0.1.1
npm version minor   # 0.1.0 -> 0.2.0
npm version major   # 0.1.0 -> 1.0.0
```

This updates `package.json`, creates a git tag, and commits the change. Then publish:

```bash
npm publish
```

---

## 7. How other projects install and use it

```bash
npm install diorama-ui
```

In the app entry file:

```tsx
import 'diorama-ui/styles.css';
```

In any component:

```tsx
import { CommandMenu, DialogueBox, StatusPanel } from 'diorama-ui';

function App() {
  return (
    <>
      <StatusPanel
        name="Olberic"
        level={32}
        hp={{ current: 2400, max: 3200 }}
        mp={{ current: 120, max: 180 }}
      />
      <CommandMenu
        title="Command"
        items={[
          { id: 'attack', label: 'Attack' },
          { id: 'skill', label: 'Skill' },
        ]}
        onSelect={(item) => console.log(item.label)}
      />
    </>
  );
}
```

---

## 8. Important checklist before every publish

- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] Tests pass (once added)
- [ ] Version bumped in `package.json`
- [ ] `README.md` usage instructions are up to date
- [ ] `CHANGELOG.md` updated (recommended)
- [ ] `npm pack --dry-run` shows only intended files

---

## 9. Common issues

### `No name was provided for external module "react/jsx-runtime"`

Fixed in `vite.config.ts` by adding `react/jsx-runtime` to the Rollup globals:

```ts
globals: {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsxRuntime',
},
```

### Consumers get “Cannot find module 'diorama-ui'”

Make sure `dist/index.d.ts` exists after build and `types` / `exports.types` point to it.

### Styles don’t apply

Consumers must import `diorama-ui/styles.css` once in their app. The components themselves do not auto-inject styles.

### Scoped packages

If you use a scoped name like `@yourname/diorama-ui`, the first publish requires:

```bash
npm publish --access public
```

---

## 10. Recommended next steps

1. Add a `CHANGELOG.md`.
2. Set up a GitHub Action that publishes to npm when a new release is created.
3. Add a `prepublishOnly` script to `package.json`:

```json
"scripts": {
  "prepublishOnly": "npm run lint && npm run typecheck && npm run build"
}
```

This ensures only clean builds get published.
