import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { StatProps, ChangeType } from './Stat.types';

export const Stat: React.FC<StatProps> = ({
  label,
  value,
  change,
  changeType = 'neutral',
  icon,
  style,
  testID,
}) => {
  const { colors, spacing, typography, radii } = useTheme();

  const changeColors: Record<ChangeType, string> = {
    increase: '#4CAF50',
    decrease: '#E37461',
    neutral: colors.textSecondary,
  };

  const changePrefix: Record<ChangeType, string> = {
    increase: '+',
    decrease: '',
    neutral: '',
  };

  const changeArrow: Record<ChangeType, string> = {
    increase: '↑',
    decrease: '↓',
    neutral: '→',
  };

  return (
    <View
      style={[
        styles.container,
        {
          padding: spacing.md,
          backgroundColor: colors.surface,
          borderRadius: radii.xl,
        },
        style,
      ]}
      testID={testID}
      accessibilityRole="summary"
      accessibilityLabel={`${label}: ${value}${change != null ? `, ${changePrefix[changeType]}${change}%` : ''}`}
    >
      <View style={styles.topRow}>
        <Text
          style={[
            typography.caption,
            {
              color: colors.textSecondary,
              textTransform: 'uppercase',
              fontWeight: '700',
              letterSpacing: 0.8,
            },
          ]}
        >
          {label}
        </Text>
        {icon && <View style={{ marginLeft: spacing.xs }}>{icon}</View>}
      </View>

      <Text
        style={[
          styles.value,
          {
            color: colors.text,
            marginTop: spacing.xs,
          },
        ]}
      >
        {value}
      </Text>

      {change != null && (
        <View
          style={[
            styles.changeBadge,
            {
              backgroundColor: changeColors[changeType] + '1A',
              borderRadius: radii.full ?? 999,
              marginTop: spacing.sm,
              paddingHorizontal: spacing.sm,
              paddingVertical: 2,
            },
          ]}
        >
          <Text
            style={[
              styles.changeText,
              { color: changeColors[changeType] },
            ]}
          >
            {changeArrow[changeType]} {changePrefix[changeType]}{change}%
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  changeBadge: {
    alignSelf: 'flex-start',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
