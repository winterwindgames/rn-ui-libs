import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  type AnimatedStyle,
  type ViewStyle,
} from 'react-native-reanimated';

interface FadeInOptions {
  duration?: number;
  delay?: number;
}

export const useFadeIn = (options: FadeInOptions = {}) => {
  const { duration = 400, delay = 0 } = options;
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration, easing: Easing.out(Easing.ease) });
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return animatedStyle;
};

interface ScalePressOptions {
  scaleTo?: number;
}

export const useScalePress = (options: ScalePressOptions = {}) => {
  const { scaleTo = 0.96 } = options;
  const scale = useSharedValue(1);

  const onPressIn = () => {
    scale.value = withSpring(scaleTo, { damping: 15, stiffness: 200 });
  };

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { animatedStyle, onPressIn, onPressOut };
};

interface SlideInOptions {
  from?: 'left' | 'right' | 'bottom' | 'top';
  distance?: number;
  duration?: number;
  delay?: number;
}

export const useSlideIn = (options: SlideInOptions = {}) => {
  const { from = 'bottom', distance = 30, duration = 500, delay = 0 } = options;
  const offset = useSharedValue(distance);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      offset.value = withTiming(0, { duration, easing: Easing.out(Easing.cubic) });
      opacity.value = withTiming(1, { duration, easing: Easing.out(Easing.ease) });
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX =
      from === 'left' ? -offset.value : from === 'right' ? offset.value : 0;
    const translateY =
      from === 'top' ? -offset.value : from === 'bottom' ? offset.value : 0;

    return {
      opacity: opacity.value,
      transform: [{ translateX }, { translateY }],
    };
  });

  return animatedStyle;
};
