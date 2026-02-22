# Theming Guide

How to design the visual identity for a new library. The theme is the **first thing** you build — it defines the entire library's personality.

---

## Palette System

Every library ships with **3 color palettes**, each with light and dark variants. Users can switch palettes at runtime via the ThemeProvider.

```tsx
// Set initial palette
<ThemeProvider initialScheme="dark" initialPalette="ocean">
  <App />
</ThemeProvider>

// Switch at runtime
const { palette, setPalette } = useTheme();
setPalette('sunset');
```

### Palette Structure in tokens.ts

```typescript
// Each palette provides light and dark color sets
export const palettes = {
  default: { light: ThemeColors, dark: ThemeColors },
  ocean:   { light: ThemeColors, dark: ThemeColors },
  sunset:  { light: ThemeColors, dark: ThemeColors },
};

// Build a complete theme from palette + scheme
export function buildTheme(palette: PaletteName, scheme: 'light' | 'dark'): Theme;
```

Only **colors and shadows** change between palettes. Spacing, radii, typography, and sizes stay constant — they define the library's structural personality, while palettes define its color personality.

### Designing Palettes

Each library needs 3 palettes with distinct visual identities:

1. **Default** — The signature palette (defined during initial library creation)
2. **Palette 2** — A contrasting mood (e.g., cool vs warm, minimal vs vibrant)
3. **Palette 3** — Another distinct option (e.g., professional, playful, dark)

Rules:
- Every palette must work in both light AND dark modes
- Primary color must have sufficient contrast on both background colors
- Semantic colors (error/success/warning/info) can vary per palette but must remain recognizable
- Each palette should feel like a cohesive design, not just recolored

