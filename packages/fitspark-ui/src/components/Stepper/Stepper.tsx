import React, { useCallback } from 'react';
import { View, TouchableOpacity, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { StepperProps } from './Stepper.types';

export const Stepper: React.FC<StepperProps> = ({
  value = 0,
  min = 0,
  max = 99,
  step = 1,
  onValueChange,
  label,
  disabled = false,
  size = 'md',
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, radii } = theme;

  const btnDim = size === 'sm' ? 32 : size === 'md' ? 40 : 48;
  const fontSize = size === 'sm' ? 14 : size === 'md' ? 18 : 22;

  const canDecrement = value - step >= min;
  const canIncrement = value + step <= max;

  const decrement = useCallback(() => {
    if (canDecrement) onValueChange?.(value - step);
  }, [value, step, canDecrement, onValueChange]);

  const increment = useCallback(() => {
    if (canIncrement) onValueChange?.(value + step);
  }, [value, step, canIncrement, onValueChange]);

  const btnStyle = (active: boolean): ViewStyle => ({
    width: btnDim,
    height: btnDim,
    borderRadius: btnDim / 2,
    backgroundColor: active && !disabled ? colors.surfaceElevated : colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: !active || disabled ? 0.3 : 1,
  });

  return (
    <View style={[{ gap: spacing.xs }, style]} testID={testID}>
      {label && <Text variant="label" color="textSecondary">{label}</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
        <TouchableOpacity
          onPress={decrement}
          style={btnStyle(canDecrement)}
          disabled={!canDecrement || disabled}
          accessibilityRole="button"
          accessibilityLabel="Decrease"
        >
          <Text style={{ fontSize, color: colors.text, fontWeight: '600' }}>−</Text>
        </TouchableOpacity>
        <Text variant="h4" style={{ minWidth: 40, textAlign: 'center' }}>{value}</Text>
        <TouchableOpacity
          onPress={increment}
          style={btnStyle(canIncrement)}
          disabled={!canIncrement || disabled}
          accessibilityRole="button"
          accessibilityLabel="Increase"
        >
          <Text style={{ fontSize, color: colors.text, fontWeight: '600' }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
