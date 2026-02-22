import React, { useCallback } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { StepperProps } from './Stepper.types';

export const Stepper: React.FC<StepperProps> = ({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  disabled = false,
  style,
  testID,
}) => {
  const { colors, spacing, radii } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const decrement = useCallback(() => {
    if (disabled || value <= min) return;
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    setTimeout(() => { scale.value = withSpring(1, { damping: 15, stiffness: 300 }); }, 100);
    onChange(Math.max(min, value - step));
  }, [value, min, step, disabled, onChange, scale]);

  const increment = useCallback(() => {
    if (disabled || value >= max) return;
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    setTimeout(() => { scale.value = withSpring(1, { damping: 15, stiffness: 300 }); }, 100);
    onChange(Math.min(max, value + step));
  }, [value, max, step, disabled, onChange, scale]);

  return (
    <Animated.View testID={testID} style={[styles.container, { backgroundColor: colors.surfaceElevated, borderRadius: radii.pill, opacity: disabled ? 0.5 : 1 }, animStyle, style]}>
      <Pressable onPress={decrement} accessibilityRole="button" accessibilityLabel="Decrease" style={[styles.btn, { paddingHorizontal: spacing.md }]}>
        <Text variant="h5" color={value <= min ? colors.disabledText : colors.primary}>−</Text>
      </Pressable>
      <Text variant="h6" color={colors.text} style={{ minWidth: 32, textAlign: 'center' }}>{value}</Text>
      <Pressable onPress={increment} accessibilityRole="button" accessibilityLabel="Increase" style={[styles.btn, { paddingHorizontal: spacing.md }]}>
        <Text variant="h5" color={value >= max ? colors.disabledText : colors.primary}>+</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  btn: { paddingVertical: 8 },
});
