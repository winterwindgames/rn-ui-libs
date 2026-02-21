import React, { useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 24,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, radii, spacing } = theme;
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(checked ? 1 : 0, { damping: 15 });
  }, [checked, scale]);

  const checkAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  const boxStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: radii.sm,
    borderWidth: 2,
    borderColor: checked ? colors.primary : colors.border,
    backgroundColor: checked ? colors.primary : 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <TouchableOpacity
      onPress={() => !disabled && onChange?.(!checked)}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, opacity: disabled ? 0.4 : 1 }, style]}
      activeOpacity={0.7}
      testID={testID}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
    >
      <View style={boxStyle}>
        <Animated.View style={checkAnimStyle}>
          <Text style={{ fontSize: size * 0.6, color: colors.textInverse, fontWeight: '700', lineHeight: size * 0.7 }}>✓</Text>
        </Animated.View>
      </View>
      {label && <Text variant="body">{label}</Text>}
    </TouchableOpacity>
  );
};
