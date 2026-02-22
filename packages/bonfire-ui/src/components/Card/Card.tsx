import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({
  variant = 'elevated', onPress, header, footer, image, children, style, testID,
}) => {
  const { colors, radii, shadows, spacing } = useTheme();

  const bgColor = variant === 'filled' ? colors.surfaceElevated : colors.card;
  const borderStyle = variant === 'outlined' ? { borderWidth: 1, borderColor: colors.cardBorder } : {};
  const shadowStyle = variant === 'elevated' ? shadows.md : {};

  const Wrapper = onPress ? Pressable : View;
  const wrapperProps = onPress ? { onPress, accessibilityRole: 'button' as const } : {};

  return (
    <Wrapper testID={testID} {...wrapperProps}
      style={[styles.card, { backgroundColor: bgColor, borderRadius: radii.lg, padding: spacing.md }, borderStyle, shadowStyle, style]}>
      {image && <Image source={image} style={[styles.image, { borderTopLeftRadius: radii.lg, borderTopRightRadius: radii.lg }]} />}
      {header && <View style={styles.header}>{header}</View>}
      {children}
      {footer && <View style={styles.footer}>{footer}</View>}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: { overflow: 'hidden' },
  image: { width: '100%', height: 160, marginBottom: 12 },
  header: { marginBottom: 8 },
  footer: { marginTop: 12 },
});
