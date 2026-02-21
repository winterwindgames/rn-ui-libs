import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  variant = 'determinate',
  color,
  height = 6,
  rounded = true,
  animated = true,
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();
  const barColor = color ?? colors.primary ?? '#787AF3';
  const bgColor = colors.surfaceElevated ?? '#333';
  const borderRadius = rounded ? radii.full : 0;
  const clampedValue = Math.max(0, Math.min(100, value));

  // Determinate animation
  const widthProgress = useSharedValue(0);

  useEffect(() => {
    if (variant === 'determinate') {
      widthProgress.value = animated
        ? withTiming(clampedValue, { duration: 300, easing: Easing.out(Easing.cubic) })
        : clampedValue;
    }
  }, [clampedValue, variant, animated]);

  const determinateStyle = useAnimatedStyle(() => ({
    width: `${widthProgress.value}%` as any,
  }));

  // Indeterminate animation
  const indeterminateX = useSharedValue(-40);

  useEffect(() => {
    if (variant === 'indeterminate') {
      indeterminateX.value = withRepeat(
        withSequence(
          withTiming(-40, { duration: 0 }),
          withTiming(100, { duration: 1200, easing: Easing.inOut(Easing.cubic) })
        ),
        -1,
        false
      );
    }
  }, [variant]);

  const indeterminateStyle = useAnimatedStyle(() => ({
    left: `${indeterminateX.value}%` as any,
    width: '40%',
  }));

  return (
    <View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: 100,
        now: variant === 'determinate' ? clampedValue : undefined,
      }}
      accessibilityLabel={
        variant === 'determinate' ? `Progress: ${clampedValue}%` : 'Loading'
      }
      style={[
        styles.track,
        {
          height,
          backgroundColor: bgColor,
          borderRadius,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.bar,
          {
            backgroundColor: barColor,
            borderRadius,
            height,
          },
          variant === 'determinate' ? determinateStyle : indeterminateStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    position: 'relative',
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
