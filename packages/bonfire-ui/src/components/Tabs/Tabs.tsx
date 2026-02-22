import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { TabsProps } from './Tabs.types';

export const Tabs: React.FC<TabsProps> = ({
  tabs, activeIndex = 0, onTabChange, variant = 'underline', scrollable, lazy, style, testID,
}) => {
  const { colors, radii, typography, spacing } = useTheme();

  const TabContainer = scrollable ? ScrollView : View;
  const tabContainerProps = scrollable ? { horizontal: true, showsHorizontalScrollIndicator: false } : {};

  return (
    <View testID={testID} style={style}>
      <TabContainer {...tabContainerProps} style={styles.tabRow}>
        {tabs.map((tab, i) => {
          const active = i === activeIndex;
          const tabBg = variant === 'filled' && active ? colors.primary
            : variant === 'pill' && active ? colors.surfaceElevated
            : 'transparent';
          const tabColor = variant === 'filled' && active ? colors.textInverse
            : active ? colors.primary : colors.textMuted;
          return (
            <Pressable key={i} onPress={() => onTabChange?.(i)}
              accessibilityRole="tab" accessibilityState={{ selected: active }}
              style={[styles.tab, {
                backgroundColor: tabBg,
                borderRadius: variant === 'pill' ? radii.pill : 0,
                borderBottomWidth: variant === 'underline' && active ? 3 : 0,
                borderBottomColor: colors.primary,
              }]}>
              {tab.icon && <View style={{ marginRight: 6 }}>{tab.icon}</View>}
              <Text style={{ color: tabColor, ...typography.label, fontWeight: active ? '600' : '400' }}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </TabContainer>
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
