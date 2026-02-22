import React from 'react';
import { ActivityIndicator, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Pressable } from '../Pressable';
import { Text } from '../Text';
import { HStack } from '../Stack';
import type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'md',
  onPress,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  style,
  textStyle,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, radii, sizes, spacing } = theme;

  const height = sizes.buttonHeight[size];
  const px = size === 'sm' ? spacing.md : size === 'md' ? spacing.lg : spacing.xl;
  const fontSize = size === 'sm' ? 13 : size === 'md' ? 15 : 17;

  const errorColor = colors.error ?? '#FF453A';

  const containerStyles: Record<ButtonVariant, ViewStyle> = {
    solid: { backgroundColor: colors.primary },
    outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
    ghost: { backgroundColor: 'transparent' },
    link: { backgroundColor: 'transparent' },
    elevated: {
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 5,
    },
    destructive: { backgroundColor: errorColor },
  };

  const textColors: Record<ButtonVariant, string> = {
    solid: colors.textInverse,
    outline: colors.primary,
    ghost: colors.primary,
    link: colors.primary,
    elevated: colors.textInverse,
    destructive: '#FFFFFF',
  };

  const btnStyle: ViewStyle = {
    height,
    paddingHorizontal: variant === 'link' ? 0 : px,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.4 : 1,
    ...(fullWidth && { width: '100%' as any }),
    ...containerStyles[variant],
  };

  const labelStyle: TextStyle = {
    fontSize,
    fontWeight: '700',
    color: textColors[variant],
    ...(variant === 'link' && { textDecorationLine: 'underline' }),
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[btnStyle, style]}
      testID={testID}
    >
      <HStack gap="sm" align="center">
        {loading ? (
          <ActivityIndicator size="small" color={textColors[variant]} />
        ) : (
          <>
            {leftIcon}
            {typeof children === 'string' ? (
              <Text style={[labelStyle, textStyle]}>{children}</Text>
            ) : (
              children
            )}
            {rightIcon}
          </>
        )}
      </HStack>
    </Pressable>
  );
};
