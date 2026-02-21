import React, { useEffect, useMemo } from 'react';
import { View, TouchableOpacity, type ViewStyle, type LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { SegmentedControlProps } from './SegmentedControl.types';

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onValueChange,
  disabled = false,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, radii } = theme;

  const selectedIdx = useMemo(() => {
    const idx = options.findIndex((o) => o.value === value);
    return idx >= 0 ? idx : 0;
  }, [options, value]);

  const segmentWidth = useSharedValue(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(selectedIdx * segmentWidth.value, { duration: 200 });
  }, [selectedIdx, segmentWidth, translateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    width: segmentWidth.value,
    transform: [{ translateX: translateX.value }],
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width / options.length;
    segmentWidth.value = w;
    translateX.value = selectedIdx * w;
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 2,
    borderWidth: 1,
    borderColor: colors.border,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <View style={[containerStyle, style]} testID={testID} onLayout={onLayout} accessibilityRole="tablist">
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 2,
            bottom: 2,
            left: 2,
            backgroundColor: colors.primary,
            borderRadius: radii.md - 2,
          },
          indicatorStyle,
        ]}
      />
      {options.map((opt, idx) => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => !disabled && onValueChange?.(opt.value)}
          style={{ flex: 1, paddingVertical: spacing.sm, alignItems: 'center', zIndex: 1 }}
          accessibilityRole="tab"
          accessibilityState={{ selected: opt.value === value }}
          accessibilityLabel={opt.label}
        >
          <Text
            variant="label"
            color={opt.value === value ? 'textInverse' : 'textMuted'}
            style={{ fontWeight: opt.value === value ? '700' : '500' }}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
