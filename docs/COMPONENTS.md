# Component Checklist & Specifications

Every library in this monorepo ships with **all** components listed below. No partial libraries — it's all or nothing.

---

## 🧱 Primitives / Layout (9 components)

### Box
Themed `View` wrapper with shorthand props for padding, margin, background, border, and border radius.

| Prop | Type | Notes |
|------|------|-------|
| `bg` | `string` | Background color (theme key or raw) |
| `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr` | `number` | Spacing shorthand (uses theme spacing scale) |
| `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `number` | Margin shorthand |
| `radius` | `keyof ThemeRadii \| number` | Border radius |
| `border` | `boolean` | Show border with `colors.border` |

### Text
Themed `Text` with variant support. All typography comes through this component.

| Prop | Type | Notes |
|------|------|-------|
| `variant` | `TypographyVariant` | `h1`–`h6`, `body`, `bodyLg`, `bodySm`, `caption`, `label`, `overline` |
| `color` | `string` | Theme color key or raw color |
| `align` | `'left' \| 'center' \| 'right'` | Text alignment |
| `numberOfLines` | `number` | Line clamp |

### Spacer
Flexible spacing component (horizontal or vertical).

| Prop | Type | Notes |
|------|------|-------|
| `size` | `keyof ThemeSpacing \| number` | Fixed spacing amount |
| `flex` | `number` | Flex-based spacing |
| `horizontal` | `boolean` | Direction |

### Divider
Horizontal or vertical line separator.

| Prop | Type | Notes |
|------|------|-------|
| `orientation` | `'horizontal' \| 'vertical'` | Default: horizontal |
| `color` | `string` | Override border color |
| `thickness` | `number` | Default: 1 |
| `spacing` | `keyof ThemeSpacing` | Margin above/below or left/right |

### Stack (VStack / HStack)
Flexbox layout with gap support.

| Prop | Type | Notes |
|------|------|-------|
| `gap` | `keyof ThemeSpacing \| number` | Gap between children |
| `align` | FlexAlignType | Cross-axis alignment |
| `justify` | FlexJustify | Main-axis alignment |
| `wrap` | `boolean` | Flex wrap |

### Container
Max-width centered wrapper with horizontal padding.

| Prop | Type | Notes |
|------|------|-------|
| `maxWidth` | `number` | Default: 480 |
| `padding` | `keyof ThemeSpacing` | Horizontal padding |

### SafeAreaBox
`Box` + `SafeAreaView` combined. Uses `react-native-safe-area-context`.

### ScrollBox
Themed `ScrollView` wrapper with common defaults.

| Prop | Type | Notes |
|------|------|-------|
| `bg` | `string` | Background color |
| `padded` | `boolean` | Apply horizontal padding |
| `contentPadding` | `number` | Content container padding |

### KeyboardAvoidingBox
`KeyboardAvoidingView` wrapper with platform-aware behavior prop.

---

## 🔘 Actions / Inputs (16 components)

### Button
Primary action component with multiple variants.

| Prop | Type | Notes |
|------|------|-------|
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'link'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | Height: 36/44/52 |
| `color` | `string` | Theme color key |
| `label` | `string` | Button text |
| `leftIcon` / `rightIcon` | `ReactNode` | Icon slots |
| `loading` | `boolean` | Shows spinner, disables press |
| `disabled` | `boolean` | Disabled state |
| `fullWidth` | `boolean` | Stretch to container |
| `onPress` | `() => void` | Press handler |

**Animations:** Scale-down on press (Reanimated spring).

### IconButton
Circular/square icon-only button.

| Prop | Type | Notes |
|------|------|-------|
| `icon` | `ReactNode` | Icon element |
| `variant` | `'solid' \| 'outline' \| 'ghost'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | 36/44/52 |
| `rounded` | `boolean` | Circle (default) vs rounded square |

### TextInput
Full-featured text input with label, validation, and icons.

