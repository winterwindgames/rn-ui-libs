import React, { useCallback, useEffect } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { CheckboxProps, CheckboxSize } from './Checkbox.types';

const SIZE_MAP: Record<CheckboxSize, { box: number; fontSize: number; checkSize: number }> = {
  sm: { box: 18, fontSize: 13, checkSize: 12 },
  md: { box: 22, fontSize: 15, checkSize: 14 },
  lg: { box: 28, fontSize: 17, checkSize: 18 },
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  onToggle,
  label,
  disabled = false,
  color = 'primary',
  size = 'md',
  style,
  testID,
}) => {
  const { colors, radii, typography } = useTheme();
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;
  const sizeConfig = SIZE_MAP[size];
  const scale = useSharedValue(0);
  const bgProgress = useSharedValue(0);

  const isActive = checked || indeterminate;

  useEffect(() => {
    scale.value = withSpring(isActive ? 1 : 0, { damping: 15, stiffness: 300 });
    bgProgress.value = withTiming(isActive ? 1 : 0, { duration: 200 });
  }, [isActive, scale, bgProgress]);

  const handlePress = useCallback(() => {
    if (!disabled) onToggle?.(!checked);
  }, [disabled, checked, onToggle]);

  const animatedCheckStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  const animatedBoxStyle = useAnimatedStyle(() => ({
    backgroundColor:
      bgProgress.value > 0.5 ? resolvedColor : 'transparent',
    borderColor:
      bgProgress.value > 0.5 ? resolvedColor : (colors.border ?? '#3a3a3a'),
  }));

  return (
    <Pressable
      testID={testID}
      onPress={handlePress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
      accessibilityLabel={label}
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
    >
      <Animated.View
        style={[
          styles.box,
          {
            width: sizeConfig.box,
            height: sizeConfig.box,
            borderRadius: radii.xs ?? 4,
            borderWidth: 2,
          },
          animatedBoxStyle,
        ]}
      >
        <Animated.Text
          style={[
            {
              fontSize: sizeConfig.checkSize,
              color: colors.textInverse ?? '#F8FBFC',
              fontWeight: '700',
            },
            animatedCheckStyle,
          ]}
        >
          {indeterminate ? '—' : '✓'}
        </Animated.Text>
      </Animated.View>

      {label && (
        <Text
          style={[
            styles.label,
            {
              fontSize: sizeConfig.fontSize,
              color: colors.text ?? '#F8FBFC',
              fontFamily: typography.body.fontFamily ?? undefined,
              marginLeft: 10,
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
    alignSelf: 'flex-start',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {},
});
