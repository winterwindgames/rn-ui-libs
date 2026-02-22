import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  indeterminate = false,
  color,
  trackColor,
  height = 4,
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();
  const barColor = color || colors.primary || '#C8FF00';
  const bgColor = trackColor || colors.surfaceSecondary || '#2A2A2A';
  const animatedProgress = useSharedValue(0);
  const indeterminateX = useSharedValue(-0.5);

  useEffect(() => {
    if (!indeterminate) {
      animatedProgress.value = withTiming(Math.min(1, Math.max(0, progress)), { duration: 300 });
    }
  }, [progress, indeterminate]);

  useEffect(() => {
    if (indeterminate) {
      indeterminateX.value = withRepeat(
        withSequence(
          withTiming(-0.5, { duration: 0 }),
          withTiming(1, { duration: 1200, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
        ),
        -1,
      );
    }
  }, [indeterminate]);

  const determinateStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  const indeterminateStyle = useAnimatedStyle(() => ({
    width: '40%',
    left: `${indeterminateX.value * 100}%`,
  }));

  return (
    <View
      style={[
        styles.track,
        { height, borderRadius: height / 2, backgroundColor: bgColor },
        style,
      ]}
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: indeterminate ? undefined : Math.round(progress * 100) }}
    >
      <Animated.View
        style={[
          styles.bar,
          { height, borderRadius: height / 2, backgroundColor: barColor },
          indeterminate ? indeterminateStyle : determinateStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  bar: {
    position: 'absolute',
    top: 0,
  },
});
