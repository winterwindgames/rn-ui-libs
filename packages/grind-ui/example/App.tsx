import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, StatusBar, Text as RNText, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ThemeProvider,
  useTheme,
  PortalProvider,
  ToastProvider,
  useToast,
  // Layout
  Box,
  Container,
  Stack,
  HStack,
  VStack,
  Spacer,
  Divider,
  SafeAreaBox,
  // Typography
  Text,
  // Inputs
  Button,
  IconButton,
  TextInput,
  Switch,
  Checkbox,
  Slider,
  SegmentedControl,
  Stepper,
  // Data Display
  Card,
  Avatar,
  Badge,
  Tag,
  Stat,
  ListItem,
  // Feedback
  Alert,
  ProgressBar,
  Skeleton,
  Spinner,
  // Navigation
  TabBar,
  Header,
  // Overlay
  Modal,
  FAB,
  // Misc
  Accordion,
  AccordionItem,
  EmptyState,
  // New Components
  Menu,
  Drawer,
  Tabs,
  ToggleGroup,
  SpeedDial,
  Link,
} from '../src';
import type { PaletteName } from '../src';

// ─── Palette Chip ─────────────────────────────────────────────────────────────
const PaletteChip: React.FC<{
  name: string;
  value: PaletteName;
  current: PaletteName;
  onPress: (p: PaletteName) => void;
  color: string;
}> = ({ name, value, current, onPress, color }) => {
  const { theme } = useTheme();
  const active = current === value;
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 100,
        backgroundColor: active ? theme.colors.primary : theme.colors.surface,
        borderWidth: 1.5,
        borderColor: active ? theme.colors.primary : theme.colors.border,
        gap: 6,
      }}
      activeOpacity={0.7}
    >
      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: color }} />
      <Text variant="label" style={{ color: active ? theme.colors.textInverse : theme.colors.text, fontSize: 12 }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

// ─── Section Wrapper ──────────────────────────────────────────────────────────
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.section}>
      <Text variant="h4" style={{ color: theme.colors.primary, marginBottom: 16 }}>
        {title}
      </Text>
      {children}
    </View>
  );
};