| Prop | Type | Notes |
|------|------|-------|
| `label` | `string` | Floating or static label |
| `placeholder` | `string` | Placeholder text |
| `value` / `onChangeText` | Standard RN | Controlled input |
| `leftIcon` / `rightIcon` | `ReactNode` | Icon slots |
| `helperText` | `string` | Help text below input |
| `errorMessage` | `string` | Error text (shows error state) |
| `size` | `'sm' \| 'md' \| 'lg'` | Input height |
| `maxLength` | `number` | Character limit |
| `showCharCount` | `boolean` | Show character counter |
| `secureTextEntry` | `boolean` | Password mode |
| `disabled` | `boolean` | Disabled state |

**Animations:** Border color transition on focus (Reanimated).

### TextArea
Multiline input with auto-grow option.

| Prop | Type | Notes |
|------|------|-------|
| `minHeight` / `maxHeight` | `number` | Auto-grow bounds |
| `autoGrow` | `boolean` | Expand with content |
| All TextInput props apply | | |

### SearchInput
TextInput with search icon, clear button, and debounced onChange.

| Prop | Type | Notes |
|------|------|-------|
| `onSearch` | `(query: string) => void` | Debounced search callback |
| `debounceMs` | `number` | Default: 300 |
| `clearable` | `boolean` | Show clear button when filled |

### Select / Picker
Dropdown or bottom-sheet selector.

| Prop | Type | Notes |
|------|------|-------|
| `options` | `{ label: string; value: string }[]` | Option list |
| `value` / `onChange` | Standard | Controlled |
| `placeholder` | `string` | Empty state text |
| `searchable` | `boolean` | Filter options |
| `multiple` | `boolean` | Multi-select mode |

**Implementation:** Opens a Modal/BottomSheet — no native picker (Expo Go compatible).

### Checkbox
Toggle with label and indeterminate state.

| Prop | Type | Notes |
|------|------|-------|
| `checked` | `boolean` | State |
| `indeterminate` | `boolean` | Third state |
| `onToggle` | `(checked: boolean) => void` | Handler |
| `label` | `string` | Label text |
| `color` | `string` | Check color |

**Animations:** Scale + opacity on toggle (Reanimated).

### Radio
RadioGroup + Radio items.

| Prop | Type | Notes |
|------|------|-------|
| `RadioGroup.value` / `onChange` | `string` | Controlled group |
| `Radio.value` | `string` | Item value |
| `Radio.label` | `string` | Item label |
| `Radio.disabled` | `boolean` | Per-item disable |

### Switch / Toggle
Animated toggle with label.

| Prop | Type | Notes |
|------|------|-------|
| `value` | `boolean` | State |
| `onToggle` | `(value: boolean) => void` | Handler |
| `label` | `string` | Label text |
| `color` | `string` | Active track color |
| `size` | `'sm' \| 'md'` | Track size |

**Animations:** Thumb slide + track color interpolation (Reanimated).

### Slider
Value slider with min/max/step.

| Prop | Type | Notes |
|------|------|-------|
| `value` | `number` | Current value |
| `onValueChange` | `(value: number) => void` | Handler |
| `min` / `max` / `step` | `number` | Range config |
| `showValue` | `boolean` | Display current value |

### DatePicker
Modal-based date/time selection (Expo Go compatible — no native date picker).

| Prop | Type | Notes |
|------|------|-------|
| `value` | `Date` | Current date |
| `onChange` | `(date: Date) => void` | Handler |
| `mode` | `'date' \| 'time' \| 'datetime'` | Picker mode |
| `minDate` / `maxDate` | `Date` | Range limits |

**Implementation:** Custom modal with scroll wheels or calendar grid.

### Stepper
Increment/decrement numeric input.

| Prop | Type | Notes |
|------|------|-------|
| `value` | `number` | Current value |
| `onValueChange` | `(value: number) => void` | Handler |
| `min` / `max` / `step` | `number` | Range config |

### SegmentedControl
iOS-style segmented tabs.

| Prop | Type | Notes |
|------|------|-------|
| `segments` | `string[]` | Labels |
| `selectedIndex` | `number` | Active segment |
| `onIndexChange` | `(index: number) => void` | Handler |

**Animations:** Sliding indicator (Reanimated).

### PinInput
OTP/PIN code input (4-6 digits).

