# rn-ui-libs

A monorepo of complete, production-quality React Native UI component libraries — each with a unique visual identity, built from scratch with TypeScript, Expo Go compatible.

## Libraries

| Library | Theme | Status |
|---------|-------|--------|
| [grind-ui](./packages/grind-ui/) | Modern playful analytics dashboard (charcoal/periwinkle/coral/sage) | ✅ v0.1.0 |
| [fitspark-ui](./packages/fitspark-ui/) | Premium dark fitness app (black/lime green/white) | ✅ v0.1.0 |

## Monorepo Structure

```
rn-ui-libs/
├── docs/
│   ├── COMPONENTS.md       # Component checklist & specs
│   ├── ARCHITECTURE.md     # Code structure & conventions
│   ├── THEMING.md          # Token system & dark mode guide
│   └── DEMO-APP.md         # Example app structure & guidelines
├── packages/
│   ├── grind-ui/
│   │   ├── src/            # Library source
│   │   ├── example/        # Expo Go demo app
│   │   └── README.md
│   └── fitspark-ui/
│       ├── src/
│       ├── example/
│       └── README.md
└── package.json            # npm workspaces root
```

## Documentation

Start here before creating or modifying any library:

1. **[COMPONENTS.md](./docs/COMPONENTS.md)** — What to build (complete component checklist with specs)
2. **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — How to build it (file structure, code patterns, conventions)
3. **[THEMING.md](./docs/THEMING.md)** — How to design the theme (tokens, colors, typography, dark mode)
4. **[DEMO-APP.md](./docs/DEMO-APP.md)** — How to showcase it (example app structure and sections)

## Tech Stack

- **TypeScript** strict mode
- **React Native** 0.81+ / **Expo SDK 54**
- **react-native-reanimated** for animations
- **expo-haptics** for tactile feedback (iOS)
- **expo-linear-gradient** for gradients
- No external UI libraries — everything built from RN primitives

## Creating a New Library

```bash
# 1. Read the docs (all four files above)
# 2. Create the package
mkdir -p packages/<library-name>/{src,example}

# 3. Follow ARCHITECTURE.md for file structure
# 4. Follow THEMING.md to design tokens first
# 5. Follow COMPONENTS.md to build all 67 components
# 6. Follow DEMO-APP.md to create the showcase app
# 7. Test in Expo Go on simulator
```

## Running a Library

```bash
cd packages/<library-name>/example
npm install
npx expo start --clear
```

## License

MIT
