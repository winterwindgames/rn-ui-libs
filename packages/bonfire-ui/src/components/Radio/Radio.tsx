import React, { createContext, useContext, useCallback } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { RadioGroupProps, RadioProps } from './Radio.types';

const RadioContext = createContext<{ value?: string; onChange?: (v: string) => void }>({});

export const RadioGroup: React.FC<RadioGroupProps> = ({ value, onChange, children, style, testID }) => (
  <View testID={testID} style={style} accessibilityRole="radiogroup">
    <RadioContext.Provider value={{ value, onChange }}>{children}</RadioContext.Provider>
  </View>
);

export const Radio: React.FC<RadioProps> = ({ value, label, disabled = false, style, testID }) => {
  const { colors, typography } = useTheme();
  const ctx = useContext(RadioContext);
  const selected = ctx.value === value;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePress = useCallback(() => {
    if (disabled) return;
    scale.value = withSpring(0.85, { damping: 15, stiffness: 300 });
    setTimeout(() => { scale.value = withSpring(1); }, 100);
    ctx.onChange?.(value);
  }, [disabled, value, ctx.onChange]);

  return (
    <Pressable
      testID={testID}
      onPress={handlePress}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label}
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
    >
      <Animated.View style={[styles.outer, { borderColor: selected ? colors.primary : colors.border }, animatedStyle]}>
        {selected && <View style={[styles.inner, { backgroundColor: colors.primary }]} />}
      </Animated.View>
      {label && <Text style={[styles.label, { color: colors.text, fontSize: typography.body.fontSize }]}>{label}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  outer: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  inner: { width: 12, height: 12, borderRadius: 6 },
  label: { marginLeft: 10 },
});
