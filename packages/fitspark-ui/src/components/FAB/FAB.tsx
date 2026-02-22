import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { FABProps } from './FAB.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SIZE_MAP = {
  small: 44,
  medium: 56,
  large: 68,
};

export const FAB: React.FC<FABProps> = ({
  icon,
  onPress,
  label,
  size = 'medium',
  position = 'bottom-right',
  disabled = false,
  style,
  testID = 'fab',
}) => {
  const { colors, spacing, shadows, typography } = useTheme();
  const scale = useSharedValue(1);

  const dimension = SIZE_MAP[size];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const positionStyle =
    position === 'bottom-right'
      ? { right: spacing.lg, bottom: spacing.xl }
      : position === 'bottom-left'
      ? { left: spacing.lg, bottom: spacing.xl }
      : { alignSelf: 'center' as const, bottom: spacing.xl };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.9);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label ?? 'Floating action button'}
      accessibilityState={{ disabled }}
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: disabled ? colors.textMuted : colors.primary,
          width: label ? undefined : dimension,
          height: dimension,
          borderRadius: label ? dimension / 2 : dimension / 2,
          paddingHorizontal: label ? spacing.lg : 0,
          ...shadows.large,
        },
        positionStyle,
        animatedStyle,
        style,
      ]}
    >
      {icon}
      {label ? (
        <Text
          style={[
            styles.label,
            {
              color: colors.background,
              ...typography.bodyBold,
              marginLeft: spacing.xs,
            },
          ]}
        >
          {label}
        </Text>
      ) : null}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
