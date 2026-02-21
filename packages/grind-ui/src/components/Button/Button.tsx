import React, { useCallback } from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SIZE_CONFIG: Record<ButtonSize, { height: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { height: 36, paddingHorizontal: 16, fontSize: 13 },
  md: { height: 44, paddingHorizontal: 24, fontSize: 15 },
  lg: { height: 52, paddingHorizontal: 32, fontSize: 17 },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'md',
  color = 'primary',
  label,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  onPress,
  style,
  labelStyle,
  testID,
}) => {
  const { colors, radii, typography } = useTheme();
  const scale = useSharedValue(1);

  const resolvedColor = (colors as Record<string, string>)[color] ?? color;
  const isDisabled = disabled || loading;
  const sizeConfig = SIZE_CONFIG[size];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  }, [scale]);

  const getBackgroundColor = (): string => {
    if (isDisabled && variant === 'solid') return colors.surfaceElevated ?? '#3a3a3a';
    if (variant === 'solid') return resolvedColor;
    if (variant === 'outline' || variant === 'ghost' || variant === 'link') return 'transparent';
    return resolvedColor;
  };

  const getBorderStyle = () => {
    if (variant === 'outline') {
      return {
        borderWidth: 2,
        borderColor: isDisabled ? (colors.surfaceElevated ?? '#3a3a3a') : resolvedColor,
      };
    }
    return {};
  };

  const getTextColor = (): string => {
    if (isDisabled) return colors.textSecondary ?? '#888';
    if (variant === 'solid') return colors.textInverse ?? '#F8FBFC';
    return resolvedColor;
  };

  const shouldUppercase = variant === 'solid' || variant === 'outline';

  return (
    <AnimatedPressable
      testID={testID}
      onPress={isDisabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={label}
      style={[
        styles.base,
        {
          height: sizeConfig.height,
          paddingHorizontal: sizeConfig.paddingHorizontal,
          backgroundColor: getBackgroundColor(),
          borderRadius: radii.pill ?? 100,
          opacity: isDisabled ? 0.5 : 1,
        },
        getBorderStyle(),
        fullWidth && styles.fullWidth,
        variant === 'link' && styles.link,
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text
            style={[
              styles.label,
              {
                fontSize: sizeConfig.fontSize,
                color: getTextColor(),
                fontFamily: typography.h1.fontFamily ?? undefined,
                fontWeight: '700',
                textTransform: shouldUppercase ? 'uppercase' : 'none',
                letterSpacing: shouldUppercase ? 1.2 : 0,
              },
              variant === 'link' && styles.linkText,
              labelStyle,
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  label: {
    textAlign: 'center',
  },
  link: {
    paddingHorizontal: 0,
    height: undefined,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
