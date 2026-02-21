import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { SkeletonProps, SkeletonVariant } from './Skeleton.types';

const VARIANT_DEFAULTS: Record<SkeletonVariant, { width: number | string; height: number | string; borderRadius: number }> = {
  text: { width: '100%', height: 14, borderRadius: 4 },
  circular: { width: 40, height: 40, borderRadius: 20 },
  rectangular: { width: '100%', height: 80, borderRadius: 8 },
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  variant = 'rectangular',
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();
  const defaults = VARIANT_DEFAULTS[variant];
  const finalWidth = width ?? defaults.width;
  const finalHeight = height ?? defaults.height;
  const finalRadius =
    borderRadius ??
    (variant === 'circular' ? (typeof finalWidth === 'number' ? finalWidth / 2 : 20) : defaults.borderRadius);

  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      testID={testID}
      accessibilityRole="none"
      accessibilityLabel="Loading content"
      style={[
        {
          width: finalWidth as any,
          height: finalHeight as any,
          borderRadius: finalRadius,
          backgroundColor: colors.surfaceElevated ?? '#333',
        },
        animatedStyle,
        style,
      ]}
    />
  );
};
