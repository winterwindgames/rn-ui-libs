import React, { useCallback } from 'react';
import { Pressable, Text, Linking, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { LinkProps } from './Link.types';

const SIZE_MAP = {
  sm: 'bodySm' as const,
  md: 'body' as const,
  lg: 'bodyLg' as const,
};

export const Link: React.FC<LinkProps> = ({
  href,
  onPress,
  children,
  color,
  underline = 'always',
  size = 'md',
  external = false,
  disabled = false,
  style,
  testID,
}) => {
  const { colors, typography, spacing } = useTheme();
  const opacity = useSharedValue(1);

  const resolvedColor = color
    ? ((colors as Record<string, string>)[color] ?? color)
    : (colors.primary ?? '#787AF3');

  const typographyStyle = typography[SIZE_MAP[size]] ?? typography.body;

  const handlePress = useCallback(() => {
    if (disabled) return;
    if (onPress) {
      onPress();
    } else if (href) {
      Linking.openURL(href).catch(() => {});
    }
  }, [disabled, onPress, href]);

  const handlePressIn = useCallback(() => {
    opacity.value = withTiming(0.5, { duration: 100 });
  }, [opacity]);

  const handlePressOut = useCallback(() => {
    opacity.value = withTiming(1, { duration: 150 });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const textDecorationLine =
    underline === 'always' ? 'underline' : 'none';

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable
        testID={testID}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityRole="link"
        accessibilityLabel={typeof children === 'string' ? children : undefined}
        accessibilityState={{ disabled }}
        style={styles.pressable}
      >
        <Text
          style={[
            {
              ...typographyStyle,
              color: disabled ? (colors.textSecondary ?? '#6B6B6B') : resolvedColor,
              textDecorationLine,
              textTransform: 'none',
            },
            style,
          ]}
        >
          {children}
          {external && (
            <Text
              style={{
                fontSize: (typographyStyle.fontSize ?? 16) * 0.75,
                color: disabled ? (colors.textSecondary ?? '#6B6B6B') : resolvedColor,
              }}
            >
              {' ↗'}
            </Text>
          )}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-start',
  },
  pressable: {},
});
