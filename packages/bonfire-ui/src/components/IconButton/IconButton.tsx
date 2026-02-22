import React, { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { IconButtonProps, IconButtonSize } from './IconButton.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SIZE_MAP: Record<IconButtonSize, number> = { sm: 36, md: 44, lg: 52 };

export const IconButton: React.FC<IconButtonProps> = ({
  icon, variant = 'ghost', size = 'md', color = 'primary', rounded = true,
  disabled = false, onPress, style, testID, accessibilityLabel,
}) => {
  const { colors, radii } = useTheme();
  const scale = useSharedValue(1);
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;
  const dim = SIZE_MAP[size];

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePressIn = useCallback(() => { scale.value = withSpring(0.9, { damping: 15, stiffness: 300 }); }, []);
  const handlePressOut = useCallback(() => { scale.value = withSpring(1, { damping: 15, stiffness: 300 }); }, []);

  const bg = variant === 'solid' ? resolvedColor : variant === 'outline' ? 'transparent' : 'transparent';
  const borderStyle = variant === 'outline' ? { borderWidth: 1.5, borderColor: resolvedColor } : {};

  return (
    <AnimatedPressable
      testID={testID}
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      style={[
        { width: dim, height: dim, borderRadius: rounded ? radii.full : radii.md,
          backgroundColor: bg, alignItems: 'center', justifyContent: 'center',
          opacity: disabled ? 0.5 : 1 },
        borderStyle, animatedStyle, style,
      ]}
    >
      {icon}
    </AnimatedPressable>
  );
};
