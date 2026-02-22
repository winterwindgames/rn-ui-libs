# 🔥 Bonfire UI

A warm, dark-themed social UI component library for React Native + Expo.

## Features
- 73 components, TypeScript strict mode
- Dark-first design with coral-pink accent (#FF3B6F)
- 3 color palettes: Default (Coral), Ocean (Blue), Lavender (Purple)
- Light + Dark mode with system detection
- Expo Go compatible — no native builds required
- Reanimated micro-interactions on all interactive components
- Full accessibility support

## Quick Start

```tsx
import { ThemeProvider, Button, Text } from '@rn-ui-libs/bonfire-ui';

export default function App() {
  return (
    <ThemeProvider initialScheme="dark" initialPalette="default">
      <Text variant="h1">Hello Bonfire 🔥</Text>
      <Button label="Get Started" onPress={() => {}} />
    </ThemeProvider>
  );
}
```

## Palettes
- **default** — Coral Pink (#FF3B6F)
- **ocean** — Blue (#4A90FF)
- **lavender** — Purple (#A855F7)

## Demo
```bash
cd example && npm install && npx expo start --port 8085
```
