import React, { useCallback } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { ColorPickerProps } from './ColorPicker.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SwatchProps {
  color: string;
  selected: boolean;
  size: number;
  onPress: () => void;
}

const Swatch: React.FC<SwatchProps> = ({ color, selected, size, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.88); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`Color ${color}`}
      style={[
        styles.swatch,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          borderWidth: selected ? 3 : 0,
          borderColor: '#F8FBFC',
        },
        animatedStyle,
      ]}
    >
      {selected && (
        <Text style={styles.check}>✓</Text>
      )}
    </AnimatedPressable>
  );
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  colors: paletteColors,
  value,
  onChange,
  columns = 6,
  size = 40,
  style,
  testID,
}) => {
  const { spacing } = useTheme();
  const gap = spacing.sm ?? 8;

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        { gap, flexDirection: 'row', flexWrap: 'wrap' },
        style,
      ]}
      accessibilityRole="radiogroup"
    >
      {paletteColors.map((c) => (
        <Swatch
          key={c}
          color={c}
          selected={c === value}
          size={size}
          onPress={() => onChange?.(c)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  swatch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: '#F8FBFC',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
