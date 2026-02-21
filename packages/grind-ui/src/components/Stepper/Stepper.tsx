import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { StepperProps, StepperSize } from './Stepper.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SIZE_MAP: Record<StepperSize, { btn: number; fontSize: number; valueFontSize: number }> = {
  sm: { btn: 32, fontSize: 18, valueFontSize: 14 },
  md: { btn: 40, fontSize: 22, valueFontSize: 16 },
  lg: { btn: 48, fontSize: 26, valueFontSize: 20 },
};

export const Stepper: React.FC<StepperProps> = ({
  value = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  size = 'md',
  style,
  testID,
}) => {
  const { colors, radii, typography } = useTheme();
  const sizeConfig = SIZE_MAP[size];
  const scaleMin = useSharedValue(1);
  const scalePlus = useSharedValue(1);

  const canDecrement = value - step >= min;
  const canIncrement = value + step <= max;

  const handleDecrement = useCallback(() => {
    if (!disabled && canDecrement) onValueChange?.(value - step);
  }, [disabled, canDecrement, value, step, onValueChange]);

  const handleIncrement = useCallback(() => {
    if (!disabled && canIncrement) onValueChange?.(value + step);
  }, [disabled, canIncrement, value, step, onValueChange]);

  const animMinStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleMin.value }],
  }));

  const animPlusStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scalePlus.value }],
  }));

  const btnColor = colors.primary ?? '#787AF3';

  return (
    <View
      testID={testID}
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
      accessibilityRole="adjustable"
      accessibilityLabel={`Value: ${value}`}
    >
      <AnimatedPressable
        onPress={handleDecrement}
        onPressIn={() => { scaleMin.value = withSpring(0.9); }}
        onPressOut={() => { scaleMin.value = withSpring(1); }}
        style={[
          styles.btn,
          animMinStyle,
          {
            width: sizeConfig.btn,
            height: sizeConfig.btn,
            borderRadius: sizeConfig.btn / 2,
            backgroundColor: canDecrement && !disabled ? btnColor : (colors.surfaceElevated ?? '#3a3a3a'),
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Decrease"
      >
        <Text style={[styles.btnText, { fontSize: sizeConfig.fontSize, color: colors.textInverse ?? '#F8FBFC' }]}>−</Text>
      </AnimatedPressable>

      <Text
        style={[
          styles.value,
          {
            fontSize: sizeConfig.valueFontSize,
            color: colors.text ?? '#F8FBFC',
            fontFamily: typography.h1.fontFamily ?? undefined,
            fontWeight: '700',
            minWidth: sizeConfig.btn,
          },
        ]}
      >
        {value}
      </Text>

      <AnimatedPressable
        onPress={handleIncrement}
        onPressIn={() => { scalePlus.value = withSpring(0.9); }}
        onPressOut={() => { scalePlus.value = withSpring(1); }}
        style={[
          styles.btn,
          animPlusStyle,
          {
            width: sizeConfig.btn,
            height: sizeConfig.btn,
            borderRadius: sizeConfig.btn / 2,
            backgroundColor: canIncrement && !disabled ? btnColor : (colors.surfaceElevated ?? '#3a3a3a'),
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Increase"
      >
        <Text style={[styles.btnText, { fontSize: sizeConfig.fontSize, color: colors.textInverse ?? '#F8FBFC' }]}>+</Text>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: '600',
  },
  value: {
    textAlign: 'center',
    marginHorizontal: 16,
  },
});
