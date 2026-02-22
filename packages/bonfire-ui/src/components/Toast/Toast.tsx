import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { ToastProps } from './Toast.types';

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  variant = 'info',
  duration = 3000,
  onDismiss,
  style,
  testID,
}) => {
  const { colors, spacing, radii } = useTheme();
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  const variantColors: Record<string, string> = {
    info: colors.info,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  };

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(50, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
      if (duration > 0) {
        const timer = setTimeout(() => onDismiss?.(), duration);
        return () => clearTimeout(timer);
      }
    } else {
      translateY.value = withTiming(-100, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible, duration, onDismiss, translateY, opacity]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View
      testID={testID}
      accessibilityRole="alert"
      style={[
        styles.toast,
        {
          backgroundColor: variantColors[variant],
          borderRadius: radii.md,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
        },
        animStyle,
        style,
      ]}
    >
      <Text variant="bodySm" color={colors.textInverse}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: { position: 'absolute', top: 0, left: 24, right: 24, zIndex: 999, alignItems: 'center' },
});
