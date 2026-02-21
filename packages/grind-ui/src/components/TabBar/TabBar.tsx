import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { TabBarProps } from './TabBar.types';

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeIndex,
  onChange,
  style,
  testID,
}) => {
  const { colors, spacing, radii, typography, shadows } = useTheme();
  const containerWidth = useSharedValue(0);
  const indicatorX = useSharedValue(0);
  const tabCount = tabs.length;
  const PADDING = 4;

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    containerWidth.value = w;
    const tabW = (w - PADDING * 2) / tabCount;
    indicatorX.value = withTiming(PADDING + activeIndex * tabW, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
  };

  useEffect(() => {
    if (containerWidth.value > 0) {
      const tabW = (containerWidth.value - PADDING * 2) / tabCount;
      indicatorX.value = withTiming(PADDING + activeIndex * tabW, {
        duration: 200,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [activeIndex]);

  const indicatorStyle = useAnimatedStyle(() => {
    const tabW = containerWidth.value > 0
      ? (containerWidth.value - PADDING * 2) / tabCount
      : 0;
    return {
      left: indicatorX.value,
      width: tabW,
    };
  });

  return (
    <View
      testID={testID}
      accessibilityRole="tablist"
      onLayout={onLayout}
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceElevated ?? colors.surface,
          borderRadius: radii.xl,
          marginHorizontal: spacing.md,
          marginBottom: spacing.md,
          padding: PADDING,
          ...shadows.md,
        },
        style,
      ]}
    >
      {/* Animated indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            backgroundColor: colors.primary,
            borderRadius: radii.lg,
          },
          indicatorStyle,
        ]}
      />

      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(index)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {isActive ? (tab.activeIcon ?? tab.icon) : tab.icon}
              {tab.badge != null && (
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: colors.error },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: colors.textInverse ?? '#fff' }]}>
                    {typeof tab.badge === 'number' && tab.badge > 99 ? '99+' : String(tab.badge)}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.label,
                {
                  color: isActive
                    ? colors.textInverse ?? '#fff'
                    : colors.textSecondary,
                  fontSize: typography.caption.fontSize,
                  fontWeight: isActive ? '700' : '400',
                },
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: 68,
  },
  indicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    paddingVertical: 6,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 2,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  label: {
    marginTop: 2,
  },
});