// ─── Main Demo Content ────────────────────────────────────────────────────────
const DemoContent: React.FC<{ isDark: boolean; onToggleDark: () => void }> = ({
  isDark,
  onToggleDark,
}) => {
  const { theme, palette, setPalette } = useTheme();
  const { show: showToast } = useToast();

  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [stepperValue, setStepperValue] = useState(3);
  const [tabIndex, setTabIndex] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [topTab, setTopTab] = useState(0);
  const [toggleValue, setToggleValue] = useState('daily');
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  return (
    <SafeAreaBox style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <Header
        title="GRIND UI"
        rightIcons={[
          {
            icon: <Ionicons name={isDark ? 'sunny' : 'moon'} size={22} color={theme.colors.primary} />,
            onPress: onToggleDark,
            accessibilityLabel: 'Toggle dark mode',
          },
        ]}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Palette Picker ─────────────────────────── */}
        <Section title="Palette">
          <HStack style={{ gap: 8, flexWrap: 'wrap' }}>
            <PaletteChip name="Default" value="default" current={palette} onPress={setPalette} color="#787AF3" />
            <PaletteChip name="Ocean" value="ocean" current={palette} onPress={setPalette} color="#22D1EE" />
            <PaletteChip name="Sunset" value="sunset" current={palette} onPress={setPalette} color="#F472B6" />
          </HStack>
        </Section>

        <Divider />

        {/* ── Buttons ────────────────────────────────── */}
        <Section title="Buttons">
          <HStack style={{ flexWrap: 'wrap', gap: 8 }}>
            <Button label="Solid" variant="solid" onPress={() => showToast({ message: 'Solid pressed!', variant: 'success' })} />
            <Button label="Outline" variant="outline" onPress={() => {}} />
            <Button label="Ghost" variant="ghost" onPress={() => {}} />
            <Button label="Soft" variant="soft" onPress={() => {}} />
          </HStack>
          <Spacer size="md" />
          <HStack style={{ flexWrap: 'wrap', gap: 8 }}>
            <Button label="Small" size="sm" onPress={() => {}} />
            <Button label="Medium" size="md" onPress={() => {}} />
            <Button label="Large" size="lg" onPress={() => {}} />
          </HStack>
          <Spacer size="md" />
          <HStack style={{ gap: 8 }}>
            <Button label="Elevated" variant="elevated" onPress={() => {}} />
            <Button label="Destructive" variant="destructive" onPress={() => {}} />
          </HStack>
          <Spacer size="md" />
          <HStack style={{ flexWrap: 'wrap', gap: 8 }}>
            <Button label="Secondary" color="secondary" onPress={() => {}} />
            <Button label="Disabled" disabled onPress={() => {}} />
            <Button label="Loading" loading onPress={() => {}} />
          </HStack>
          <Spacer size="md" />
          <HStack style={{ gap: 8 }}>
            <IconButton icon={<Ionicons name="heart" size={20} color="#E37461" />} variant="outline" onPress={() => {}} />
            <IconButton icon={<Ionicons name="share-outline" size={20} color="#787AF3" />} variant="outline" onPress={() => {}} />
            <IconButton icon={<Ionicons name="settings-outline" size={20} color="#787AF3" />} variant="ghost" onPress={() => {}} />
          </HStack>
        </Section>

        <Divider />

        {/* ── Text Inputs ────────────────────────────── */}
        <Section title="Text Inputs">
          <TextInput
            label="Username"
            placeholder="Enter your handle"
            value={textValue}
            onChangeText={setTextValue}
          />
          <Spacer size="md" />
          <TextInput
            label="Email"
            placeholder="you@grind.fit"
            leftIcon={<Ionicons name="mail-outline" size={20} color="#787AF3" />}
          />
          <Spacer size="md" />
          <TextInput
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#787AF3" />}
          />
          <Spacer size="md" />
          <TextInput
            label="Disabled"
            placeholder="Can't touch this"
            disabled
          />
        </Section>

        <Divider />

        {/* ── Cards ──────────────────────────────────── */}
        <Section title="Cards">
          <Card variant="elevated">
            <VStack style={{ gap: 8 }}>
              <Text variant="h5">Workout Complete 💪</Text>
              <Text variant="body" style={{ color: theme.colors.textSecondary }}>
                You crushed 45 minutes of HIIT training. Keep the grind going.
              </Text>
              <HStack style={{ gap: 8, marginTop: 8 }}>
                <Tag label="HIIT" variant="solid" />
                <Tag label="45min" variant="outline" />
                <Tag label="Hard" variant="soft" color="secondary" />
              </HStack>
            </VStack>
          </Card>
          <Spacer size="md" />
          <Card variant="outlined">
            <HStack style={{ alignItems: 'center', gap: 12 }}>
              <Avatar name="Alex Chen" size="lg" />
              <VStack style={{ flex: 1, gap: 2 }}>
                <Text variant="bodyBold">Alex Chen</Text>
                <Text variant="caption" style={{ color: theme.colors.textSecondary }}>
                  Level 42 · 🔥 15-day streak
                </Text>
              </VStack>
              <Badge label="PRO" variant="solid" />
            </HStack>
          </Card>
        </Section>

        <Divider />

        {/* ── Avatars & Badges ───────────────────────── */}
        <Section title="Avatars & Badges">
          <HStack style={{ gap: 12, alignItems: 'center' }}>
            <Avatar name="A" size="sm" />
            <Avatar name="BK" size="md" />
            <Avatar name="CL" size="lg" status="online" />
            <Avatar
              name="DM"
              size="lg"
              uri="https://i.pravatar.cc/150?img=12"
              status="busy"
            />
          </HStack>
          <Spacer size="lg" />
          <HStack style={{ gap: 8, flexWrap: 'wrap' }}>
            <Badge label="New" variant="solid" />
            <Badge label="Beta" variant="outline" />
            <Badge label="3" variant="solid" color="secondary" />
            <Badge label="Live" variant="soft" color="success" />
          </HStack>
        </Section>

        <Divider />

        {/* ── Tags ───────────────────────────────────── */}
        <Section title="Tags">
          <HStack style={{ gap: 8, flexWrap: 'wrap' }}>
            <Tag label="Strength" variant="solid" />
            <Tag label="Cardio" variant="outline" />
            <Tag label="Recovery" variant="soft" color="success" />
            <Tag label="🔥 Trending" variant="solid" color="secondary" />
            <Tag label="New" variant="outline" color="accent" />
          </HStack>
        </Section>

        <Divider />

        {/* ── Stats ──────────────────────────────────── */}
        <Section title="Stats">
          <HStack style={{ gap: 12 }}>
            <Box style={{ flex: 1 }}>
              <Stat label="Workouts" value="128" change={12} changeType="positive" />
            </Box>
            <Box style={{ flex: 1 }}>
              <Stat label="Streak" value="15d" change={3} changeType="positive" />
            </Box>
            <Box style={{ flex: 1 }}>
              <Stat label="Calories" value="2.4k" change={-5} changeType="negative" />
            </Box>
          </HStack>
        </Section>

        <Divider />

        {/* ── Controls ───────────────────────────────── */}
        <Section title="Controls">
          <HStack style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Text variant="body">Dark Mode</Text>
            <Switch value={isDark} onToggle={() => onToggleDark()} />
          </HStack>
          <Spacer size="md" />
          <HStack style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Text variant="body">Notifications</Text>
            <Switch value={switchValue} onToggle={(v) => setSwitchValue(v)} />
          </HStack>
          <Spacer size="md" />
          <Checkbox
            label="I agree to the terms"
            checked={checkboxValue}
            onToggle={setCheckboxValue}
          />
          <Spacer size="lg" />
          <Text variant="bodyBold" style={{ marginBottom: 8 }}>
            Volume
          </Text>
          <Slider value={sliderValue} onValueChange={setSliderValue} min={0} max={100} />
          <Spacer size="lg" />
          <Text variant="bodyBold" style={{ marginBottom: 8 }}>
            Sets
          </Text>
          <Stepper value={stepperValue} onValueChange={setStepperValue} min={1} max={10} />
        </Section>

        <Divider />

        {/* ── Segmented Control ──────────────────────── */}
        <Section title="Segmented Control">
          <SegmentedControl
            segments={['Day', 'Week', 'Month', 'Year']}
            selectedIndex={segmentIndex}
            onSelect={setSegmentIndex}
          />
        </Section>

        <Divider />

        {/* ── Progress & Feedback ────────────────────── */}
        <Section title="Progress & Feedback">
          <Text variant="caption" style={{ marginBottom: 4, color: theme.colors.textSecondary }}>
            Daily Goal — 75%
          </Text>
          <ProgressBar progress={0.75} variant="primary" />
          <Spacer size="md" />
          <Text variant="caption" style={{ marginBottom: 4, color: theme.colors.textSecondary }}>
            Hydration — 40%
          </Text>
          <ProgressBar progress={0.4} variant="secondary" />
          <Spacer size="lg" />
          <HStack style={{ gap: 16, alignItems: 'center' }}>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </HStack>
        </Section>

        <Divider />

        {/* ── Skeleton ───────────────────────────────── */}
        <Section title="Skeleton Loading">
          <HStack style={{ gap: 12, alignItems: 'center' }}>
            <Skeleton variant="circular" width={48} height={48} />
            <VStack style={{ flex: 1, gap: 8 }}>
              <Skeleton variant="text" width="60%" height={16} />
              <Skeleton variant="text" width="90%" height={12} />
            </VStack>
          </HStack>
          <Spacer size="md" />
          <Skeleton variant="rectangular" width="100%" height={120} />
        </Section>

        <Divider />

        {/* ── Alerts ─────────────────────────────────── */}
        <Section title="Progress">
          <ProgressBar value={72} />
        </Section>

        <Divider />

        {/* ── List Items ─────────────────────────────── */}
        <Section title="List Items">
          <Card variant="filled">
            <ListItem title="Bench Press" subtitle="4 × 8 reps" leftElement={<Ionicons name="barbell-outline" size={20} color="#787AF3" />} />
            <Divider />
            <ListItem title="Running" subtitle="5km — 24:30" leftElement={<Ionicons name="walk-outline" size={20} color="#787AF3" />} />
            <Divider />
            <ListItem title="Stretching" subtitle="15 minutes" leftElement={<Ionicons name="body-outline" size={20} color="#787AF3" />} onPress={() => {}} />
          </Card>
        </Section>

        <Divider />

        {/* ── Accordion ──────────────────────────────── */}
        <Section title="Accordion">
          <Accordion>
            <AccordionItem title="What is Grind UI?">
              <Text variant="body" style={{ color: theme.colors.textSecondary }}>
                A bold, fitness-inspired React Native component library built for
                high-performance apps.
              </Text>
            </AccordionItem>
            <AccordionItem title="Is it Expo compatible?">
              <Text variant="body" style={{ color: theme.colors.textSecondary }}>
                Yes! Grind UI works out of the box with Expo Go — no native builds
                required.
              </Text>
            </AccordionItem>
            <AccordionItem title="Can I customize the theme?">
              <Text variant="body" style={{ color: theme.colors.textSecondary }}>
                Absolutely. Pass a custom theme to ThemeProvider to override any
                token.
              </Text>
            </AccordionItem>
          </Accordion>
        </Section>

        <Divider />

        {/* ── Modal ──────────────────────────────────── */}
        <Section title="Modal">
          <Button
            label="Open Modal"
            variant="outline"
            onPress={() => setModalVisible(true)}
          />
          <Modal visible={modalVisible} onClose={() => setModalVisible(false)} title="Confirm Action">
            <VStack style={{ gap: 12 }}>
              <Text variant="body" style={{ color: theme.colors.textSecondary }}>
                Are you sure you want to reset your streak?
              </Text>
              <HStack style={{ gap: 8, justifyContent: 'flex-end' }}>
                <Button label="Cancel" variant="ghost" onPress={() => setModalVisible(false)} />
                <Button label="Reset" color="secondary" onPress={() => setModalVisible(false)} />
              </HStack>
            </VStack>
          </Modal>
        </Section>

        <Divider />

        {/* ── Toast ──────────────────────────────────── */}
        <Section title="Toast">
          <HStack style={{ gap: 8, flexWrap: 'wrap' }}>
            <Button
              label="Success"
              size="sm"
              variant="soft"
              onPress={() => showToast({ message: 'Workout saved!', variant: 'success' })}
            />
            <Button
              label="Error"
              size="sm"
              variant="soft"
              color="secondary"
              onPress={() => showToast({ message: 'Something went wrong', variant: 'error' })}
            />
            <Button
              label="Info"
              size="sm"
              variant="soft"
              onPress={() => showToast({ message: 'Syncing data...', variant: 'info' })}
            />
          </HStack>
        </Section>

        <Divider />

        {/* ── Tab Bar ────────────────────────────────── */}
        <Section title="Tab Bar">
          <TabBar
            tabs={[
              { label: 'Home', icon: <Ionicons name="home" size={20} /> },
              { label: 'Search', icon: <Ionicons name="search" size={20} /> },
              { label: 'Profile', icon: <Ionicons name="person" size={20} /> },
              { label: 'Settings', icon: <Ionicons name="settings" size={20} /> },
            ]}
            activeIndex={tabIndex}
            onChange={setTabIndex}
          />
        </Section>

        <Divider />

        {/* ── Empty State ────────────────────────────── */}
        <Section title="Empty State">
          <EmptyState
            title="No Workouts Yet"
            message="Start your first workout to see your history here."
            icon={<Ionicons name="barbell-outline" size={48} color="#787AF3" />}
          />
        </Section>

        {/* ── Menu & Navigation ────────────────────────────── */}
        <Section title="Menu & Navigation">
          <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
            <Menu
              visible={menuVisible}
              onClose={() => setMenuVisible(false)}
              trigger={
                <Button label="Open Menu" variant="outline" size="sm" onPress={() => setMenuVisible(true)} />
              }
              items={[
                { label: 'Edit', icon: <Ionicons name="pencil" size={18} color={theme.colors.text} />, onPress: () => { setMenuVisible(false); showToast({ message: 'Edit tapped', variant: 'info' }); } },
                { label: 'Share', icon: <Ionicons name="share" size={18} color={theme.colors.text} />, onPress: () => { setMenuVisible(false); showToast({ message: 'Shared!', variant: 'success' }); } },
                { label: 'Delete', destructive: true, icon: <Ionicons name="trash" size={18} color={theme.colors.error ?? '#E37461'} />, onPress: () => { setMenuVisible(false); showToast({ message: 'Deleted', variant: 'error' }); } },
              ]}
            />
            <Button label="Open Drawer" variant="outline" size="sm" onPress={() => setDrawerVisible(true)} />
          </HStack>
          <Spacer size="md" />
          <Link href="https://github.com/winterwindgames/rn-ui-libs" color={theme.colors.primary}>
            View on GitHub ↗
          </Link>
        </Section>

        {/* ── Tabs ────────────────────────────────────────────── */}
        <Section title="Top Tabs">
          <Tabs
            tabs={[
              { label: 'Daily', content: <Text variant="body" style={{ padding: 16, color: theme.colors.text }}>Today's overview with tasks and metrics.</Text> },
              { label: 'Weekly', content: <Text variant="body" style={{ padding: 16, color: theme.colors.text }}>Your weekly summary and trends.</Text> },
              { label: 'Monthly', content: <Text variant="body" style={{ padding: 16, color: theme.colors.text }}>Monthly performance and goals.</Text> },
            ]}
            activeIndex={topTab}
            onTabChange={setTopTab}
            variant="underline"
          />
        </Section>

        {/* ── Toggle Group ────────────────────────────────────── */}
        <Section title="Toggle Group">
          <ToggleGroup
            type="single"
            value={toggleValue}
            onValueChange={(v) => setToggleValue(v as string)}
            items={[
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
          />
        </Section>

        <Spacer size="xxl" />
        <Text
          variant="caption"
          style={{ textAlign: 'center', color: theme.colors.textSecondary, marginBottom: 32 }}
        >
          GRIND UI · Built for the relentless
        </Text>
      </ScrollView>

      {/* ── Drawer ────────────────────────────────────────────── */}
      <Drawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        side="left"
        header={
          <View style={{ padding: 24, paddingTop: 60 }}>
            <Text variant="h3" style={{ color: theme.colors.text }}>GRIND</Text>
          </View>
        }
      >
        <View style={{ padding: 16 }}>
          {['Dashboard', 'Analytics', 'Reports', 'Settings'].map((item) => (
            <View key={item} style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border ?? '#333' }}>
              <Text variant="body" style={{ color: theme.colors.text }}>{item}</Text>
            </View>
          ))}
        </View>
      </Drawer>

      {/* ── Speed Dial ────────────────────────────────────────── */}
      <SpeedDial
        icon={<Ionicons name="add" size={24} color="#fff" />}
        openIcon={<Ionicons name="close" size={24} color="#fff" />}
        open={speedDialOpen}
        onToggle={setSpeedDialOpen}
        position="bottom-right"
        actions={[
          { icon: <Ionicons name="document-text" size={18} color="#fff" />, label: 'Note', onPress: () => { setSpeedDialOpen(false); showToast({ message: 'New note', variant: 'success' }); } },
          { icon: <Ionicons name="calendar" size={18} color="#fff" />, label: 'Event', onPress: () => { setSpeedDialOpen(false); showToast({ message: 'New event', variant: 'info' }); } },
          { icon: <Ionicons name="checkmark-circle" size={18} color="#fff" />, label: 'Task', onPress: () => { setSpeedDialOpen(false); showToast({ message: 'New task', variant: 'success' }); } },
        ]}
      />
    </SafeAreaBox>
  );
};

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider initialScheme="dark">
        <PortalProvider>
          <ToastProvider>
            <DemoContentWrapper />
          </ToastProvider>
        </PortalProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function DemoContentWrapper() {
  const { colorScheme, toggleTheme } = useTheme();
  return (
    <DemoContent isDark={colorScheme === 'dark'} onToggleDark={toggleTheme} />
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 24,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
});
