import React, { useState, useCallback, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
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
  const { colors, spacing, radii } = useTheme();
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = controlledIndex ?? internalIndex;
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [tabOffsets, setTabOffsets] = useState<number[]>([]);
  const [renderedTabs, setRenderedTabs] = useState<Set<number>>(new Set([activeIndex]));

  const indicatorLeft = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  React.useEffect(() => {
    if (tabOffsets[activeIndex] !== undefined && tabWidths[activeIndex] !== undefined) {
      indicatorLeft.value = withTiming(tabOffsets[activeIndex], { duration: 250 });
      indicatorWidth.value = withTiming(tabWidths[activeIndex], { duration: 250 });
    }
    if (lazy) {
      setRenderedTabs((prev) => new Set(prev).add(activeIndex));
    }
  }, [activeIndex, tabOffsets, tabWidths]);

  const indicatorStyle = useAnimatedStyle(() => ({
    left: indicatorLeft.value,
    width: indicatorWidth.value,
  }));

  const handleTabLayout = useCallback(
    (index: number, e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      setTabOffsets((prev) => {
        const next = [...prev];
        next[index] = x;
        return next;
      });
      setTabWidths((prev) => {
        const next = [...prev];
        next[index] = width;
        return next;
      });
    },
    [],
  );

  const handlePress = useCallback(
    (index: number) => {
      setInternalIndex(index);
      onTabChange?.(index);
    },
    [onTabChange],
  );

  const TabContainer = scrollable ? ScrollView : View;
  const containerProps = scrollable
    ? { horizontal: true, showsHorizontalScrollIndicator: false }
    : {};

  return (
    <View testID={testID} style={style}>
      <View>
        <TabContainer {...containerProps} style={styles.tabRow}>
          {tabs.map((tab, i) => {
            const isActive = i === activeIndex;
            const tabBg =
              variant === 'filled' && isActive
                ? colors.primary
                : variant === 'pill' && isActive
                ? colors.surface ?? '#1C1C1E'
                : 'transparent';
            const textColor =
              variant === 'filled' && isActive
                ? colors.textInverse
                : isActive
                ? colors.primary
                : colors.textMuted ?? colors.textSecondary;

            return (
              <Pressable
                key={i}
                onPress={() => handlePress(i)}
                onLayout={(e) => handleTabLayout(i, e)}
                accessibilityRole="tab"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: isActive }}
                style={[
                  styles.tab,
                  {
                    paddingHorizontal: spacing.md ?? 16,
                    paddingVertical: spacing.sm ?? 8,
                    backgroundColor: tabBg,
                    borderRadius: variant === 'pill' ? radii.pill ?? 100 : 0,
                  },
                ]}
              >
                {tab.icon && <View style={{ marginRight: spacing.xs ?? 4 }}>{tab.icon}</View>}
                <Animated.Text
                  style={{
                    color: textColor,
                    fontSize: 14,
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  {tab.label}
                </Animated.Text>
              </Pressable>
            );
          })}
        </TabContainer>
        {variant === 'underline' && (
          <Animated.View
            style={[
              styles.indicator,
              { backgroundColor: colors.primary },
              indicatorStyle,
            ]}
          />
        )}
        <View style={{ height: 1, backgroundColor: variant === 'underline' ? (colors.border ?? '#333') : 'transparent' }} />
      </View>
      <View style={{ paddingTop: spacing.md ?? 16 }}>
        {tabs.map((tab, i) => {
          if (lazy && !renderedTabs.has(i)) return null;
          return (
            <View key={i} style={{ display: i === activeIndex ? 'flex' : 'none' }}>
              {tab.content}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
  },
});
