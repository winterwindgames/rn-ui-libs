import React, { useCallback } from 'react';
import { View, PanResponder, StyleSheet, LayoutChangeEvent } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SliderProps } from './Slider.types';

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  color,
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();
  const accentColor = color ?? colors.primary;
  const [trackWidth, setTrackWidth] = React.useState(0);
  const pct = (value - min) / (max - min);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (e) => updateValue(e.nativeEvent.locationX),
      onPanResponderMove: (e) => updateValue(e.nativeEvent.locationX),
    })
  ).current;

  const updateValue = useCallback((x: number) => {
    const ratio = Math.max(0, Math.min(1, x / trackWidth));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    onChange(Math.max(min, Math.min(max, stepped)));
  }, [trackWidth, min, max, step, onChange]);

  const onLayout = (e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width);

  return (
    <View
      testID={testID}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
      onLayout={onLayout}
      {...panResponder.panHandlers}
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
    >
      <View style={[styles.track, { backgroundColor: colors.border, borderRadius: 3 }]}>
        <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: accentColor, borderRadius: 3 }]} />
      </View>
      <View style={[styles.thumb, { left: `${pct * 100}%`, backgroundColor: accentColor, borderRadius: 12 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 40, justifyContent: 'center' },
  track: { height: 6 },
  fill: { height: 6 },
  thumb: { position: 'absolute', width: 24, height: 24, marginLeft: -12, top: 8 },
});
