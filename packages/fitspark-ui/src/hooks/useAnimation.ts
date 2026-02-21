import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  type AnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import type { ViewStyle } from 'react-native';

interface FadeInOptions {
  duration?: number;
  delay?: number;
}

export const useFadeIn = (options: FadeInOptions = {}) => {
  const { duration = 400, delay = 0 } = options;
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration, easing: Easing.out(Easing.cubic) });
      translateY.value = withTiming(0, { duration, easing: Easing.out(Easing.cubic) });
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return { animatedStyle };
};

interface ScalePressOptions {
  scaleTo?: number;
}

export const useScalePress = (options: ScalePressOptions = {}) => {
  const { scaleTo = 0.96 } = options;
  const scale = useSharedValue(1);

  const onPressIn = () => {
    scale.value = withSpring(scaleTo, { damping: 15, stiffness: 300 });
  };

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { animatedStyle, onPressIn, onPressOut };
};

type SlideDirection = 'left' | 'right' | 'up' | 'down';

interface SlideInOptions {
  direction?: SlideDirection;
  distance?: number;
  duration?: number;
  delay?: number;
}

export const useSlideIn = (options: SlideInOptions = {}) => {
  const { direction = 'up', distance = 30, duration = 500, delay = 0 } = options;
  const progress = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      progress.value = withTiming(1, { duration, easing: Easing.out(Easing.cubic) });
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const d = distance * (1 - progress.value);
    const translateX = direction === 'left' ? -d : direction === 'right' ? d : 0;
    const translateY = direction === 'up' ? d : direction === 'down' ? -d : 0;

    return {
      opacity: progress.value,
      transform: [{ translateX }, { translateY }],
    };
  });

  return { animatedStyle };
};
