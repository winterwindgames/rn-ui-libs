import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { DividerProps } from './Divider.types';

export const Divider: React.FC<DividerProps> = ({
  direction = 'horizontal',
  color,
  thickness = 1,
  spacing,
  style,
  testID,
  accessible,
  accessibilityLabel,
}) => {
  const { colors, spacing: spacingTokens } = useTheme();

  const resolveColor = (value: string | undefined): string => {
    if (value === undefined) return (colors as Record<string, string>).border ?? '#3a3a3a';
    return (colors as Record<string, string>)[value] ?? value;
  };

  const resolveSpacing = (value: string | number | undefined): number | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return (spacingTokens as Record<string, number>)[value] ?? undefined;
  };

  const spacingValue = resolveSpacing(spacing);
  const isHorizontal = direction === 'horizontal';

  const dividerStyle = {
    backgroundColor: resolveColor(color),
    ...(isHorizontal
      ? { height: thickness, width: '100%' as const, marginVertical: spacingValue }
      : { width: thickness, height: '100%' as const, marginHorizontal: spacingValue }),
  };

  return (
    <View
      style={[dividerStyle, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="separator"
    />
  );
};
