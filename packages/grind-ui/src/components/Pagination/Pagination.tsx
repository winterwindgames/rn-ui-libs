import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  useEffect as useReanimatedEffect,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { PaginationProps } from './Pagination.types';

const AnimatedDot: React.FC<{
  active: boolean;
  color: string;
  inactiveColor: string;
  onPress: () => void;
  index: number;
}> = ({ active, color, inactiveColor, onPress, index }) => {
  const scale = useSharedValue(active ? 1 : 0.7);
  const bgOpacity = useSharedValue(active ? 1 : 0.35);

  React.useEffect(() => {
    scale.value = withSpring(active ? 1 : 0.7, { damping: 15 });
    bgOpacity.value = withSpring(active ? 1 : 0.35, { damping: 15 });
  }, [active]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: bgOpacity.value,
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Page ${index + 1}`}
      accessibilityState={{ selected: active }}
      hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
    >
      <Animated.View
        style={[
          styles.dot,
          {
            backgroundColor: color,
            width: active ? 12 : 8,
            height: active ? 12 : 8,
            borderRadius: 6,
          },
          animStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  current,
  onPageChange,
  variant = 'dots',
  color,
  style,
  testID,
}) => {
  const { colors, spacing, typography } = useTheme();
  const activeColor = color ?? colors.primary;

  if (variant === 'numbers') {
    return (
      <View testID={testID} style={[styles.container, style]}>
        {Array.from({ length: total }, (_, i) => {
          const isActive = i === current;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => onPageChange?.(i)}
              accessibilityRole="button"
              accessibilityLabel={`Page ${i + 1}`}
              accessibilityState={{ selected: isActive }}
              style={[
                styles.numberBtn,
                {
                  backgroundColor: isActive ? activeColor : 'transparent',
                  borderRadius: 16,
                  marginHorizontal: spacing.xs / 2,
                },
              ]}
            >
              <Text
                style={{
                  color: isActive ? '#fff' : colors.textSecondary,
                  fontSize: typography.bodySm.fontSize,
                  fontWeight: isActive ? '700' : '400',
                }}
              >
                {i + 1}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View testID={testID} style={[styles.container, { gap: spacing.xs }, style]}>
      {Array.from({ length: total }, (_, i) => (
        <AnimatedDot
          key={i}
          index={i}
          active={i === current}
          color={activeColor}
          inactiveColor={colors.textSecondary}
          onPress={() => onPageChange?.(i)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  dot: {
    marginHorizontal: 3,
  },
  numberBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
