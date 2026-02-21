import React, { useState, useCallback, useRef } from 'react';
import {
  Pressable,
  Text,
  View,
  ScrollView,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { TabsProps } from './Tabs.types';

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeIndex: controlledIndex,
  onTabChange,
  variant = 'underline',
  scrollable = false,
  lazy = false,
  style,
  testID,
}) => {
  const { colors, spacing, radii, typography } = useTheme();
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = controlledIndex ?? internalIndex;
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [tabOffsets, setTabOffsets] = useState<number[]>([]);
  const indicatorLeft = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const visitedRef = useRef<Set<number>>(new Set([activeIndex]));

  const handleTabPress = useCallback(
    (index: number) => {
      visitedRef.current.add(index);
      if (controlledIndex === undefined) setInternalIndex(index);
      onTabChange?.(index);
    },
    [controlledIndex, onTabChange],
  );

  const handleTabLayout = useCallback(
    (index: number, e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      setTabWidths((prev) => {
        const next = [...prev];
        next[index] = width;
        return next;
      });
      setTabOffsets((prev) => {
        const next = [...prev];
        next[index] = x;
        return next;
      });
      if (index === activeIndex) {
        indicatorLeft.value = x;
        indicatorWidth.value = width;
      }
    },
    [activeIndex, indicatorLeft, indicatorWidth],
  );

  React.useEffect(() => {
    if (tabOffsets[activeIndex] !== undefined && tabWidths[activeIndex] !== undefined) {
      indicatorLeft.value = withTiming(tabOffsets[activeIndex], { duration: 250 });
      indicatorWidth.value = withTiming(tabWidths[activeIndex], { duration: 250 });
    }
  }, [activeIndex, tabOffsets, tabWidths, indicatorLeft, indicatorWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    left: indicatorLeft.value,
    width: indicatorWidth.value,
  }));

  const TabContainer = scrollable ? ScrollView : View;
  const containerProps = scrollable
    ? { horizontal: true, showsHorizontalScrollIndicator: false }
    : {};

  const renderTab = (tab: (typeof tabs)[number], index: number) => {
    const isActive = index === activeIndex;
    const activeColor = colors.primary ?? '#787AF3';
    const inactiveColor = colors.textSecondary ?? '#6B6B6B';

    const tabBg =
      variant === 'filled' && isActive
        ? (colors.primary ?? '#787AF3')
        : variant === 'pill' && isActive
          ? (colors.surfaceElevated ?? '#fff')
          : 'transparent';

    const textColor =
      variant === 'filled' && isActive
        ? (colors.textInverse ?? '#fff')
        : isActive
          ? activeColor
          : inactiveColor;

    return (
      <Pressable
        key={`${tab.label}-${index}`}
        onPress={() => handleTabPress(index)}
        onLayout={(e) => handleTabLayout(index, e)}
        accessibilityRole="tab"
        accessibilityLabel={tab.label}
        accessibilityState={{ selected: isActive }}
        style={[
          styles.tab,
          {
            paddingHorizontal: spacing.md ?? 16,
            paddingVertical: spacing.sm ?? 8,
            backgroundColor: tabBg,
            borderRadius:
              variant === 'pill' ? (radii.pill ?? 100) : variant === 'filled' ? (radii.sm ?? 8) : 0,
          },
        ]}
      >
        {tab.icon && <View style={{ marginRight: spacing.xs ?? 4 }}>{tab.icon}</View>}
        <Text
          style={{
            ...typography.label,
            color: textColor,
          }}
          numberOfLines={1}
        >
          {tab.label}
        </Text>
      </Pressable>
    );
  };

  const shouldRender = (index: number) => {
    if (!lazy) return true;
    return visitedRef.current.has(index);
  };

  return (
    <View testID={testID} style={style}>
      <View style={[styles.tabBar, { borderBottomColor: variant === 'underline' ? (colors.border ?? '#e2e2e2') : 'transparent', borderBottomWidth: variant === 'underline' ? 1 : 0 }]}>
        <TabContainer {...containerProps} style={styles.tabRow}>
          {tabs.map(renderTab)}
        </TabContainer>
        {variant === 'underline' && (
          <Animated.View
            style={[
              styles.indicator,
              { backgroundColor: colors.primary ?? '#787AF3', bottom: -1 },
              indicatorStyle,
            ]}
          />
        )}
      </View>
      <View style={[styles.content, { paddingTop: spacing.md ?? 16 }]}>
        {tabs.map((tab, index) =>
          shouldRender(index) ? (
            <View
              key={index}
              style={{ display: index === activeIndex ? 'flex' : 'none' }}
            >
              {tab.content}
            </View>
          ) : null,
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'relative',
  },
  tabRow: {
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    height: 3,
    borderRadius: 1.5,
  },
  content: {},
});
