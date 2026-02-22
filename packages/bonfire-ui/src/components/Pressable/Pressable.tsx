import React, { useCallback } from 'react';
import { Pressable as RNPressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import type { PressableProps } from './Pressable.types';

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

export const Pressable: React.FC<PressableProps> = ({
  scaleOnPress = 0.97, opacityOnPress = 0.8, children, style, testID, onPressIn, onPressOut, ...rest
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = useCallback((e: any) => {
    scale.value = withSpring(scaleOnPress, { damping: 15, stiffness: 200 });
    opacity.value = withSpring(opacityOnPress);
    onPressIn?.(e);
  }, [scaleOnPress, opacityOnPress, onPressIn]);

  const handlePressOut = useCallback((e: any) => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    opacity.value = withSpring(1);
    onPressOut?.(e);
  }, [onPressOut]);

  return (
    <AnimatedPressable testID={testID} onPressIn={handlePressIn} onPressOut={handlePressOut} style={[animatedStyle, style]} {...rest}>
      {children}
    </AnimatedPressable>
  );
};