| Prop | Type | Notes |
|------|------|-------|
| `length` | `number` | Number of digits (4-6) |
| `value` / `onChange` | Standard | Controlled |
| `secure` | `boolean` | Mask digits |
| `autoFocus` | `boolean` | Focus first cell |

### ColorPicker
Simple palette-based color selection.

| Prop | Type | Notes |
|------|------|-------|
| `colors` | `string[]` | Palette options |
| `value` / `onChange` | `string` | Selected color |
| `size` | `number` | Swatch size |

---

## 📋 Data Display (12 components)

### Card
Container with header, body, footer, optional image, and pressable variant.

| Prop | Type | Notes |
|------|------|-------|
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | Visual style |
| `onPress` | `() => void` | Makes card pressable |
| `header` / `footer` | `ReactNode` | Slot content |
| `image` | `ImageSource` | Top image |

### ListItem
Standard list row with icon, title, subtitle, right accessory, and chevron.

| Prop | Type | Notes |
|------|------|-------|
| `title` | `string` | Primary text |
| `subtitle` | `string` | Secondary text |
| `leftIcon` | `ReactNode` | Left slot |
| `rightAccessory` | `ReactNode` | Right slot |
| `showChevron` | `boolean` | Right arrow |
| `onPress` | `() => void` | Press handler |

### Avatar
Image with initials fallback, sizes, and status indicator.

| Prop | Type | Notes |
|------|------|-------|
| `source` | `ImageSource` | Image |
| `name` | `string` | Fallback initials |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Preset sizes |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | Status dot |

### AvatarGroup
Stacked avatars with +N overflow counter.

| Prop | Type | Notes |
|------|------|-------|
| `avatars` | `AvatarProps[]` | Avatar list |
| `max` | `number` | Max visible before +N |
| `size` | AvatarSize | Uniform size |

### Badge
Text/number badge and dot variant.

| Prop | Type | Notes |
|------|------|-------|
| `content` | `string \| number` | Badge text |
| `variant` | `'standard' \| 'dot'` | Display mode |
| `color` | `string` | Background color |
| `max` | `number` | Max number (shows 99+) |

### Tag / Chip
Removable, selectable tag with optional icon.

| Prop | Type | Notes |
|------|------|-------|
| `label` | `string` | Tag text |
| `variant` | `'solid' \| 'outline'` | Visual style |
| `removable` | `boolean` | Show X button |
| `selected` | `boolean` | Selected state |
| `onRemove` / `onPress` | `() => void` | Handlers |
| `icon` | `ReactNode` | Left icon |

### Accordion
Expandable/collapsible sections.

| Prop | Type | Notes |
|------|------|-------|
| `title` | `string` | Section header |
| `expanded` | `boolean` | Controlled state |
| `onToggle` | `() => void` | Handler |
| `icon` | `ReactNode` | Custom expand icon |

**Animations:** Height animation + chevron rotation (Reanimated).

### Table
Simple data table with header row and scrollable body.

| Prop | Type | Notes |
|------|------|-------|
| `columns` | `{ key: string; title: string; width?: number }[]` | Column config |
| `data` | `Record<string, any>[]` | Row data |
| `striped` | `boolean` | Alternating row colors |

### Timeline
Vertical timeline with dots/icons and connectors.

| Prop | Type | Notes |
|------|------|-------|
| `items` | `{ title: string; description?: string; icon?: ReactNode; color?: string }[]` | Timeline entries |
| `variant` | `'dot' \| 'icon'` | Marker style |

### Stat
Label + value + change indicator (for dashboards).

| Prop | Type | Notes |
|------|------|-------|
| `label` | `string` | Stat name |
| `value` | `string \| number` | Main value |
| `change` | `number` | Change percentage |
| `changeType` | `'positive' \| 'negative' \| 'neutral'` | Color coding |

### EmptyState
Illustration + title + subtitle + CTA button.

| Prop | Type | Notes |
|------|------|-------|
| `icon` | `ReactNode` | Illustration/icon |
| `title` | `string` | Heading |
| `subtitle` | `string` | Description |
| `action` | `{ label: string; onPress: () => void }` | CTA button |

