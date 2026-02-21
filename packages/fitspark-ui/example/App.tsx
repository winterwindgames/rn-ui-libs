import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, Dimensions, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import {
  ThemeProvider,
  PortalProvider,
  ToastProvider,
  useToast,
  useTheme,
  Text,
  Button,
  Card,
  Avatar,
  Badge,
  Tag,
  Switch,
  Checkbox,
  SegmentedControl,
  ProgressBar,
  Skeleton,
  TabBar,
  FAB,
  TextInput,
  Stat,
  Divider,
  Spacer,
  Box,
} from '../src';

// ─── Layout Constants (8pt grid) ────────────────────────────────────
const SCREEN_PAD = 24;       // horizontal page padding
const SECTION_GAP = 48;      // vertical gap between sections
const INNER_GAP_LG = 16;     // gap between related items (cards, inputs)
const INNER_GAP_SM = 12;     // gap between tightly related items (buttons)
const TITLE_MB = 20;         // margin below section titles
const TAB_BAR_HEIGHT = 84;   // tab bar height for bottom inset

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const STAT_CARD_WIDTH = (SCREEN_WIDTH - SCREEN_PAD * 2 - 12) / 2; // 2 cols with 12px gap

// ─── Section Title ──────────────────────────────────────────────────
function SectionTitle({ children }: { children: string }) {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme.colors.text,
        ...theme.typography.h5,
        marginBottom: TITLE_MB,
      }}
    >
      {children}
    </Text>
  );
}

// ─── Section Wrapper ────────────────────────────────────────────────
function Section({ children }: { children: React.ReactNode }) {
  return <View style={{ marginBottom: SECTION_GAP }}>{children}</View>;
}

