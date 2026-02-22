import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { BadgeProps } from './Badge.types';

export const Badge: React.FC<BadgeProps> = ({
  content, label, variant = 'solid', color = 'primary', max = 99, style, testID,
}) => {
  const { colors, radii, typography } = useTheme();
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;
  const text = label ?? (typeof content === 'number' && content > max ? `${max}+` : String(content ?? ''));

  if (variant === 'dot') {
    return <View testID={testID} style={[{ width: 10, height: 10, borderRadius: 5, backgroundColor: resolvedColor }, style]} />;
  }

  const bg = variant === 'solid' ? resolvedColor : variant === 'outline' ? 'transparent' : resolvedColor + '20';
  const textColor = variant === 'solid' ? colors.textInverse : resolvedColor;
  const borderW = variant === 'outline' ? 1.5 : 0;

  return (
    <View testID={testID} style={[styles.badge, { backgroundColor: bg, borderRadius: radii.pill, borderWidth: borderW, borderColor: resolvedColor }, style]}>
      <Text style={[styles.text, { color: textColor, ...typography.caption, fontWeight: '600' }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start' },
  text: { textAlign: 'center' },
});
