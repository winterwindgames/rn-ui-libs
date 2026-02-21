# Demo App Guidelines

Every library includes an `example/` app that showcases all components in a polished, scrollable layout. The demo app IS the library's portfolio piece — it should look like a real app, not a test harness.

---

## App Structure

```
example/
├── App.tsx              # Single-file demo (no routing)
├── app.json             # Expo config
├── package.json         # Dependencies
├── metro.config.js      # Monorepo symlink resolution
└── tsconfig.json
```

### Single File Principle

The entire demo lives in `App.tsx`. No navigation, no multiple screens. One continuous scroll that shows every component in context.

---

## App.tsx Architecture

```tsx
// 1. Imports
import { ThemeProvider, PortalProvider, ToastProvider, ... } from '../src';

// 2. Layout Constants
const SCREEN_PAD = 24;       // Horizontal page padding
const SECTION_GAP = 48;      // Vertical gap between sections
const TITLE_MB = 20;         // Margin below section titles

// 3. Helper Components (inside the file)
function SectionTitle({ children }) { ... }
function Section({ children }) { ... }

// 4. Main Content Component
function ShowcaseContent() {
  // Theme hook, state, handlers
  // Return the scrollable UI
}

// 5. App Root
export default function App() {
  return (
    <ThemeProvider initialScheme="dark">
      <PortalProvider>
        <ToastProvider>
          <ShowcaseContent />
        </ToastProvider>
      </PortalProvider>
    </ThemeProvider>
  );
}
```

---

## Required Sections (in order)

The demo app scrolls through these sections. Each section demonstrates related components in realistic usage.

### 1. Header Area
- App title (library personality)
- Subtitle/greeting text
- **Dark mode toggle** (sun/moon icon, top right)
- Status bar adapts to theme

### 2. Stats / Hero Cards
- 2-4 `Stat` components in a grid (2 columns)
- Show numbers with change indicators
- Wrapped in `Card` components
- Demonstrates: `Stat`, `Card`, `HStack`, `Grid`

### 3. Buttons
- All variants: solid, outline, ghost, link
- All sizes: sm, md, lg
- Loading state
- With icons (left and right)
- `IconButton` variants
- Demonstrates: `Button`, `IconButton`, `HStack`

### 4. Typography
- Heading hierarchy (h1 → h6)
- Body variants (bodyLg, body, bodySm)
- Caption, label, overline
- Demonstrates: `Text`

### 5. Inputs
- `TextInput` with label, placeholder, icons
- `TextInput` with error state
- `TextInput` with character count
- `TextArea`
- `SearchInput`
- Demonstrates: `TextInput`, `TextArea`, `SearchInput`

### 6. Controls
- `Switch` with dark mode toggle and generic toggle
- `Checkbox` with label
- `SegmentedControl` with 3 segments
- `Slider` with value display
- `Stepper` with min/max
- `Radio` group with 3 options
- Demonstrates: `Switch`, `Checkbox`, `SegmentedControl`, `Slider`, `Stepper`, `Radio`

### 7. Selection
- `Select` / Picker
- `PinInput`
- `ColorPicker`
- `DatePicker`
- Demonstrates: `Select`, `PinInput`, `ColorPicker`, `DatePicker`

### 8. Data Display
- `Avatar` in multiple sizes
- `AvatarGroup`
- `Badge` variants (dot, number)
- `Tag` / `Chip` (removable, selectable)
- `ListItem` with icons and chevrons (3-4 items)
- `KeyValue` pairs
- Demonstrates: `Avatar`, `AvatarGroup`, `Badge`, `Tag`, `ListItem`, `KeyValue`

### 9. Cards & Content
- `Card` with header and body content
- `Card` pressable variant
- `Accordion` with 2-3 items
- `Timeline` with 3-4 entries
- `Table` with sample data
- `EmptyState`
- Demonstrates: `Card`, `Accordion`, `Timeline`, `Table`, `EmptyState`

### 10. Progress & Loading
- `ProgressBar` at various percentages
- `ProgressBar` indeterminate
- `ProgressCircle`
- `Skeleton` variants (text, circular, rectangular)
- `Spinner` sizes
- Demonstrates: `ProgressBar`, `ProgressCircle`, `Skeleton`, `Spinner`

