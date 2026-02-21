import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { TabBarProps } from './TabBar.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TabItem: React.FC<{
  item: TabBarProps['items'][number];
  active: boolean;
  onPress: () => void;
  accentColor: string;
  mutedColor: string;
  testID: string;
}> = ({ item, active, onPress, accentColor, mutedColor, testID }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const dotStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active ? 1 : 0, { duration: 200 }),
    transform: [{ scale: withSpring(active ? 1 : 0) }],
  }));

  return (
    <AnimatedPressable
      onPress={() => {
        scale.value = withSpring(0.85, {}, () => {
          scale.value = withSpring(1);
        });
        onPress();
      }}
      style={[styles.tab, animatedStyle]}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={item.accessibilityLabel ?? item.label}
      testID={testID}
    >
      {item.icon({
        color: active ? accentColor : mutedColor,
        size: 24,
        focused: active,
      })}
      <Text
        style={{
          fontSize: 10,
          fontWeight: active ? '700' : '500',
          color: active ? accentColor : mutedColor,
          marginTop: 2,
        }}
      >
        {item.label}
      </Text>
      <Animated.View
        style={[styles.dot, { backgroundColor: accentColor }, dotStyle]}
      />
    </AnimatedPressable>
  );
};

export const TabBar: React.FC<TabBarProps> = ({
  items,
  activeKey,
  onTabPress,
  style,
  testID = 'tab-bar',
}) => {
  const { colors, spacing, radii, shadows } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.full,
          marginHorizontal: spacing.lg,
          marginBottom: spacing.lg,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          ...(shadows.md ?? {}),
        },
        style,
      ]}
      accessibilityRole="tablist"
      testID={testID}
    >
      {items.map((item) => (
        <TabItem
          key={item.key}
          item={item}
          active={activeKey === item.key}
          onPress={() => onTabPress(item.key)}
          accentColor={colors.primary}
          mutedColor={colors.textMuted ?? '#636366'}
          testID={`${testID}-${item.key}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flex: 1,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
});
