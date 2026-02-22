import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { SkeletonProps } from './Skeleton.types';

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = 20,
  borderRadius: br,
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, [opacity]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const getBorderRadius = () => {
    if (br !== undefined) return br;
    if (variant === 'circular') return typeof height === 'number' ? height / 2 : 50;
    if (variant === 'text') return radii.sm;
    return radii.sm;
  };

  return (
    <Animated.View
      testID={testID}
      style={[
        {
          width: variant === 'circular' ? height : width,
          height,
          borderRadius: getBorderRadius(),
          backgroundColor: colors.skeleton,
        },
        animStyle,
        style,
      ]}
    />
  );
};
