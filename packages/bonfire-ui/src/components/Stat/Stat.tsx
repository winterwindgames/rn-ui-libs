import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { StatProps } from './Stat.types';

export const Stat: React.FC<StatProps> = ({
  value,
  label,
  helpText,
  trend,
  style,
  testID,
}) => {
  const { colors, spacing } = useTheme();

  const trendColor = trend === 'up' ? colors.success : trend === 'down' ? colors.error : colors.textSecondary;
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '';

  return (
    <View testID={testID} style={style}>
      <Text variant="caption" color={colors.textSecondary}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: spacing.xs }}>
        <Text variant="stat" color={colors.text}>{value}</Text>
        {trend && <Text variant="bodySm" color={trendColor} style={{ marginLeft: spacing.xs }}>{trendIcon}</Text>}
      </View>
      {helpText && <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{helpText}</Text>}
    </View>
  );
};