### KeyValue
Label-value pair display.

| Prop | Type | Notes |
|------|------|-------|
| `label` | `string` | Left text |
| `value` | `string \| ReactNode` | Right content |
| `orientation` | `'horizontal' \| 'vertical'` | Layout |

---

## 💬 Feedback / Overlays (11 components)

### Toast / Snackbar
Auto-dismiss notification with variants and optional action.

| Prop | Type | Notes |
|------|------|-------|
| `message` | `string` | Toast text |
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | Variant |
| `duration` | `number` | Auto-dismiss ms (default: 3000) |
| `action` | `{ label: string; onPress: () => void }` | Action button |
| `position` | `'top' \| 'bottom'` | Placement |

**Implementation:** Context-based — `ToastProvider` + `useToast()` hook.
**Animations:** Slide in/out (Reanimated).

### Alert / Dialog
Modal confirmation with title, message, and action buttons.

| Prop | Type | Notes |
|------|------|-------|
| `visible` | `boolean` | Show/hide |
| `title` | `string` | Dialog title |
| `message` | `string` | Body text |
| `actions` | `{ label: string; onPress: () => void; variant?: string }[]` | Buttons |
| `onClose` | `() => void` | Backdrop dismiss |

### Modal
Generic full-featured modal.

| Prop | Type | Notes |
|------|------|-------|
| `visible` | `boolean` | Show/hide |
| `onClose` | `() => void` | Close handler |
| `title` | `string` | Optional header |
| `showCloseButton` | `boolean` | X button |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | Width preset |

**Animations:** Fade backdrop + scale/slide content (Reanimated).

### BottomSheet
Draggable bottom sheet with snap points.

| Prop | Type | Notes |
|------|------|-------|
| `visible` | `boolean` | Show/hide |
| `snapPoints` | `number[]` | Height percentages |
| `onClose` | `() => void` | Close handler |
| `handle` | `boolean` | Show drag handle |

**Implementation:** Pan gesture with Reanimated (no `react-native-gesture-handler` to stay Expo Go compatible — use `PanResponder`).

### Tooltip
Press-to-show tooltip.

| Prop | Type | Notes |
|------|------|-------|
| `content` | `string` | Tooltip text |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | Position |
| `children` | `ReactNode` | Trigger element |

### Popover
Anchored popup content.

| Prop | Type | Notes |
|------|------|-------|
| `visible` | `boolean` | Show/hide |
| `anchor` | `ReactNode` | Trigger element |
| `content` | `ReactNode` | Popup content |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | Position |

**Implementation:** Uses `Portal` to render at root level, measures anchor position.

### ActionSheet
iOS-style action sheet from bottom.

| Prop | Type | Notes |
|------|------|-------|
| `visible` | `boolean` | Show/hide |
| `title` | `string` | Header text |
| `options` | `{ label: string; onPress: () => void; destructive?: boolean }[]` | Actions |
| `cancelLabel` | `string` | Cancel button text |

### ProgressBar
Determinate/indeterminate progress bar.

| Prop | Type | Notes |
|------|------|-------|
| `progress` | `number` | 0-1 value |
| `indeterminate` | `boolean` | Animated loop |
| `color` | `string` | Bar color |
| `height` | `number` | Bar thickness |

**Animations:** Width interpolation (determinate) or sliding loop (indeterminate).

### ProgressCircle
Circular progress indicator.

| Prop | Type | Notes |
|------|------|-------|
| `progress` | `number` | 0-1 value |
| `size` | `number` | Diameter |
| `strokeWidth` | `number` | Ring thickness |
| `color` | `string` | Ring color |
| `showValue` | `boolean` | Center text |

**Implementation:** SVG or custom arc drawing.

### Spinner / ActivityIndicator
Themed loading spinner.

| Prop | Type | Notes |
|------|------|-------|
| `size` | `'sm' \| 'md' \| 'lg'` | Spinner size |
| `color` | `string` | Spinner color |

### Skeleton
Content placeholder with shimmer/pulse animation.

