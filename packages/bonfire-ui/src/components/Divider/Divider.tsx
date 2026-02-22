import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { DividerProps } from './Divider.types';

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal', color, thickness = 1, spacing, style, testID,
}) => {
  const { colors, spacing: sp } = useTheme();
  const resolvedColor = color
    ? ((colors as Record<string, string>)[color] ?? color)
    : colors.border;
  const gap = typeof spacing === 'string'
    ? (sp as Record<string, number>)[spacing] ?? 0
    : spacing ?? 0;

  const isH = orientation === 'horizontal';
  return (
    <View
      testID={testID}
      accessibilityRole="separator"
      style={[
        {
          backgroundColor: resolvedColor,
          ...(isH
            ? { height: thickness, marginVertical: gap }
            : { width: thickness, marginHorizontal: gap }),
        },
        style,
      ]}
    />
  );
};
