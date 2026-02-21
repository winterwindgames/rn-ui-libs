import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { DividerProps } from './Divider.types';

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color,
  thickness = 1,
  spacing,
  inset = 0,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const resolvedColor = color
    ? (color in theme.colors ? (theme.colors as Record<string, string>)[color] : color)
    : theme.colors.border;
  const resolvedSpacing = spacing
    ? (typeof spacing === 'number' ? spacing : theme.spacing[spacing])
    : 0;

  const dividerStyle: ViewStyle =
    orientation === 'horizontal'
      ? {
          height: thickness,
          backgroundColor: resolvedColor,
          marginVertical: resolvedSpacing,
          marginLeft: inset,
          marginRight: inset,
        }
      : {
          width: thickness,
          backgroundColor: resolvedColor,
          marginHorizontal: resolvedSpacing,
          marginTop: inset,
          marginBottom: inset,
        };

  return (
    <View
      style={[dividerStyle, style]}
      testID={testID}
      accessibilityRole="none"
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
};