// ─── Main Content ───────────────────────────────────────────────────
function ShowcaseContent() {
  const { theme, colorScheme, toggleTheme } = useTheme();
  const toast = useToast();

  const [switchOn, setSwitchOn] = useState(true);
  const [checkboxOn, setCheckboxOn] = useState(false);
  const [segment, setSegment] = useState('weekly');
  const [activeTab, setActiveTab] = useState('home');
  const [inputText, setInputText] = useState('');

  const lime = theme.colors.primary;
  const s = theme.spacing;

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingHorizontal: SCREEN_PAD, paddingBottom: TAB_BAR_HEIGHT + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <Section>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.textMuted, ...theme.typography.bodySm }}>
                Good morning
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  ...theme.typography.h1,
                  marginTop: 4,
                }}
              >
                Alex 💪
              </Text>
            </View>
            <Pressable
              onPress={() => {
                console.log('TOGGLE PRESSED, colorScheme:', colorScheme);
                toggleTheme();
                setTimeout(() => console.log('AFTER TOGGLE'), 100);
              }}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: theme.colors.surface,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 4,
              }}
              accessibilityLabel="Toggle dark/light mode"
              accessibilityRole="button"
            >
              <Ionicons
                name={colorScheme === 'dark' ? 'sunny' : 'moon'}
                size={22}
                color={lime}
              />
            </Pressable>
          </View>
          <Text
            style={{
              color: theme.colors.textSecondary,
              ...theme.typography.body,
              marginTop: 8,
            }}
          >
            Let's crush your goals today
          </Text>
        </Section>

        <Divider />
        <Spacer size={SECTION_GAP} />

        {/* ── Stat Cards ─────────────────────────────────────── */}
        <Section>
          <SectionTitle>Today's Stats</SectionTitle>
          <View style={styles.statGrid}>
            <Stat
              label="Calories"
              value="1,842"
              change={12}
              changeLabel="vs yesterday"
              icon={<Ionicons name="flame-outline" size={20} color={lime} />}
              style={{ width: STAT_CARD_WIDTH }}
            />
            <Stat
              label="Steps"
              value="8,421"
              change={-3}
              changeLabel="vs yesterday"
              icon={<Ionicons name="footsteps-outline" size={20} color={lime} />}
              style={{ width: STAT_CARD_WIDTH }}
            />
            <Stat
              label="Workout"
              value="47m"
              change={22}
              changeLabel="vs avg"
              icon={<Ionicons name="timer-outline" size={20} color={lime} />}
              style={{ width: STAT_CARD_WIDTH }}
            />
            <Stat
              label="Heart Rate"
              value="72"
              changeLabel="bpm avg"
              icon={<Ionicons name="heart-outline" size={20} color={lime} />}
              style={{ width: STAT_CARD_WIDTH }}
            />
          </View>
        </Section>

        {/* ── Buttons ────────────────────────────────────────── */}
        <Section>
          <SectionTitle>Buttons</SectionTitle>
          <View style={{ gap: INNER_GAP_SM }}>
            <Button variant="solid" onPress={() => {}}>
              Start Workout
            </Button>
            <Button variant="outline" onPress={() => {}}>
              View Plan
            </Button>
            <Button variant="ghost" onPress={() => {}}>
              Skip Today
            </Button>
            <Button variant="solid" loading onPress={() => {}}>
              Loading…
            </Button>
            <Button variant="solid" disabled onPress={() => {}}>
              Disabled
            </Button>
          </View>
        </Section>

        {/* ── Text Inputs ────────────────────────────────────── */}
        <Section>
          <SectionTitle>Text Input</SectionTitle>
          <View style={{ gap: INNER_GAP_LG }}>
            <TextInput
              label="Search exercises"
              placeholder="e.g. Bench Press"
              value={inputText}
              onChangeText={setInputText}
              leftIcon={
                <Ionicons name="search-outline" size={18} color={theme.colors.textMuted} />
              }
            />
            <TextInput
              label="Weight (kg)"
              placeholder="0"
              keyboardType="numeric"
              hint="Your current body weight"
            />
            <TextInput
              label="Email"
              placeholder="you@example.com"
              error="Invalid email address"
            />
          </View>
        </Section>

        {/* ── Cards ──────────────────────────────────────────── */}
        <Section>
          <SectionTitle>Cards</SectionTitle>
          <View style={{ gap: INNER_GAP_LG }}>
            <Card variant="filled">
              <View style={styles.cardContent}>
                <Text style={{ color: lime, ...theme.typography.h6 }}>
                  🏋️ Upper Body Power
                </Text>
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    ...theme.typography.bodySm,
                    marginTop: 8,
                  }}
                >
                  Bench press, overhead press, rows, and more. 45 min estimated.
                </Text>
              </View>
            </Card>
            <Card variant="outlined">
              <View style={styles.cardContent}>
                <Text style={{ color: theme.colors.text, ...theme.typography.h6 }}>
                  🧘 Recovery Yoga
                </Text>
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    ...theme.typography.bodySm,
                    marginTop: 8,
                  }}
                >
                  Gentle stretching and breathing. Perfect for rest days.
                </Text>
              </View>
            </Card>
          </View>
        </Section>

        {/* ── Avatar & Badge ─────────────────────────────────── */}
        <Section>
          <SectionTitle>Avatar & Badge</SectionTitle>
          <View style={[styles.row, { gap: INNER_GAP_LG }]}>
            <Avatar name="Alex" size="lg" status="active" />
            <Avatar name="Jordan" size="lg" status="away" />
            <Avatar name="Sam" size="lg" status="inactive" />
          </View>
          <Spacer size={INNER_GAP_LG} />
          <View style={[styles.row, { gap: INNER_GAP_SM }]}>
            <Badge label="PRO" variant="solid" color="accent" />
            <Badge label="New" variant="outline" color="info" />
            <Badge variant="dot" color="error">
              <Text style={{ color: theme.colors.text, ...theme.typography.bodySm }}>
                Notifications
              </Text>
            </Badge>
          </View>
        </Section>

        {/* ── Tags ───────────────────────────────────────────── */}
        <Section>
          <SectionTitle>Tags</SectionTitle>
          <View style={[styles.row, { gap: 8 }]}>
            <Tag label="Strength" useAccent variant="solid" />
            <Tag label="Cardio" variant="outline" />
            <Tag label="HIIT" variant="subtle" />
            <Tag label="Removable" removable onRemove={() => {}} useAccent />
          </View>
        </Section>

        {/* ── Switch & Checkbox ──────────────────────────────── */}
        <Section>
          <SectionTitle>Switch & Checkbox</SectionTitle>
          <View style={{ gap: INNER_GAP_LG }}>
            <Switch
              label="Rest day reminders"
              value={switchOn}
              onValueChange={setSwitchOn}
            />
            <Checkbox
              label="I agree to the training plan"
              checked={checkboxOn}
              onChange={setCheckboxOn}
            />
          </View>
        </Section>

        {/* ── Segmented Control ──────────────────────────────── */}
        <Section>
          <SectionTitle>Segmented Control</SectionTitle>
          <SegmentedControl
            options={[
              { label: 'Daily', value: 'daily' },
              { label: 'Weekly', value: 'weekly' },
              { label: 'Monthly', value: 'monthly' },
            ]}
            value={segment}
            onValueChange={setSegment}
          />
        </Section>

        {/* ── Progress Bar ───────────────────────────────────── */}
        <Section>
          <SectionTitle>Progress Bar</SectionTitle>
          <View style={{ gap: INNER_GAP_LG }}>
            <View>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  ...theme.typography.bodySm,
                  marginBottom: 8,
                }}
              >
                Daily goal — 75% complete
              </Text>
              <ProgressBar progress={0.75} color={lime} height={8} />
            </View>
            <View>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  ...theme.typography.bodySm,
                  marginBottom: 8,
                }}
              >
                Hydration — 40%
              </Text>
              <ProgressBar progress={0.4} color="#38BDF8" height={8} />
            </View>
          </View>
        </Section>

        {/* ── Skeleton ───────────────────────────────────────── */}
        <Section>
          <SectionTitle>Skeleton</SectionTitle>
          <View style={{ gap: INNER_GAP_LG }}>
            <View style={[styles.row, { gap: INNER_GAP_SM }]}>
              <Skeleton variant="circle" width={48} height={48} />
              <View style={{ flex: 1, gap: 8 }}>
                <Skeleton variant="text" width="60%" height={14} />
                <Skeleton variant="text" width="90%" height={14} />
              </View>
            </View>
            <Skeleton variant="rect" width="100%" height={120} borderRadius={12} />
          </View>
        </Section>

        {/* ── Toast ──────────────────────────────────────────── */}
        <Section>
          <SectionTitle>Toast</SectionTitle>
          <View style={[styles.row, { gap: INNER_GAP_SM }]}>
            <Button
              variant="solid"
              size="sm"
              onPress={() =>
                toast.show({ message: 'Workout saved! 💪', type: 'success' })
              }
            >
              Success
            </Button>
            <Button
              variant="outline"
              size="sm"
              onPress={() =>
                toast.show({ message: 'Rest day reminder', type: 'info' })
              }
            >
              Info
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onPress={() =>
                toast.show({ message: 'Failed to sync', type: 'error' })
              }
            >
              Error
            </Button>
          </View>
        </Section>
      </ScrollView>

      {/* ── Tab Bar ──────────────────────────────────────────── */}
      <TabBar
        items={[
          {
            key: 'home',
            label: 'Home',
            icon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          },
          {
            key: 'workouts',
            label: 'Workouts',
            icon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="barbell-outline" size={size} color={color} />
            ),
          },
          {
            key: 'stats',
            label: 'Stats',
            icon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="stats-chart-outline" size={size} color={color} />
            ),
          },
          {
            key: 'profile',
            label: 'Profile',
            icon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          },
        ]}
        activeKey={activeTab}
        onTabPress={setActiveTab}
      />

      {/* ── FAB ──────────────────────────────────────────────── */}
      <FAB
        icon={<Ionicons name="add" size={26} color="#0D0D0D" />}
        onPress={() => toast.show({ message: 'Quick-add workout', type: 'info' })}
        position="bottom-right"
        style={{ bottom: TAB_BAR_HEIGHT + 16, right: SCREEN_PAD }}
      />

      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </View>
  );
}

// ─── App Root ───────────────────────────────────────────────────────
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

// ─── Styles ─────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    paddingTop: 64,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  cardContent: {
    padding: 12,
  },
});
