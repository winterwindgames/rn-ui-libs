import React from 'react';
import { type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Pressable } from '../Pressable';
import type { IconButtonProps } from './IconButton.types';

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, sizes } = theme;

  const dim = sizes.buttonHeight[size];

  const bgMap: Record<string, string> = {
    solid: colors.primary,
    outline: 'transparent',
    ghost: 'transparent',
  };

  const btnStyle: ViewStyle = {
    width: dim,
    height: dim,
    borderRadius: dim / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgMap[variant],
    ...(variant === 'outline' && { borderWidth: 1.5, borderColor: colors.border }),
    opacity: disabled ? 0.4 : 1,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[btnStyle, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      {icon}
    </Pressable>
  );
};
