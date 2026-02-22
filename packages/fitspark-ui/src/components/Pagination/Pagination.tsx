import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { PaginationProps } from './Pagination.types';

const Dot: React.FC<{
  active: boolean;
  size: number;
  activeWidth: number;
  accentColor: string;
  mutedColor: string;
  onPress?: () => void;
  testID: string;
}> = ({ active, size, activeWidth, accentColor, mutedColor, onPress, testID }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(active ? activeWidth : size),
    backgroundColor: active ? accentColor : mutedColor,
    opacity: withSpring(active ? 1 : 0.4),
  }));

  return (
    <Pressable onPress={onPress} testID={testID} accessibilityRole="button">
      <Animated.View
        style={[
          {
            height: size,
            borderRadius: size / 2,
            marginHorizontal: 3,
          },
          animatedStyle,
        ]}
      />
    </Pressable>
  );
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  activeIndex,
  onDotPress,
  dotSize = 8,
  activeDotWidth = 24,
  style,
  testID = 'pagination',
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="adjustable"
      accessibilityLabel={`Page ${activeIndex + 1} of ${total}`}
      testID={testID}
    >
      {Array.from({ length: total }).map((_, i) => (
        <Dot
          key={i}
          active={i === activeIndex}
          size={dotSize}
          activeWidth={activeDotWidth}
          accentColor={colors.primary}
          mutedColor={colors.textMuted}
          onPress={onDotPress ? () => onDotPress(i) : undefined}
          testID={`${testID}-dot-${i}`}
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
});
