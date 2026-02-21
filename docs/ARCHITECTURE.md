# Architecture & Code Conventions

This document defines the file structure, naming conventions, and code patterns for every library in the monorepo.

---

## Package Structure

```
packages/<library-name>/
├── package.json
├── tsconfig.json
├── README.md
├── src/
│   ├── index.ts                    # Barrel export (everything)
│   ├── theme/
│   │   ├── index.ts                # Re-exports
│   │   ├── tokens.ts               # Color, spacing, typography, shadow, size definitions
│   │   ├── types.ts                # Theme TypeScript interfaces
│   │   ├── ThemeProvider.tsx        # Context provider + light/dark themes
│   │   └── useTheme.ts             # Hook to consume theme
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx           # Component implementation
│   │   │   ├── Button.types.ts      # Props interface
│   │   │   └── index.ts            # Re-export
│   │   ├── ... (67 component folders)
│   ├── hooks/
│   │   ├── useAnimation.ts         # Shared animation utilities
│   │   └── useResponsive.ts        # Screen size utilities
│   └── utils/
│       ├── haptics.ts              # iOS haptic feedback helpers
│       └── platform.ts             # Platform detection helpers
├── example/
│   ├── App.tsx                     # Demo app (single file)
│   ├── app.json                    # Expo config
│   ├── package.json                # Example deps
│   ├── metro.config.js             # Symlink resolution for monorepo
│   └── tsconfig.json
```

---

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Package name | `kebab-case` | `grind-ui`, `fitspark-ui` |
| Component folder | `PascalCase` | `Button/`, `TextInput/` |
| Component file | `PascalCase.tsx` | `Button.tsx` |
| Types file | `PascalCase.types.ts` | `Button.types.ts` |
| Props interface | `PascalCase + Props` | `ButtonProps` |
| Theme files | `camelCase.ts` | `tokens.ts`, `useTheme.ts` |
| Hooks | `useCamelCase.ts` | `useAnimation.ts` |
| Exports | Named only | `export const Button` |

---

## Component Template

Every component follows this pattern:

```tsx
// Button.tsx
import React, { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { ButtonProps } from './Button.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'solid',
  size = 'md',
  disabled = false,
  loading = false,
  onPress,
  style,
  testID,
}) => {
  const { colors, spacing, radii, typography } = useTheme();

  // ... Reanimated animations
  // ... render

  return (
    <AnimatedPressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled, busy: loading }}
      style={[internalStyles, animatedStyle, style]}
    >
      {/* ... */}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  // Static styles only — dynamic styles inline
});
```

### Types file:

```tsx
// Button.types.ts
import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Button text */
  label: string;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
```

### Index file:

```tsx
// index.ts
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';
```

---

## Theme System

### Token Hierarchy

```
tokens.ts
├── colors         → All color values (22+ keys)
├── spacing        → xs(4) sm(8) md(16) lg(24) xl(32) xxl(48)
├── radii          → sm md lg xl pill full
├── typography     → h1-h6, body variants, caption, label, overline
├── shadows        → sm md lg (platform-aware)
├── sizes          → inputHeight, icon, avatar, buttonHeight, headerHeight, tabBarHeight
└── isDark         → boolean flag
```

### Theme consumption

Components access theme via `useTheme()` which returns the full `ThemeContextValue & Theme`:

```tsx
const { colors, spacing, radii, typography, shadows, sizes } = useTheme();
// Also available: theme, colorScheme, toggleTheme, setColorScheme
```

### ThemeProvider

- Imports `darkTheme` and `lightTheme` from `tokens.ts` (single source of truth)
- Never define theme values inline in ThemeProvider
- Supports `initialScheme: 'light' | 'dark' | 'system'`
- Exposes `toggleTheme()` and `setColorScheme()` via context

---

## useTheme Hook

The hook returns a merged object: `{ ...contextValue, ...contextValue.theme }`:

```tsx
// This means you can destructure either way:
const { colors, spacing } = useTheme();           // Direct theme props
const { theme, toggleTheme } = useTheme();         // Context + theme object
const { colorScheme } = useTheme();                // Current scheme
```

---

## Barrel Exports (src/index.ts)

Group exports by category with comments:

```tsx
// Theme
export * from './theme';

// Primitives
export { Box } from './components/Box';
export { Text } from './components/Text';
// ... etc

// Re-export all types
export type { ButtonProps } from './components/Button';
// ... etc
```

---

## Animation Patterns

Use `react-native-reanimated` for all animations:

| Pattern | Implementation |
|---------|---------------|
| Press feedback | `useSharedValue` + `withSpring` for scale |
| Toggle/switch | `interpolateColor` for track, `withSpring` for thumb |
| Expand/collapse | Layout animations or shared value height |
| Shimmer/pulse | `withRepeat` + `withSequence` + `withTiming` |
| Slide in/out | `withTiming` + `translateY` |

**Never use `Animated` from `react-native`** — always use Reanimated.

---

## Styling Rules

1. **`StyleSheet.create`** for static styles only
2. **Inline styles** for dynamic/theme-dependent values
3. **Theme tokens** for all colors, spacing, radii — never hardcode
4. **Fallback values** with `??` for safety: `colors.primary ?? '#007AFF'`
5. **`style` prop** always last in style array: `style={[internal, animated, style]}`

---

## Accessibility Checklist

Every interactive component must have:

```tsx
accessibilityRole="button"           // or 'switch', 'checkbox', 'slider', etc.
accessibilityLabel="Description"     // Human-readable label
accessibilityState={{
  disabled: boolean,                 // When applicable
  checked: boolean,                  // For toggles/checkboxes
  selected: boolean,                 // For selectable items
  busy: boolean,                     // For loading states
}}
```

---

## Example App (metro.config.js)

Since examples import from `../src` (not the published package), Metro needs:

```js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);
const libRoot = path.resolve(__dirname, '..');

config.watchFolders = [libRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(libRoot, 'node_modules'),
];

module.exports = config;
```

Example apps always import from `'../src'` — never from the package name. This avoids dual React context issues with symlinks.

---

## Peer Dependencies

Every library declares these as peer deps:

```json
{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-native": ">=0.72.0",
    "expo": ">=50.0.0",
    "react-native-reanimated": ">=3.0.0",
    "expo-haptics": ">=12.0.0",
    "expo-linear-gradient": ">=12.0.0"
  }
}
```

---

## Git Conventions

| Type | Format | Example |
|------|--------|---------|
| New library | `feat: <library-name> v0.1.0` | `feat: grind-ui v0.1.0` |
| Bug fix | `fix: <description>` | `fix: dark mode toggle in grind-ui` |
| Chore | `chore: <description>` | `chore: add root .gitignore` |
| Docs | `docs: <description>` | `docs: add architecture guide` |

---

## Constraints

- ❌ No external UI libraries (NativeBase, Tamagui, gluestack, etc.)
- ❌ No native modules requiring `expo prebuild`
- ❌ No `default` exports
- ❌ No chart/graph components
- ❌ No `Animated` from `react-native` (use Reanimated)
- ✅ Must work in Expo Go (no dev client required)
- ✅ Must support dark mode via theme
- ✅ Must be TypeScript strict
- ✅ 8pt grid spacing system
