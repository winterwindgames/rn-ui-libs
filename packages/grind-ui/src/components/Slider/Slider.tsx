import React, { useCallback, useRef } from 'react';
import { View, Text, PanResponder, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { SliderProps } from './Slider.types';

const TRACK_HEIGHT = 6;
const THUMB_SIZE = 24;

export const Slider: React.FC<SliderProps> = ({
  value = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  color = 'primary',
  showValue = false,
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;
  const trackWidth = useRef(0);
  const thumbX = useSharedValue(0);

  const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

  const snapToStep = (raw: number): number => {
    const stepped = Math.round((raw - min) / step) * step + min;
    return clamp(stepped, min, max);
  };

  const fraction = (max - min) > 0 ? (value - min) / (max - min) : 0;

  const updateValue = useCallback(
    (px: number) => {
      if (trackWidth.current <= 0) return;
      const ratio = clamp(px / trackWidth.current, 0, 1);
      const raw = min + ratio * (max - min);
      const snapped = snapToStep(raw);
      onValueChange?.(snapped);
    },
    [min, max, step, onValueChange],
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (_, gesture) => {
        updateValue(gesture.x0 - (thumbX.value ?? 0));
      },
      onPanResponderMove: (evt) => {
        const locationX = evt.nativeEvent.locationX;
        updateValue(locationX);
      },
      onPanResponderRelease: () => {},
    }),
  ).current;

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
  }, []);

  return (
    <View
      testID={testID}
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
    >
      {showValue && (
        <Text style={[styles.valueLabel, { color: colors.text ?? '#F8FBFC' }]}>
          {value}
        </Text>
      )}
      <View
        style={styles.trackContainer}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
      >
        {/* Background track */}
        <View
          style={[
            styles.track,
            {
              backgroundColor: colors.surfaceElevated ?? '#3a3a3a',
              borderRadius: TRACK_HEIGHT / 2,
            },
          ]}
        />
        {/* Filled track */}
        <View
          style={[
            styles.trackFilled,
            {
              backgroundColor: resolvedColor,
              borderRadius: TRACK_HEIGHT / 2,
              width: `${fraction * 100}%` as any,
            },
          ]}
        />
        {/* Thumb */}
        <View
          style={[
            styles.thumb,
            {
              left: `${fraction * 100}%` as any,
              marginLeft: -(THUMB_SIZE / 2),
              backgroundColor: resolvedColor,
              borderRadius: THUMB_SIZE / 2,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 8,
  },
  valueLabel: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  trackContainer: {
    height: THUMB_SIZE,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: TRACK_HEIGHT,
  },
  trackFilled: {
    position: 'absolute',
    left: 0,
    height: TRACK_HEIGHT,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
