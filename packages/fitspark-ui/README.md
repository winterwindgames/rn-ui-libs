# FitSpark UI

A premium dark-mode fitness UI component library for React Native & Expo. Built with a bold lime (#C8FF00) accent on deep black, designed for workout trackers, health dashboards, and fitness apps.

## Install

```bash
npm install fitspark-ui
```

**Peer dependencies:**

```bash
npm install react-native-reanimated react-native-gesture-handler expo-haptics expo-linear-gradient react-native-safe-area-context
```

## Quick Start

```tsx
import { ThemeProvider, PortalProvider, ToastProvider, Button, Text } from 'fitspark-ui';

export default function App() {
  return (
    <ThemeProvider initialScheme="dark">
      <PortalProvider>
        <ToastProvider>
          <Button variant="solid" onPress={() => console.log('Go!')}>
            Start Workout
          </Button>
        </ToastProvider>
      </PortalProvider>
    </ThemeProvider>
  );
}
```

## Components

### Layout
- `Box` — Base view container
- `Container` — Constrained width wrapper
- `Stack` — Vertical/horizontal stack
- `Grid` — Responsive grid
- `Spacer` — Fixed or flex spacing
- `Divider` — Horizontal/vertical divider
- `SafeAreaBox` — Safe area wrapper
- `KeyboardAvoidingBox` — Keyboard-aware container
- `ScrollBox` — Themed scroll view
- `StickyHeader` — Sticky scroll header

### Typography & Media
- `Text` — Themed text
- `Image` — Themed image
- `Icon` — Icon wrapper
- `GradientBox` — Linear gradient container

### Inputs
- `Button` — Solid, outline, ghost, link variants
- `IconButton` — Icon-only button
- `TextInput` — Labeled input with error/hint
- `TextArea` — Multi-line input
- `SearchInput` — Search bar
- `Switch` — Toggle switch
- `Checkbox` — Checkbox with label
- `Radio` — Radio button group
- `Slider` — Range slider
- `Select` — Dropdown select
- `PinInput` — PIN/OTP input
- `Stepper` — +/- numeric stepper
- `ColorPicker` — Color picker
- `DatePicker` — Date picker
- `SegmentedControl` — Segmented tabs

### Data Display
- `Card` — Elevated, outlined, filled
- `Avatar` — With status indicator
- `AvatarGroup` — Stacked avatars
- `Badge` — Solid, outline, dot
- `Tag` — Labels with remove
- `Stat` — Stat card with trend
- `KeyValue` — Key-value pair
- `ListItem` — List row
- `Table` — Data table
- `Timeline` — Timeline view
- `Breadcrumb` — Breadcrumb nav

### Feedback
- `Toast` — Toast notifications (via `useToast`)
- `Alert` — Inline alerts
- `Spinner` — Loading spinner
- `Skeleton` — Loading placeholder
- `ProgressBar` — Linear progress
- `ProgressCircle` — Circular progress
- `EmptyState` — Empty state view
- `StepIndicator` — Multi-step progress

### Navigation
- `TabBar` — Bottom tab bar (floating pill)
- `Header` — Top navigation header
- `FAB` — Floating action button
- `Pagination` — Page navigation

### Overlays
- `Modal` — Modal dialog
- `BottomSheet` — Bottom sheet
- `ActionSheet` — Action sheet
- `Popover` — Popover
- `Tooltip` — Tooltip
- `Portal` — Portal rendering

### Form
- `FormField` — Field wrapper with label/error
- `FormGroup` — Group of fields

### Gestures
- `Pressable` — Animated pressable
- `Swipeable` — Swipe actions
- `PullToRefresh` — Pull to refresh
- `Carousel` — Swipeable carousel

### Utility
- `Accordion` — Expandable sections
- `Collapsible` — Collapsible content
- `ConditionalWrap` — Conditional wrapper

## Theming

```tsx
import { useTheme } from 'fitspark-ui';

function MyComponent() {
  const { theme, colorScheme, setColorScheme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.primary }}>
        Lime accent: {theme.colors.primary}
      </Text>
    </View>
  );
}
```

### Color Scheme

FitSpark ships with `dark` and `light` themes. The dark theme features:

| Token | Value |
|-------|-------|
| `background` | `#0D0D0D` |
| `surface` | `#1A1A1A` |
| `primary` (lime) | `#C8FF00` |
| `text` | `#FFFFFF` |
| `textSecondary` | `#A0A0A0` |

Switch themes at runtime:

```tsx
const { setColorScheme } = useTheme();
setColorScheme('light'); // or 'dark' or 'system'
```

## Hooks

- `useTheme()` — Access theme tokens and color scheme
- `useResponsive()` — Responsive breakpoint helpers
- `useAnimation()` — Reanimated animation presets

## Example App

```bash
cd example
npm install
npx expo start
```

## License

MIT