| Prop | Type | Notes |
|------|------|-------|
| `variant` | `'text' \| 'circular' \| 'rectangular'` | Shape preset |
| `width` / `height` | `number \| string` | Dimensions |
| `borderRadius` | `number` | Custom radius |

**Animations:** Opacity pulse (Reanimated).

---

## 🧭 Navigation / Structure (5 components)

### Header / AppBar
Top navigation bar with title, back button, and right action icons.

| Prop | Type | Notes |
|------|------|-------|
| `title` | `string` | Header text (uppercased) |
| `leftIcon` | `ReactNode` | Back button |
| `onLeftPress` | `() => void` | Back handler |
| `rightIcons` | `{ icon: ReactNode; onPress: () => void }[]` | Action buttons |
| `bg` | `string` | Background override |

### TabBar
Bottom tab bar with icons, labels, animated indicator, and clear active state.

| Prop | Type | Notes |
|------|------|-------|
| `items` | `{ key: string; icon: RenderFn; label: string }[]` | Tab items with icon render function |
| `activeKey` | `string` | Selected tab key |
| `onTabPress` | `(key: string) => void` | Handler |

**Active State:** Active tab shows primary color on icon + label, bold weight, and an animated dot indicator below. Inactive tabs use muted color and normal weight.
**Animations:** Scale-down spring on press (Reanimated). Active dot fades/scales in with spring. Icon color transitions.

### Breadcrumb
Navigation breadcrumb trail.

| Prop | Type | Notes |
|------|------|-------|
| `items` | `{ label: string; onPress?: () => void }[]` | Crumb items |
| `separator` | `string \| ReactNode` | Divider (default: `/`) |

### Pagination
Page indicator dots or numbered pages.

| Prop | Type | Notes |
|------|------|-------|
| `total` | `number` | Total pages |
| `current` | `number` | Active page |
| `onPageChange` | `(page: number) => void` | Handler |
| `variant` | `'dots' \| 'numbers'` | Display mode |

### StepIndicator
Multi-step wizard progress.

| Prop | Type | Notes |
|------|------|-------|
| `steps` | `string[]` | Step labels |
| `currentStep` | `number` | Active step |
| `variant` | `'horizontal' \| 'vertical'` | Layout |

---

## 📐 Layout Patterns (7 components)

### Grid
Responsive column grid.

| Prop | Type | Notes |
|------|------|-------|
| `columns` | `number` | Column count (2/3/4) |
| `gap` | `keyof ThemeSpacing \| number` | Grid gap |

### Carousel
Horizontal scrollable cards with pagination dots.

| Prop | Type | Notes |
|------|------|-------|
| `data` | `any[]` | Items |
| `renderItem` | `(item, index) => ReactNode` | Render function |
| `showPagination` | `boolean` | Dot indicators |
| `autoPlay` | `boolean` | Auto-scroll |

### Swipeable
Swipe-to-reveal actions (delete, archive).

| Prop | Type | Notes |
|------|------|-------|
| `leftActions` / `rightActions` | `{ label: string; color: string; onPress: () => void }[]` | Revealed actions |

### PullToRefresh
Pull-to-refresh wrapper.

| Prop | Type | Notes |
|------|------|-------|
| `refreshing` | `boolean` | Loading state |
| `onRefresh` | `() => void` | Handler |

### StickyHeader
ScrollView with sticky section headers.

| Prop | Type | Notes |
|------|------|-------|
| `header` | `ReactNode` | Sticky content |
| `stickyOffset` | `number` | Scroll threshold |

### FAB (Floating Action Button)
Floating bottom-right action button.

| Prop | Type | Notes |
|------|------|-------|
| `icon` | `ReactNode` | Button icon |
| `onPress` | `() => void` | Handler |
| `position` | `'bottom-right' \| 'bottom-left' \| 'bottom-center'` | Placement |
| `extended` | `boolean` | Show label |
| `label` | `string` | Extended text |

### Collapsible
Animated show/hide wrapper.

| Prop | Type | Notes |
|------|------|-------|
| `expanded` | `boolean` | Show/hide |
| `duration` | `number` | Animation ms |

