import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { KeyValueProps } from './KeyValue.types';

export const KeyValue: React.FC<KeyValueProps> = ({
  pairs,
  direction = 'horizontal',
  style,
  testID,
}) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={style} testID={testID}>
      {pairs.map((pair, i) => (
        <View
          key={i}
          style={[
            styles.row,
            direction === 'vertical' && styles.rowVertical,
            { paddingVertical: spacing?.sm || 8 },
            i < pairs.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border || '#333333' },
          ]}
          accessibilityLabel={`${pair.label}: ${pair.value}`}
        >
          <Text style={[styles.label, { color: colors.textSecondary || '#8E8E93' }]}>{pair.label}</Text>
          <Text style={[styles.value, { color: colors.text || '#FFFFFF' }]}>{String(pair.value)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowVertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
  },
});
