import React, { useEffect } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { TabsProps } from './Tabs.types';

export const Tabs: React.FC<TabsProps> = ({
  tabs, activeIndex = 0, onTabChange, variant = 'underline', scrollable, lazy, style, testID,
}) => {
  const { colors, radii, typography, spacing } = useTheme();
  const [widths, setWidths] = React.useState<number[]>([]);
  const indicatorX = useSharedValue(0);
  const indicatorW = useSharedValue(0);

  useEffect(() => {
    if (widths.length === tabs.length) {
      let x = 0;
      for (let i = 0; i < activeIndex; i++) x += widths[i];
      indicatorX.value = withTiming(x, { duration: 200 });
      indicatorW.value = withTiming(widths[activeIndex] || 0, { duration: 200 });
    }
  }, [activeIndex, widths]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorW.value,
  }));

  const handleLayout = (i: number) => (e: LayoutChangeEvent) => {
    setWidths(prev => { const n = [...prev]; n[i] = e.nativeEvent.layout.width; return n; });
  };

  const TabContainer = scrollable ? ScrollView : View;
  const tabContainerProps = scrollable ? { horizontal: true, showsHorizontalScrollIndicator: false } : {};

  return (
    <View testID={testID} style={style}>
      <View style={{ position: 'relative' }}>
        <TabContainer {...tabContainerProps} style={styles.tabRow}>
          {tabs.map((tab, i) => {
            const active = i === activeIndex;
            const tabBg = variant === 'filled' && active ? colors.primary
              : variant === 'pill' && active ? colors.surfaceElevated
              : 'transparent';
            const tabColor = variant === 'filled' && active ? colors.textInverse
              : active ? colors.primary : colors.textMuted;
            return (
              <Pressable key={i} onLayout={handleLayout(i)} onPress={() => onTabChange?.(i)}
                accessibilityRole="tab" accessibilityState={{ selected: active }}
                style={[styles.tab, { backgroundColor: tabBg, borderRadius: variant === 'pill' ? radii.pill : 0 }]}>
                {tab.icon && <View style={{ marginRight: 6 }}>{tab.icon}</View>}
                <Text style={{ color: tabColor, ...typography.label, fontWeight: active ? '600' : '400' }}>{tab.label}</Text>
              </Pressable>
            );
          })}
        </TabContainer>
        {variant === 'underline' && (
          <Animated.View style={[styles.indicator, { backgroundColor: colors.primary, borderRadius: 1.5 }, indicatorStyle]} />
        )}
      </View>
      <View style={{ marginTop: spacing.md }}>
        {lazy ? tabs[activeIndex]?.content : tabs.map((tab, i) => (
          <View key={i} style={{ display: i === activeIndex ? 'flex' : 'none' }}>{tab.content}</View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabRow: { flexDirection: 'row' },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  indicator: { position: 'absolute', bottom: 0, height: 3 },
});
