import React, { useRef, useCallback } from 'react';
import { View, PanResponder, type ViewStyle, type LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { SliderProps } from './Slider.types';

export const Slider: React.FC<SliderProps> = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onSlidingComplete,
  disabled = false,
  trackHeight = 6,
  thumbSize = 24,
  label,
  showValue = false,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, radii } = theme;

  const trackWidth = useRef(0);
  const thumbScale = useSharedValue(1);

  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step));
  const fraction = (value - min) / (max - min);

  const positionToValue = (x: number) => {
    const ratio = Math.max(0, Math.min(1, x / trackWidth.current));
    return clamp(min + ratio * (max - min));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (_, gs) => {
        thumbScale.value = withTiming(1.3, { duration: 100 });
      },
      onPanResponderMove: (evt) => {
        const x = evt.nativeEvent.locationX;
        onValueChange?.(positionToValue(x));
      },
      onPanResponderRelease: (evt) => {
        thumbScale.value = withTiming(1, { duration: 100 });
        const x = evt.nativeEvent.locationX;
        onSlidingComplete?.(positionToValue(x));
      },
    }),
  ).current;

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
  }, []);

  const thumbAnim = useAnimatedStyle(() => ({
    transform: [{ scale: thumbScale.value }],
  }));

  const trackStyle: ViewStyle = {
    height: trackHeight,
    borderRadius: trackHeight / 2,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
  };

  const fillStyle: ViewStyle = {
    height: trackHeight,
    borderRadius: trackHeight / 2,
    backgroundColor: colors.primary,
    width: `${fraction * 100}%`,
    position: 'absolute',
  };

  const thumbPos: ViewStyle = {
    position: 'absolute',
    left: `${fraction * 100}%`,
    marginLeft: -thumbSize / 2,
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize / 2,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.background,
  };

  return (
    <View style={[{ opacity: disabled ? 0.4 : 1 }, style]} testID={testID}>
      {(label || showValue) && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
          {label && <Text variant="label" color="textSecondary">{label}</Text>}
          {showValue && <Text variant="label" color="primary">{value}</Text>}
        </View>
      )}
      <View
        style={{ height: thumbSize, justifyContent: 'center' }}
        onLayout={onLayout}
        {...panResponder.panHandlers}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ min, max, now: value }}
      >
        <View style={trackStyle} />
        <View style={fillStyle} />
        <Animated.View style={[thumbPos, thumbAnim]} />
      </View>
    </View>
  );
};
