import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { SpinnerProps, SpinnerSize } from './Spinner.types';

const SIZE_MAP: Record<SpinnerSize, number> = { sm: 20, md: 32, lg: 48 };
const STROKE_MAP: Record<SpinnerSize, number> = { sm: 2, md: 3, lg: 4 };

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const spinColor = color || colors.primary || '#C8FF00';
  const dim = SIZE_MAP[size];
  const stroke = STROKE_MAP[size];
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 800, easing: Easing.linear }),
      -1,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        styles.spinner,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          borderWidth: stroke,
          borderColor: (colors.surfaceSecondary || '#2A2A2A'),
          borderTopColor: spinColor,
        },
        animatedStyle,
        style,
      ]}
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    />
  );
};

const styles = StyleSheet.create({
  spinner: {},
});