**Animations:** Height animation (Reanimated).

---

## 🎨 Media / Rich Content (3 components)

### Image
Image with loading placeholder, error fallback, and aspect ratio.

| Prop | Type | Notes |
|------|------|-------|
| `source` | `ImageSource` | Image source |
| `fallback` | `ReactNode` | Error fallback |
| `aspectRatio` | `number` | Aspect ratio |
| `borderRadius` | `number` | Corner radius |

### Icon
Themed icon wrapper compatible with `@expo/vector-icons`.

| Prop | Type | Notes |
|------|------|-------|
| `name` | `string` | Icon name |
| `size` | `keyof ThemeSizes.icon` | Themed size |
| `color` | `string` | Theme color key or raw |

### GradientBox
`LinearGradient` wrapper with theme color support.

| Prop | Type | Notes |
|------|------|-------|
| `colors` | `string[]` | Gradient colors |
| `start` / `end` | `{ x: number; y: number }` | Direction |
| `style` | `ViewStyle` | Container style |

---

## ⌨️ Form Patterns (2 components)

### FormField
Composition wrapper: label + input + error + helper text.

| Prop | Type | Notes |
|------|------|-------|
| `label` | `string` | Field label |
| `error` | `string` | Error message |
| `helperText` | `string` | Help text |
| `required` | `boolean` | Required indicator |
| `children` | `ReactNode` | The input component |

### FormGroup
Groups multiple `FormField`s with shared validation state.

| Prop | Type | Notes |
|------|------|-------|
| `title` | `string` | Group heading |
| `error` | `string` | Group-level error |

---

## 🔧 Utility Components (3 components)

### Pressable
Enhanced `Pressable` with scale/opacity press feedback.

| Prop | Type | Notes |
|------|------|-------|
| `scaleOnPress` | `number` | Scale factor (default: 0.97) |
| `opacityOnPress` | `number` | Opacity (default: 0.8) |
| All RN Pressable props | | |

### ConditionalWrap
Conditionally wrap children in a component.

| Prop | Type | Notes |
|------|------|-------|
| `condition` | `boolean` | Whether to wrap |
| `wrap` | `(children: ReactNode) => ReactNode` | Wrapper function |
| `children` | `ReactNode` | Content |

### Portal
Render children at root level (for overlays, modals, toasts).

**Implementation:** Context-based — `PortalProvider` at root, `Portal` component teleports children.

---

## Per-Component Requirements

Every component **MUST** have:

1. ✅ **TypeScript interface** for all props (exported from `Component.types.ts`)
2. ✅ **`style` prop** — accepts `ViewStyle` / `TextStyle` for overrides
3. ✅ **Theme consumption** — colors, spacing, typography from `useTheme()`
4. ✅ **Dark mode** — automatic via theme context (no manual switching per component)
5. ✅ **Accessibility** — `accessibilityRole`, `accessibilityLabel`, `accessibilityState`
6. ✅ **Size variants** — `'sm' | 'md' | 'lg'` where applicable
7. ✅ **`testID` prop** — for testing frameworks
8. ✅ **Named export** — no default exports

## Total: 73 components

---

## 🆕 Additional Components (6)

### Menu / DropdownMenu
Dropdown action menu anchored to a trigger button. Different from Select (which is for form value selection) — Menu is for actions/navigation.

| Prop | Type | Notes |
|------|------|-------|
| `trigger` | `ReactNode` | The element that opens the menu |
| `items` | `{ label: string; icon?: ReactNode; onPress: () => void; destructive?: boolean; disabled?: boolean }[]` | Menu items |
| `visible` | `boolean` | Controlled show/hide |
| `onClose` | `() => void` | Close handler |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | Preferred position |

**Implementation:** Uses `Portal` to render at root level. Measures trigger position to anchor the dropdown. Backdrop press to dismiss.
**Animations:** Fade + scale-in from anchor point (Reanimated).

### Drawer
Side navigation panel that slides in from the left or right edge.

