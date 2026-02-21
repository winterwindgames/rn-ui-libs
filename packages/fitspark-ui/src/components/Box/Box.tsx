import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { BoxProps, SpacingToken, RadiusToken, ColorToken } from './Box.types';

const resolveSpacing = (value: SpacingToken | number | undefined, spacing: Record<string, number>): number | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  return spacing[value];
};

const resolveRadius = (value: RadiusToken | number | undefined, radii: Record<string, number>): number | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  return radii[value];
};

const resolveColor = (value: ColorToken | string | undefined, colors: Record<string, string>): string | undefined => {
  if (value === undefined) return undefined;
  if (value in colors) return colors[value];
  return value;
};

export const Box: React.FC<BoxProps> = ({
  p, px, py, pt, pb, pl, pr,
  m, mx, my, mt, mb, ml, mr,
  bg, radius, shadow, border, borderColor, borderWidth,
  flex, row, center, align, justify, wrap,
  width, height, minHeight, maxWidth, overflow, opacity, position, gap,
  style,
  testID,
  children,
  ...rest
}) => {
  const { theme } = useTheme();
  const { spacing, radii, colors, shadows } = theme;

  const boxStyle: ViewStyle = {
    ...(p !== undefined && { padding: resolveSpacing(p, spacing) }),
    ...(px !== undefined && { paddingHorizontal: resolveSpacing(px, spacing) }),
    ...(py !== undefined && { paddingVertical: resolveSpacing(py, spacing) }),
    ...(pt !== undefined && { paddingTop: resolveSpacing(pt, spacing) }),
    ...(pb !== undefined && { paddingBottom: resolveSpacing(pb, spacing) }),
    ...(pl !== undefined && { paddingLeft: resolveSpacing(pl, spacing) }),
    ...(pr !== undefined && { paddingRight: resolveSpacing(pr, spacing) }),
    ...(m !== undefined && { margin: resolveSpacing(m, spacing) }),
    ...(mx !== undefined && { marginHorizontal: resolveSpacing(mx, spacing) }),
    ...(my !== undefined && { marginVertical: resolveSpacing(my, spacing) }),
    ...(mt !== undefined && { marginTop: resolveSpacing(mt, spacing) }),
    ...(mb !== undefined && { marginBottom: resolveSpacing(mb, spacing) }),
    ...(ml !== undefined && { marginLeft: resolveSpacing(ml, spacing) }),
    ...(mr !== undefined && { marginRight: resolveSpacing(mr, spacing) }),
    ...(bg !== undefined && { backgroundColor: resolveColor(bg, colors) }),
    ...(radius !== undefined && { borderRadius: resolveRadius(radius, radii) }),
    ...(shadow && shadows[shadow]),
    ...(border && { borderWidth: borderWidth ?? 1, borderColor: resolveColor(borderColor, colors) ?? colors.border }),
    ...(flex !== undefined && { flex }),
    ...(row && { flexDirection: 'row' as const }),
    ...(center && { alignItems: 'center' as const, justifyContent: 'center' as const }),
    ...(align && { alignItems: align }),
    ...(justify && { justifyContent: justify }),
    ...(wrap && { flexWrap: 'wrap' as const }),
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
    ...(minHeight !== undefined && { minHeight }),
    ...(maxWidth !== undefined && { maxWidth }),
    ...(overflow && { overflow }),
    ...(opacity !== undefined && { opacity }),
    ...(position && { position }),
    ...(gap !== undefined && { gap: resolveSpacing(gap, spacing) }),
  };

  return (
    <View style={[boxStyle, style]} testID={testID} {...rest}>
      {children}
    </View>
  );
};
