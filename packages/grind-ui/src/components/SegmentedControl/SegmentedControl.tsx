import React, { useCallback, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { SegmentedControlProps, SegmentedControlSize } from './SegmentedControl.types';

const SIZE_CONFIG: Record<SegmentedControlSize, { height: number; fontSize: number }> = {
  sm: { height: 32, fontSize: 12 },
  md: { height: 40, fontSize: 14 },
  lg: { height: 48, fontSize: 16 },
};

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  selectedIndex = 0,
  onChange,
  size = 'md',
  color = 'primary',
  style,
  testID,
}) => {
  const { colors, radii, typography } = useTheme();
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;
  const sizeConfig = SIZE_CONFIG[size];

  const translateX = useSharedValue(0);
  const segmentWidth = useSharedValue(0);

  useEffect(() => {
    if (segmentWidth.value > 0) {
      translateX.value = withSpring(selectedIndex * segmentWidth.value, {
        damping: 18,
        stiffness: 200,
      });
    }
  }, [selectedIndex, segmentWidth, translateX]);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const totalWidth = e.nativeEvent.layout.width;
      const w = totalWidth / segments.length;
      segmentWidth.value = w;
      translateX.value = selectedIndex * w;
    },
    [segments.length, selectedIndex, segmentWidth, translateX],
  );

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: segmentWidth.value,
  }));

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          height: sizeConfig.height,
          borderRadius: radii.pill ?? 100,
          backgroundColor: colors.surfaceElevated ?? '#3a3a3a',
        },
        style,
      ]}
      onLayout={handleLayout}
      accessibilityRole="tablist"
    >
      {/* Animated indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            height: sizeConfig.height - 4,
            borderRadius: (radii.pill ?? 100) - 2,
            backgroundColor: resolvedColor,
          },
          indicatorStyle,
        ]}
      />

      {/* Segment labels */}
      {segments.map((seg, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Pressable
            key={seg}
            onPress={() => onChange?.(index)}
            style={styles.segment}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={seg}
          >
            <Text
              style={[
                styles.segmentText,
                {
                  fontSize: sizeConfig.fontSize,
                  color: isSelected ? (colors.textInverse ?? '#F8FBFC') : (colors.textSecondary ?? '#888'),
                  fontFamily: isSelected ? (typography.h1.fontFamily ?? undefined) : (typography.body.fontFamily ?? undefined),
                  fontWeight: isSelected ? '700' : '500',
                },
              ]}
              numberOfLines={1}
            >
              {seg}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    top: 2,
    left: 2,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  segmentText: {
    textAlign: 'center',
  },
});
