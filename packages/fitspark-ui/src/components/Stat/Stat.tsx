import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { StatProps } from './Stat.types';

export const Stat: React.FC<StatProps> = ({
  label,
  value,
  change,
  changeLabel,
  icon,
  style,
  testID,
}) => {
  const { colors, spacing, radii } = useTheme();
  const isPositive = change !== undefined && change >= 0;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface || '#1C1C1E',
          borderRadius: radii?.lg || 16,
          padding: spacing?.md || 16,
          borderColor: colors.border || '#333333',
        },
        style,
      ]}
      testID={testID}
      accessibilityLabel={`${label}: ${value}`}
    >
      <View style={styles.header}>
        <Text style={[styles.label, { color: colors.textSecondary || '#8E8E93' }]}>{label}</Text>
        {icon && <View style={styles.icon}>{icon}</View>}
      </View>
      <Text style={[styles.value, { color: colors.text || '#FFFFFF' }]}>{value}</Text>
      {change !== undefined && (
        <View style={styles.changeRow}>
          <Text
            style={[
              styles.changeText,
              { color: isPositive ? (colors.accent || '#C8FF00') : '#FF3B30' },
            ]}
          >
            {isPositive ? '↑' : '↓'} {Math.abs(change)}%
          </Text>
          {changeLabel && (
            <Text style={[styles.changeLabel, { color: colors.textSecondary || '#8E8E93' }]}>
              {' '}{changeLabel}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  icon: {},
  value: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  changeLabel: {
    fontSize: 13,
  },
});
