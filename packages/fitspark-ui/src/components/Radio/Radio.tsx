import React, { useEffect } from 'react';
import { TouchableOpacity, View, type ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { RadioProps, RadioGroupProps } from './Radio.types';

export const Radio: React.FC<RadioProps> = ({
  selected = false,
  label,
  onPress,
  disabled = false,
  size = 22,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;
  const dotScale = useSharedValue(0);

  useEffect(() => {
    dotScale.value = withSpring(selected ? 1 : 0, { damping: 15 });
  }, [selected, dotScale]);

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dotScale.value }],
  }));

  const outerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 2,
    borderColor: selected ? colors.primary : colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress?.()}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, opacity: disabled ? 0.4 : 1 }, style]}
      activeOpacity={0.7}
      testID={testID}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label}
    >
      <View style={outerStyle}>
        <Animated.View
          style={[
            {
              width: size * 0.5,
              height: size * 0.5,
              borderRadius: size * 0.25,
              backgroundColor: colors.primary,
            },
            dotStyle,
          ]}
        />
      </View>
      {label && <Text variant="body">{label}</Text>}
    </TouchableOpacity>
  );
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  direction = 'column',
  gap = 12,
  disabled = false,
  style,
  testID,
}) => {
  return (
    <View style={[{ flexDirection: direction, gap }, style]} testID={testID} accessibilityRole="radiogroup">
      {options.map((opt) => (
        <Radio
          key={opt.value}
          label={opt.label}
          selected={opt.value === value}
          onPress={() => onChange?.(opt.value)}
          disabled={disabled || opt.disabled}
        />
      ))}
    </View>
  );
};
