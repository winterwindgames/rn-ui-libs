import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress, value, indeterminate = false, color = 'primary', variant, height = 6, style, testID,
}) => {
  const { colors, radii } = useTheme();
  const resolvedColor = variant ? ((colors as Record<string, string>)[variant] ?? colors.primary) : ((colors as Record<string, string>)[color] ?? color);
  const pct = Math.max(0, Math.min(1, (progress ?? (value ? value / 100 : 0))));
  const translateX = useSharedValue(-1);

  useEffect(() => {
    if (indeterminate) {
      translateX.value = withRepeat(withSequence(withTiming(0, { duration: 600 }), withTiming(1, { duration: 600 })), -1);
    }
  }, [indeterminate]);

  const indeterminateStyle = useAnimatedStyle(() => ({
    left: `${translateX.value * 60}%`,
    width: '40%',
  }));

  return (
    <View testID={testID} style={[styles.track, { height, backgroundColor: colors.surfaceElevated, borderRadius: radii.pill }, style]}>
      {indeterminate ? (
        <Animated.View style={[styles.fill, { height, backgroundColor: resolvedColor, borderRadius: radii.pill, position: 'absolute' }, indeterminateStyle]} />
      ) : (
        <View style={[styles.fill, { width: `${pct * 100}%`, height, backgroundColor: resolvedColor, borderRadius: radii.pill }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  track: { overflow: 'hidden', position: 'relative' },
  fill: {},
});
