import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { TextProps } from './Text.types';

export const Text: React.FC<TextProps> = ({
  variant = 'body', color, align, numberOfLines,
  style, children, testID, accessible, accessibilityLabel, accessibilityRole,
}) => {
  const { colors, typography } = useTheme();

  const resolveColor = (value: string | undefined): string | undefined => {
    if (value === undefined) return undefined;
    return (colors as Record<string, string>)[value] ?? value;
  };

  const variantStyle = (typography as Record<string, object>)[variant] || {};

  const textStyle = {
    ...variantStyle,
    color: resolveColor(color) ?? colors.text,
    textAlign: align,
  };

  return (
    <RNText
      style={[textStyle, style]}
      numberOfLines={numberOfLines}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole as any}
    >
      {children}
    </RNText>
  );
};
