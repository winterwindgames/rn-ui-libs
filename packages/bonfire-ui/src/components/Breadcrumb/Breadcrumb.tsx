import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { BreadcrumbProps } from './Breadcrumb.types';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/', style, testID }) => {
  const { colors, typography } = useTheme();
  return (
    <View testID={testID} style={[styles.container, style]} accessibilityRole="navigation">
      {items.map((item, i) => (
        <View key={i} style={styles.item}>
          {i > 0 && <Text style={{ color: colors.textMuted, marginHorizontal: 6, ...typography.bodySm }}>{typeof separator === 'string' ? separator : separator}</Text>}
          {item.onPress ? (
            <Pressable onPress={item.onPress}><Text style={{ color: colors.primary, ...typography.bodySm }}>{item.label}</Text></Pressable>
          ) : (
            <Text style={{ color: colors.text, ...typography.bodySm, fontWeight: '500' }}>{item.label}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  item: { flexDirection: 'row', alignItems: 'center' },
});
