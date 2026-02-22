import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { TableProps } from './Table.types';

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  style,
  testID,
}) => {
  const { colors, spacing } = useTheme();

  return (
    <View testID={testID} style={style}>
      <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        {columns.map((col) => (
          <View key={col.key} style={[styles.cell, { flex: col.flex ?? 1, width: col.width, paddingVertical: spacing.sm, paddingHorizontal: spacing.sm }]}>
            <Text variant="label" color={colors.textSecondary}>{col.title}</Text>
          </View>
        ))}
      </View>
      {data.map((row, i) => (
        <View key={i} style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.borderLight }]}>
          {columns.map((col) => (
            <View key={col.key} style={[styles.cell, { flex: col.flex ?? 1, width: col.width, paddingVertical: spacing.sm, paddingHorizontal: spacing.sm }]}>
              <Text variant="bodySm" color={colors.text}>{String(row[col.key] ?? '')}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  cell: {},
});
