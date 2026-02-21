import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { TableProps } from './Table.types';

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  striped = false,
  hoverable = false,
  style,
  testID,
}) => {
  const { colors, spacing, typography, radii } = useTheme();

  const defaultWidth = 120;

  return (
    <View
      style={[
        styles.container,
        { borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
        style,
      ]}
      testID={testID}
      accessibilityRole="none"
      accessibilityLabel="Data table"
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header */}
          <View
            style={[
              styles.row,
              {
                backgroundColor: colors.surfaceElevated,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              },
            ]}
          >
            {columns.map((col) => (
              <View
                key={col.key}
                style={[
                  styles.cell,
                  {
                    width: col.width ?? defaultWidth,
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.md,
                  },
                ]}
              >
                <Text
                  style={[
                    typography.caption,
                    {
                      color: colors.textSecondary,
                      textTransform: 'uppercase',
                      fontWeight: '700',
                      letterSpacing: 0.8,
                      textAlign: col.align ?? 'left',
                    },
                  ]}
                >
                  {col.title}
                </Text>
              </View>
            ))}
          </View>

          {/* Body */}
          {data.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.row,
                {
                  backgroundColor:
                    striped && rowIndex % 2 === 1
                      ? colors.surfaceElevated
                      : colors.surface,
                  borderBottomWidth: rowIndex < data.length - 1 ? StyleSheet.hairlineWidth : 0,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              {columns.map((col) => (
                <View
                  key={col.key}
                  style={[
                    styles.cell,
                    {
                      width: col.width ?? defaultWidth,
                      paddingVertical: spacing.sm,
                      paddingHorizontal: spacing.md,
                    },
                  ]}
                >
                  <Text
                    style={[
                      typography.bodySm,
                      {
                        color: colors.text,
                        textAlign: col.align ?? 'left',
                      },
                    ]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
  },
});
