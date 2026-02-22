import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { TabBarProps, TabBarItem } from './TabBar.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TabBarButton: React.FC<{
  item: TabBarItem; active: boolean; index: number;
  onPress: () => void; primaryColor: string; mutedColor: string; textColor: string;
}> = ({ item, active, index, onPress, primaryColor, mutedColor, textColor }) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const color = active ? primaryColor : mutedColor;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.9, { damping: 15, stiffness: 300 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 15, stiffness: 300 }); }}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={item.label}
      style={[styles.tab, animatedStyle]}
    >
      <View style={{ marginBottom: 2 }}>
        {typeof item.icon === 'function' ? item.icon({ color, size: 22 }) : item.icon}
      </View>
      <Text style={{ color, fontSize: 11, fontWeight: active ? '600' : '400' }}>{item.label}</Text>
      {active && <View style={[styles.dot, { backgroundColor: primaryColor }]} />}
    </AnimatedPressable>
  );
};

export const TabBar: React.FC<TabBarProps> = ({
  tabs, items, activeKey, activeIndex = 0, onTabPress, onChange, style, testID,
}) => {
  const { colors, sizes } = useTheme();
  const tabItems = tabs || items || [];

  return (
    <View testID={testID} style={[styles.container, { height: sizes.tabBarHeight, backgroundColor: colors.surface, borderTopWidth: 0.5, borderTopColor: colors.borderLight }, style]}>
      {tabItems.map((item, i) => {
        const key = item.key || String(i);
        const active = activeKey ? activeKey === key : activeIndex === i;
        return (
          <TabBarButton key={key} item={item} active={active} index={i}
            onPress={() => { onTabPress?.(key); onChange?.(i); }}
            primaryColor={colors.primary} mutedColor={colors.textMuted} textColor={colors.text} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 6 },
  dot: { width: 4, height: 4, borderRadius: 2, marginTop: 3 },
});
