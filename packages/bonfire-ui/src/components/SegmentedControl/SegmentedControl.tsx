import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { SegmentedControlProps } from './SegmentedControl.types';

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  selectedIndex,
  onChange,
  style,
  testID,
}) => {
  const { colors, spacing, radii } = useTheme();

  return (
    <View
      testID={testID}
      style={[styles.container, { backgroundColor: colors.surfaceElevated, borderRadius: radii.pill, padding: 3 }, style]}
    >
      {segments.map((seg, i) => {
        const selected = i === selectedIndex;
        return (
          <Pressable
            key={i}
            onPress={() => onChange(i)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={seg}
            style={[
              styles.segment,
              {
                backgroundColor: selected ? colors.surface : 'transparent',
                borderRadius: radii.pill,
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
              },
            ]}
          >
            <Text variant="label" color={selected ? colors.text : colors.textSecondary}>{seg}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  segment: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
