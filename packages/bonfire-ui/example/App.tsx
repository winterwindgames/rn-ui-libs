import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  ThemeProvider,
  useTheme,
  PortalProvider,
  // Primitives
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
  TextArea,
  SearchInput,
  Switch,
  Checkbox,
  Slider,
  SegmentedControl,
  Stepper,
  Radio,
  RadioGroup,
  Select,
  PinInput,
  ColorPicker,
  DatePicker,
  // Data Display
  Card,
  Avatar,
  AvatarGroup,
  Badge,
  Tag,
  Stat,
  ListItem,
  KeyValue,
  Accordion,
  AccordionItem,
  Timeline,
  Table,
  EmptyState,
  // Feedback
  Alert,
  Modal,
  BottomSheet,
  ActionSheet,
  ProgressBar,
  ProgressCircle,
  Skeleton,
  Spinner,
  // Navigation
  Header,
  TabBar,
  Breadcrumb,
  Pagination,
  StepIndicator,
  // Layout
  Grid,
  FAB,
  Collapsible,
  // Utility
  Link,
  // Additional
  Menu,
  Drawer,
  Tabs,
  ToggleGroup,
  SpeedDial,
  Toast,
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
      <Text variant="h5" style={{ color: theme.colors.primary, marginBottom: 16 }}>
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
  const [toastMsg, setToastMsg] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [toastVisible, setToastVisible] = useState(false);
  const showToast = ({ message, variant }: { message: string; variant: 'success' | 'error' | 'warning' | 'info' }) => {
    setToastMsg(message);
    setToastVariant(variant);
    setToastVisible(true);
  };

  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [stepperValue, setStepperValue] = useState(3);
  const [tabIndex, setTabIndex] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [radioValue, setRadioValue] = useState('opt1');
  const [pinValue, setPinValue] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FF3B6F');
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [topTab, setTopTab] = useState(0);
  const [toggleValue, setToggleValue] = useState('daily');
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [paginationPage, setPaginationPage] = useState(0);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  return (
    <SafeAreaBox style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <Header
        title="bonfire"
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
        {/* ── Greeting ─────────────────────────────── */}
        <View style={{ marginBottom: 8 }}>
          <Text variant="h2" style={{ color: theme.colors.text }}>hey there 👋</Text>
          <Text variant="body" style={{ color: theme.colors.textSecondary, marginTop: 4 }}>
            Welcome to the bonfire. Let's hang out.
          </Text>
        </View>

        {/* ── Palette Picker ─────────────────────────── */}
        <Section title="Palette">
          <HStack style={{ gap: 8, flexWrap: 'wrap' }}>
            <PaletteChip name="Default" value="default" current={palette} onPress={setPalette} color="#FF3B6F" />
            <PaletteChip name="Ocean" value="ocean" current={palette} onPress={setPalette} color="#4A90FF" />
            <PaletteChip name="Lavender" value="lavender" current={palette} onPress={setPalette} color="#A855F7" />
            <PaletteChip name="Sunset" value="sunset" current={palette} onPress={setPalette} color="#FF8C42" />
            <PaletteChip name="Mint" value="mint" current={palette} onPress={setPalette} color="#34D399" />
            <PaletteChip name="Rose" value="rose" current={palette} onPress={setPalette} color="#F472B6" />
            <PaletteChip name="Midnight" value="midnight" current={palette} onPress={setPalette} color="#6366F1" />
          </HStack>
        </Section>

        <Divider />

        {/* ── Stats ──────────────────────────────────── */}
        <Section title="Stats">
          <Grid columns={2} gap={12}>
            <Stat label="Friends" value="248" change={12} changeType="positive" />
            <Stat label="Streak" value="15d" change={3} changeType="positive" />
            <Stat label="Posts" value="1.2k" change={-5} changeType="negative" />
            <Stat label="Likes" value="8.4k" change={18} changeType="positive" />
          </Grid>
        </Section>

        <Divider />

        {/* ── Buttons ────────────────────────────────── */}
        <Section title="Buttons">
          <HStack style={{ flexWrap: 'wrap', gap: 8 }}>
            <Button label="Solid" variant="solid" onPress={() => showToast({ message: 'Solid pressed! 🔥', variant: 'success' })} />
            <Button label="Outline" variant="outline" onPress={() => {}} />
            <Button label="Ghost" variant="ghost" onPress={() => {}} />
            <Button label="Link" variant="link" onPress={() => {}} />
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
            <Button label="Disabled" disabled onPress={() => {}} />
            <Button label="Loading" loading onPress={() => {}} />
            <Button label="Full Width" fullWidth onPress={() => {}} />
          </HStack>
          <Spacer size="md" />
          <HStack style={{ gap: 8 }}>
            <IconButton icon={<Ionicons name="heart" size={20} color="#FF3B6F" />} variant="outline" onPress={() => {}} />
            <IconButton icon={<Ionicons name="share-outline" size={20} color={theme.colors.primary} />} variant="outline" onPress={() => {}} />
            <IconButton icon={<Ionicons name="chatbubble-outline" size={20} color={theme.colors.primary} />} variant="ghost" onPress={() => {}} />
          </HStack>
        </Section>

        <Divider />

        {/* ── Typography ─────────────────────────────── */}
        <Section title="Typography">
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
          <Text variant="h5">Heading 5</Text>
          <Text variant="h6">Heading 6</Text>
          <Spacer size="sm" />
          <Text variant="bodyLg">Body Large — The bonfire burns bright</Text>
          <Text variant="body">Body — Friends gather around the warmth</Text>
          <Text variant="bodySm">Body Small — Stories shared under stars</Text>
          <Text variant="caption" color="textSecondary">Caption — 2 hours ago</Text>
          <Text variant="label">Label text</Text>
          <Text variant="overline">Overline text</Text>
        </Section>

        <Divider />

        {/* ── Text Inputs ────────────────────────────── */}
        <Section title="Text Inputs">
          <TextInput
            label="Display Name"
            placeholder="What do friends call you?"
            value={textValue}
            onChangeText={setTextValue}
          />
          <Spacer size="md" />
          <TextInput
            label="Email"
            placeholder="you@bonfire.social"
            leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.primary} />}
          />
          <Spacer size="md" />
          <TextInput
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={theme.colors.primary} />}
          />
          <Spacer size="md" />
          <TextInput label="With Error" errorMessage="This field is required" placeholder="Oops..." />
          <Spacer size="md" />
          <TextInput label="Character Count" placeholder="Tell us about yourself..." maxLength={100} showCharCount value={textValue} onChangeText={setTextValue} />
          <Spacer size="md" />
          <TextArea label="Bio" placeholder="Write something about yourself..." minHeight={80} autoGrow />
          <Spacer size="md" />
          <SearchInput value={searchValue} onChangeText={setSearchValue} placeholder="Search friends..." />
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
          <Checkbox label="I agree to the community guidelines" checked={checkboxValue} onToggle={setCheckboxValue} />
          <Spacer size="lg" />
          <Text variant="h6" style={{ marginBottom: 8 }}>Volume</Text>
          <Slider value={sliderValue} onValueChange={setSliderValue} min={0} max={100} />
          <Spacer size="lg" />
          <Text variant="h6" style={{ marginBottom: 8 }}>Guests</Text>
          <Stepper value={stepperValue} onValueChange={setStepperValue} min={1} max={20} />
          <Spacer size="lg" />
          <RadioGroup value={radioValue} onChange={setRadioValue}>
            <Radio value="opt1" label="Public bonfire 🔥" />
            <Radio value="opt2" label="Friends only 🤝" />
            <Radio value="opt3" label="Private circle 🔒" />
          </RadioGroup>
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

        {/* ── Selection ──────────────────────────────── */}
        <Section title="Selection">
          <Select
            options={[
              { label: 'Music', value: 'music' },
              { label: 'Art', value: 'art' },
              { label: 'Gaming', value: 'gaming' },
              { label: 'Cooking', value: 'cooking' },
            ]}
            placeholder="Pick an interest..."
          />
          <Spacer size="md" />
          <Text variant="h6" style={{ marginBottom: 8 }}>Enter PIN</Text>
          <PinInput length={4} value={pinValue} onChange={setPinValue} />
          <Spacer size="md" />
          <Text variant="h6" style={{ marginBottom: 8 }}>Pick a color</Text>
          <ColorPicker value={selectedColor} onChange={setSelectedColor} />
          <Spacer size="md" />
          <Text variant="h6" style={{ marginBottom: 8 }}>Date</Text>
          <DatePicker />
        </Section>

        <Divider />

        {/* ── Data Display ───────────────────────────── */}
        <Section title="Avatars & Badges">
          <HStack style={{ gap: 12, alignItems: 'center' }}>
            <Avatar name="A" size="xs" />
            <Avatar name="BK" size="sm" />
            <Avatar name="CL" size="md" status="online" />
            <Avatar name="DM" size="lg" uri="https://i.pravatar.cc/150?img=12" status="busy" />
            <Avatar name="EF" size="xl" />
          </HStack>
          <Spacer size="md" />
          <AvatarGroup
            avatars={[
              { name: 'AL' }, { name: 'BM' }, { name: 'CN' }, { name: 'DO' }, { name: 'EP' }, { name: 'FQ' },
            ]}
            max={4}
            size="md"
          />
          <Spacer size="lg" />
          <HStack style={{ gap: 8, flexWrap: 'wrap' }}>
            <Badge label="New" variant="solid" />
            <Badge label="Online" variant="outline" color="success" />
            <Badge content={5} variant="solid" color="error" />
            <Badge variant="dot" color="success" />
          </HStack>
        </Section>

        <Divider />

        <Section title="Tags">
          <HStack style={{ gap: 8, flexWrap: 'wrap' }}>
            <Tag label="Anime" variant="solid" />
            <Tag label="Music" variant="outline" />
            <Tag label="Gaming" variant="soft" color="success" />
            <Tag label="🔥 Trending" variant="solid" color="error" />
            <Tag label="Removable" variant="outline" removable onRemove={() => showToast({ message: 'Tag removed', variant: 'info' })} />
          </HStack>
        </Section>

        <Divider />

        {/* ── Cards & Content ────────────────────────── */}
        <Section title="Cards">
          <Card variant="elevated">
            <VStack style={{ gap: 8 }}>
              <Text variant="h5">Bonfire Night 🔥</Text>
              <Text variant="body" style={{ color: theme.colors.textSecondary }}>
                Join us for an evening of stories, music, and marshmallows under the stars.
              </Text>
              <HStack style={{ gap: 8, marginTop: 8 }}>
                <Tag label="Social" variant="solid" />
                <Tag label="Tonight" variant="outline" />
              </HStack>
            </VStack>
          </Card>
          <Spacer size="md" />
          <Card variant="outlined">
            <HStack style={{ alignItems: 'center', gap: 12 }}>
              <Avatar name="Saki" size="lg" status="online" />
              <VStack style={{ flex: 1, gap: 2 }}>
                <Text variant="h6">Saki Tanaka</Text>
                <Text variant="caption" style={{ color: theme.colors.textSecondary }}>
                  Active now · 🔥 15-day streak
                </Text>
              </VStack>
              <Badge label="BFF" variant="solid" />
            </HStack>
          </Card>
        </Section>

        <Divider />

        <Section title="Key-Value">
          <KeyValue label="Status" value="Online" />
          <KeyValue label="Joined" value="February 2024" />
          <KeyValue label="Friends" value="248" />
        </Section>

        <Divider />

        <Section title="List Items">
          <Card variant="filled">
            <ListItem title="Notifications" subtitle="Push, email, SMS" leftElement={<Ionicons name="notifications-outline" size={20} color={theme.colors.primary} />} showChevron onPress={() => {}} />
            <Divider />
            <ListItem title="Privacy" subtitle="Who can see your profile" leftElement={<Ionicons name="shield-outline" size={20} color={theme.colors.primary} />} showChevron onPress={() => {}} />
            <Divider />
            <ListItem title="Theme" subtitle="Dark mode" leftElement={<Ionicons name="color-palette-outline" size={20} color={theme.colors.primary} />} rightAccessory={<Switch value={isDark} onToggle={onToggleDark} size="sm" />} />
          </Card>
        </Section>

        <Divider />

        <Section title="Accordion">
          <Accordion>
            <AccordionItem title="What is Bonfire UI?">
              <Text variant="body" style={{ color: theme.colors.textSecondary }}>
                A warm, social React Native component library built for friendship apps and cozy communities.
              </Text>
            </AccordionItem>
            <AccordionItem title="Is it Expo compatible?">
              <Text variant="body" style={{ color: theme.colors.textSecondary }}>
                Yes! Bonfire UI works out of the box with Expo Go — no native builds required.
              </Text>
            </AccordionItem>
            <AccordionItem title="How many palettes?">
              <Text variant="body" style={{ color: theme.colors.textSecondary }}>
                Three: Default (coral-pink), Ocean (blue), and Lavender (purple). Switch at runtime!
              </Text>
            </AccordionItem>
          </Accordion>
        </Section>

        <Divider />

        <Section title="Timeline">
          <Timeline items={[
            { title: 'Joined Bonfire', description: 'Welcome to the community! 🎉', color: 'primary' },
            { title: 'Made first friend', description: 'Connected with Saki', color: 'success' },
            { title: 'Started a bonfire', description: 'Your first group hangout', color: 'warning' },
            { title: 'Reached 15-day streak', description: 'Keep the fire burning! 🔥' },
          ]} />
        </Section>

        <Divider />

        <Section title="Table">
          <Table
            columns={[
              { key: 'name', title: 'Friend', width: 120 },
              { key: 'streak', title: 'Streak', width: 80 },
              { key: 'status', title: 'Status', width: 100 },
            ]}
            data={[
              { name: 'Saki', streak: '15d', status: 'Online' },
              { name: 'Hiro', streak: '8d', status: 'Away' },
              { name: 'Yuki', streak: '22d', status: 'Online' },
            ]}
            striped
          />
        </Section>

        <Divider />

        <Section title="Empty State">
          <EmptyState
            title="No messages yet"
            message="Start a conversation with your friends!"
            icon={<Ionicons name="chatbubbles-outline" size={48} color={theme.colors.primary} />}
            action={{ label: 'Start chatting', onPress: () => showToast({ message: 'Opening chat...', variant: 'info' }) }}
          />
        </Section>

        <Divider />

        {/* ── Progress & Loading ──────────────────────── */}
        <Section title="Progress & Loading">
          <Text variant="caption" style={{ marginBottom: 4, color: theme.colors.textSecondary }}>
            Daily activity — 75%
          </Text>
          <ProgressBar progress={0.75} />
          <Spacer size="md" />
          <Text variant="caption" style={{ marginBottom: 4, color: theme.colors.textSecondary }}>
            Profile complete — 40%
          </Text>
          <ProgressBar progress={0.4} color="warning" />
          <Spacer size="md" />
          <ProgressBar indeterminate />
          <Spacer size="lg" />
          <HStack style={{ gap: 16, alignItems: 'center' }}>
            <ProgressCircle progress={0.65} showValue size={56} />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </HStack>
        </Section>

        <Divider />

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

        {/* ── Navigation ─────────────────────────────── */}
        <Section title="Navigation">
          <Text variant="h6" style={{ marginBottom: 8 }}>Breadcrumb</Text>
          <Breadcrumb items={[
            { label: 'Home', onPress: () => {} },
            { label: 'Friends', onPress: () => {} },
            { label: 'Saki' },
          ]} />
          <Spacer size="lg" />
          <Text variant="h6" style={{ marginBottom: 8 }}>Pagination</Text>
          <Pagination total={5} current={paginationPage} onPageChange={setPaginationPage} />
          <Spacer size="lg" />
          <Text variant="h6" style={{ marginBottom: 8 }}>Step Indicator</Text>
          <StepIndicator steps={['Profile', 'Interests', 'Friends', 'Done']} currentStep={2} />
        </Section>

        <Divider />

        {/* ── Feedback Triggers ───────────────────────── */}
        <Section title="Overlays & Feedback">
          <HStack style={{ gap: 8, flexWrap: 'wrap' }}>
            <Button label="Toast ✓" size="sm" variant="outline" onPress={() => showToast({ message: 'Friendship request sent! 💕', variant: 'success' })} />
            <Button label="Toast ✕" size="sm" variant="outline" onPress={() => showToast({ message: 'Something went wrong', variant: 'error' })} />
            <Button label="Toast ⚠" size="sm" variant="outline" onPress={() => showToast({ message: 'Slow connection...', variant: 'warning' })} />
            <Button label="Toast ℹ" size="sm" variant="outline" onPress={() => showToast({ message: 'Syncing data...', variant: 'info' })} />
          </HStack>
          <Spacer size="md" />
          <HStack style={{ gap: 8, flexWrap: 'wrap' }}>
            <Button label="Alert" size="sm" variant="outline" onPress={() => setAlertVisible(true)} />
            <Button label="Modal" size="sm" variant="outline" onPress={() => setModalVisible(true)} />
            <Button label="Bottom Sheet" size="sm" variant="outline" onPress={() => setSheetVisible(true)} />
            <Button label="Action Sheet" size="sm" variant="outline" onPress={() => setActionSheetVisible(true)} />
          </HStack>
        </Section>

        <Divider />

        {/* ── Menu & Drawer ──────────────────────────── */}
        <Section title="Menu & Navigation">
          <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
            <Menu
              visible={menuVisible}
              onClose={() => setMenuVisible(false)}
              trigger={
                <Button label="Open Menu" variant="outline" size="sm" onPress={() => setMenuVisible(true)} />
              }
              items={[
                { label: 'Edit Profile', icon: <Ionicons name="pencil" size={18} color={theme.colors.text} />, onPress: () => { setMenuVisible(false); showToast({ message: 'Edit tapped', variant: 'info' }); } },
                { label: 'Share', icon: <Ionicons name="share" size={18} color={theme.colors.text} />, onPress: () => { setMenuVisible(false); } },
                { label: 'Block', destructive: true, icon: <Ionicons name="ban" size={18} color={theme.colors.error} />, onPress: () => { setMenuVisible(false); } },
              ]}
            />
            <Button label="Open Drawer" variant="outline" size="sm" onPress={() => setDrawerVisible(true)} />
          </HStack>
          <Spacer size="md" />
          <Link href="https://github.com" color={theme.colors.primary}>
            View on GitHub ↗
          </Link>
        </Section>

        <Divider />

        {/* ── Tabs ────────────────────────────────────── */}
        <Section title="Top Tabs">
          <Tabs
            tabs={[
              { label: 'Feed', content: <Text variant="body" style={{ padding: 16, color: theme.colors.text }}>Your friends' latest updates and stories. 📱</Text> },
              { label: 'Groups', content: <Text variant="body" style={{ padding: 16, color: theme.colors.text }}>Active bonfire groups you're part of. 🔥</Text> },
              { label: 'Events', content: <Text variant="body" style={{ padding: 16, color: theme.colors.text }}>Upcoming hangouts and events. 🎉</Text> },
            ]}
            activeIndex={topTab}
            onTabChange={setTopTab}
            variant="underline"
          />
        </Section>

        <Divider />

        {/* ── Toggle Group ────────────────────────────── */}
        <Section title="Toggle Group">
          <ToggleGroup
            value={toggleValue}
            onChange={(v) => setToggleValue(v)}
            options={[
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
          />
        </Section>

        <Divider />

        {/* ── Collapsible ────────────────────────────── */}
        <Section title="Collapsible">
          <Button label={collapsibleOpen ? "Hide Content" : "Show Content"} variant="outline" size="sm" onPress={() => setCollapsibleOpen(!collapsibleOpen)} />
          <Spacer size="sm" />
          <Collapsible expanded={collapsibleOpen}>
            <Card variant="filled">
              <Text variant="body" style={{ color: theme.colors.textSecondary }}>
                This content is hidden until you press the button above! ✨
              </Text>
            </Card>
          </Collapsible>
        </Section>

        <Divider />

        {/* ── Tab Bar ────────────────────────────────── */}
        <Section title="Tab Bar">
          <TabBar
            tabs={[
              { label: 'Home', icon: ({ color, size }: { color: string; size: number }) => <Ionicons name="home" size={size} color={color} /> },
              { label: 'Friends', icon: ({ color, size }: { color: string; size: number }) => <Ionicons name="people" size={size} color={color} /> },
              { label: 'Chat', icon: ({ color, size }: { color: string; size: number }) => <Ionicons name="chatbubbles" size={size} color={color} /> },
              { label: 'Profile', icon: ({ color, size }: { color: string; size: number }) => <Ionicons name="person" size={size} color={color} /> },
            ]}
            activeIndex={tabIndex}
            onChange={setTabIndex}
          />
        </Section>

        <Spacer size="xxl" />
        <Text
          variant="caption"
          style={{ textAlign: 'center', color: theme.colors.textSecondary, marginBottom: 32 }}
        >
          bonfire-ui · built with warmth 🔥
        </Text>
      </ScrollView>

      {/* ── Overlays ─────────────────────────────────── */}
      <Alert
        visible={alertVisible}
        title="Leave Bonfire?"
        message="Are you sure you want to leave this bonfire group?"
        onClose={() => setAlertVisible(false)}
        actions={[
          { label: 'Stay', onPress: () => setAlertVisible(false) },
          { label: 'Leave', onPress: () => { setAlertVisible(false); showToast({ message: 'Left the group', variant: 'info' }); } },
        ]}
      />

      <Modal visible={modalVisible} onClose={() => setModalVisible(false)} title="Create Bonfire">
        <VStack style={{ gap: 12 }}>
          <Text variant="body" style={{ color: theme.colors.textSecondary }}>
            Give your bonfire a name and invite friends to join!
          </Text>
          <HStack style={{ gap: 8, justifyContent: 'flex-end' }}>
            <Button label="Cancel" variant="ghost" onPress={() => setModalVisible(false)} />
            <Button label="Create" onPress={() => { setModalVisible(false); showToast({ message: 'Bonfire created! 🔥', variant: 'success' }); }} />
          </HStack>
        </VStack>
      </Modal>

      <BottomSheet visible={sheetVisible} onClose={() => setSheetVisible(false)} snapPoints={[40]}>
        <Text variant="h5" style={{ color: theme.colors.text, marginBottom: 12 }}>Share with friends</Text>
        <HStack style={{ gap: 16, justifyContent: 'center' }}>
          {['Saki', 'Hiro', 'Yuki', 'Ren'].map(name => (
            <VStack key={name} style={{ alignItems: 'center', gap: 6 }}>
              <Avatar name={name} size="md" />
              <Text variant="caption" style={{ color: theme.colors.textSecondary }}>{name}</Text>
            </VStack>
          ))}
        </HStack>
      </BottomSheet>

      <ActionSheet
        visible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        title="More Options"
        options={[
          { label: 'Share Profile', onPress: () => { setActionSheetVisible(false); showToast({ message: 'Shared!', variant: 'success' }); } },
          { label: 'Copy Link', onPress: () => setActionSheetVisible(false) },
          { label: 'Report', onPress: () => setActionSheetVisible(false), destructive: true },
        ]}
      />

      <Drawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        side="left"
        header={
          <View style={{ padding: 24, paddingTop: 60 }}>
            <Text variant="h3" style={{ color: theme.colors.text }}>bonfire 🔥</Text>
          </View>
        }
      >
        <View style={{ padding: 16 }}>
          {['Home', 'Friends', 'Groups', 'Events', 'Settings'].map((item) => (
            <View key={item} style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.borderLight }}>
              <Text variant="body" style={{ color: theme.colors.text }}>{item}</Text>
            </View>
          ))}
        </View>
      </Drawer>

      <SpeedDial
        icon={<Ionicons name="add" size={24} color="#fff" />}
        openIcon={<Ionicons name="close" size={24} color="#fff" />}
        open={speedDialOpen}
        onToggle={setSpeedDialOpen}
        position="bottom-right"
        actions={[
          { icon: <Ionicons name="chatbubble" size={18} color="#fff" />, label: 'Chat', onPress: () => { setSpeedDialOpen(false); showToast({ message: 'New chat', variant: 'success' }); } },
          { icon: <Ionicons name="people" size={18} color="#fff" />, label: 'Group', onPress: () => { setSpeedDialOpen(false); showToast({ message: 'New group', variant: 'info' }); } },
          { icon: <Ionicons name="flame" size={18} color="#fff" />, label: 'Bonfire', onPress: () => { setSpeedDialOpen(false); showToast({ message: 'New bonfire! 🔥', variant: 'success' }); } },
        ]}
      />
      {/* ── Fixed Bottom TabBar ──────────────────── */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TabBar
          tabs={[
            { label: 'Home', icon: ({ color, size }: { color: string; size: number }) => <Ionicons name="home" size={size} color={color} /> },
            { label: 'Friends', icon: ({ color, size }: { color: string; size: number }) => <Ionicons name="people" size={size} color={color} /> },
            { label: 'Chat', icon: ({ color, size }: { color: string; size: number }) => <Ionicons name="chatbubbles" size={size} color={color} /> },
            { label: 'Profile', icon: ({ color, size }: { color: string; size: number }) => <Ionicons name="person" size={size} color={color} /> },
          ]}
          activeIndex={tabIndex}
          onChange={setTabIndex}
        />
      </View>

      <Toast
        visible={toastVisible}
        message={toastMsg}
        variant={toastVariant}
        onDismiss={() => setToastVisible(false)}
      />
    </SafeAreaBox>
  );
};

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider initialScheme="dark">
      <PortalProvider>
        <DemoContentWrapper />
      </PortalProvider>
    </ThemeProvider>
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
