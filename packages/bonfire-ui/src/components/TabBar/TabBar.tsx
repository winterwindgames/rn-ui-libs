import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { TabBarProps, TabBarItem } from './TabBar.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.View;

const TabBarButton: React.FC<{
  item: TabBarItem; active: boolean;
  onPress: () => void; primaryColor: string; mutedColor: string;
  surfaceColor: string;
}> = ({ item, active, onPress, primaryColor, mutedColor, surfaceColor }) => {
  const scale = useSharedValue(1);
  const progress = useSharedValue(active ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, { duration: 250 });
  }, [active]);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pillStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scaleX: 0.8 + progress.value * 0.2 }],
  }));

  const iconColor = active ? primaryColor : mutedColor;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.88, { damping: 15, stiffness: 350 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 12, stiffness: 200 }); }}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={item.label}
      style={[styles.tab, pressStyle]}
    >
      {/* Active pill background behind icon */}
      <View style={styles.iconContainer}>
        <AnimatedView
          style={[
            styles.activePill,
            { backgroundColor: primaryColor + '18' },
            pillStyle,
          ]}
        />
        <View style={{ zIndex: 1 }}>
          {typeof item.icon === 'function' ? item.icon({ color: iconColor, size: 22 }) : item.icon}
        </View>
      </View>

      {/* Label */}
      <Text
        style={[
          styles.label,
          {
            color: iconColor,
            fontWeight: active ? '700' : '400',
            opacity: active ? 1 : 0.7,
          },
        ]}
        numberOfLines={1}
      >
        {item.label}
      </Text>

      {/* Active dot indicator */}
      {active && (
        <AnimatedView style={[styles.dot, { backgroundColor: primaryColor }]} />
      )}
    </AnimatedPressable>
  );
};

export const TabBar: React.FC<TabBarProps> = ({
  tabs, items, activeKey, activeIndex = 0, onTabPress, onChange, style, testID,
}) => {
  const { colors, sizes, shadows } = useTheme();
  const tabItems = tabs || items || [];

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          height: sizes.tabBarHeight,
          backgroundColor: colors.surface,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border,
          ...shadows.sm,
        },
        style,
      ]}
    >
      {tabItems.map((item, i) => {
        const key = item.key || String(i);
        const active = activeKey ? activeKey === key : activeIndex === i;
        return (
          <TabBarButton
            key={key}
            item={item}
            active={active}
            onPress={() => { onTabPress?.(key); onChange?.(i); }}
            primaryColor={colors.primary}
            mutedColor={colors.textMuted}
            surfaceColor={colors.surfaceElevated}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 28,
  },
  activePill: {
    position: 'absolute',
    width: 48,
    height: 28,
    borderRadius: 14,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.2,
    marginTop: 2,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 4,
  },
});
