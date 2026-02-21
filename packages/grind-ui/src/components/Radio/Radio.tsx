import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { RadioGroupProps, RadioProps, RadioSize } from './Radio.types';

interface RadioContextValue {
  value?: string;
  onChange?: (value: string) => void;
}

const RadioContext = createContext<RadioContextValue>({});

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  children,
}) => {
  return (
    <RadioContext.Provider value={{ value, onChange }}>
      <View accessibilityRole="radiogroup">{children}</View>
    </RadioContext.Provider>
  );
};

const SIZE_MAP: Record<RadioSize, { outer: number; inner: number; fontSize: number }> = {
  sm: { outer: 18, inner: 8, fontSize: 13 },
  md: { outer: 22, inner: 10, fontSize: 15 },
  lg: { outer: 28, inner: 14, fontSize: 17 },
};

export const Radio: React.FC<RadioProps> = ({
  value,
  label,
  disabled = false,
  size = 'md',
  style,
  testID,
}) => {
  const { colors, typography } = useTheme();
  const ctx = useContext(RadioContext);
  const isSelected = ctx.value === value;
  const sizeConfig = SIZE_MAP[size];
  const dotScale = useSharedValue(0);

  useEffect(() => {
    dotScale.value = withSpring(isSelected ? 1 : 0, { damping: 15, stiffness: 300 });
  }, [isSelected, dotScale]);

  const handlePress = useCallback(() => {
    if (!disabled) ctx.onChange?.(value);
  }, [disabled, ctx, value]);

  const animatedDot = useAnimatedStyle(() => ({
    transform: [{ scale: dotScale.value }],
    opacity: dotScale.value,
  }));

  const borderColor = isSelected ? (colors.primary ?? '#787AF3') : (colors.border ?? '#3a3a3a');

  return (
    <Pressable
      testID={testID}
      onPress={handlePress}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected, disabled }}
      accessibilityLabel={label}
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
    >
      <View
        style={[
          styles.outer,
          {
            width: sizeConfig.outer,
            height: sizeConfig.outer,
            borderRadius: sizeConfig.outer / 2,
            borderWidth: 2,
            borderColor,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: sizeConfig.inner,
              height: sizeConfig.inner,
              borderRadius: sizeConfig.inner / 2,
              backgroundColor: colors.primary ?? '#787AF3',
            },
            animatedDot,
          ]}
        />
      </View>

      {label && (
        <Text
          style={[
            styles.label,
            {
              fontSize: sizeConfig.fontSize,
              color: colors.text ?? '#F8FBFC',
              fontFamily: typography.body.fontFamily ?? undefined,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 10,
  },
});
