# 💪 Grind UI

A bold, high-contrast React Native UI library with a fitness-inspired aesthetic. Built for Expo Go — no native builds required.

**Design Language:** Charcoal backgrounds, periwinkle primary (#787AF3), coral secondary (#E37461), sage accents, uppercase headings with tight letter-spacing. Brutalist energy meets polished micro-interactions.

## Installation

```bash
npm install grind-ui
```

### Peer Dependencies

```bash
npm install react-native-reanimated react-native-gesture-handler expo-haptics expo-linear-gradient react-native-safe-area-context
```

Add the Reanimated plugin to your `babel.config.js`:

```js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'],
};
```

## Quick Start

```tsx
import { ThemeProvider, PortalProvider, ToastProvider, Button, Text } from 'grind-ui';

export default function App() {
  return (
    <ThemeProvider mode="dark">
      <PortalProvider>
        <ToastProvider>
          <Text variant="h1">GRIND TIME</Text>
          <Button label="Let's Go" onPress={() => {}} />
        </ToastProvider>
      </PortalProvider>
    </ThemeProvider>
  );
}
```

## Components

### Layout
| Component | Description |
|-----------|-------------|
| `Box` | Themed View wrapper |
| `Container` | Max-width centered container |
| `Stack` / `HStack` / `VStack` | Flexbox stack layout |
| `Spacer` | Flexible spacing |
| `Divider` | Horizontal/vertical divider |
| `Grid` | Responsive grid layout |
| `SafeAreaBox` | Safe area wrapper |
| `ScrollBox` | Themed ScrollView |
| `KeyboardAvoidingBox` | Keyboard-aware container |
| `GradientBox` | Linear gradient wrapper |
| `ConditionalWrap` | Conditional wrapper utility |
| `StickyHeader` | Sticky scroll header |

### Typography
| Component | Description |
|-----------|-------------|
| `Text` | Themed text with variant support (h1–h5, body, caption, overline) |

### Inputs & Controls
| Component | Description |
|-----------|-------------|
| `Button` | Solid, outline, ghost, soft variants with loading state |
| `IconButton` | Icon-only button |
| `TextInput` | Themed input with label, icons, validation |
| `TextArea` | Multi-line text input |
| `SearchInput` | Search bar with clear button |
| `Switch` | Toggle switch |
| `Checkbox` | Checkbox with label |
| `Radio` / `RadioGroup` | Radio button group |
| `Slider` | Value slider |
| `Stepper` | Increment/decrement control |
| `SegmentedControl` | Segmented tab selector |
| `Select` | Dropdown selector |
| `PinInput` | PIN code input |
| `DatePicker` | Date picker |
| `ColorPicker` | Color picker |
| `Pressable` | Enhanced pressable with feedback |
| `FAB` | Floating action button |
| `FormField` / `FormGroup` | Form layout helpers |

### Data Display
| Component | Description |
|-----------|-------------|
| `Card` | Elevated, outlined, filled card |
| `Avatar` | User avatar with status indicator |
| `AvatarGroup` | Stacked avatar group |
| `Badge` | Status badge |
| `Tag` | Labeling tag |
| `Stat` | Statistic with change indicator |
| `ListItem` | List row with icon, subtitle, chevron |
| `KeyValue` | Key-value pair display |
| `Image` | Themed image |
| `Icon` | Icon component |
| `Table` | Data table |
| `Timeline` | Timeline display |
| `EmptyState` | Empty/zero state placeholder |

### Feedback
| Component | Description |
|-----------|-------------|
| `Alert` | Info, success, warning, error alerts |
| `ProgressBar` | Determinate progress |
| `ProgressCircle` | Circular progress |
| `Skeleton` | Skeleton loading placeholders |
| `Spinner` | Loading spinner |
| `Toast` / `ToastProvider` / `useToast` | Toast notifications |
| `Tooltip` | Tooltip overlay |
| `Popover` | Popover overlay |

### Navigation
| Component | Description |
|-----------|-------------|
| `Header` | App header/navbar |
| `TabBar` | Bottom tab bar |
| `Breadcrumb` | Breadcrumb navigation |
| `StepIndicator` | Multi-step indicator |
| `Pagination` | Page navigation |

### Overlays
| Component | Description |
|-----------|-------------|
| `Modal` | Modal dialog |
| `BottomSheet` | Bottom sheet |
| `ActionSheet` | Action sheet |
| `Portal` / `PortalProvider` | Portal rendering |

### Layout Extras
| Component | Description |
|-----------|-------------|
| `Accordion` / `AccordionItem` | Expandable sections |
| `Carousel` | Horizontal carousel |
| `Collapsible` | Collapsible content |
| `Swipeable` | Swipe-to-reveal actions |
| `PullToRefresh` | Pull-to-refresh wrapper |

## Theme Customization

```tsx
import { ThemeProvider, lightTheme } from 'grind-ui';

const customTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
  },
};

<ThemeProvider theme={customTheme}>
  {/* Your app */}
</ThemeProvider>
```

## Dark Mode

```tsx
// Toggle via mode prop
<ThemeProvider mode="dark">

// Or use the hook
const { toggleMode, mode } = useTheme();
```

## Hooks

| Hook | Description |
|------|-------------|
| `useTheme()` | Access theme tokens and mode |
| `useResponsive()` | Responsive breakpoint utilities |
| `useAnimation()` | Reanimated animation helpers |

## Utilities

| Utility | Description |
|---------|-------------|
| `haptics` | Expo Haptics wrapper (iOS-safe) |
| `platform` | Platform detection helpers |

## License

MIT