| Prop | Type | Notes |
|------|------|-------|
| `visible` | `boolean` | Open/close state |
| `onClose` | `() => void` | Close handler |
| `side` | `'left' \| 'right'` | Slide direction (default: left) |
| `width` | `number \| string` | Drawer width (default: 80% of screen) |
| `header` | `ReactNode` | Top section (logo, user info) |
| `footer` | `ReactNode` | Bottom section (settings, logout) |
| `children` | `ReactNode` | Drawer content (typically ListItems) |
| `overlay` | `boolean` | Show backdrop (default: true) |

**Implementation:** Absolute positioned View with backdrop. Uses `PanResponder` for swipe-to-close gesture.
**Animations:** Slide in/out with backdrop fade (Reanimated `withTiming`).

### Tabs (Top Tabs)
Horizontal top tab bar with content panels. Different from SegmentedControl (which is a compact input) — Tabs have full content areas.

| Prop | Type | Notes |
|------|------|-------|
| `tabs` | `{ label: string; icon?: ReactNode; content: ReactNode }[]` | Tab definitions |
| `activeIndex` | `number` | Controlled active tab |
| `onTabChange` | `(index: number) => void` | Tab switch handler |
| `variant` | `'underline' \| 'filled' \| 'pill'` | Tab style |
| `scrollable` | `boolean` | Horizontally scrollable tabs (for many tabs) |
| `lazy` | `boolean` | Only render active tab content (default: false) |

**Active State:** Active tab has primary color text, bold weight. Inactive tabs use muted color and normal weight. For 'filled' variant, active tab gets primary background with inverse text. For 'pill' variant, active tab gets surface background.
**Animations:** Sliding underline indicator with `withTiming` (Reanimated). Indicator smoothly translates and resizes to match active tab width. Content can fade/slide on switch.

### ToggleGroup / ButtonGroup
Group of buttons where one (single) or many (multi) can be selected. Different from SegmentedControl — ToggleGroup supports multi-select and custom button content.

| Prop | Type | Notes |
|------|------|-------|
| `type` | `'single' \| 'multiple'` | Selection mode |
| `value` | `string \| string[]` | Selected value(s) |
| `onValueChange` | `(value: string \| string[]) => void` | Handler |
| `items` | `{ value: string; label: string; icon?: ReactNode; disabled?: boolean }[]` | Button items |
| `size` | `'sm' \| 'md' \| 'lg'` | Button size |
| `orientation` | `'horizontal' \| 'vertical'` | Layout direction |

**Implementation:** Shared border radius on first/last items (grouped look). Active state uses primary color.

### SpeedDial
Expandable FAB that reveals sub-action buttons when pressed. Extends our existing FAB concept.

| Prop | Type | Notes |
|------|------|-------|
| `icon` | `ReactNode` | Main FAB icon (shown when closed) |
| `openIcon` | `ReactNode` | Icon when expanded (default: X/close) |
| `actions` | `{ icon: ReactNode; label?: string; onPress: () => void; color?: string }[]` | Sub-action buttons |
| `open` | `boolean` | Controlled open state |
| `onToggle` | `(open: boolean) => void` | Toggle handler |
| `position` | `'bottom-right' \| 'bottom-left'` | Placement |
| `overlay` | `boolean` | Show backdrop when open |

**Animations:** Main icon rotation (45° to X). Sub-actions stagger in from bottom with scale + fade (Reanimated).

### Link
Styled pressable text for opening URLs or triggering navigation. Similar to Button variant="link" but designed for inline text usage.

| Prop | Type | Notes |
|------|------|-------|
| `href` | `string` | URL to open (uses `Linking.openURL`) |
| `onPress` | `() => void` | Custom press handler (overrides href) |
| `children` | `string \| ReactNode` | Link content |
| `color` | `string` | Link color (default: primary) |
| `underline` | `'always' \| 'hover' \| 'none'` | Underline style |
| `size` | `'sm' \| 'md' \| 'lg'` | Text size |
| `external` | `boolean` | Show external link icon |
| `disabled` | `boolean` | Disabled state |

**Implementation:** Wraps `Text` in `Pressable`, calls `Linking.openURL(href)` on press.
**Animations:** Opacity feedback on press.
