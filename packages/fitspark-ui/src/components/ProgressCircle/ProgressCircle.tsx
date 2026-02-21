import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { ProgressCircleProps } from './ProgressCircle.types';

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size = 80,
  strokeWidth = 6,
  color,
  trackColor,
  children,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const barColor = color || colors.accent || '#C8FF00';
  const bgColor = trackColor || colors.surfaceSecondary || '#2A2A2A';
  const halfSize = size / 2;

  // Using border-based circular progress technique
  // We overlay 2 half-circles that rotate to reveal progress
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(Math.min(1, Math.max(0, progress)), { duration: 500 });
  }, [progress]);

  const rightStyle = useAnimatedStyle(() => {
    const p = animatedProgress.value;
    const deg = p <= 0.5 ? p * 360 : 180;
    return { transform: [{ rotate: `${deg}deg` }] };
  });

  const leftStyle = useAnimatedStyle(() => {
    const p = animatedProgress.value;
    const deg = p > 0.5 ? (p - 0.5) * 360 : 0;
    return { transform: [{ rotate: `${deg}deg` }] };
  });

  return (
    <View
      style={[styles.container, { width: size, height: size }, style]}
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
    >
      {/* Track */}
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: halfSize,
            borderWidth: strokeWidth,
            borderColor: bgColor,
          },
        ]}
      />

      {/* Right half */}
      <View style={[styles.halfClip, { width: halfSize, height: size, left: halfSize }]}>
        <Animated.View
          style={[
            styles.halfCircle,
            {
              width: size,
              height: size,
              borderRadius: halfSize,
              borderWidth: strokeWidth,
              borderColor: barColor,
              left: -halfSize,
            },
            rightStyle,
          ]}
        />
      </View>

      {/* Left half */}
      <View style={[styles.halfClip, { width: halfSize, height: size, left: 0 }]}>
        <Animated.View
          style={[
            styles.halfCircle,
            {
              width: size,
              height: size,
              borderRadius: halfSize,
              borderWidth: strokeWidth,
              borderColor: barColor,
            },
            leftStyle,
          ]}
        />
      </View>

      {/* Center content */}
      {children && (
        <View style={[styles.center, { width: size - strokeWidth * 2, height: size - strokeWidth * 2, borderRadius: (size - strokeWidth * 2) / 2 }]}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  circle: {
    position: 'absolute',
  },
  halfClip: {
    position: 'absolute',
    overflow: 'hidden',
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
  },
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -0.5 }, { translateY: -0.5 }],
  },
});
