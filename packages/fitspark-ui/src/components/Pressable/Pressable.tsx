import React, { useCallback } from 'react';
import { Pressable as RNPressable, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type { PressableProps } from './Pressable.types';

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

export const Pressable: React.FC<PressableProps> = ({
  scaleValue = 0.97,
  opacityValue = 0.8,
  disabled = false,
  style,
  testID,
  children,
  onPressIn,
  onPressOut,
  ...rest
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = useCallback(
    (e: any) => {
      scale.value = withTiming(scaleValue, { duration: 100 });
      opacity.value = withTiming(opacityValue, { duration: 100 });
      onPressIn?.(e);
    },
    [scaleValue, opacityValue, onPressIn, scale, opacity],
  );

  const handlePressOut = useCallback(
    (e: any) => {
      scale.value = withTiming(1, { duration: 150 });
      opacity.value = withTiming(1, { duration: 150 });
      onPressOut?.(e);
    },
    [onPressOut, scale, opacity],
  );

  return (
    <AnimatedPressable
      style={[animatedStyle, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
};
