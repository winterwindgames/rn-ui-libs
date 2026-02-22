import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ProgressCircleProps } from './ProgressCircle.types';

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress = 0, size = 64, strokeWidth = 6, color = 'primary', showValue, style, testID,
}) => {
  const { colors, typography } = useTheme();
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;
  const pct = Math.max(0, Math.min(1, progress));

  return (
    <View testID={testID} style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: strokeWidth, borderColor: colors.surfaceElevated, position: 'absolute' }} />
      <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: strokeWidth, borderColor: resolvedColor, borderTopColor: pct < 1 ? 'transparent' : resolvedColor, borderRightColor: pct < 0.5 ? 'transparent' : resolvedColor, position: 'absolute', transform: [{ rotate: '-90deg' }] }} />
      {showValue && <Text style={{ color: colors.text, ...typography.label }}>{Math.round(pct * 100)}%</Text>}
    </View>
  );
};
