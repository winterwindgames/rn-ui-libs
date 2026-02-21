import React, { useCallback } from 'react';
import { Linking, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { LinkProps } from './Link.types';

export const Link: React.FC<LinkProps> = ({
  href,
  onPress,
  children,
  color,
  underline = 'always',
  size,
  external = false,
  disabled = false,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const opacity = useSharedValue(1);

  const linkColor = color ?? colors.primary ?? '#C8FF00';

  const handlePress = useCallback(() => {
    if (disabled) return;
    if (onPress) {
      onPress();
    } else if (href) {
      Linking.openURL(href);
    }
  }, [href, onPress, disabled]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const textDecoration = underline === 'always' ? 'underline' as const : 'none' as const;

  return (
    <Pressable
      onPressIn={() => {
        opacity.value = withTiming(0.5, { duration: 100 });
      }}
      onPressOut={() => {
        opacity.value = withTiming(1, { duration: 150 });
      }}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="link"
      accessibilityLabel={typeof children === 'string' ? children : undefined}
      accessibilityState={{ disabled }}
      testID={testID}
    >
      <Animated.View style={[{ flexDirection: 'row', alignItems: 'center' }, animStyle]}>
        <Animated.Text
          style={[
            {
              color: disabled ? (colors.disabledText ?? colors.textMuted ?? '#666') : linkColor,
              fontSize: size ?? 15,
              textDecorationLine: textDecoration,
              fontWeight: '500',
            },
            style,
          ]}
        >
          {children}
        </Animated.Text>
        {external && (
          <Animated.Text
            style={{
              color: disabled ? (colors.disabledText ?? '#666') : linkColor,
              fontSize: (size ?? 15) - 2,
              marginLeft: 4,
            }}
          >
            ↗
          </Animated.Text>
        )}
      </Animated.View>
    </Pressable>
  );
};
