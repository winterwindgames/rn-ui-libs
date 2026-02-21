import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { ProgressCircleProps } from './ProgressCircle.types';

/**
 * Circular progress using two half-circle rotation technique (SVG-free).
 * Each half is a semicircle that rotates to reveal the progress arc.
 */
export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value = 0,
  size = 64,
  strokeWidth = 6,
  color,
  bgColor,
  showValue = false,
  children,
  style,
  testID,
}) => {
  const { colors, typography } = useTheme();
  const progressColor = color ?? colors.primary ?? '#787AF3';
  const trackColor = bgColor ?? colors.surfaceElevated ?? '#333';
  const clampedValue = Math.max(0, Math.min(100, value));
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(clampedValue, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });
  }, [clampedValue]);

  // Right half: rotates from 0 to 180deg for 0-50%
  const rightHalfStyle = useAnimatedStyle(() => {
    const rotation = interpolate(progress.value, [0, 50, 100], [0, 180, 180]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  // Left half: rotates from 0 to 180deg for 50-100%
  const leftHalfStyle = useAnimatedStyle(() => {
    const rotation = interpolate(progress.value, [0, 50, 100], [0, 0, 180]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const halfSize = size / 2;

  const halfCircleBase = {
    width: halfSize,
    height: size,
    borderRadius: 0,
    overflow: 'hidden' as const,
  };

  const innerCircleBase = {
    width: halfSize,
    height: size,
    borderWidth: strokeWidth,
    borderColor: progressColor,
  };

  return (
    <View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clampedValue }}
      accessibilityLabel={`Progress: ${clampedValue}%`}
      style={[styles.container, { width: size, height: size }, style]}
    >
      {/* Background circle */}
      <View
        style={[
          styles.absolute,
          {
            width: size,
            height: size,
            borderRadius: halfSize,
            borderWidth: strokeWidth,
            borderColor: trackColor,
          },
        ]}
      />

      {/* Right half (0-50%) */}
      <View style={[styles.absolute, halfCircleBase, { left: halfSize }]}>
        <Animated.View
          style={[
            {
              ...innerCircleBase,
              borderTopRightRadius: halfSize,
              borderBottomRightRadius: halfSize,
              borderLeftWidth: 0,
              position: 'absolute',
              right: 0,
            },
            rightHalfStyle,
          ]}
        />
      </View>

      {/* Left half (50-100%) */}
      <View style={[styles.absolute, halfCircleBase, { left: 0 }]}>
        <Animated.View
          style={[
            {
              ...innerCircleBase,
              borderTopLeftRadius: halfSize,
              borderBottomLeftRadius: halfSize,
              borderRightWidth: 0,
              position: 'absolute',
              left: 0,
            },
            leftHalfStyle,
          ]}
        />
      </View>

      {/* Center content */}
      <View style={[styles.center, { width: size, height: size }]}>
        {children ?? (
          showValue ? (
            <Text
              style={{
                color: colors.text ?? '#F8FBFC',
                fontFamily: typography.body.fontFamily,
                fontSize: size * 0.22,
                fontWeight: '700',
              }}
            >
              {Math.round(clampedValue)}%
            </Text>
          ) : null
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
    top: 0,
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
