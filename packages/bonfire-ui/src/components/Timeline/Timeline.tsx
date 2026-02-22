import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { TimelineProps } from './Timeline.types';

export const Timeline: React.FC<TimelineProps> = ({ items, style, testID }) => {
  const { colors, spacing } = useTheme();

  return (
    <View testID={testID} style={style}>
      {items.map((item, i) => (
        <View key={i} style={styles.item}>
          <View style={styles.indicator}>
            <View style={[styles.dot, { backgroundColor: item.color ?? colors.primary, width: 12, height: 12, borderRadius: 6 }]} />
            {i < items.length - 1 && <View style={[styles.line, { backgroundColor: colors.border }]} />}
          </View>
          <View style={[styles.content, { paddingBottom: spacing.lg, paddingLeft: spacing.md }]}>
            <Text variant="label" color={colors.text}>{item.title}</Text>
            {item.description && <Text variant="bodySm" color={colors.textSecondary} style={{ marginTop: 2 }}>{item.description}</Text>}
            {item.time && <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>{item.time}</Text>}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: { flexDirection: 'row' },
  indicator: { alignItems: 'center', width: 20 },
  dot: { marginTop: 4 },
  line: { flex: 1, width: 2, marginTop: 4 },
  content: { flex: 1 },
});
