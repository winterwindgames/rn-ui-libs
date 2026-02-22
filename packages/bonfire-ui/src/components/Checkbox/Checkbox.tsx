import React, { useCallback } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false, indeterminate, onToggle, label, color = 'primary',
  disabled = false, style, testID,
}) => {
  const { colors, radii, typography } = useTheme();
  const scale = useSharedValue(1);
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePress = useCallback(() => {
    if (disabled) return;
    scale.value = withSpring(0.85, { damping: 15, stiffness: 300 });
    setTimeout(() => { scale.value = withSpring(1); }, 100);
    onToggle?.(!checked);
  }, [disabled, checked, onToggle]);

  return (
    <Pressable
      testID={testID}
      onPress={handlePress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
    >
      <Animated.View style={[
        styles.box,
        {
          width: 22, height: 22, borderRadius: radii.sm - 2,
          backgroundColor: checked ? resolvedColor : 'transparent',
          borderWidth: checked ? 0 : 2,
          borderColor: checked ? resolvedColor : colors.border,
        },
        animatedStyle,
      ]}>
        {checked && <Text style={styles.check}>✓</Text>}
        {indeterminate && !checked && <View style={[styles.dash, { backgroundColor: resolvedColor }]} />}
      </Animated.View>
      {label && <Text style={[styles.label, { color: colors.text, fontSize: typography.body.fontSize }]}>{label}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  box: { alignItems: 'center', justifyContent: 'center' },
  check: { color: '#fff', fontSize: 14, fontWeight: '700' },
  dash: { width: 10, height: 2, borderRadius: 1 },
  label: { marginLeft: 10 },
});