### ThemeProvider API

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  initialScheme?: ColorScheme;        // 'light' | 'dark' | 'system'
  initialPalette?: PaletteName;       // library-specific palette names
}
```

### ThemeContextValue

```typescript
interface ThemeContextValue {
  theme: Theme;
  colorScheme: 'light' | 'dark';
  palette: PaletteName;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setPalette: (palette: PaletteName) => void;
}
```

### Demo App Palette Picker

Every demo app must include a palette picker section near the top, showing all available palettes as tappable buttons with a color preview dot.

---

## Theme Token Structure

Every library has exactly this token shape (defined in `src/theme/types.ts`):

```typescript
interface Theme {
  colors: ThemeColors;         // 22+ color keys
  spacing: ThemeSpacing;       // 6 spacing values (8pt grid)
  radii: ThemeRadii;           // 6 radius presets
  typography: ThemeTypography;  // 13 text variants
  shadows: ThemeShadows;       // 3 elevation levels
  sizes: ThemeSizes;           // Component size presets
  isDark: boolean;             // Dark mode flag
}
```

---

## 1. Colors (22+ keys)

Design the color palette first. Everything else flows from here.

### Required Color Keys

| Key | Purpose | Design Notes |
|-----|---------|-------------|
| `background` | App background | Darkest in dark mode, lightest in light mode |
| `surface` | Card/sheet background | One step lighter than background |
| `surfaceElevated` | Elevated surfaces | One step lighter than surface |
| `primary` | Brand/accent color | The signature color of the library |
| `primaryDark` | Pressed/dark primary | 10-20% darker variant |
| `text` | Primary text | High contrast against background |
| `textSecondary` | Secondary text | ~60% opacity feel |
| `textMuted` | Muted/disabled text | ~40% opacity feel |
| `textInverse` | Text on primary color | Usually white on dark primary, dark on light primary |
| `border` | Default borders | Subtle, not distracting |
| `borderLight` | Lighter borders | For subtle separators |
| `error` | Error states | Red family (accessible) |
| `success` | Success states | Green family |
| `warning` | Warning states | Amber/orange family |
| `info` | Info states | Blue family |
| `overlay` | Modal backdrop | `rgba(0,0,0,0.4-0.7)` |
| `card` | Card background | Usually same as surface |
| `cardBorder` | Card border | Subtle card edges |
| `inputBackground` | Input field bg | Can match surface or be slightly different |
| `disabled` | Disabled element bg | Very muted |
| `disabledText` | Disabled text color | Low contrast |
| `skeleton` | Skeleton base color | Matches surface |
| `skeletonHighlight` | Skeleton highlight | Slightly lighter than skeleton |

### Color Design Principles

1. **Start with the primary color** — this is the brand identity
2. **Build backgrounds from the primary's hue** or use neutral grays
3. **Ensure WCAG AA contrast** between text colors and their backgrounds
4. **Dark mode ≠ inverted light mode** — redesign the palette for each
5. **Semantic colors** (error/success/warning/info) can stay consistent across themes but adjust brightness for contrast

### Example: Dark Theme Color Process

```
1. Pick primary:       #C8FF00 (lime green — energetic, fitness-y)
2. Background:         #0D0D0D (near-black — premium feel)
3. Surface:            #1C1C1E (iOS dark gray)
4. Surface elevated:   #2A2A2A (slightly lighter)
5. Text:               #FFFFFF (max contrast)
6. Text secondary:     #8E8E93 (iOS system gray)
7. Text muted:         #636366 (darker gray)
8. Borders:            #333333 (subtle dark borders)
```

---

## 2. Spacing (8pt Grid)

Every library uses the same spacing scale based on an 8pt grid:

```typescript
const spacing = {
  xs: 4,    // Half unit — tight spacing
  sm: 8,    // 1 unit — default inner padding
  md: 16,   // 2 units — standard gap
  lg: 24,   // 3 units — section padding
  xl: 32,   // 4 units — large gaps
  xxl: 48,  // 6 units — page-level spacing
};
```

**This scale is constant across all libraries.** The visual personality comes from colors and typography, not spacing.

---

## 3. Radii

Border radius presets. These CAN vary per library to create different feels:

| Key | Typical Range | Effect |
|-----|--------------|--------|
| `sm` | 4-8 | Subtle rounding |
| `md` | 8-12 | Standard components |
| `lg` | 12-16 | Cards, sheets |
| `xl` | 16-24 | Large panels |
| `pill` | 100-999 | Pill/capsule shape |
| `full` | 9999 | Perfect circle |

### Personality Through Radii

- **Sharp/corporate:** sm:4, md:6, lg:8 — minimal rounding
- **Friendly/playful:** sm:8, md:12, lg:16 — generous rounding
- **Ultra-modern:** sm:12, md:16, lg:24 — very round everything

---

## 4. Typography (13 variants)

Every library must define these variants:

| Variant | Typical Use | Key Properties |
|---------|-------------|---------------|
| `h1` | Page titles | 32-36px, weight 800 |
| `h2` | Section titles | 26-30px, weight 700 |
| `h3` | Subsection titles | 22-26px, weight 700 |
| `h4` | Card titles | 20-22px, weight 600 |
| `h5` | Group titles | 17-20px, weight 600 |
| `h6` | Small titles | 15-17px, weight 600 |
| `bodyLg` | Large body text | 16-18px, weight 400 |
| `body` | Default body | 14-16px, weight 400 |
| `bodySm` | Small body | 12-14px, weight 400 |
| `caption` | Captions, timestamps | 11-13px, weight 400 |
| `label` | Form labels, tags | 12-14px, weight 600, letter-spacing |
| `overline` | Category labels | 10-12px, weight 700, uppercase, wide letter-spacing |

### Optional Variant

- `stat` — Large stat numbers (36-48px, weight 800) for dashboard/fitness libraries

### Typography Shape

```typescript
interface TypographyStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
  letterSpacing?: number;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
}
```

### Personality Through Typography

- **Bold/impactful:** Heavier weights, tighter letter-spacing, larger scale jumps
- **Elegant/refined:** Lighter weights, generous letter-spacing, smaller scale
- **Playful:** Varied weights, some uppercase transforms, friendly sizing

---

## 5. Shadows (3 levels)

Platform-aware shadow definitions:

```typescript
interface ThemeShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;  // Android
}
```

| Level | Use Case | Dark Mode Notes |
|-------|----------|----------------|
| `sm` | Cards, buttons | Higher opacity in dark mode (0.2→0.3) |
| `md` | Elevated cards, dropdowns | Higher opacity in dark mode |
| `lg` | Modals, bottom sheets | Higher opacity in dark mode |

**Dark themes need stronger shadows** because they're less visible against dark backgrounds.

---

## 6. Sizes (Component Presets)

Consistent sizing for interactive components:

```typescript
interface ThemeSizes {
  inputHeight: { sm: number; md: number; lg: number };     // 36/44/52
  icon: { xs: number; sm: number; md: number; lg: number; xl: number }; // 12-48
  avatar: { xs: number; sm: number; md: number; lg: number; xl: number }; // 24-96
  buttonHeight: { sm: number; md: number; lg: number };    // 36/44/52
  headerHeight: number;                                     // 56
  tabBarHeight: number;                                     // 50-84
}
```

**These are relatively stable across libraries** — slight adjustments for personality (e.g., larger buttons for touch-heavy apps).

---

## Dark Mode Implementation

### Two Complete Themes

Every library exports `darkTheme` and `lightTheme` from `tokens.ts`. These are complete, independent `Theme` objects — not one derived from the other.

```typescript
// ✅ Good — independent definitions
export const darkTheme: Theme = { colors: { ... }, ... };
export const lightTheme: Theme = { colors: { ... }, ... };

