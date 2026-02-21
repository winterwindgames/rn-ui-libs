import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { SkeletonProps } from './Skeleton.types';

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width = '100%',
  height = 20,
  borderRadius,
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.bezier(0.4, 0, 0.6, 1) }),
      -1,
    );
  }, []);

  const resolvedRadius =
    borderRadius ??
    (variant === 'circle'
      ? (typeof height === 'number' ? height / 2 : 50)
      : variant === 'text'
        ? 4
        : (radii?.sm || 8));

  const resolvedWidth = variant === 'circle' ? height : width;

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmer.value, [0, 0.5, 1], [0.3, 0.6, 0.3]);
    return { opacity };
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: resolvedWidth as any,
          height,
          borderRadius: resolvedRadius,
          backgroundColor: colors.surfaceSecondary || '#2A2A2A',
        },
        animatedStyle,
        style,
      ]}
      testID={testID}
      accessibilityLabel="Loading content"
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {},
});
