import React, { useCallback } from 'react';
import { Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { IconButtonProps, IconButtonSize } from './IconButton.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SIZE_MAP: Record<IconButtonSize, number> = { sm: 36, md: 44, lg: 52 };

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'solid',
  size = 'md',
  color = 'primary',
  rounded = true,
  disabled = false,
  loading = false,
  onPress,
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();
  const scale = useSharedValue(1);
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;
  const isDisabled = disabled || loading;
  const dim = SIZE_MAP[size];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.92, { damping: 15, stiffness: 300 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  }, [scale]);

  const bg = variant === 'solid' ? resolvedColor : 'transparent';
  const borderColor = variant === 'outline' ? resolvedColor : 'transparent';
  const iconColor = variant === 'solid' ? (colors.textInverse ?? '#F8FBFC') : resolvedColor;

  return (
    <AnimatedPressable
      testID={testID}
      onPress={isDisabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={[
        styles.base,
        {
          width: dim,
          height: dim,
          borderRadius: rounded ? dim / 2 : (radii.md ?? 12),
          backgroundColor: bg,
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor,
          opacity: isDisabled ? 0.5 : 1,
        },
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : (
        icon
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
