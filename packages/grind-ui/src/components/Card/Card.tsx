import React, { useCallback } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { CardProps } from './Card.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding,
  header,
  footer,
  onPress,
  style,
  children,
  testID,
}) => {
  const { colors, spacing, radii, shadows } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    if (onPress) {
      scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
    }
  }, [onPress, scale]);

  const handlePressOut = useCallback(() => {
    if (onPress) {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  }, [onPress, scale]);

  const containerPadding = padding ?? spacing.md;

  const variantStyles: Record<string, any> = {
    elevated: {
      backgroundColor: colors.surface,
      ...shadows.md,
    },
    outlined: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filled: {
      backgroundColor: colors.surfaceElevated,
    },
  };

  const cardStyle = [
    styles.container,
    { borderRadius: radii.xl },
    variantStyles[variant],
    style,
  ];

  const content = (
    <>
      {header && (
        <View style={[styles.header, { paddingHorizontal: containerPadding, paddingTop: containerPadding }]}>
          {header}
        </View>
      )}
      <View style={{ padding: containerPadding }}>{children}</View>
      {footer && (
        <View
          style={[
            styles.footer,
            {
              paddingHorizontal: containerPadding,
              paddingBottom: containerPadding,
              borderTopColor: colors.border,
            },
          ]}
        >
          {footer}
        </View>
      )}
    </>
  );

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[cardStyle, animatedStyle]}
        testID={testID}
        accessibilityRole="button"
      >
        {content}
      </AnimatedPressable>
    );
  }

  return (
    <View style={cardStyle} testID={testID} accessibilityRole="summary">
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  header: {
    borderBottomWidth: 0,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
