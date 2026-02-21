import React, { useCallback } from 'react';
import { Pressable as RNPressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import type { PressableProps } from './Pressable.types';

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

export const Pressable: React.FC<PressableProps> = ({
  onPress,
  onLongPress,
  disabled = false,
  scaleValue = 0.96,
  opacityValue = 0.8,
  hitSlop,
  style,
  children,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityRole,
  accessibilityHint,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(scaleValue, { damping: 15, stiffness: 300 });
    opacity.value = withSpring(opacityValue, { damping: 15, stiffness: 300 });
  }, [scaleValue, opacityValue, scale, opacity]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    opacity.value = withSpring(1, { damping: 15, stiffness: 300 });
  }, [scale, opacity]);

  return (
    <AnimatedPressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      hitSlop={hitSlop}
      style={[animatedStyle, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole as any}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      {children}
    </AnimatedPressable>
  );
};
