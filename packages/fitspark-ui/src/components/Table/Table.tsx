import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { TableProps } from './Table.types';

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  striped = true,
  style,
  testID,
}) => {
  const { colors, spacing } = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style} testID={testID}>
      <View>
        <View style={[styles.headerRow, { borderBottomColor: colors.border || '#333333' }]}>
          {columns.map((col) => (
            <View key={col.key} style={[styles.cell, { width: col.width || 120, padding: spacing?.sm || 10 }]}>
              <Text
                style={[
                  styles.headerText,
                  { color: colors.textSecondary || '#8E8E93', textAlign: col.align || 'left' },
                ]}
              >
                {col.title}
              </Text>
            </View>
          ))}
        </View>
        {data.map((row, i) => (
          <View
            key={i}
            style={[
              styles.dataRow,
              striped && i % 2 === 1 && { backgroundColor: (colors.surface || '#1C1C1E') + '80' },
              { borderBottomColor: colors.border || '#333333' },
            ]}
            accessibilityLabel={`Row ${i + 1}`}
          >
            {columns.map((col) => (
              <View key={col.key} style={[styles.cell, { width: col.width || 120, padding: spacing?.sm || 10 }]}>
                <Text
                  style={[styles.cellText, { color: colors.text || '#FFFFFF', textAlign: col.align || 'left' }]}
                  numberOfLines={1}
                >
                  {row[col.key] != null ? String(row[col.key]) : '—'}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cell: {},
  headerText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cellText: {
    fontSize: 14,
  },
});