### 11. Navigation
- `Breadcrumb`
- `Pagination`
- `StepIndicator`
- Demonstrates: `Breadcrumb`, `Pagination`, `StepIndicator`

### 12. Feedback Triggers
- Button to show `Toast` (all variants: success, error, warning, info)
- Button to show `Alert` / `Dialog`
- Button to show `Modal`
- Button to show `BottomSheet`
- Button to show `ActionSheet`
- Demonstrates: `Toast`, `Alert`, `Modal`, `BottomSheet`, `ActionSheet`

### 13. Persistent UI
- `TabBar` fixed at bottom (decorative — no navigation)
- `FAB` floating button (bottom right, above tab bar)
- Demonstrates: `TabBar`, `FAB`

---

## Layout Rules

### Spacing (8pt grid)

```
Screen horizontal padding:  24px (SCREEN_PAD)
Section vertical gap:       48px (SECTION_GAP)
Section title margin-bottom: 20px
Inner gap (cards, inputs):  16px
Inner gap (tight items):    12px
Scroll top padding:         64px (for status bar + header)
Scroll bottom padding:      TabBar height + 80px
```

### Grid Layouts

- **Stat cards:** 2 columns, 12px gap, equal width
- **Buttons:** Horizontal wrap with 8px gap
- **Avatars:** Horizontal row with 8-12px gap
- **Tags:** Horizontal wrap with 8px gap

### Section Title Style

```tsx
<Text style={{
  color: theme.colors.text,
  ...theme.typography.h5,
  marginBottom: 20,
}}>
  Section Title
</Text>
```

---

## Theming the Demo

### Dark Mode Toggle

Place in the header area, top right:

```tsx
<Pressable
  onPress={toggleTheme}
  style={{
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: theme.colors.surface,
    alignItems: 'center', justifyContent: 'center',
  }}
>
  <Ionicons
    name={colorScheme === 'dark' ? 'sunny' : 'moon'}
    size={22}
    color={theme.colors.primary}
  />
</Pressable>
```

### StatusBar

```tsx
<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
```

---

## Import Rules

### Always import from `'../src'`

```tsx
// ✅ Correct
import { Button, Text, useTheme } from '../src';

// ❌ Wrong — causes dual React context issues
import { Button } from 'grind-ui';
```

### Use `@expo/vector-icons` for demo icons

```tsx
import { Ionicons } from '@expo/vector-icons';
```

---

## Example Dependencies

```json
{
  "dependencies": {
    "expo": "~54.0.0",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "react-native-reanimated": "~4.1.1",
    "react-native-worklets": "^0.5.1",
    "expo-haptics": "~14.0.1",
    "expo-linear-gradient": "~14.0.2",
    "expo-status-bar": "~2.2.3",
    "@expo/vector-icons": "*",
    "react-native-safe-area-context": "5.4.0"
  }
}
```

---

## Metro Config

Required for monorepo symlink resolution:

```javascript
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

---

## app.json

```json
{
  "expo": {
    "name": "<Library Name> Demo",
    "slug": "<library-name>-demo",
    "version": "1.0.0",
    "orientation": "portrait",
    "platforms": ["ios", "android"],
    "sdkVersion": "54.0.0"
  }
}
```

---

## Running the Demo

```bash
cd packages/<library-name>/example
npm install
npx expo start --port <port> --clear
```

### Port Assignments

Each library gets a unique Metro port to allow parallel development:

| Library | Port |
|---------|------|
| grind-ui | 8081 |
| fitspark-ui | 8083 |
| (next library) | 8085 |
| (next library) | 8087 |

### Opening in Simulator

```bash
xcrun simctl openurl <device-uuid> exp://localhost:<port>
```

---

## Quality Checklist

Before considering a demo app complete:

- [ ] All 67 components visible and interactive
- [ ] Dark mode toggle works (instant theme switch)
- [ ] No runtime errors or warnings (except SafeAreaView deprecation)
- [ ] Smooth scroll performance
- [ ] Proper spacing — no cramped or overly sparse sections
- [ ] Section titles clearly delineate groups
- [ ] Toast/Modal/Sheet triggers work
- [ ] TabBar visible at bottom
- [ ] FAB visible and pressable
- [ ] Bottom scroll padding sufficient (content not hidden behind TabBar)
- [ ] Works on iPhone simulator via Expo Go
- [ ] StatusBar adapts to theme
