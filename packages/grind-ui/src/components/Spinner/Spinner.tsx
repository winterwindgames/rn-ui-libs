import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { SpinnerProps, SpinnerSize } from './Spinner.types';

const SIZE_MAP: Record<SpinnerSize, number> = {
  sm: 20,
  md: 32,
  lg: 48,
};

const STROKE_MAP: Record<SpinnerSize, number> = {
  sm: 2,
  md: 3,
  lg: 4,
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const spinnerColor = color ?? colors.primary ?? '#787AF3';
  const dimension = SIZE_MAP[size];
  const stroke = STROKE_MAP[size];
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 800, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={[
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          borderWidth: stroke,
          borderColor: colors.surfaceElevated ?? '#333',
          borderTopColor: spinnerColor,
        },
        animatedStyle,
        style,
      ]}
    />
  );
};
