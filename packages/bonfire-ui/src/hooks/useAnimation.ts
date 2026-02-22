import { useSharedValue, useAnimatedStyle, withSpring, withTiming, SharedValue } from 'react-native-reanimated';
import { useCallback } from 'react';

export interface UseAnimationConfig {
  type?: 'spring' | 'timing';
  damping?: number;
  stiffness?: number;
  duration?: number;
}

export const useAnimation = (initialValue = 0, config?: UseAnimationConfig) => {
  const value = useSharedValue(initialValue);
  const { type = 'spring', damping = 15, stiffness = 200, duration = 300 } = config ?? {};

  const animateTo = useCallback(
    (target: number) => {
      if (type === 'spring') {
        value.value = withSpring(target, { damping, stiffness });
      } else {
        value.value = withTiming(target, { duration });
      }
    },
    [value, type, damping, stiffness, duration]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: value.value,
  }));

  return { value, animateTo, animatedStyle };
};
