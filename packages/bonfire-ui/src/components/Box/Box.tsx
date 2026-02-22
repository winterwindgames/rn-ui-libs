import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { BoxProps } from './Box.types';

export const Box: React.FC<BoxProps> = ({
  padding, paddingH, paddingV, margin, marginH, marginV,
  bg, borderRadius, shadow, flex, align, justify, row, wrap, border,
  style, children, testID, accessible, accessibilityLabel, accessibilityRole,
}) => {
  const { colors, spacing, radii, shadows } = useTheme();

  const resolveSpacing = (value: string | number | undefined): number | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return (spacing as Record<string, number>)[value] ?? undefined;
  };

  const resolveColor = (value: string | undefined): string | undefined => {
    if (value === undefined) return undefined;
    return (colors as Record<string, string>)[value] ?? value;
  };

  const resolveRadius = (value: string | number | undefined): number | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return (radii as Record<string, number>)[value] ?? undefined;
  };

  const boxStyle = {
    padding: resolveSpacing(padding),
    paddingHorizontal: resolveSpacing(paddingH),
    paddingVertical: resolveSpacing(paddingV),
    margin: resolveSpacing(margin),
    marginHorizontal: resolveSpacing(marginH),
    marginVertical: resolveSpacing(marginV),
    backgroundColor: resolveColor(bg),
    borderRadius: resolveRadius(borderRadius),
    ...(shadow ? ((shadows as Record<string, object>)[shadow] || {}) : {}),
    flex,
    alignItems: align,
    justifyContent: justify,
    flexDirection: row ? ('row' as const) : undefined,
    flexWrap: wrap ? ('wrap' as const) : undefined,
    ...(border ? { borderWidth: 1, borderColor: colors.border } : {}),
  };

  return (
    <View
      style={[boxStyle, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole as any}
    >
      {children}
    </View>
  );
};
