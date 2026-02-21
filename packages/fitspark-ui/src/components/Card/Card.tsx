import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { CardProps } from './Card.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  children,
  header,
  footer,
  onPress,
  disabled = false,
  style,
  testID,
}) => {
  const { colors, spacing, radii, shadows } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (onPress) scale.value = withTiming(0.97, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  const variantStyles: Record<string, any> = {
    elevated: {
      backgroundColor: colors.surface || '#1C1C1E',
      ...((shadows as any)?.md || {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }),
    },
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border || '#333333',
    },
    filled: {
      backgroundColor: colors.surfaceSecondary || '#2A2A2A',
    },
  };

  const Container = onPress ? AnimatedPressable : Animated.View;
  const containerProps = onPress
    ? {
        onPress,
        onPressIn: handlePressIn,
        onPressOut: handlePressOut,
        disabled,
        accessibilityRole: 'button' as const,
      }
    : {};

  return (
    <Container
      {...containerProps}
      style={[
        styles.card,
        { borderRadius: radii?.lg || 16, padding: spacing?.md || 16 },
        variantStyles[variant],
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
      testID={testID}
      accessibilityLabel={testID}
    >
      {header && <View style={[styles.header, { marginBottom: spacing?.sm || 8 }]}>{header}</View>}
      <View style={styles.body}>{children}</View>
      {footer && <View style={[styles.footer, { marginTop: spacing?.sm || 8, borderTopColor: colors.border || '#333333' }]}>{footer}</View>}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  header: {},
  body: {
    flex: 0,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