// ❌ Bad — spreading one from another
export const lightTheme: Theme = { ...darkTheme, colors: { ...darkTheme.colors, ... } };
```

Shared non-color tokens (spacing, typography, sizes) can be defined once and referenced by both.

### What Changes Between Themes

| Token | Changes? | Notes |
|-------|---------|-------|
| `colors` | ✅ Yes | Completely different palette |
| `spacing` | ❌ No | Same scale |
| `radii` | ❌ No | Same values |
| `typography` | ❌ No | Same scale (color comes from `colors.text`) |
| `shadows` | ✅ Yes | Different opacity values |
| `sizes` | ❌ No | Same values |
| `isDark` | ✅ Yes | `true` / `false` |

### ThemeProvider Rules

1. Import themes from `tokens.ts` — never define inline
2. Use `useState` for color scheme preference
3. Expose `toggleTheme()` and `setColorScheme()` via context
4. Support `initialScheme: 'light' | 'dark' | 'system'`

---

## Designing a New Library Theme

### Step-by-Step Process

1. **Define the mood** — What feeling does this library evoke? (premium, playful, minimal, bold, dark, warm)
2. **Pick 1-2 primary colors** — The signature of the library
3. **Build the dark palette** — Background → surface → text → borders → semantic
4. **Build the light palette** — Independent design, same primary
5. **Set radii** — How rounded should things feel?
6. **Set typography weights and sizes** — Bold and loud, or refined and subtle?
7. **Adjust shadows** — Heavier for elevated UIs, lighter for flat UIs
8. **Test contrast** — Verify text readability on all backgrounds
9. **Build tokens.ts** — Single source of truth
10. **Wire ThemeProvider** — Import from tokens, never inline

### Design Checklist

- [ ] Primary color has enough contrast on both dark and light backgrounds
- [ ] Text colors meet WCAG AA (4.5:1 for body, 3:1 for large text)
- [ ] Surface/surfaceElevated are visually distinct from background
- [ ] Error/success/warning/info are distinguishable and accessible
- [ ] Skeleton colors are subtle but visible
- [ ] Overlay provides enough dimming for modal focus
- [ ] Border colors are visible but not distracting

---

## Reference: Existing Library Palettes

### grind-ui (Analytics Dashboard)
- **Primary:** `#7C6EF6` (periwinkle)
- **Accent:** `#E37461` (coral)
- **Background dark:** `#1C1C2E`
- **Feel:** Modern, playful, data-focused

### fitspark-ui (Fitness App)
- **Primary:** `#C8FF00` (lime green)
- **Background dark:** `#0D0D0D`
- **Feel:** Premium, high-contrast, energetic
