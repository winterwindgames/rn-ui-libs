import React, { useEffect } from 'react';
import { TouchableOpacity, View, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { SwitchProps } from './Switch.types';

export const Switch: React.FC<SwitchProps> = ({
  value = false,
  onValueChange,
  label,
  disabled = false,
  size = 'md',
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;

  const trackW = size === 'sm' ? 44 : 52;
  const trackH = size === 'sm' ? 26 : 30;
  const thumbD = size === 'sm' ? 22 : 26;
  const travel = trackW - thumbD - 4;

  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 200 });
  }, [value, progress]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.surfaceElevated, colors.primary],
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * travel }],
  }));

  return (
    <TouchableOpacity
      onPress={() => !disabled && onValueChange?.(!value)}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, opacity: disabled ? 0.4 : 1 }, style]}
      activeOpacity={0.7}
      testID={testID}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={label}
    >
      <Animated.View style={[{ width: trackW, height: trackH, borderRadius: trackH / 2, justifyContent: 'center', paddingHorizontal: 2 }, trackStyle]}>
        <Animated.View
          style={[
            {
              width: thumbD,
              height: thumbD,
              borderRadius: thumbD / 2,
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
            },
            thumbStyle,
          ]}
        />
      </Animated.View>
      {label && <Text variant="body">{label}</Text>}
    </TouchableOpacity>
  );
};
